import { ApiResource } from '../apiResource';
import { APIResponseType, ApiClientInterface } from '../_types/generalTypes';
import { APIPromise, RequestOptions } from '../baseClient';
import { createHeaders } from './createHeaders';
import { toQueryParams } from '../utils';

export interface AnalyticsBaseParams {
  time_of_generation_min: string;
  time_of_generation_max: string;
  total_units_min?: number;
  total_units_max?: number;
  cost_min?: number;
  cost_max?: number;
  prompt_token_min?: number;
  prompt_token_max?: number;
  completion_token_min?: number;
  completion_token_max?: number;
  status_code?: string;
  page_size?: number;
  weighted_feedback_min?: number;
  weighted_feedback_max?: number;
  order_by?: string;
  order_by_type?: string;
  virtual_keys?: string;
  configs?: string;
  workspace_slug?: string;
  api_key_ids?: string;
  ai_org_model?: string;
  metadata?: string;
  cache_status?: string;
}

export type AnalyticsGraphsGetParams = AnalyticsBaseParams;

export interface AnalyticsGroupsGetParams extends AnalyticsBaseParams {
  page_size?: number;
  current_page?: number;
}

export type AnalyticsGroupByValue =
  | 'ai_service'
  | 'model'
  | 'status_code'
  | 'api_key'
  | 'config'
  | 'workspace'
  | 'provider'
  | 'prompt';

export type AnalyticsColumnValue =
  | 'requests'
  | 'cost'
  | 'total_tokens'
  | 'avg_tokens'
  | 'avg_input_tokens'
  | 'avg_output_tokens'
  | 'avg_latency'
  | 'p95_latency'
  | 'p99_latency'
  | 'success_rate'
  | 'error_count'
  | 'cache_hit_rate'
  | 'last_seen'
  | 'first_seen';

export interface AnalyticsGroupedDataParams extends AnalyticsGroupsGetParams {
  columns?: string;
  include_total?: boolean;
}

export type AnalyticsSummaryGetParams = AnalyticsBaseParams;

export class Analytics extends ApiResource {
  graphs: AnalyticsGraphs;
  groups: AnalyticsGroups;
  summary: AnalyticsSummary;

  constructor(client: any) {
    super(client);
    this.graphs = new AnalyticsGraphs(client);
    this.groups = new AnalyticsGroups(client);
    this.summary = new AnalyticsSummary(client);
  }
}

