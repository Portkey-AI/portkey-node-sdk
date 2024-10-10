import { ApiResource } from '../apiResource';
import { APIResponseType, ApiClientInterface } from '../_types/generalTypes';
import { APIPromise, RequestOptions } from '../baseClient';
import { createHeaders } from './createHeaders';
import { toQueryParams } from '../utils';

export interface VirtualKeysAddParams {
  name?: string;
  provider?: string;
  key?: string;
  note?: string | null;
  apiVersion?: string | null;
  resourceName?: string | null;
  deploymentName?: string | null;
  workspace_id?: string;
  usage_limits?: Record<string, any>;
  [key: string]: any;
}
export interface VirtualKeysAddResponse extends APIResponseType {
  id?: string;
  slug?: string;
  object?: string;
}
export interface VirtualKeysGetParams {
  slug?: string;
}

export interface VirtualKeysGetResponse extends APIResponseType {
  id?: string;
  ai_provider_name?: string;
  model_config?: Record<string, any>;
  masked_api_key?: string;
  slug?: string;
  name?: string;
  usage_limits?: Record<string, any>;
  status?: string;
  note?: null | string;
  created_at?: Date;
  rate_limits?: Record<string, any>[];
  object?: string;
}
export interface VirtualKeysListParams {
  workspace_id?: string;
}
export interface VirtualKeysListResponse extends APIResponseType {
  object?: string;
  total?: number;
  data?: VirtualKeysGetResponse[];
}

export interface VirtualKeysUpdateParams {
  slug?: string;
  name?: string;
  key?: string;
  note?: string | null;
  usage_limits?: Record<string, any>;
  rate_limits?: Record<string, any>[];
  [key: string]: any;
}
export interface VirtualKeysUpdateResponse extends APIResponseType {
  id?: string;
  slug?: string;
  object?: string;
}
export interface VirtualKeysDeleteParams {
  slug?: string;
}

export class VirtualKeys extends ApiResource {
  create(
    body: VirtualKeysAddParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<VirtualKeysAddResponse> {
    if (params) {
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params }),
      };
    }
    const response = this.post<VirtualKeysAddResponse>('/virtual-keys', {
      body,
      ...opts,
    });
    return response;
  }

  list(
    _body?: VirtualKeysListParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<VirtualKeysListResponse> {
    const body = _body;
    if (params) {
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params }),
      };
    }
    const query = toQueryParams(body);
    const response = this.getMethod<VirtualKeysListResponse>(
      `/virtual-keys${query}`,
      { ...opts }
    );
    return response;
  }

  retrieve(
    body: VirtualKeysGetParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<VirtualKeysGetResponse> {
    const { slug } = body;
    if (params) {
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params }),
      };
    }
    const response = this.getMethod<VirtualKeysGetResponse>(
      `/virtual-keys/${slug}`,
      { ...opts }
    );
    return response;
  }

  update(
    body: VirtualKeysUpdateParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<VirtualKeysUpdateResponse> {
    const { slug, ...restBody } = body;
    if (params) {
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params }),
      };
    }
    const response = this.put<VirtualKeysUpdateResponse>(
      `/virtual-keys/${slug}`,
      { body: restBody, ...opts }
    );
    return response;
  }

  delete(
    body: VirtualKeysDeleteParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<any> {
    const { slug } = body;
    if (params) {
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params }),
      };
    }
    const response = this.deleteMethod<any>(`/virtual-keys/${slug}`, {
      ...opts,
    });
    return response;
  }
}
