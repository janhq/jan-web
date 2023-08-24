import { ApiResponse, ApisauceInstance, create } from "apisauce";
import {
  fetchEventSource,
  EventStreamContentType,
} from "@microsoft/fetch-event-source";
import type {
  ApiConfig,
  MagicPromptResponse,
  MagicPromptText,
  StreamMessageOptions,
} from "./api.types";
import { GeneralApiProblem, getGeneralApiProblem } from "./api.problems";
import { ChatMessage, MessageType } from "@/_models/ChatMessage";
import { MessageResponse } from "./models/message.response";
import { Instance } from "mobx-state-tree";
import { getAccessToken } from "@/_utils/tokenAccessor";

/**
 * Configuring the apisauce instance.
 */
export const DEFAULT_API_CONFIG: ApiConfig = {
  url: process.env.NEXT_PUBLIC_API_URL,
  timeout: 30000,
};

export class Api {
  apisauce: ApisauceInstance;
  config: ApiConfig;

  /**
   * Set up our API instance. Keep this lightweight!
   */
  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config;
    this.apisauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        Accept: "application/json",
      },
    });

    this.apisauce.addAsyncRequestTransform((request) => {
      return getAccessToken().then((token) => {
        if (request.headers != undefined) {
          request.headers.Authorization = `Bearer ${token}`;
        }
      });
    });
  }

  /**
   *  Sends magic prompt request
   * @param prompt prompt content
   * @returns
   */
  async magicPrompt(
    prompt: string
  ): Promise<{ kind: "ok"; data: MagicPromptText } | GeneralApiProblem> {
    const response: ApiResponse<MagicPromptResponse> = await this.apisauce.post(
      "inference/magic-prompt",
      {
        input: prompt,
        stream: false,
      }
    );
    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) {
        return problem;
      }
    }

    // transform the data into the format we are expecting
    return {
      kind: "ok",
      data: response.data?.data ? response.data.data : { text: "" },
    };
  }

  /**
   *  Request to generate image from text
   * @param model  model name
   * @param prompt  prompt content
   * @returns
   */
  async textToImage(
    model: string,
    prompt: string
  ): Promise<
    { kind: "ok"; outputs: string[] | undefined } | GeneralApiProblem
  > {
    // make the api call
    const response: ApiResponse<string[]> = await this.apisauce.post(
      "/inference/text-to-image",
      {
        model: model,
        prompt,
      }
    );

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) {
        return problem;
      }
    }

    // transform the data into the format we are expecting
    try {
      const rawData = response.data;
      // This is where we transform the data into the shape we expect for our MST model.
      const outputs: string[] | undefined = rawData;
      return { kind: "ok", outputs: outputs };
    } catch (e) {
      return { kind: "bad-data" };
    }
  }

  /**
   * Sending messages to Cloudflare SSE.
   * @description Using callbacks to decouple sending message from modifying DOM / data store
   * @param options
   */
  async streamMessageChat(options: StreamMessageOptions) {
    const streamURL =
      process.env.NEXT_PUBLIC_SSE_INFERENCE_ENDPOINT + options.model;
    try {
      const chatPayload = {
        messages: options.messages,
        stream: options.stream,
        max_tokens: options.max_tokens,
      };

      const authToken = await getAccessToken();
      const chatRequestPayload = {
        method: "POST",
        body: JSON.stringify(chatPayload),
        headers: {
          Accept: "text/event-stream",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${authToken}`,
          be_key: process.env.NEXT_PUBLIC_BE_KEY ?? "",
        },
        debug: false,
        pollingInterval: 100000,
      };

      const controller = new AbortController();
      const reqTimeoutId = setTimeout(() => controller.abort(), 10000); // TODO: make time out value be configurable
      let responseText = "";
      const finish = () => {
        options.onFinish(responseText);
      };

      fetchEventSource(streamURL, {
        ...chatRequestPayload,
        async onopen(res) {
          clearTimeout(reqTimeoutId);
          // if the returned content does not have type as epxected
          if (
            res.ok &&
            !res.headers.get("content-type")?.includes(EventStreamContentType)
          ) {
            responseText += await res.clone().json();
            return finish();
          }

          if (res.status === 401) {
            let extraInfo = { error: undefined };
            try {
              extraInfo = await res.clone().json();
            } catch {}

            if (extraInfo.error) {
              responseText += "\n\n" + JSON.stringify(extraInfo);
            }
            return finish();
          }
          options.onOpen?.();
        },
        onmessage(msg) {
          if (msg.data === "[DONE]") {
            return finish();
          }

          const text = msg.data;
          try {
            const json = JSON.parse(text);
            const delta = json.choices[0].delta.content;
            if (delta) {
              responseText += delta;
              options.onUpdate?.(responseText, delta);
            }
          } catch (e) {
            console.error("[Response] parsing data error", text, msg);
          }
        },
        onclose() {
          finish();
        },
        onerror(e) {
          options.onError?.(e);
        },
        openWhenHidden: true,
      });
    } catch (error) {
      console.error("[Request] could not send chat message", error);
      options.onError?.(error as Error);
    }
  }
}
// Singleton instance of the API for convenience
export const api = new Api();
