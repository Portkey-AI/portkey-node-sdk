import { APIResponseType, ApiClientInterface } from '../_types/generalTypes';
import { ModelParams } from '../_types/portkeyConstructs';
import { ApiResource } from '../apiResource';
import { APIPromise, RequestOptions } from '../baseClient';
import { EMBEDDINGS_API } from '../constants';
import { overrideConfig } from '../utils';
import { createHeaders } from './createHeaders';

export interface EmbeddingsBody extends ModelParams {
  input: string | number | (string | number)[] | (string | number)[][];
  model?: string;
  dimensions?: number;
  encoding_format?: string;
}

export interface EmbeddingArr {
  embedding?: Array<number>;
  index?: number;
  object?: string;
  [key: string]: any;
}

export interface Usage {
  prompt_tokens?: number;
  total_tokens?: number;
  [key: string]: any;
}

interface EmbeddingsResponse extends APIResponseType {
  data?: Array<EmbeddingArr>;
  model?: string;
  object?: string;
  usage?: Usage;
  [key: string]: any;
}

export class Embeddings extends ApiResource {
  create(
    _body: EmbeddingsBody,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<EmbeddingsResponse> {
    const body = _body;
    if (params) {
      const config = overrideConfig(this.client.config, params.config);
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params, config }),
      };
    }
    const response = this.post<EmbeddingsResponse>(EMBEDDINGS_API, {
      body,
      ...opts,
    });
    return response;
  }
}