export class AnalyticsGraphs extends ApiResource {
  requests(
    body: AnalyticsGraphsGetParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<APIResponseType> {
    const queryParams = toQueryParams(body);
    if (params) {
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params }),
      };
    }
    const response = this.getMethod(
      `/analytics/graphs/requests${queryParams}`,
      { ...opts }
    );
    return response;
  }

  cost(
    body: AnalyticsGraphsGetParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<APIResponseType> {
    const queryParams = toQueryParams(body);
    if (params) {
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params }),
      };
    }
    const response = this.getMethod(`/analytics/graphs/cost${queryParams}`, {
      ...opts,
    });
    return response;
  }

  latency(
    body: AnalyticsGraphsGetParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<APIResponseType> {
    const queryParams = toQueryParams(body);
    if (params) {
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params }),
      };
    }
    const response = this.getMethod(`/analytics/graphs/latency${queryParams}`, {
      ...opts,
    });
    return response;
  }

  tokens(
    body: AnalyticsGraphsGetParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<APIResponseType> {
    const queryParams = toQueryParams(body);
    if (params) {
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params }),
      };
    }
    const response = this.getMethod(`/analytics/graphs/tokens${queryParams}`, {
      ...opts,
    });
    return response;
  }

  users(
    body: AnalyticsGraphsGetParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<APIResponseType> {
    const queryParams = toQueryParams(body);
    if (params) {
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params }),
      };
    }
    const response = this.getMethod(`/analytics/graphs/users${queryParams}`, {
      ...opts,
    });
    return response;
  }

  usersRequests(
    body: AnalyticsGraphsGetParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<APIResponseType> {
    const queryParams = toQueryParams(body);
    if (params) {
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params }),
      };
    }
    const response = this.getMethod(
      `/analytics/graphs/users-requests${queryParams}`,
      {
        ...opts,
      }
    );
    return response;
  }

  errors(
    body: AnalyticsGraphsGetParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<APIResponseType> {
    const queryParams = toQueryParams(body);
    if (params) {
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params }),
      };
    }
    const response = this.getMethod(`/analytics/graphs/errors${queryParams}`, {
      ...opts,
    });
    return response;
  }

  errors_rate(
    body: AnalyticsGraphsGetParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<APIResponseType> {
    const queryParams = toQueryParams(body);
    if (params) {
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params }),
      };
    }
    const response = this.getMethod(
      `/analytics/graphs/errors-rate${queryParams}`,
      {
        ...opts,
      }
    );
    return response;
  }

  errors_stack(
    body: AnalyticsGraphsGetParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<APIResponseType> {
    const queryParams = toQueryParams(body);
    if (params) {
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params }),
      };
    }
    const response = this.getMethod(
      `/analytics/graphs/errors-stack${queryParams}`,
      {
        ...opts,
      }
    );
    return response;
  }

  errors_status_code(
    body: AnalyticsGraphsGetParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<APIResponseType> {
    const queryParams = toQueryParams(body);
    if (params) {
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params }),
      };
    }
    const response = this.getMethod(
      `/analytics/graphs/errors-status-code${queryParams}`,
      {
        ...opts,
      }
    );
    return response;
  }

  requests_rescued(
    body: AnalyticsGraphsGetParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<APIResponseType> {
    const queryParams = toQueryParams(body);
    if (params) {
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params }),
      };
    }
    const response = this.getMethod(
      `/analytics/graphs/requests-rescued${queryParams}`,
      {
        ...opts,
      }
    );
    return response;
  }

  cache_hit_rate(
    body: AnalyticsGraphsGetParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<APIResponseType> {
    const queryParams = toQueryParams(body);
    if (params) {
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params }),
      };
    }
    const response = this.getMethod(
      `/analytics/graphs/cache-hit-rate${queryParams}`,
      {
        ...opts,
      }
    );
    return response;
  }

  cache_latency(
    body: AnalyticsGraphsGetParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<APIResponseType> {
    const queryParams = toQueryParams(body);
    if (params) {
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params }),
      };
    }
    const response = this.getMethod(
      `/analytics/graphs/cache-latency${queryParams}`,
      {
        ...opts,
      }
    );
    return response;
  }

  feedbacks(
    body: AnalyticsGraphsGetParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<APIResponseType> {
    const queryParams = toQueryParams(body);
    if (params) {
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params }),
      };
    }
    const response = this.getMethod(
      `/analytics/graphs/feedbacks${queryParams}`,
      {
        ...opts,
      }
    );
    return response;
  }

  feedbacks_score(
    body: AnalyticsGraphsGetParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<APIResponseType> {
    const queryParams = toQueryParams(body);

    if (params) {
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params }),
      };
    }

    const response = this.getMethod(
      `/analytics/graphs/feedbacks/score${queryParams}`,
      {
        ...opts,
      }
    );

    return response;
  }

  feedbacks_weighted(
    body: AnalyticsGraphsGetParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<APIResponseType> {
    const queryParams = toQueryParams(body);

    if (params) {
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params }),
      };
    }

    const response = this.getMethod(
      `/analytics/graphs/feedbacks/weighted${queryParams}`,
      {
        ...opts,
      }
    );
    return response;
  }

  feedback_ai_models(
    body: AnalyticsGraphsGetParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<APIResponseType> {
    const queryParams = toQueryParams(body);

    if (params) {
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params }),
      };
    }

    const response = this.getMethod(
      `/analytics/graphs/feedbacks/ai-models${queryParams}`,
      {
        ...opts,
      }
    );
    return response;
  }
}

export class AnalyticsGroups extends ApiResource {
  users(
    body: AnalyticsGroupsGetParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<APIResponseType> {
    const queryParams = toQueryParams(body);
    if (params) {
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params }),
      };
    }
    const response = this.getMethod(`/analytics/groups/users${queryParams}`, {
      ...opts,
    });
    return response;
  }

  aiModels(
    body: AnalyticsGroupsGetParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<APIResponseType> {
    const queryParams = toQueryParams(body);
    if (params) {
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params }),
      };
    }
    const response = this.getMethod(
      `/analytics/groups/ai-models${queryParams}`,
      {
        ...opts,
      }
    );
    return response;
  }

  workspaces(
    body: AnalyticsGroupsGetParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<APIResponseType> {
    const queryParams = toQueryParams(body);
    if (params) {
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params }),
      };
    }
    const response = this.getMethod(
      `/analytics/groups/workspaces${queryParams}`,
      {
        ...opts,
      }
    );
    return response;
  }

  metadata(
    metadataKey: string,
    body: AnalyticsGroupsGetParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<APIResponseType> {
    const queryParams = toQueryParams(body);
    if (params) {
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params }),
      };
    }
    const response = this.getMethod(
      `/analytics/groups/metadata/${metadataKey}${queryParams}`,
      {
        ...opts,
      }
    );
    return response;
  }

  groupedData(
    groupBy: AnalyticsGroupByValue,
    body: AnalyticsGroupedDataParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<APIResponseType> {
    const queryParams = toQueryParams(body);
    if (params) {
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params }),
      };
    }
    const response = this.getMethod(
      `/analytics/groups/${groupBy}${queryParams}`,
      {
        ...opts,
      }
    );
    return response;
  }
}

export class AnalyticsSummary extends ApiResource {
  cache(
    body: AnalyticsSummaryGetParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<APIResponseType> {
    const queryParams = toQueryParams(body);
    if (params) {
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params }),
      };
    }
    const response = this.getMethod(`/analytics/summary/cache${queryParams}`, {
      ...opts,
    });
    return response;
  }
}
