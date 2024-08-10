import { ApiClientInterface } from "../_types/generalTypes";
import { ApiResource } from "../apiResource";
import { RequestOptions } from "../baseClient";
import { OPEN_AI_API_KEY } from "../constants";
import { defaultHeadersBuilder, finalResponse, overrideConfig } from "../utils";
import { createHeaders } from "./createHeaders";
import OpenAI from "openai";
import { UploadCompleteParams } from "openai/resources";
import { Uploadable } from "openai/uploads";

export class Uploads extends ApiResource {
  parts: Parts 

  constructor(client: any) {
    super(client);
    this.parts = new Parts(client);
  }


  async create(
    _body: UploadCreateParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): Promise<any> {
    const body: UploadCreateParams = _body;
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
      defaultHeaders: defaultHeadersBuilder(this.client),
    });
    const response = await OAIclient.uploads.create(body, opts).withResponse();
    return finalResponse(response);
  }

  async cancel(
    uploadId: string,
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
      defaultHeaders: defaultHeadersBuilder(this.client),
    });
    const response = await OAIclient.uploads.cancel(uploadId, opts).withResponse();
    return finalResponse(response);
  }

  async complete(
    uploadId: string,
    _body: UploadCompleteParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): Promise<any> {
    const body: UploadCompleteParams = _body;
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
      defaultHeaders: defaultHeadersBuilder(this.client),
    });
    const response = await OAIclient.uploads.complete(uploadId, body, opts).withResponse();
    return finalResponse(response);
  }
}

export class Parts extends ApiResource{
    async create(
        uploadId: string,
        _body: PartCreateParams,
        params?: ApiClientInterface,
        opts?: RequestOptions
    ): Promise<any> {
        const body: PartCreateParams = _body;
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
            defaultHeaders: defaultHeadersBuilder(this.client),
        });
        const response = await OAIclient.uploads.parts.create(uploadId ,body, opts).withResponse();
        return finalResponse(response);
    }
}

export interface UploadCreateParams {
  bytes: number;
  filename: string;
  mime_type: string;
  purpose: 'assistants' | 'batch' | 'fine-tune' | 'vision';
}

export interface PartCreateParams {
  data: Uploadable;
}