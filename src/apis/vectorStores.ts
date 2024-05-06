import { Uploadable } from "openai/uploads";
import { ApiClientInterface } from "../_types/generalTypes";
import { ApiResource } from "../apiResource";
import { RequestOptions } from "../baseClient";
import { OPEN_AI_API_KEY } from "../constants";
import { defaultHeadersBuilder, finalResponse, overrideConfig } from "../utils";
import { createHeaders } from "./createHeaders";
import OpenAI from "openai";

export class VectorStores extends ApiResource {
  files: Files;
  fileBatches: FileBatches

  constructor(client: any) {
    super(client);
    this.files = new Files(client);
    this.fileBatches = new FileBatches(client);
  }

  async create(
    _body: VectorStoreCreateParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): Promise<any> {
    const body: VectorStoreCreateParams = _body;
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
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const result = await OAIclient.beta.vectorStores
      .create(body, opts)
      .withResponse();

    return finalResponse(result);
  }

  async retrieve(
    vectorStoreId: string,
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

    const result = await OAIclient.beta.vectorStores
      .retrieve(vectorStoreId, opts)
      .withResponse();

    return finalResponse(result);
  }

  async update(
    vectorStoreId: string,
    _body: VectorStoreUpdateParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): Promise<any> {
    const body: VectorStoreUpdateParams = _body;
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

    const result = await OAIclient.beta.vectorStores
      .update(vectorStoreId, body, opts)
      .withResponse();

    return finalResponse(result);
  }

  async list(
    _query?: VectorStoreListParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): Promise<any> {
    const query: VectorStoreListParams | undefined = _query;
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

    const result = await OAIclient.beta.vectorStores
      .list(query, opts)
      .withResponse();
    return finalResponse(result);
  }

  async del(
    vectorStoreId: string,
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

    const result = await OAIclient.beta.vectorStores
      .del(vectorStoreId, opts)
      .withResponse();

    return finalResponse(result);
  
  }

}

export class Files extends ApiResource{


    async create(
        vectorStoreId: string,
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
          baseURL: this.client.baseURL,
          defaultHeaders: defaultHeadersBuilder(this.client),
        });

        const result = await OAIclient.beta.vectorStores
          .files.create(vectorStoreId, body, opts)
          .withResponse();
        
        return finalResponse(result);
    }

    async retrieve(
        vectorStoreId: string,
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
          defaultHeaders: defaultHeadersBuilder(this.client),
        });
    
        const result = await OAIclient.beta.vectorStores.files.retrieve(vectorStoreId, fileId, opts).withResponse();

        return finalResponse(result);
    }

    async list(
        vectorStoreId: string,
        _query?: FileListParams | RequestOptions,
        params?: ApiClientInterface,
        opts?: RequestOptions
      ): Promise<any> {
        const query: FileListParams | RequestOptions| undefined = _query;
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
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const result = await OAIclient.beta.vectorStores.files.list(vectorStoreId, query, opts).withResponse();

        return finalResponse(result);
    }

    async del(
        vectorStoreId: string,
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
          defaultHeaders: defaultHeadersBuilder(this.client),
        });
    
        const result = await OAIclient.beta.vectorStores.files.del(vectorStoreId, fileId, opts).withResponse();

        return finalResponse(result);
    }

    async createAndPoll(
        vectorStoreId: string,
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
          baseURL: this.client.baseURL,
          defaultHeaders: defaultHeadersBuilder(this.client),
        });

        const result = await OAIclient.beta.vectorStores
          .files.createAndPoll(vectorStoreId, body, opts);
        
        return result;
    }

    async poll(
        vectorStoreId: string,
        fileId: string,
        params?: ApiClientInterface,
        opts?: RequestOptions & { pollIntervalMs?: number }
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
    
        const result = await OAIclient.beta.vectorStores.files.poll(vectorStoreId, fileId, opts);

        return result;
    }

    async upload(
        vectorStoreId: string,
        file: Uploadable,
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
    
        const result = await OAIclient.beta.vectorStores.files.upload(vectorStoreId, file, opts);

        return result;
    }

    async uploadAndPoll(
        vectorStoreId: string,
        file: Uploadable,
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
    
        const result = await OAIclient.beta.vectorStores.files.uploadAndPoll(vectorStoreId, file, opts);

        return result;
    
    }
}

