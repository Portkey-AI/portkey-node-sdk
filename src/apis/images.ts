import { ApiClientInterface } from "../_types/generalTypes";
import { ApiResource } from "../apiResource";
import { RequestOptions } from "../baseClient";
import { OPEN_AI_API_KEY, PORTKEY_BASE_URL } from "../constants";
import { finalResponse, overrideConfig } from "../utils";
import { createHeaders } from "./createHeaders";
import OpenAI from "openai";

export interface ImagesBody {
  prompt: string;
  model?: (string & {}) | "dall-e-2" | "dall-e-3";
  n?: number | null;
  quality?: "standard" | "hd";
  response_format?: "url" | "b64_json" | null;
  size?: "256x256" | "512x512" | "1024x1024" | "1792x1024" | "1024x1792" | null;
  style?: "vivid" | "natural" | null;
  user?: string;
}

export interface ImageEditParams {
    image: any;
    prompt: string;
    mask?: any;
    model?: (string & {}) | 'dall-e-2' | null;
    n?: number | null;
    response_format?: 'url' | 'b64_json' | null;
    size?: '256x256' | '512x512' | '1024x1024' | null;
    user?: string;
}

export interface ImageCreateVariationParams {
    image: any;
    model?: (string & {}) | 'dall-e-2' | null;
    n?: number | null;
    response_format?: 'url' | 'b64_json' | null;
    size?: '256x256' | '512x512' | '1024x1024' | null;
    user?: string;
}

export interface ImagesResponse {
  created: number;

  data: Array<Image>;
}
export interface Image {
  b64_json?: string;
  revised_prompt?: string;
  url?: string;
}

export class Images extends ApiResource {
  async generate(
    _body: ImagesBody,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): Promise<ImagesResponse> {
    const body: ImagesBody = _body;
    if (params) {
      const config = overrideConfig(this.client.config, params.config);
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params, config }),
      };
    }

    const OAIclient = new OpenAI({
      apiKey: OPEN_AI_API_KEY,
      baseURL: PORTKEY_BASE_URL,
      defaultHeaders: {...this.client.customHeaders, ...this.client.portkeyHeaders},
    });

    const result = await OAIclient.images.generate(body, opts).withResponse();
    
    return finalResponse(result);
  }

  async edit(
    _body: ImageEditParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): Promise<ImagesResponse> {
    const body: ImageEditParams = _body;
    if (params) {
      const config = overrideConfig(this.client.config, params.config);
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params, config }),
      };
    }

    const OAIclient = new OpenAI({
      apiKey: OPEN_AI_API_KEY,
      baseURL: PORTKEY_BASE_URL,
      defaultHeaders: {...this.client.customHeaders, ...this.client.portkeyHeaders},
    });

    const result = await OAIclient.images.edit(body, opts).withResponse();

    return finalResponse(result);
  }

  async createVariation(
    _body: ImageCreateVariationParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): Promise<ImagesResponse> {
    const body: ImageCreateVariationParams = _body;
    if (params) {
      const config = overrideConfig(this.client.config, params.config);
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params, config }),
      };
    }

    const OAIclient = new OpenAI({
      apiKey: OPEN_AI_API_KEY,
      baseURL: PORTKEY_BASE_URL,
      defaultHeaders: {...this.client.customHeaders, ...this.client.portkeyHeaders},
    });

    const result = await OAIclient.images.createVariation(body, opts).withResponse();

    return finalResponse(result);
  }
}
