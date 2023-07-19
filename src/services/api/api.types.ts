/**
 * These types indicate the shape of the data you expect to receive from your
 * API endpoint, assuming it's a JSON object like we have.
 */

export interface Inference {
  model_id: string;
  prompt: string;
}
export interface MagicPromptText {
  text: string;
}

export interface MagicPromptResponse {
  data: MagicPromptText;
}

export interface ModelResponse {
  id: string;
  name: string;
  description: string;
  image: string;
  type: string;
  streamable: boolean;
  createdAt: string;
  updatedAt: string;
  slug: string | null;
  direct_url: string | null;
}

/**
 * The options used to configure apisauce.
 */
export interface ApiConfig {
  /**
   * The URL of the api.
   */
  url: string | undefined;

  /**
   * Milliseconds before we timeout the request.
   */
  timeout: number;
}
