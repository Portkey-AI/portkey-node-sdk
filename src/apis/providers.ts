import { ApiResource } from '../apiResource';
import { ApiClientInterface } from '../_types/generalTypes';
import { APIPromise, RequestOptions } from '../baseClient';
import { createHeaders } from './createHeaders';
import { toQueryParams } from '../utils';

export class Providers extends ApiResource {
  create(
    body: ProviderAddParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<ProviderAddResponse> {
    if (params) {
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params }),
      };
    }
    const response = this.post<ProviderAddResponse>('/providers', {
      body,
      ...opts,
    });
    return response;
  }

  list(
    _body?: ProviderListParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<ProviderListResponse> {
    const body = _body;
    if (params) {
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params }),
      };
    }
    const query = toQueryParams(body);
    const response = this.getMethod<ProviderListResponse>(
      `/providers${query}`,
      { ...opts }
    );
    return response;
  }

  retrieve(
    body: ProviderGetParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<ProviderGetResponse> {
    const { slug } = body;
    if (params) {
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params }),
      };
    }
    const response = this.getMethod<ProviderGetResponse>(
      `/providers/${slug}`,
      { ...opts }
    );
    return response;
  }

  update(
    body: ProviderUpdateParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<ProviderUpdateResponse> {
    const { slug, ...restBody } = body;
    if (params) {
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params }),
      };
    }
    const response = this.put<ProviderUpdateResponse>(`/providers/${slug}`, {
      body: restBody,
      ...opts,
    });
    return response;
  }

  delete(
    body: ProviderDeleteParams,
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
    const response = this.deleteMethod<any>(`/providers/${slug}`, {
      ...opts,
    });
    return response;
  }
}
