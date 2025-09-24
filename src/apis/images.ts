import {
  ImageEditStreamEvent,
  ImageGenStreamEvent,
} from 'openai/resources/images';
import { ApiClientInterface } from '../_types/generalTypes';
import { ApiResource } from '../apiResource';
import { APIPromise, RequestOptions } from '../baseClient';
import { finalResponse, initOpenAIClient, overrideConfig } from '../utils';
import { createHeaders } from './createHeaders';
import { Stream } from '../streaming';

export interface ImagesBody {
  prompt: string;
  background?: string;
  model?: any;
  moderation?: string;
  n?: number | null;
  output_compression?: number;
  output_format?: string;
  partial_images?: number;
  quality?: string;
  response_format?: string | null;
  size?: string | null;
  stream?: boolean | null;
  style?: string | null;
  user?: string;
  [key: string]: any;
}

export interface ImageGenerateParamsNonStreaming extends ImagesBody {
  stream?: false | null;
}
export interface ImageGenerateParamsStreaming extends ImagesBody {
  stream: true;
}

export type ImageGenerateParams =
  | ImageGenerateParamsNonStreaming
  | ImageGenerateParamsStreaming;

export interface ImageEditParamsBase {
  image: any;
  prompt: string;
  background?: any;
  input_fidelity?: string;
  mask?: any;
  model?: any | null;
  n?: number | null;
  output_compression?: number;
  output_format?: string;
  response_format?: string;
  partial_images?: number;
  quality?: string;
  size?: string;
  stream?: boolean | null;
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
  data?: Array<Image>;
  [key: string]: any;
}

export interface Image {
  b64_json?: string;
  revised_prompt?: string;
  url?: string;
  [key: string]: any;
}

export interface ImageEditParamsNonStreaming extends ImageEditParamsBase {
  stream?: false | null;
}
export interface ImageEditParamsStreaming extends ImageEditParamsBase {
  stream: true;
}

export type ImageEditParams =
  | ImageEditParamsNonStreaming
  | ImageEditParamsStreaming;

export class Images extends ApiResource {
  generate(
    body: ImageGenerateParamsNonStreaming,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<ImagesResponse>;
  generate(
    body: ImageGenerateParamsStreaming,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<Stream<ImageGenStreamEvent>>;
  generate(
    body: ImagesBody,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<Stream<ImageGenStreamEvent> | ImagesResponse>;
  generate(
    body: ImageGenerateParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<ImagesResponse> | APIPromise<Stream<ImageGenStreamEvent>> {
    if (params) {
      const config = overrideConfig(this.client.config, params.config);
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params, config }),
      };
    }

    const OAIclient = initOpenAIClient(this.client);

    if (body.stream) {
      return OAIclient.images.generate(body as any, opts) as any;
    } else {
      const result = OAIclient.images
        .generate(body as any, opts)
        .withResponse()
        .then((res) => {
          return finalResponse(res);
        });
      return result as any;
    }
  }

  edit(
    body: ImageEditParamsNonStreaming,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<ImagesResponse>;
  edit(
    body: ImageEditParamsStreaming,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<Stream<ImageEditStreamEvent>>;
  edit(
    body: ImageEditParamsBase,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<Stream<ImageEditStreamEvent> | ImagesResponse>;
  edit(
    body: ImageEditParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<ImagesResponse> | APIPromise<Stream<ImageEditStreamEvent>> {
    if (params) {
      const config = overrideConfig(this.client.config, params.config);
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params, config }),
      };
    }
    const OAIclient = initOpenAIClient(this.client);

    if (body.stream) {
      return OAIclient.images.edit(body as any, opts) as any;
    } else {
      const result = OAIclient.images
        .edit(body as any, opts)
        .withResponse()
        .then((res) => {
          return finalResponse(res);
        });
      return result as any;
    }
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
