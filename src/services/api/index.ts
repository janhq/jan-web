import { ApiResponse, ApisauceInstance, create } from "apisauce";

import Config from "../../config";
import { getFirebaseToken } from "../firebase";

import type { ApiConfig, MagicPromptResponse, MagicPromptText } from "./api.types";
import { GeneralApiProblem, getGeneralApiProblem } from "./api.problems";

/**
 * Configuring the apisauce instance.
 */
export const DEFAULT_API_CONFIG: ApiConfig = {
  url: Config.API_URL,
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
   *  Query discovery configurations
   * @returns
   */
  async getDiscoverConfigurations(): Promise<{ kind: "ok"; configuration: any } | GeneralApiProblem> {
    // make the api call
    const response: ApiResponse<any> = await this.apisauce.get("/discover");
    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) {
        return problem;
      }
    }
    // transform the data into the format we are expecting
    try {
      return { kind: "ok", configuration: response.data };
    } catch (e) {
      return { kind: "bad-data" };
    }
  }

  /**
   *  Sends magic prompt request
   * @param prompt prompt content
   * @returns
   */
  async magicPrompt(prompt: string): Promise<{ kind: "ok"; data: MagicPromptText } | GeneralApiProblem> {
    const response: ApiResponse<MagicPromptResponse> = await this.apisauce.post("inference/magic-prompt", {
      input: prompt,
      stream: false,
    });
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
  ): Promise<{ kind: "ok"; outputs: string[] | undefined } | GeneralApiProblem> {
    // make the api call
    const response: ApiResponse<string[]> = await this.apisauce.post("/inference/text-to-image", {
      model: model,
      prompt,
    });

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
}

// Singleton instance of the API for convenience
export const api = new Api();
