import { ApiResponse, ApisauceInstance, create } from "apisauce";
import {
  fetchEventSource,
  EventStreamContentType,
} from "@microsoft/fetch-event-source";
import { getFirebaseToken } from "../firebase";
import type {
  ApiConfig,
  MagicPromptResponse,
  MagicPromptText,
  StreamMessageOptions,
} from "./api.types";
import { GeneralApiProblem, getGeneralApiProblem } from "./api.problems";
import { ConversationResponse } from "./models/conversation.response";
import { ChatMessage, MessageType } from "../../_models/ChatMessage";
import { MessageResponse } from "./models/message.response";
import { Instance } from "mobx-state-tree";

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
      return getFirebaseToken().then((token) => {
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

      const authToken = await getFirebaseToken();
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

  async createConversation(
    modelId: string
  ): Promise<{ kind: "ok"; conversationId: string } | GeneralApiProblem> {
    const response: ApiResponse<any> = await this.apisauce.post(
      "conversation",
      {
        ai_model: modelId,
      }
    );

    // the typical ways to die when calling an api
    if (!response.ok && !response.data) {
      const problem = getGeneralApiProblem(response);
      if (problem) {
        return problem;
      }
    }

    // transform the data into the format we are expecting
    const conversationId: string | undefined =
      response.data.data.conversation_id;
    if (!conversationId) {
      console.error("createConversation error", response);
      return { kind: "bad-data" };
    }

    try {
      return { kind: "ok", conversationId };
    } catch (e) {
      console.error("createConversation error", e);
      return { kind: "bad-data" };
    }
  }

  async getConversations(): Promise<
    { kind: "ok"; conversations: ConversationResponse[] } | GeneralApiProblem
  > {
    // make the api call
    const response: ApiResponse<ConversationResponse[]> =
      await this.apisauce.get(`/conversation`);

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) {
        return problem;
      }
    }

    if (!response.data) {
      return { kind: "bad-data" };
    }

    // transform the data into the format we are expecting
    const convos = response.data.filter((c) => {
      return c.ai_model != null && c.ai_model.trim().length > 0;
    });

    try {
      return { kind: "ok", conversations: convos };
    } catch (e) {
      console.error("getConversations error", e);
      return { kind: "bad-data" };
    }
  }

  async createNewTextChatMessage(
    conversationId: string,
    messageSenderType: string,
    senderUuid: string,
    senderName: string,
    senderAvatarUrl: string,
    content: string
  ): Promise<{ kind: "ok"; messageId: string } | GeneralApiProblem> {
    const response: ApiResponse<any> = await this.apisauce.post("message", {
      conversation_id: conversationId,
      message_type: MessageType.Text,
      message_sender_type: messageSenderType,
      sender_uuid: senderUuid,
      sender_name: senderName,
      sender_avatar_url: senderAvatarUrl,
      content: content,
    });

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) {
        return problem;
      }
    }

    // transform the data into the format we are expecting
    const messageId = response.data?.data["message_id"];
    if (!messageId) {
      return { kind: "bad-data" };
    }

    try {
      return { kind: "ok", messageId };
    } catch (e) {
      console.error("createNewTextChatMessage error", e);
      return { kind: "bad-data" };
    }
  }

  async createNewImageChatMessage(
    conversationId: string,
    messageSenderType: string,
    senderUuid: string,
    senderName: string,
    senderAvatarUrl: string,
    content: string,
    image: string
  ): Promise<{ kind: "ok"; messageId: string } | GeneralApiProblem> {
    const response: ApiResponse<any> = await this.apisauce.post("message", {
      conversation_id: conversationId,
      message_type: MessageType.Image,
      message_sender_type: messageSenderType,
      sender_uuid: senderUuid,
      sender_name: senderName,
      sender_avatar_url: senderAvatarUrl,
      content: content,
      images: image,
    });

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) {
        return problem;
      }
    }

    // transform the data into the format we are expecting
    const messageId = response.data?.data["message_id"];

    if (!messageId) {
      return { kind: "bad-data" };
    }

    try {
      return { kind: "ok", messageId };
    } catch (e) {
      console.error("createNewImageChatMessage error", e);
      return { kind: "bad-data" };
    }
  }

  async getConversationMessages(
    convoId: string,
    limit: number,
    offset: number
  ) {
    const response: ApiResponse<any> = await this.apisauce.get(
      `message/${convoId}?limit=${limit}&offset=${offset}`
    );

    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) {
        return problem;
      }
    }

    const messages = response.data?.["data"] as MessageResponse[];

    try {
      return { kind: "ok", messages };
    } catch (e) {
      console.error("getConversationMessages error", e);
      return { kind: "bad-data" };
    }
  }

  async updateChatMessage(chatMessage: Instance<typeof ChatMessage>) {
    const response: ApiResponse<any> = await this.apisauce.patch("message", {
      id: chatMessage.id,
      conversation_id: chatMessage.conversationId,
      message_type: chatMessage.messageType,
      message_sender_type: chatMessage.messageSenderType,
      sender_uuid: chatMessage.senderUid,
      sender_name: chatMessage.senderName,
      sender_avatar_url: chatMessage.senderAvatarUrl,
      content: chatMessage.text ?? "",
      images: chatMessage.imageUrls?.[0],
    });

    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) {
        return problem;
      }
    }

    return { kind: "ok" };
  }

  async deleteConversation(convoId: string) {
    const response: ApiResponse<any> = await this.apisauce.delete(
      `conversation/${convoId}`
    );

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) {
        return problem;
      }
    }

    return { kind: "ok" };
  }
}

// Singleton instance of the API for convenience
export const api = new Api();
