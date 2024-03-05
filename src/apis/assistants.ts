import { ApiClientInterface } from "../_types/generalTypes";
import { ApiResource } from "../apiResource";
import { RequestOptions } from "../baseClient";
import { OPEN_AI_API_KEY, PORTKEY_BASE_URL } from "../constants";
import { overrideConfig } from "../utils";
import { createHeaders } from "./createHeaders";
import OpenAI from "openai";

export interface AssistantCreateParams {
    model: string;
    description?: string | null;
    file_ids?: Array<string>;
    instructions?: string | null;
    metadata?: unknown | null;
    name?: string | null;
    tools?: Array<any>;
}

export interface FileCreateParams {
    file_id: string;
}

export interface FileListParams extends CursorPageParams {
    before?: string;
    order?: 'asc' | 'desc';
}

export interface CursorPageParams {
    after?: string;
    limit?: number;
}

export interface AssistantListParams extends CursorPageParams {
    before?: string;
    order?: 'asc' | 'desc';
}

export interface AssistantUpdateParams {
    description?: string | null;
    file_ids?: Array<string>;
    instructions?: string | null;
    metadata?: unknown | null;
    model?: string;
    name?: string | null;
    tools?: Array<any>;
}


export class Assistants extends ApiResource {
    
    files: Files;

    constructor(client:any) {
        super(client);
        this.files = new Files(client);
    }

    async create(
        _body: AssistantCreateParams,
        params?: ApiClientInterface,
        opts?: RequestOptions
      ): Promise<any> {
        const body: AssistantCreateParams = _body;
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
          defaultHeaders: this.client.customHeaders,
        });
    
        const result = await OAIclient.beta.assistants.create(body, opts);
        return result;
    }

    async list(
        _query: AssistantListParams,
        params?: ApiClientInterface,
        opts?: RequestOptions
      ): Promise<any> {
        const query: AssistantListParams = _query;
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
          defaultHeaders: this.client.customHeaders,
        });
    
        const result = await OAIclient.beta.assistants.list(query, opts);
        return result;
    }

    async retrieve(
        assistantId: string,
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
          baseURL: PORTKEY_BASE_URL,
          defaultHeaders: this.client.customHeaders,
        });
    
        const result = await OAIclient.beta.assistants.retrieve(assistantId, opts);
        return result;
    }

    async update(
        assistantId: string,
        _body: AssistantUpdateParams,
        params?: ApiClientInterface,
        opts?: RequestOptions
      ): Promise<any> {
        const body: AssistantUpdateParams = _body;
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
          defaultHeaders: this.client.customHeaders,
        });
    
        const result = await OAIclient.beta.assistants.update(assistantId, body, opts);
        return result;
    }

    async del(
        assistantId: string,
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
          baseURL: PORTKEY_BASE_URL,
          defaultHeaders: this.client.customHeaders,
        });
    
        const result = await OAIclient.beta.assistants.del(assistantId, opts);
        return result;
    }
    
}

export class Files extends ApiResource{
    
    async create(
        assistantId: string,
        _body: FileCreateParams,
        params?: ApiClientInterface,
        opts?: RequestOptions
      ): Promise<any> {
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
          baseURL: PORTKEY_BASE_URL,
          defaultHeaders: this.client.customHeaders,
        });
    
        const result = await OAIclient.beta.assistants.files.create(assistantId, body, opts);
        return result;
    }

    async list(
        assistantId: string,
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
        
        const OAIclient = new OpenAI({
          apiKey: OPEN_AI_API_KEY,
          baseURL: PORTKEY_BASE_URL,
          defaultHeaders: this.client.customHeaders,
        });
    
        const result = await OAIclient.beta.assistants.files.list(assistantId, query, opts);
        return result;
    }

    async retrieve(
        assistantId: string,
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
          baseURL: PORTKEY_BASE_URL,
          defaultHeaders: this.client.customHeaders,
        });
    
        const result = await OAIclient.beta.assistants.files.retrieve(assistantId, fileId, opts);
        return result;
    } 
    
    async del(
        assistantId: string,
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
          baseURL: PORTKEY_BASE_URL,
          defaultHeaders: this.client.customHeaders,
        });
    
        const result = await OAIclient.beta.assistants.files.del(assistantId, fileId, opts);
        return result;
    } 

}