import { PROVIDERS_API } from '../constants';
import { ApiResource } from '../apiResource';
import { APIResponseType, ApiClientInterface } from '../_types/generalTypes';
import { APIPromise, RequestOptions } from '../baseClient';
import { createHeaders } from './createHeaders';
import { toQueryParams } from '../utils';

export interface ProvidersListParams {
  current_page?: number;
  page_size?: number;
  workspace_id?: string;
}

export interface ProvidersListResponse extends APIResponseType {
  object?: string;
  total?: number;
  data?: ProvidersResponse[];
}

export interface ProvidersCreateParams {
  name: string;
  integration_id: string;
  workspace_id?: string;
  slug?: string;
  note?: string;
  usage_limits?: Record<string, any>;
  rate_limits?: Record<string, any>;
  expires_at?: string;
}

export interface ProvidersCreateResponse extends APIResponseType {
  id?: string;
  slug?: string;
}

export interface ProvidersGetParams {
  slug: string;
  workspace_id?: string;
}

export interface ProvidersResponse extends APIResponseType {
  id?: string;
  slug?: string;
  name?: string;
  note?: string;
  integration_id?: string;
  workspace_id?: string;
  usage_limits?: Record<string, any>;
  rate_limits?: any[];
  expires_at?: string;
  created_at?: Date;
  last_updated_at?: Date;
}

export interface ProvidersUpdateParams {
  slug: string;
  workspace_id?: string;
  name?: string;
  note?: string;
  usage_limits?: Record<string, any>;
  rate_limits?: Record<string, any>;
  expires_at?: string;
  reset_usage?: boolean;
}

export interface ProvidersUpdateResponse extends APIResponseType {
  id?: string;
  slug?: string;
}

export interface ProvidersDeleteParams {
  slug: string;
  workspace_id?: string;
}

export class Providers extends ApiResource {
  list(
    _body?: ProvidersListParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<ProvidersListResponse> {
    const body = _body;
    if (params) {
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params }),
      };
    }
    const query = body ? toQueryParams(body) : '';
    const response = this.getMethod<ProvidersListResponse>(
      `${PROVIDERS_API}${query}`,
      {
        ...opts,
      }
    );
    return response;
  }

  create(
    _body: ProvidersCreateParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<ProvidersCreateResponse> {
    const body = _body;
    if (params) {
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params }),
      };
    }
    const response = this.post<ProvidersCreateResponse>(PROVIDERS_API, {
      body,
      ...opts,
    });
    return response;
  }

  retrieve(
    _body: ProvidersGetParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<ProvidersResponse> {
    const { slug, ...queryParams } = _body;
    if (params) {
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params }),
      };
    }
    const query = toQueryParams(queryParams);
    const response = this.getMethod<ProvidersResponse>(
      `${PROVIDERS_API}/${slug}${query}`,
      {
        ...opts,
      }
    );
    return response;
  }

  update(
    _body: ProvidersUpdateParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<ProvidersUpdateResponse> {
    const { slug, ...restBody } = _body;
    if (params) {
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params }),
      };
    }
    const response = this.put<ProvidersUpdateResponse>(
      `${PROVIDERS_API}/${slug}`,
      {
        body: restBody,
        ...opts,
      }
    );
    return response;
  }

  delete(
    _body: ProvidersDeleteParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<any> {
    const { slug, ...queryParams } = _body;
    if (params) {
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params }),
      };
    }
    const query = toQueryParams(queryParams);
    const response = this.deleteMethod<any>(
      `${PROVIDERS_API}/${slug}${query}`,
      {
        ...opts,
      }
    );
    return response;
  }
}
