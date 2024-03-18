import { ApiClientInterface } from "../_types/generalTypes";
import { ApiResource } from "../apiResource";
import { RequestOptions } from "../baseClient";
import { OPEN_AI_API_KEY } from "../constants";
import { finalResponse, overrideConfig } from "../utils";
import { createHeaders } from "./createHeaders";
import OpenAI from "openai";

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

    const OAIclient = new OpenAI({
      apiKey: OPEN_AI_API_KEY,
      baseURL: this.client.baseURL,
      defaultHeaders: {...this.client.customHeaders, ...this.client.portkeyHeaders},
    });

    const result = await OAIclient.files.create(body, opts).withResponse();

    return finalResponse(result);
  }

  async list(
    _query: FileListParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): Promise<any> {
    const query: FileListParams = _query;
    if (params) {
      const config = overrideConfig(this.client.config, params.config);
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params, config }),
      };
    }

    const OAIclient = new OpenAI({
      apiKey: OPEN_AI_API_KEY,
      baseURL: this.client.baseURL,
      defaultHeaders: {...this.client.customHeaders, ...this.client.portkeyHeaders},
    });

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

    const OAIclient = new OpenAI({
      apiKey: OPEN_AI_API_KEY,
      baseURL: this.client.baseURL,
      defaultHeaders: {...this.client.customHeaders, ...this.client.portkeyHeaders},
    });

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

    const OAIclient = new OpenAI({
      apiKey: OPEN_AI_API_KEY,
      baseURL: this.client.baseURL,
      defaultHeaders: {...this.client.customHeaders, ...this.client.portkeyHeaders},
    });

    const result = await OAIclient.files.del(fileId, opts).withResponse();

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

    const OAIclient = new OpenAI({
      apiKey: OPEN_AI_API_KEY,
      baseURL: this.client.baseURL,
      defaultHeaders: {...this.client.customHeaders, ...this.client.portkeyHeaders},
    });

    const result = await OAIclient.files.content(fileId, opts).withResponse();

    return finalResponse(result);
  }

}


export interface FileCreateParams {
    file: any;
    purpose: 'fine-tune' | 'assistants';
}

export interface FileObject {
    id: string;
    bytes: number;
    created_at: number;
    filename: string;
    object: 'file';
    purpose: 'fine-tune' | 'fine-tune-results' | 'assistants' | 'assistants_output';
    status: 'uploaded' | 'processed' | 'error';
    status_details?: string;
}

export interface FileListParams {
    purpose?: string;
  }