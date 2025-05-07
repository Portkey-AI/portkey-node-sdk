import { APIResponseType, ApiClientInterface } from '../_types/generalTypes';
import { ApiResource } from '../apiResource';
import { APIPromise, RequestOptions } from '../baseClient';
import { Stream } from '../streaming';
import { overrideConfig } from '../utils';
import { createHeaders } from './createHeaders';

export class postMethod extends ApiResource {
  create(
    url: string,
    _body: PostBodyNonStreaming,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<PostResponse>;
  create(
    url: string,
    _body: PostBodyStreaming,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<Stream<PostResponse>>;
  create(
    url: string,
    _body: PostBodyParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<Stream<PostResponse>> | APIPromise<PostResponse>;
  create(
    url: string,
    _body: PostBodyParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<PostResponse> | APIPromise<Stream<PostResponse>> {
    const body = _body;
    if (params) {
      const config = overrideConfig(this.client.config, params.config);
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params, config }),
      };
    }
    const response = this.post<PostResponse>(url, { body, ...opts }) as
      | APIPromise<PostResponse>
      | APIPromise<Stream<PostResponse>>;
    return response;
  }
}

export type PostResponse = Record<string, any> & APIResponseType;

export interface PostBodyStreaming extends Record<string, any> {
  stream?: true;
}

export interface PostBodyNonStreaming extends Record<string, any> {
  stream?: false;
}

export type PostBodyParams = PostBodyNonStreaming | PostBodyStreaming;
