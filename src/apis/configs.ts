import { ApiResource } from '../apiResource';
import { APIResponseType, ApiClientInterface } from '../_types/generalTypes';
import { APIPromise, RequestOptions } from '../baseClient';
import { createHeaders } from './createHeaders';
import { toQueryParams } from '../utils';

export interface ConfigsAddParams {
  name?: string;
  config?: Record<string, any>;
  isDefault?: number;
  workspace_id?: string;
}
export interface ConfigsAddResponse extends APIResponseType {
  id?: string;
  version_id?: string;
  slug?: string;
  object?: string;
}
export interface ConfigsGetParams {
  slug?: string;
}
export interface ConfigsGetResponse extends APIResponseType {
  id?: string;
  name?: string;
  workspace_id?: string;
  slug?: string;
  organization_id?: string;
  is_default?: number;
  status?: string;
  owner_id?: string;
  created_at?: string;
  updated_by?: string;
  last_updated_at?: string;
  config?: Record<string, any>;
  format?: string;
  type?: string;
  version_id?: string;
  object?: string;
}
export interface CongfigsListParams {
  workspace_id?: string;
}
export interface ConfigsListResponse extends APIResponseType {
  object?: boolean;
  total?: number;
  data?: Record<string, any>[];
}
export interface ConfigsUpdateParams {
  slug?: string;
  name?: string;
  config?: Record<string, any>;
  status?: string;
}
export interface ConfigsUpdateResponse extends APIResponseType {
  version_id?: string;
  object?: string;
}
export interface ConfigsDeleteParams {
  id?: string;
}
export class Configs extends ApiResource {
  constructor(client: any) {
    super(client);
  }
  create(
    _body: ConfigsAddParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<ConfigsAddResponse> {
    const body = _body;
    if (params) {
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params }),
      };
    }
    const response = this.post<ConfigsAddResponse>('/configs', {
      body,
      ...opts,
    });
    return response;
  }

  retrieve(
    _body: ConfigsGetParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<ConfigsGetResponse> {
    const body = _body;
    const slug = body.slug;
    if (params) {
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params }),
      };
    }
    const response = this.getMethod<ConfigsGetResponse>(`/configs/${slug}`, {
      ...opts,
    });
    return response;
  }

  update(
    _body: ConfigsUpdateParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<ConfigsUpdateResponse> {
    const body = _body;
    const slug = body.slug;
    if (params) {
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params }),
      };
    }
    const response = this.put<ConfigsUpdateResponse>(`/configs/${slug}`, {
      body,
      ...opts,
    });
    return response;
  }
  list(
    _body?: CongfigsListParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<ConfigsListResponse> {
    const body = _body;
    const query = toQueryParams(body);
    if (params) {
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params }),
      };
    }
    const response = this.getMethod<ConfigsListResponse>(`/configs${query}`, {
      ...opts,
    });
    return response;
  }
  delete(
    _body: ConfigsDeleteParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<any> {
    const body = _body;
    const configId = body.id;
    if (params) {
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params }),
      };
    }
    const response = this.deleteMethod<any>(`/configs/${configId}`, {
      ...opts,
    });
    return response;
  }
}
