import { CursorPageParams, Metadata } from '../_types/sharedTypes';
import { ApiClientInterface } from '../_types/generalTypes';
import { ApiResource } from '../apiResource';
import { RequestOptions } from '../baseClient';
import { finalResponse, initOpenAIClient, overrideConfig } from '../utils';
import { createHeaders } from './createHeaders';
import {
  ThreadCreateParams as oaiThreadCreateParams,
  ThreadUpdateParams as oaiThreadUpdateParams,
  ThreadCreateAndRunParams as oaiThreadCreateAndRunParams,
  AssistantToolChoiceOption,
} from 'openai/resources/beta/threads/threads';

export class Threads extends ApiResource {
  messages: Messages;
  runs: Runs;

  constructor(client: any) {
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

    const OAIclient = initOpenAIClient(this.client);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const result = await OAIclient.beta.threads
      .create(body as any, opts)
      .withResponse();

    return finalResponse(result);
  }

  async retrieve(
    threadID: string,
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

    const result = await OAIclient.beta.threads
      .retrieve(threadID, opts)
      .withResponse();

    return finalResponse(result);
  }

  async update(
    threadID: string,
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

    const OAIclient = initOpenAIClient(this.client);

    const result = await OAIclient.beta.threads
      .update(threadID, body, opts)
      .withResponse();

    return finalResponse(result);
  }

  async delete(
    threadID: string,
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

    const result = await OAIclient.beta.threads
      .delete(threadID, opts)
      .withResponse();

    return finalResponse(result);
  }

  async createAndRun(
    _body: ThreadCreateAndRunParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): Promise<any> {
    const body: ThreadCreateAndRunParams = _body;
    const { stream } = body;

    if (params) {
      const config = overrideConfig(this.client.config, params.config);
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params, config }),
      };
    }

    const OAIclient = initOpenAIClient(this.client);

    if (stream === true) {
      const streamResponse = await OAIclient.beta.threads.createAndRunStream(
        body as any,
        opts
      );
      return streamResponse;
    } else {
      const result = await OAIclient.beta.threads
        .createAndRun(body, opts)
        .withResponse();

      return finalResponse(result);
    }
  }

  async createAndRunPoll(
    _body: ThreadCreateAndRunParamsNonStreaming,
    params?: ApiClientInterface,
    opts?: RequestOptions & { pollIntervalMs?: number }
  ): Promise<any> {
    const body: ThreadCreateAndRunParamsNonStreaming = _body;
    if (params) {
      const config = overrideConfig(this.client.config, params.config);
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params, config }),
      };
    }

    const OAIclient = initOpenAIClient(this.client);

    const result = await OAIclient.beta.threads.createAndRunPoll(body, opts);
    return result;
  }

  async createAndRunStream(
    _body: ThreadCreateAndRunParamsBaseStream,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): Promise<any> {
    const body: ThreadCreateAndRunParamsBaseStream = _body;
    if (params) {
      const config = overrideConfig(this.client.config, params.config);
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params, config }),
      };
    }

    const OAIclient = initOpenAIClient(this.client);

    const result = await OAIclient.beta.threads.createAndRunStream(body, opts);
    return result;
  }
}

export class Messages extends ApiResource {
  async create(
    threadID: string,
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

    const OAIclient = initOpenAIClient(this.client);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const result = await OAIclient.beta.threads.messages
      .create(threadID, body as any, opts)
      .withResponse();

    return finalResponse(result);
  }

  async list(
    threadID: string,
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

    const OAIclient = initOpenAIClient(this.client);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const result = await OAIclient.beta.threads.messages
      .list(threadID, query as any, opts)
      .withResponse();

    return finalResponse(result);
  }

  async retrieve(
    messageID: string,
    { thread_id }: { thread_id: string },
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

    const result = await OAIclient.beta.threads.messages
      .retrieve(messageID, { thread_id }, opts)
      .withResponse();

    return finalResponse(result);
  }

  async update(
    messageID: string,
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

    const OAIclient = initOpenAIClient(this.client);

    const result = await OAIclient.beta.threads.messages
      .update(messageID, body, opts)
      .withResponse();

    return finalResponse(result);
  }

  async delete(
    messageID: string,
    { thread_id }: { thread_id: string },
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

    const result = await OAIclient.beta.threads.messages
      .delete(messageID, { thread_id }, opts)
      .withResponse();

    return finalResponse(result);
  }
}

export class Runs extends ApiResource {
  steps: Steps;

  constructor(client: any) {
    super(client);
    this.steps = new Steps(client);
  }

