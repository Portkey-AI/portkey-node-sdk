import { LABELS_API } from '../constants';
import { ApiClientInterface } from '../_types/generalTypes';
import { ApiResource } from '../apiResource';
import { APIPromise, RequestOptions } from '../baseClient';
import { overrideConfig, toQueryParams } from '../utils';
import { createHeaders } from './createHeaders';

export interface LabelBody {
  name: string;
  organisation_id?: string;
  workspace_id?: string;
  description?: string;
  color_code?: string;
}

export interface LabelsQuery {
  organisation_id?: string;
  workspace_id?: string;
  search?: string;
  current_page?: number;
  page_size?: number;
}

export class Labels extends ApiResource {
  create(
    _body: LabelBody,
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
    const response = this.post<any>(`${LABELS_API}`, {
      body,
      ...opts,
    });
    return response;
  }

  list(
    _query?: LabelsQuery,
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
    const response = this.getMethod<any>(`${LABELS_API}${query}`, {
      ...opts,
    });
    return response;
  }

  retrieve(
    labelId: string,
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
    const response = this.getMethod<any>(`${LABELS_API}/${labelId}`, {
      ...opts,
    });
    return response;
  }

  update(
    labelId: string,
    _body?: {
      name?: string;
      description?: string;
      color_code?: string;
    },
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
    const response = this.put<any>(`${LABELS_API}/${labelId}`, {
      body,
      ...opts,
    });
    return response;
  }

  delete(
    labelId: string,
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
    const response = this.deleteMethod<any>(`${LABELS_API}/${labelId}`, {
      ...opts,
    });
    return response;
  }
}
