import { ApiClientInterface } from '../_types/generalTypes';
import { ApiResource } from '../apiResource';
import { RequestOptions } from '../baseClient';
import { finalResponse, initOpenAIClient, overrideConfig } from '../utils';
import { createHeaders } from './createHeaders';

export class MainFiles extends ApiResource {
  async create(
    _body: FileCreateParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): Promise<FileObject> {
    const body: FileCreateParams = _body;
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
    const result = await OAIclient.files.create(body, opts).withResponse();

    return finalResponse(result);
  }

  async list(
    _query?: FileListParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): Promise<any> {
    const query: FileListParams | undefined = _query;
    if (params) {
      const config = overrideConfig(this.client.config, params.config);
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params, config }),
      };
    }

    const OAIclient = initOpenAIClient(this.client);

    const result = await OAIclient.files.list(query, opts).withResponse();

    return finalResponse(result);
  }

  async retrieve(
    fileId: string,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): Promise<any> {
    if (params) {
      const config = overrideConfig(this.client.config, params.config);
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params, config }),
      };
    }

    const OAIclient = initOpenAIClient(this.client);

    const result = await OAIclient.files.retrieve(fileId, opts).withResponse();

    return finalResponse(result);
  }

  async del(
    fileId: string,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): Promise<any> {
    if (params) {
      const config = overrideConfig(this.client.config, params.config);
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params, config }),
      };
    }

    const OAIclient = initOpenAIClient(this.client);

    const result = await OAIclient.files.del(fileId, opts).withResponse();

    return finalResponse(result);
  }

  async content(
    fileId: string,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): Promise<any> {
    if (params) {
      const config = overrideConfig(this.client.config, params.config);
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params, config }),
      };
    }

    const OAIclient = initOpenAIClient(this.client);

    const result = await OAIclient.files.content(fileId, opts).withResponse();

    return finalResponse(result);
  }

  async retrieveContent(
    fileId: string,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): Promise<any> {
    if (params) {
      const config = overrideConfig(this.client.config, params.config);
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params, config }),
      };
    }

    const OAIclient = initOpenAIClient(this.client);

    const result = await OAIclient.files.content(fileId, opts).withResponse();

    return finalResponse(result);
  }

  async waitForProcessing(
    id: string,
    _body: PollOptions,
    params?: ApiClientInterface
  ): Promise<FileObject> {
    const body: PollOptions = _body;
    if (params) {
      const config = overrideConfig(this.client.config, params.config);
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params, config }),
      };
    }

    const OAIclient = initOpenAIClient(this.client);

    const result = await OAIclient.files.waitForProcessing(id, {
      ...(body.pollInterval !== undefined && {
        pollInterval: body.pollInterval,
      }),
      ...(body.maxWait !== undefined && { maxWait: body.maxWait }),
    });

    return result;
  }
}

interface PollOptions {
  pollInterval?: number | undefined;
  maxWait?: number | undefined;
}

export interface FileCreateParams {
  file: any;
  purpose?: string;
  [key: string]: any;
}

export interface FileObject {
  id: string;
  bytes?: number;
  created_at?: number;
  filename?: string;
  object?: string;
  purpose?: string;
  status?: string;
  status_details?: string;
  [key: string]: any;
}

export interface FileListParams {
  purpose?: string;
  order?: 'asc' | 'desc';
  [key: string]: any;
}