  async create(
    threadID: string,
    _body: RunCreateParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): Promise<any> {
    const body: RunCreateParams = _body;
    const { stream } = body;
    if (params) {
      const config = overrideConfig(this.client.config, params.config);
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params, config }),
      };
    }

    const OAIclient = initOpenAIClient(this.client);

    if (stream === true) {
      const streamResponse = await OAIclient.beta.threads.runs.stream(
        threadID,
        body as any,
        opts
      );
      return streamResponse;
    } else {
      const result = await OAIclient.beta.threads.runs
        .create(threadID, body, opts)
        .withResponse();

      return finalResponse(result);
    }
  }

  async list(
    threadID: string,
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

    const OAIclient = initOpenAIClient(this.client);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const result = await OAIclient.beta.threads.runs
      .list(threadID, query as any, opts)
      .withResponse();

    return finalResponse(result);
  }

  async retrieve(
    runID: string,
    { thread_id }: { thread_id: string },
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

    const result = await OAIclient.beta.threads.runs
      .retrieve(runID, { thread_id }, opts)
      .withResponse();

    return finalResponse(result);
  }

  async update(
    runID: string,
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

    const OAIclient = initOpenAIClient(this.client);

    const result = await OAIclient.beta.threads.runs
      .update(runID, body, opts)
      .withResponse();

    return finalResponse(result);
  }

  async submitToolOutputs(
    runID: string,
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

    const OAIclient = initOpenAIClient(this.client);

    const result = await OAIclient.beta.threads.runs
      .submitToolOutputs(runID, body, opts)
      .withResponse();

    return finalResponse(result);
  }

  async submitToolOutputsAndPoll(
    runId: string,
    _body: RunSubmitToolOutputsParamsNonStreaming,
    params?: ApiClientInterface,
    opts?: RequestOptions & { pollIntervalMs?: number }
  ): Promise<any> {
    const body: RunSubmitToolOutputsParamsNonStreaming = _body;
    if (params) {
      const config = overrideConfig(this.client.config, params.config);
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params, config }),
      };
    }

    const OAIclient = initOpenAIClient(this.client);

    const result = await OAIclient.beta.threads.runs.submitToolOutputsAndPoll(
      runId,
      body,
      opts
    );
    return result;
  }

  async submitToolOutputsStream(
    runId: string,
    _body: RunSubmitToolOutputsParamsStreaming,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): Promise<any> {
    const body: RunSubmitToolOutputsParamsStreaming = _body;
    if (params) {
      const config = overrideConfig(this.client.config, params.config);
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params, config }),
      };
    }

    const OAIclient = initOpenAIClient(this.client);

    const result = await OAIclient.beta.threads.runs.submitToolOutputsStream(
      runId,
      body,
      opts
    );
    return result;
  }

  async cancel(
    runID: string,
    { thread_id }: { thread_id: string },
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
    const body = {};
    const options = { body, ...opts };

    const result = await OAIclient.beta.threads.runs
      .cancel(runID, { thread_id }, options)
      .withResponse();

    return finalResponse(result);
  }

  async createAndPoll(
    threadId: string,
    _body: RunCreateParamsNonStreaming,
    params?: ApiClientInterface,
    opts?: RequestOptions & { pollIntervalMs?: number }
  ): Promise<any> {
    const body: RunCreateParamsNonStreaming = _body;
    if (params) {
      const config = overrideConfig(this.client.config, params.config);
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params, config }),
      };
    }

    const OAIclient = initOpenAIClient(this.client);

    const result = await OAIclient.beta.threads.runs.createAndPoll(
      threadId,
      body,
      opts
    );
    return result;
  }

  async createAndStream(
    threadId: string,
    _body: RunCreateParamsBaseStream,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): Promise<any> {
    const body: RunCreateParamsBaseStream = _body;
    if (params) {
      const config = overrideConfig(this.client.config, params.config);
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params, config }),
      };
    }

    const OAIclient = initOpenAIClient(this.client);

    const result = await OAIclient.beta.threads.runs.createAndStream(
      threadId,
      body,
      opts
    );
    return result;
  }

  async poll(
    runId: string,
    { thread_id }: { thread_id: string },
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

    const OAIclient = initOpenAIClient(this.client);

    const result = await OAIclient.beta.threads.runs.poll(
      runId,
      { thread_id },
      opts
    );
    return result;
  }

  async stream(
    threadId: string,
    _body: RunCreateParamsBaseStream,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): Promise<any> {
    const body: RunCreateParamsBaseStream = _body;
    if (params) {
      const config = overrideConfig(this.client.config, params.config);
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params, config }),
      };
    }

    const OAIclient = initOpenAIClient(this.client);

    const result = await OAIclient.beta.threads.runs.stream(
      threadId,
      body,
      opts
    );
    return result;
  }
}

