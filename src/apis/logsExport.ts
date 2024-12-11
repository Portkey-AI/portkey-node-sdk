import { ApiResource } from '../apiResource';
import { APIResponseType, ApiClientInterface } from '../_types/generalTypes';
import { APIPromise, RequestOptions } from '../baseClient';
import { createHeaders } from './createHeaders';
import { overrideConfig, toQueryParams } from '../utils';
import { LOGS_API } from '../constants';

export interface LogsExportCreateParams {
  filters?: Record<string, any>;
  workspaceId?: string;
  description?: string;
  requestedData?: string[];
}
export interface LogsExportCreateResponse extends APIResponseType {
  id?: string;
  total?: number;
  object?: string;
}
export interface LogsExportListParams {
  workspaceId?: string;
}
export interface LogsExportListResponse extends APIResponseType {
  object?: string;
  total?: number;
  data?: Record<string, any>[];
}
export interface LogsExportUpdateParams {
  exportId?: string;
  workspaceId?: string;
  filters?: Record<string, any>;
  requestedData?: string[];
}
export interface LogsExportUpdateResponse extends APIResponseType {
  id?: string;
  total?: number;
  object?: string;
}
export interface LogsExportCancelParams {
  exportId?: string;
}
export interface LogsExportCancelResponse extends APIResponseType {
  message?: string;
  object?: string;
}
export interface LogsExportRetrieveParams {
  exportId: string;
}
export interface LogsExportRetrieveResponse extends APIResponseType {
  id?: string;
  organisation_id?: string;
  filters?: Record<string, any>;
  requested_data?: string[];
  status?: string;
  description?: string;
  created_at?: Date;
  last_updated_at?: Date;
  created_by?: string;
  workspace_id?: string;
  total_records?: number;
  object?: string;
}
export interface LogsExportStartParams {
  exportId?: string;
}
export interface LogsExportStartResponse extends APIResponseType {
  message?: string;
  object?: string;
}
export interface LogsExportDownloadParams {
  exportId?: string;
}
export interface LogsExportDownloadResponse extends APIResponseType {
  signed_url?: string;
}

export interface LogInsertBody {
  request?: Record<string, any>;
  response?: Record<string, any>;
  metadata?: Record<string, any>;
}
export class Logs extends ApiResource {
  exports: Exports;
  constructor(client: any) {
    super(client);
    this.exports = new Exports(client);
  }

  create(
    _body: LogInsertBody,
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
    const response = this.post<APIResponseType>(LOGS_API, {
      body,
      ...opts,
    });
    return response;
  }
}
export class Exports extends ApiResource {
  create(
    _body: LogsExportCreateParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<LogsExportCreateResponse> {
    const { workspaceId, requestedData, ...rest } = _body;
    const body = {
      ...rest,
      workspace_id: workspaceId,
      requested_data: requestedData,
    };
    if (params) {
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params }),
      };
    }
    const response = this.post<LogsExportCreateResponse>('/logs/exports', {
      body,
      ...opts,
    });
    return response;
  }
  retrieve(
    _body: LogsExportRetrieveParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<LogsExportRetrieveResponse> {
    const body = _body;
    const exportId = body.exportId;
    if (params) {
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params }),
      };
    }
    const response = this.getMethod<LogsExportRetrieveResponse>(
      `/logs/exports/${exportId}`,
      { ...opts }
    );
    return response;
  }
  list(
    _body: LogsExportListParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<LogsExportListResponse> {
    const { workspaceId, ...rest } = _body;
    const body = {
      ...rest,
      workspace_id: workspaceId,
    };
    const query = toQueryParams(body);
    if (params) {
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params }),
      };
    }
    const response = this.getMethod<LogsExportListResponse>(
      `/logs/exports${query}`,
      { ...opts }
    );
    return response;
  }
  update(
    _body: LogsExportUpdateParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<LogsExportUpdateResponse> {
    const { workspaceId, requestedData, ...rest } = _body;
    const body = {
      ...rest,
      workspace_id: workspaceId,
      requested_data: requestedData,
    };
    const exportId = body.exportId;
    if (params) {
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params }),
      };
    }
    const response = this.put<LogsExportUpdateResponse>(
      `/logs/exports/${exportId}`,
      { body, ...opts }
    );
    return response;
  }
  start(
    _body: LogsExportStartParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<LogsExportStartResponse> {
    const body = _body;
    const exportId = body.exportId;
    if (params) {
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params }),
      };
    }
    const response = this.post<LogsExportStartResponse>(
      `/logs/exports/${exportId}/start`,
      { body, ...opts }
    );
    return response;
  }
  cancel(
    _body: LogsExportCancelParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<LogsExportCancelResponse> {
    const body = _body;
    const exportId = body.exportId;
    if (params) {
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params }),
      };
    }
    const response = this.post<LogsExportCancelResponse>(
      `/logs/exports/${exportId}/cancel`,
      { body, ...opts }
    );
    return response;
  }
  download(
    _body: LogsExportDownloadParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<LogsExportDownloadResponse> {
    const body = _body;
    const exportId = body.exportId;
    if (params) {
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params }),
      };
    }
    const response = this.getMethod<LogsExportDownloadResponse>(
      `/logs/exports/${exportId}/download`,
      { body, ...opts }
    );
    return response;
  }
}
