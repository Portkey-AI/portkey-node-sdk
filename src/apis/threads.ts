import { threadId } from "worker_threads";
import { ApiClientInterface } from "../_types/generalTypes";
import { ApiResource } from "../apiResource";
import { RequestOptions } from "../baseClient";
import { OPEN_AI_API_KEY } from "../constants";
import { finalResponse, overrideConfig } from "../utils";
import { createHeaders } from "./createHeaders";
import OpenAI from "openai";


export class Threads extends ApiResource {
    
    messages: Messages;
    runs: Runs

    constructor(client:any) {
        super(client);
        this.messages = new Messages(client);
        this.runs = new Runs(client);
    }

    async create(
        _body: ThreadCreateParams,
        params?: ApiClientInterface,
        opts?: RequestOptions
      ): Promise<any> {
        const body: ThreadCreateParams = _body;
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
        // @ts-ignore
        const result = await OAIclient.beta.threads.create(body, opts).withResponse();

        return finalResponse(result);
    }

    async retrieve(
        threadId: string,
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
    
        const result = await OAIclient.beta.threads.retrieve(threadId, opts).withResponse();

        return finalResponse(result);
    }

    async update(
        threadId: string,
        _body: ThreadUpdateParams,
        params?: ApiClientInterface,
        opts?: RequestOptions
      ): Promise<any> {
        const body: ThreadUpdateParams = _body;
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
    
        const result = await OAIclient.beta.threads.update(threadId, body, opts).withResponse();

        return finalResponse(result);
    }
    
    async del(
        threadId: string,
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
    
        const result = await OAIclient.beta.threads.del(threadId, opts).withResponse();

        return finalResponse(result);
    }

    async createAndRun(
        _body: ThreadCreateAndRunParams,
        params?: ApiClientInterface,
        opts?: RequestOptions
      ): Promise<any> {
        const body: ThreadCreateAndRunParams = _body;
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
    
        const result = await OAIclient.beta.threads.createAndRun(body, opts).withResponse();

        return finalResponse(result);
    }

}


export class Messages extends ApiResource{

    files: Files;

    constructor(client:any) {
        super(client);
        this.files = new Files(client);
    }

    async create(
        threadId: string,
        _body: MessageCreateParams,
        params?: ApiClientInterface,
        opts?: RequestOptions
      ): Promise<any> {
        const body: MessageCreateParams = _body;
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
        // @ts-ignore
        const result = await OAIclient.beta.threads.messages.create(threadId, body, opts).withResponse();

        return finalResponse(result);
    }

    async list(
        threadId: string,
        _query?: MessageListParams,
        params?: ApiClientInterface,
        opts?: RequestOptions
      ): Promise<any> {
        const query: MessageListParams | undefined = _query;
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
        // @ts-ignore
        const result = await OAIclient.beta.threads.messages.list(threadId, query, opts).withResponse();
        
        return finalResponse(result);
    }

    async retrieve(
        threadId: string,
        messageId: string,
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
    
        const result = await OAIclient.beta.threads.messages.retrieve(threadId, messageId, opts).withResponse();

        return finalResponse(result);

    }

    async update(
        threadId: string,
        messageId: string,
        _body: MessageUpdateParams,
        params?: ApiClientInterface,
        opts?: RequestOptions
      ): Promise<any> {
        const body: MessageUpdateParams = _body;
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
    
        const result = await OAIclient.beta.threads.messages.update(threadId, messageId, body, opts).withResponse();

        return finalResponse(result);
    }


}

export class Files extends ApiResource{

    async list(
        threadId: string,
        messageId: string,
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
          baseURL: this.client.baseURL,
          defaultHeaders: {...this.client.customHeaders, ...this.client.portkeyHeaders},
        });
        // @ts-ignore
        const result = await OAIclient.beta.threads.messages.files.list(threadId, messageId, query, opts).withResponse();

        return finalResponse(result);
    }

    async retrieve(
        threadId: string,
        messageId: string,
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
    
        const result = await OAIclient.beta.threads.messages.files.retrieve(threadId, messageId, fileId, opts).withResponse();

        return finalResponse(result);
    }

}


export class Runs extends ApiResource{

    steps: Steps;

    constructor(client:any) {
        super(client);
        this.steps = new Steps(client);
    }

