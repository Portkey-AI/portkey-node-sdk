import { PROMPT_PARTIALS_API, PROMPTS_API } from '../constants';
import { APIResponseType, ApiClientInterface } from '../_types/generalTypes';
import { ModelParams } from '../_types/portkeyConstructs';
import { ApiResource } from '../apiResource';
import { APIPromise, RequestOptions } from '../baseClient';
import { Stream } from '../streaming';
import { overrideConfig, toQueryParams } from '../utils';
import { createHeaders } from './createHeaders';

export class Generations extends ApiResource {
  create(
    _body: GenerationsBody,
    opts?: RequestOptions
  ): APIPromise<Generation> {
    const warning =
      'This API has been deprecated. Please use the Prompt API for the saved prompt.';
    console.warn(warning); // eslint-disable-line no-console
    const body = { variables: _body.variables };
    return this.post<Generation>(`/v1/prompts/${_body.promptID}/generate`, {
      body,
      ...opts,
    });
  }
}

export interface GenerationsBody extends ModelParams {
  promptID: string;
  variables?: Record<string, any>;
}

export interface Generation extends APIResponseType {
  success: boolean;
  data: Record<string, any>;
}

export interface PromptBodyBase extends ModelParams {
  promptID?: string;
  variables?: Record<string, any>;
}

export interface PromptsCreateStreaming extends PromptBodyBase {
  stream?: true;
}

export interface PromptsCreateNonStreaming extends PromptBodyBase {
  stream?: false;
}

export interface Functions {
  name?: string;
  description?: string;
  parameters?: object;
}

export interface Tool {
  function?: Functions;
  type?: string;
}

export interface Messages {
  content?: string;
  role?: string;
}

export type PromptsCreateParams =
  | PromptsCreateNonStreaming
  | PromptsCreateStreaming;

type PromptsResponse = Record<string, any> & APIResponseType;

type PromptRenderResponse = {
  success: boolean;
  data: {
    messages?: Messages[];
    prompt?: string;
    model?: string;
    stream?: boolean;
    suffix?: string;
    max_tokens?: number;
    temperature?: number;
    top_k?: number;
    top_p?: number;
    n?: number;
    stop_sequences?: string[];
    functions?: Functions[];
    function_call?: string | Functions;
    logprobs?: boolean;
    top_logprobs?: number;
    echo?: boolean;
    stop?: string | string[];
    presence_penalty?: number;
    frequency_penalty?: number;
    best_of?: number;
    logit_bias?: { [key: string]: number };
    user?: string;
    organization?: string;
    tool_choice?: string;
    tools?: Tool[];
    response_format?: object;
    seed?: number;
  };
} & APIResponseType;

export interface PromptsCreateBody {
  name: string;
  collection_id: string;
  string: string;
  parameters: object;
  virtual_key?: string;
  model?: string;
  functions?: any[];
  tools?: any[];
  tool_choice?: object;
  version_description?: string;
  template_metadata?: object;
}

export interface PromptsUpdateBody {
  name?: string;
  collection_id?: string;
  string?: string;
  parameters?: object;
  virtual_key?: string;
  model?: string;
  functions?: any[];
  tools?: any[];
  tool_choice?: object;
  version_description?: string;
  template_metadata?: object;
}

export interface PromptsListQuery {
  collection_id?: string;
  workspace_id?: string;
  current_page?: number;
  page_size?: number;
  search?: string;
}

export interface PromptsPartialsCreateBody {
  name: string;
  string: string;
  workspace_id?: string;
  version_description?: string;
}

export interface PromptsPartialUpdateBody {
  name?: string;
  string?: string;
  description?: string;
  status?: string;
}

export interface PromptsPartialsListQuery {
  collection_id?: string;
}

export class Prompt extends ApiResource {
  completions: PromptCompletions;
  versions: PromptVersions;
  partials: Partials;

  constructor(client: any) {
    super(client);
    this.completions = new PromptCompletions(client);
    this.versions = new PromptVersions(client);
    this.partials = new Partials(client);
  }