export class Steps extends ApiResource {
  async list(
    runID: string,

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

    const OAIclient = initOpenAIClient(this.client);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const result = await OAIclient.beta.threads.runs.steps
      .list(runID, query as any, opts)
      .withResponse();

    return finalResponse(result);
  }

  async retrieve(
    stepID: string,
    {
      thread_id,
      run_id,
    }: {
      thread_id: string;
      run_id: string;
    },
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

    const result = await OAIclient.beta.threads.runs.steps
      .retrieve(stepID, { thread_id, run_id }, opts)
      .withResponse();

    return finalResponse(result);
  }
}

export interface ThreadCreateParams {
  messages?: Array<Message>;
  metadata?: unknown | null;
  tool_resources?: oaiThreadCreateParams.ToolResources | null;
  [key: string]: any;
}

export interface Message {
  content: string;
  role: string;
  file_ids?: Array<string>;
  metadata?: unknown | null;
}

export interface ThreadUpdateParams {
  metadata?: Metadata | null;
  tool_resources?: oaiThreadUpdateParams.ToolResources | null;
  [key: string]: any;
}

export interface MessageCreateParams {
  content: string;
  role: string;
  file_ids?: Array<string>;
  attachments?: Array<any> | null;
  metadata?: unknown | null;
  [key: string]: any;
}

export interface MessageListParams extends CursorPageParams {
  order?: string;
  before?: string;
  run_id?: string;
  [key: string]: any;
}

export interface FileListParams extends CursorPageParams {
  before?: string;
  order?: string;
}

export interface MessageUpdateParams {
  metadata?: Metadata | null;
  thread_id: string;
  [key: string]: any;
}

export interface RunCreateParams {
  assistant_id: string;
  additional_instructions?: string | null;
  instructions?: string | null;
  metadata?: Metadata | null;
  model?: string | null;
  tools?: Array<any> | null;
  stream?: boolean | null;
  include?: Array<any>;
  additional_messages?: Array<any> | null;
  max_completion_tokens?: number | null;
  max_prompt_tokens?: number | null;
  parallel_tool_calls?: boolean;
  response_format?: any | null;
  temperature?: number | null;
  tool_choice?: any | null;
  top_p?: number | null;
  truncation_strategy?: any | null;
  [key: string]: any;
}

export interface RunCreateParamsNonStreaming extends RunCreateParams {
  stream?: false | null;
}

export interface ThreadCreateAndRunParams {
  assistant_id: string;
  instructions?: string | null;
  metadata?: Metadata | null;
  model?: string | null;
  thread?: any;
  tools?: Array<any> | null;
  stream?: boolean | null;
  max_completion_tokens?: number | null;
  max_prompt_tokens?: number | null;
  parallel_tool_calls?: boolean;
  response_format?: any | null;
  temperature?: number | null;
  tool_choice?: AssistantToolChoiceOption | null;
  tool_resources?: oaiThreadCreateAndRunParams.ToolResources | null;
  top_p?: number | null;
  truncation_strategy?: oaiThreadCreateAndRunParams.TruncationStrategy | null;
  [key: string]: any;
}

export interface ThreadCreateAndRunParamsNonStreaming
  extends ThreadCreateAndRunParams {
  stream?: false | null;
}

export type ThreadCreateAndRunParamsBaseStream = Omit<
  ThreadCreateAndRunParams,
  'stream'
> & {
  stream?: true;
  assistant_id: string;
};

export interface RunListParams extends CursorPageParams {
  before?: string;
  order?: string;
}

export interface StepListParams extends CursorPageParams {
  before?: string;
  order?: string;
  include?: Array<any>;
  thread_id: string;
  [key: string]: any;
}

export interface RunUpdateParams {
  metadata?: Metadata | null;
  thread_id: string;
  [key: string]: any;
}

export interface RunSubmitToolOutputsParams {
  tool_outputs: Array<ToolOutput>;
  thread_id: string;
  [key: string]: any;
}

export interface ToolOutput {
  output?: string;
  tool_call_id?: string;
}

export type RunCreateParamsBaseStream = Omit<RunCreateParams, 'stream'> & {
  stream?: true;
  assistant_id: string;
};

export interface RunSubmitToolOutputsParamsNonStreaming
  extends RunSubmitToolOutputsParams {
  stream?: false | null;
}

export interface RunSubmitToolOutputsParamsStreaming
  extends RunSubmitToolOutputsParams {
  stream: true;
}
