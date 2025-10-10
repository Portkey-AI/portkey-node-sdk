import { ApiResource } from '../apiResource';
import { createHeaders } from './createHeaders';
import { initOpenAIClient, overrideConfig } from '../utils';
import { ApiClientInterface } from '../_types/generalTypes';
import { APIPromise, RequestOptions } from '../baseClient';
import {
  Video,
  VideoCreateParams,
  VideoDeleteResponse,
  VideoDownloadContentParams,
  VideoListParams,
  VideoRemixParams,
} from 'openai/resources/videos';

export class Videos extends ApiResource {
  constructor(client: any) {
    super(client);
  }

  create(
    body: VideoCreateParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<Video> {
    if (params) {
      const config = overrideConfig(this.client.config, params.config);
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params, config }),
      };
    }

    const OAIclient = initOpenAIClient(this.client);
    const result = OAIclient.videos.create(body, opts);
    return result as any;
  }

  retrieve(
    videoID: string,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<Video> {
    if (params) {
      const config = overrideConfig(this.client.config, params.config);
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params, config }),
      };
    }

    const OAIclient = initOpenAIClient(this.client);
    const result = OAIclient.videos.retrieve(videoID, opts);
    return result as any;
  }

  list(
    query: VideoListParams | null | undefined = {},
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<any> {
    if (params) {
      const config = overrideConfig(this.client.config, params.config);
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params, config }),
      };
    }

    const OAIclient = initOpenAIClient(this.client);
    const result = OAIclient.videos.list(query, opts);
    return result as any;
  }

  delete(
    videoID: string,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<VideoDeleteResponse> {
    if (params) {
      const config = overrideConfig(this.client.config, params.config);
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params, config }),
      };
    }

    const OAIclient = initOpenAIClient(this.client);
    const result = OAIclient.videos.delete(videoID, opts);
    return result as any;
  }

  downloadContent(
    videoID: string,
    query: VideoDownloadContentParams | null | undefined = {},
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<Response> {
    if (params) {
      const config = overrideConfig(this.client.config, params.config);
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params, config }),
      };
    }
    const OAIclient = initOpenAIClient(this.client);
    const result = OAIclient.videos.downloadContent(videoID, query, opts);

    return result as any;
  }

  remix(
    videoID: string,
    body: VideoRemixParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<Video> {
    if (params) {
      const config = overrideConfig(this.client.config, params.config);
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params, config }),
      };
    }
    const OAIclient = initOpenAIClient(this.client);
    const result = OAIclient.videos.remix(videoID, body, opts);
    return result as any;
  }
}