  render(
    _body: PromptsCreateParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<PromptRenderResponse> {
    const body = _body;
    const promptId = _body.promptID;

    if (params) {
      const config = overrideConfig(this.client.config, params.config);
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params, config }),
      };
    }
    const response = this.post<PromptRenderResponse>(
      `/prompts/${promptId}/render`,
      { body, ...opts }
    );
    return response;
  }

  create(
    _body: PromptsCreateBody,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<PromptsResponse> {
    const body = _body;
    if (params) {
      const config = overrideConfig(this.client.config, params.config);
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params, config }),
      };
    }
    const response = this.post<PromptsResponse>(PROMPTS_API, {
      body,
      ...opts,
    });
    return response;
  }

  list(
    _query?: PromptsListQuery,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<PromptsResponse> {
    const query = _query ? toQueryParams(_query) : '';
    if (params) {
      const config = overrideConfig(this.client.config, params.config);
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params, config }),
      };
    }

    const response = this.getMethod<PromptsResponse>(`${PROMPTS_API}${query}`, {
      ...opts,
    });
    return response;
  }

  retrieve(
    promptSlug: string,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<PromptsResponse> {
    if (params) {
      const config = overrideConfig(this.client.config, params.config);
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params, config }),
      };
    }
    const response = this.getMethod<PromptsResponse>(
      `${PROMPTS_API}/${promptSlug}`,
      { ...opts }
    );
    return response;
  }

  update(
    promptSlug: string,
    _body: PromptsUpdateBody,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<PromptsResponse> {
    const body = _body;
    if (params) {
      const config = overrideConfig(this.client.config, params.config);
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params, config }),
      };
    }
    const response = this.put<PromptsResponse>(`${PROMPTS_API}/${promptSlug}`, {
      body,
      ...opts,
    });
    return response;
  }

  delete(
    promptSlug: string,
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
    const response = this.deleteMethod<any>(`${PROMPTS_API}/${promptSlug}`, {
      ...opts,
    });
    return response;
  }

  publish(
    promptSlug: string,
    body: {
      version: number;
    },
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
    const response = this.put<any>(`${PROMPTS_API}/${promptSlug}/makeDefault`, {
      body,
      ...opts,
    });
    return response;
  }
}

export class PromptVersions extends ApiResource {
  list(
    promptSlug: string,
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
    const response = this.getMethod<any>(
      `${PROMPTS_API}/${promptSlug}/versions`,
      { ...opts }
    );
    return response;
  }

  retrieve(
    promptSlug: string,
    versionId: string,
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
    const response = this.getMethod<any>(
      `${PROMPTS_API}/${promptSlug}/versions/${versionId}`,
      { ...opts }
    );
    return response;
  }

  update(
    promptSlug: string,
    versionId: string,
    body?: {
      label_id?: string;
    },
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
    const response = this.put<any>(
      `${PROMPTS_API}/${promptSlug}/versions/${versionId}`,
      { body, ...opts }
    );
    return response;
  }
}

export class Partials extends ApiResource {
  versions: PromptPartialsVersions;

  constructor(client: any) {
    super(client);
    this.versions = new PromptPartialsVersions(client);
  }

  create(
    _body: PromptsPartialsCreateBody,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<PromptsResponse> {
    const body = _body;
    if (params) {
      const config = overrideConfig(this.client.config, params.config);
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params, config }),
      };
    }
    const response = this.post<PromptsResponse>(`${PROMPT_PARTIALS_API}`, {
      body,
      ...opts,
    });
    return response;
  }

  list(
    _query?: PromptsPartialsListQuery,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<any> {
    const query = _query ? toQueryParams(_query) : '';
    if (params) {
      const config = overrideConfig(this.client.config, params.config);
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params, config }),
      };
    }
    const response = this.getMethod<any>(`${PROMPT_PARTIALS_API}${query}`, {
      ...opts,
    });
    return response;
  }

  retrieve(
    promptPartialSlug: string,
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
    const response = this.getMethod<any>(
      `${PROMPT_PARTIALS_API}/${promptPartialSlug}`,
      {
        ...opts,
      }
    );
    return response;
  }

  update(
    promptPartialSlug: string,
    body: PromptsPartialUpdateBody,
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
    const response = this.put<any>(
      `${PROMPT_PARTIALS_API}/${promptPartialSlug}`,
      { body, ...opts }
    );
    return response;
  }

  delete(
    promptPartialSlug: string,
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
    const response = this.deleteMethod<any>(
      `${PROMPT_PARTIALS_API}/${promptPartialSlug}`,
      { ...opts }
    );
    return response;
  }

  publish(
    promptPartialSlug: string,
    body: {
      version: number;
    },
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
    const response = this.put<any>(
      `${PROMPT_PARTIALS_API}/${promptPartialSlug}/makeDefault`,
      { body, ...opts }
    );
    return response;
  }
}

export class PromptPartialsVersions extends ApiResource {
  list(
    promptPartialSlug: string,
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
    const response = this.getMethod<any>(
      `${PROMPT_PARTIALS_API}/${promptPartialSlug}/versions`,
      { ...opts }
    );
    return response;
  }
}

export class PromptCompletions extends ApiResource {
  create(
    _body: PromptsCreateNonStreaming,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<PromptsResponse>;
  create(
    _body: PromptsCreateStreaming,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<Stream<PromptsResponse>>;
  create(
    _body: PromptsCreateParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<Stream<PromptsResponse> | PromptsResponse>;
  create(
    _body: PromptsCreateParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<PromptsResponse> | APIPromise<Stream<PromptsResponse>> {
    if (params) {
      const config = overrideConfig(this.client.config, params.config);
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params, config }),
      };
    }
    const promptId = _body.promptID;
    const body = _body;
    const stream = _body.stream ?? false;
    delete body.promptID;
    body.stream = stream;
    const response = this.post<PromptsResponse>(
      `/prompts/${promptId}/completions`,
      { body, ...opts, stream }
    ) as APIPromise<PromptsResponse> | APIPromise<Stream<PromptsResponse>>;
    return response;
  }
}
