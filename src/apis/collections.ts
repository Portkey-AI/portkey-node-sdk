import { COLLECTIONS_API } from '../constants';
import { ApiClientInterface } from '../_types/generalTypes';
import { ApiResource } from '../apiResource';
import { APIPromise, RequestOptions } from '../baseClient';
import { overrideConfig, toQueryParams } from '../utils';
import { createHeaders } from './createHeaders';

export interface CollectionBody {
  name: string;
  workspace_id?: string;
  parent_collection_id?: string;
}

export interface CollectionsListQuery {
  workspace_id?: string;
  current_page?: number;
  page_size?: number;
  search?: string;
}

export class Collections extends ApiResource {
  create(
    _body: CollectionBody,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<any> {
    const body = _body;
    if (params) {
      const config = overrideConfig(this.client.config, params.config);
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params, config }),
      };
    }
    const response = this.post<any>(`${COLLECTIONS_API}`, {
      body,
      ...opts,
    });
    return response;
  }

  list(
    _query?: CollectionsListQuery,
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
    const response = this.getMethod<any>(`${COLLECTIONS_API}${query}`, {
      ...opts,
    });
    return response;
  }

  retrieve(
    collectionId: string,
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
    const response = this.getMethod<any>(`${COLLECTIONS_API}/${collectionId}`, {
      ...opts,
    });
    return response;
  }

  update(
    collectionId: string,
    body: {
      name?: string;
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
    const response = this.put<any>(`${COLLECTIONS_API}/${collectionId}`, {
      body,
      ...opts,
    });
    return response;
  }

  delete(
    collectionId: string,
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
      `${COLLECTIONS_API}/${collectionId}`,
      {
        ...opts,
      }
    );
    return response;
  }
}