    async create(
        threadId: string,
        _body: RunCreateParams,
        params?: ApiClientInterface,
        opts?: RequestOptions
      ): Promise<any> {
        const body: RunCreateParams = _body;
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
    
        const result = await OAIclient.beta.threads.runs.create(threadId, body, opts).withResponse();

        return finalResponse(result);
    }

    async list(
        threadId: string,
        _query?: RunListParams,
        params?: ApiClientInterface,
        opts?: RequestOptions
      ): Promise<any> {
        const query: RunListParams | undefined = _query;
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
        // @ts-ignore
        const result = await OAIclient.beta.threads.runs.list(threadId, query, opts).withResponse();

        return finalResponse(result);
    }

    async retrieve(
        threadId: string,
        runId: string,
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
    
        const result = await OAIclient.beta.threads.runs.retrieve(threadId, runId, opts).withResponse();

        return finalResponse(result);
    }

    async update(
        threadId: string,
        runId: string,
        _body: RunUpdateParams,
        params?: ApiClientInterface,
        opts?: RequestOptions
      ): Promise<any> {
        const body: RunUpdateParams = _body;
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
    
        const result = await OAIclient.beta.threads.runs.update(threadId, runId, body, opts).withResponse();

        return finalResponse(result);
    }

    async submitToolOutputs(
        threadId: string,
        runId: string,
        _body: RunSubmitToolOutputsParams,
        params?: ApiClientInterface,
        opts?: RequestOptions
      ): Promise<any> {
        const body: RunSubmitToolOutputsParams = _body;
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
    
        const result = await OAIclient.beta.threads.runs.submitToolOutputs(threadId, runId, body, opts).withResponse();

        return finalResponse(result);
    }

    async cancel(
        threadId: string,
        runId: string,
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
    
        const result = await OAIclient.beta.threads.runs.cancel(threadId, runId, opts).withResponse();

        return finalResponse(result);
    }

}

export class Steps extends ApiResource{

    async list(
        threadId: string,
        runId: string,
        _query?: StepListParams,
        params?: ApiClientInterface,
        opts?: RequestOptions
      ): Promise<any> {
        const query: StepListParams | undefined = _query;
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
        // @ts-ignore
        const result = await OAIclient.beta.threads.runs.steps.list(threadId, runId, query, opts).withResponse();

        return finalResponse(result);
    } 
    
    async retrieve(
        threadId: string,
        runId: string,
        stepId: string,
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
    
        const result = await OAIclient.beta.threads.runs.steps.retrieve(threadId, runId, stepId, opts).withResponse();

        return finalResponse(result);
    }

}



export interface ThreadCreateParams {
    messages?: Array<ThreadCreateParams.Message>;
    metadata?: unknown | null;
}

export namespace ThreadCreateParams {
    export interface Message {
      content: string;
      role: string;
      file_ids?: Array<string>;
      metadata?: unknown | null;
    }
}

export interface ThreadUpdateParams {
    metadata?: unknown | null;
}

export interface MessageCreateParams {
    content: string;
    role: string;
    file_ids?: Array<string>;
    metadata?: unknown | null;
}

export interface MessageListParams extends CursorPageParams {
    order?: string;
}

export interface CursorPageParams {
    after?: string;
  
    limit?: number;
}

export interface FileListParams extends CursorPageParams {
    before?: string;
    order?: string;
}

export interface MessageUpdateParams {
    metadata?: unknown | null;
}

export interface RunCreateParams {
    assistant_id: string;
    additional_instructions?: string | null;
    instructions?: string | null;
    metadata?: unknown | null;
    model?: string | null;
    tools?: Array<any> | null;
}

export interface ThreadCreateAndRunParams {

    assistant_id: string;
    instructions?: string | null;
    metadata?: unknown | null;
    model?: string | null;
    thread?: any;
    tools?: Array<any> | null;
}

export interface RunListParams extends CursorPageParams {
    before?: string;
    order?: string;
}

export interface StepListParams extends CursorPageParams {
    before?: string;
    order?: string;
}

export interface RunUpdateParams {
    metadata?: unknown | null;
}

export interface RunSubmitToolOutputsParams {
    tool_outputs: Array<RunSubmitToolOutputsParams.ToolOutput>;
}

export namespace RunSubmitToolOutputsParams {
    export interface ToolOutput {
      output?: string;
      tool_call_id?: string;
    }
}