export class FileBatches extends ApiResource{

    async create(
        vectorStoreId: string,
        _body: FileBatchCreateParams,
        params?: ApiClientInterface,
        opts?: RequestOptions
    ): Promise<any> {
        const body: FileBatchCreateParams = _body;
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

        const result = await OAIclient.beta.vectorStores
          .fileBatches.create(vectorStoreId, body, opts)
          .withResponse();
        
        return finalResponse(result);
    }

    async retrieve(
        vectorStoreId: string,
        batchId: string,
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
    
        const result = await OAIclient.beta.vectorStores.fileBatches.retrieve(vectorStoreId, batchId, opts).withResponse();

        return finalResponse(result);
    }

    async cancel(
        vectorStoreId: string,
        batchId: string,
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
    
        const result = await OAIclient.beta.vectorStores.fileBatches.cancel(vectorStoreId, batchId, opts).withResponse();

        return finalResponse(result);
    
    }

    async createAndPoll(
        vectorStoreId: string,
        _body: FileBatchCreateParams,
        params?: ApiClientInterface,
        opts?: RequestOptions
    ): Promise<any> {
        const body: FileBatchCreateParams = _body;
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

        const result = await OAIclient.beta.vectorStores
          .fileBatches.createAndPoll(vectorStoreId, body, opts);
        
        return result;
    }

    async listFiles(
        vectorStoreId: string,
        batchId: string,
        _query?: FileBatchListFilesParams,
        params?: ApiClientInterface,
        opts?: RequestOptions
    ): Promise<any> {
        const query: FileBatchListFilesParams | undefined = _query;

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
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const result = await OAIclient.beta.vectorStores.fileBatches.listFiles(vectorStoreId, batchId, query, opts).withResponse();

        return finalResponse(result);
    }

    async poll(
        vectorStoreId: string,
        batchId: string,
        params?: ApiClientInterface,
        opts?: RequestOptions & { pollIntervalMs?: number }
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
    
        const result = await OAIclient.beta.vectorStores.fileBatches.poll(vectorStoreId, batchId, opts);

        return result;
    }

    async uploadAndPoll(
        vectorStoreId: string,
        { files, fileIds = [] }: { files: Uploadable[]; fileIds?: string[] },
        params?: ApiClientInterface,
        opts?: RequestOptions & { pollIntervalMs?: number; maxConcurrency?: number },
    ): Promise<any> {
        if(params){
            const config = overrideConfig(this.client.config, params.config);
            this.client.customHeaders = {
                ...this.client.customHeaders,
                ...createHeaders({ ...params, config }),
            }
        }

        const OAIclient = new OpenAI({
            apiKey: OPEN_AI_API_KEY,
            baseURL: this.client.baseURL,
            defaultHeaders: defaultHeadersBuilder(this.client),
        });

        const result = await OAIclient.beta.vectorStores.fileBatches.uploadAndPoll(vectorStoreId, { files, fileIds }, opts);
        return result;
    }
}



export interface ExpiresAfter {
  anchor: "last_active_at";
  days: number;
}

export interface VectorStoreCreateParams {
  expires_after?: ExpiresAfter;
  file_ids?: Array<string>;
  metadata?: unknown | null;
  name?: string;
}

export interface VectorStoreUpdateParams {
  expires_after?: ExpiresAfter | null;
  metadata?: unknown | null;
  name?: string | null;
}

export interface VectorStoreListParams extends CursorPageParams {
  before?: string;
  order?: "asc" | "desc";
}

export interface CursorPageParams {
  after?: string;

  limit?: number;
}


export interface FileCreateParams {
    file_id: string;
}

export interface FileListParams extends CursorPageParams {
    before?: string;
    filter?: 'in_progress' | 'completed' | 'failed' | 'cancelled';
    order?: 'asc' | 'desc';
  }

  export interface FileBatchCreateParams {
    file_ids: Array<string>;
  }

  export interface FileBatchListFilesParams extends CursorPageParams {
    before?: string;
    filter?: 'in_progress' | 'completed' | 'failed' | 'cancelled';
    order?: 'asc' | 'desc';
  }