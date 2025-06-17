import {
  ContainerCreateParams,
  ContainerCreateResponse,
  ContainerListParams,
  ContainerRetrieveResponse,
} from 'openai/resources/index';
import { ApiResource } from '../apiResource';
import { ApiClientInterface } from '../_types/generalTypes';
import { createHeaders } from './createHeaders';
import { RequestOptions } from '../baseClient';
import { finalResponse, initOpenAIClient, overrideConfig } from '../utils';
import {
  FileCreateParams,
  FileCreateResponse,
  FileListParams,
  FileRetrieveResponse,
} from 'openai/resources/containers/files/files';

export class Containers extends ApiResource {
  files: ContainersFiles;

  constructor(client: any) {
    super(client);
    this.files = new ContainersFiles(client);
  }

  async create(
    _body: ContainerCreateParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): Promise<ContainerCreateResponse> {
    const body: ContainerCreateParams = _body;
    if (params) {
      const config = overrideConfig(this.client.config, params.config);
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params, config }),
      };
    }

    const OAIclient = initOpenAIClient(this.client);
    const result = await OAIclient.containers.create(body, opts).withResponse();
    return finalResponse(result);
  }

  async retrieve(
    containerId: string,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): Promise<ContainerRetrieveResponse> {
    if (params) {
      const config = overrideConfig(this.client.config, params.config);
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params, config }),
      };
    }

    const OAIclient = initOpenAIClient(this.client);
    const result = await OAIclient.containers
      .retrieve(containerId, opts)
      .withResponse();
    return finalResponse(result);
  }

  async list(
    query?: ContainerListParams,
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
    const result = await OAIclient.containers.list(query, opts).withResponse();
    return finalResponse(result);
  }

  async del(
    containerId: string,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): Promise<void> {
    if (params) {
      const config = overrideConfig(this.client.config, params.config);
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params, config }),
      };
    }

    const OAIclient = initOpenAIClient(this.client);
    const result = await OAIclient.containers
      .del(containerId, opts)
      .withResponse();
    return finalResponse(result);
  }
}

export class ContainersFiles extends ApiResource {
  content: Content;
  constructor(client: any) {
    super(client);
    this.content = new Content(client);
  }

  async create(
    containerId: string,
    body: FileCreateParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): Promise<FileCreateResponse> {
    if (params) {
      const config = overrideConfig(this.client.config, params.config);
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params, config }),
      };
    }

    const OAIclient = initOpenAIClient(this.client);
    const result = await OAIclient.containers.files
      .create(containerId, body, opts)
      .withResponse();
    return finalResponse(result);
  }

  async retrieve(
    containerId: string,
    fileId: string,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): Promise<FileRetrieveResponse> {
    if (params) {
      const config = overrideConfig(this.client.config, params.config);
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params, config }),
      };
    }

    const OAIclient = initOpenAIClient(this.client);
    const result = await OAIclient.containers.files
      .retrieve(containerId, fileId, opts)
      .withResponse();
    return finalResponse(result);
  }

  async list(
    containerId: string,
    query?: FileListParams,
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
    const result = await OAIclient.containers.files
      .list(containerId, query, opts)
      .withResponse();
    return finalResponse(result);
  }

  async del(
    containerId: string,
    fileId: string,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): Promise<void> {
    if (params) {
      const config = overrideConfig(this.client.config, params.config);
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params, config }),
      };
    }

    const OAIclient = initOpenAIClient(this.client);
    const result = await OAIclient.containers.files
      .del(containerId, fileId, opts)
      .withResponse();
    return finalResponse(result);
  }
}

export class Content extends ApiResource {
  async retrieve(
    containerId: string,
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
    const result = await OAIclient.containers.files.content.retrieve(
      containerId,
      fileId,
      opts
    );
    return await result.text();
  }
}
