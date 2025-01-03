import { ApiClientInterface } from '../_types/generalTypes';
import { ApiResource } from '../apiResource';
import { RequestOptions } from '../baseClient';
import { finalResponse, initOpenAIClient, overrideConfig } from '../utils';
import { createHeaders } from './createHeaders';

export interface ImagesBody {
  prompt: string;
  model?: string;
  n?: number | null;
  quality?: string;
  response_format?: string | null;
  size?: string | null;
  style?: string | null;
  user?: string;
  [key: string]: any;
}

export interface ImageEditParams {
  image: any;
  prompt: string;
  mask?: any;
  model?: string | null;
  n?: number | null;
  response_format?: string | null;
  size?: string | null;
  user?: string;
  [key: string]: any;
}

export interface ImageCreateVariationParams {
  image: any;
  model?: string | null;
  n?: number | null;
  response_format?: string | null;
  size?: string | null;
  user?: string;
  [key: string]: any;
}

export interface ImagesResponse {
  created: number;
  data: Array<Image>;
  [key: string]: any;
}

export interface Image {
  b64_json?: string;
  revised_prompt?: string;
  url?: string;
  [key: string]: any;
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

    const OAIclient = initOpenAIClient(this.client);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
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

    const OAIclient = initOpenAIClient(this.client);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
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

    const OAIclient = initOpenAIClient(this.client);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const result = await OAIclient.images
      .createVariation(body as any, opts)
      .withResponse();

    return finalResponse(result);
  }
}
