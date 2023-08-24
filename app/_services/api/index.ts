import { ApiResponse, ApisauceInstance, create } from "apisauce";
import type {
  ApiConfig,
  MagicPromptResponse,
  MagicPromptText,
  StreamMessageOptions,
} from "./api.types";
import { GeneralApiProblem, getGeneralApiProblem } from "./api.problems";
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
  // TODO: GraphQL Action Endpoint
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
}
// Singleton instance of the API for convenience
export const api = new Api();
