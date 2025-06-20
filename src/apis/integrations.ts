import { INTEGRATIONS_API } from '../constants';
import { ApiResource } from '../apiResource';
import { APIPromise, RequestOptions } from '../baseClient';
import { ApiClientInterface } from '../_types/generalTypes';
import { createHeaders } from './createHeaders';
import { toQueryParams } from '../utils';

export interface IntegrationAddParams {
  name?: string;
  description?: string;
  key?: string;
  ai_provider_id?: string;
  workspace_id?: string;
  slug?: string;
  organisation_id?: string;
  note?: string;
  configuration?: Record<string, any>;
}

export interface IntegrationListParams {
  organisation_id?: string;
  workspace_id?: string;
  current_page?: number;
  page_size?: number;
}

export interface IntegrationGetParams {
  integration_id?: string;
}

export interface IntegrationDeleteParams {
  integration_id?: string;
}

export interface IntegrationUpdateParams {
  integration_id?: string;
  name?: string;
  description?: string;
  key?: string;
  configuration?: Record<string, any>;
}

export interface WorkspaceAccessUpdateParams {
  provider_integration_id?: string;
  global_workspace_access?: Record<string, any>;
  workspace_ids?: string[];
  override_existing_workspaces_access?: boolean;
  workspaces?: Record<string, any>[];
}

export interface WorkspaceAccessListParams {
  provider_integration_id: string;
}

export interface ModelUpdateParams {
  provider_integration_id: string;
  allow_all_models?: boolean;
  models?: Record<string, any>[];
}

export interface ModelListParams {
  provider_integration_id: string;
}

export class Integrations extends ApiResource {
  workspaces: Workspaces;
  models: Models;

  constructor(client: any) {
    super(client);
    this.workspaces = new Workspaces(client);
    this.models = new Models(client);
  }

  create(
    body: IntegrationAddParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<any> {
    if (params) {
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params }),
      };
    }
    const response = this.post<any>(`${INTEGRATIONS_API}`, {
      body,
      ...opts,
    });
    return response;
  }

  list(
    _body?: IntegrationListParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<any> {
    const body = _body;
    if (params) {
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params }),
      };
    }
    const query = toQueryParams(body);
    const response = this.getMethod<any>(`${INTEGRATIONS_API}${query}`, {
      ...opts,
    });
    return response;
  }

  retrieve(
    body: IntegrationGetParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<any> {
    const { integration_id } = body; // TODO: CSG: Check if ID or Slug
    if (params) {
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params }),
      };
    }
    const response = this.getMethod<any>(
      `${INTEGRATIONS_API}/${integration_id}`,
      { ...opts }
    );
    return response;
  }

  update(
    body: IntegrationUpdateParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<any> {
    const { integration_id, ...restBody } = body; // TODO: CSG: Check if ID or Slug
    if (params) {
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params }),
      };
    }
    const response = this.put<any>(`${INTEGRATIONS_API}/${integration_id}`, {
      body: restBody,
      ...opts,
    });
    return response;
  }

  delete(
    body: IntegrationDeleteParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<any> {
    const { integration_id } = body; // TODO: CSG: Check if ID or Slug
    if (params) {
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params }),
      };
    }
    const response = this.deleteMethod<any>(
      `${INTEGRATIONS_API}/${integration_id}`,
      {
        ...opts,
      }
    );
    return response;
  }
}

export class Workspaces extends ApiResource {
  constructor(client: any) {
    super(client);
  }

  update(
    body: WorkspaceAccessUpdateParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<any> {
    const { provider_integration_id, ...restBody } = body;
    if (params) {
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params }),
      };
    }
    const response = this.put<any>(
      `${INTEGRATIONS_API}/${provider_integration_id}/workspaces`,
      { body: restBody, ...opts }
    );
    return response;
  }

  list(
    body: WorkspaceAccessListParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<any> {
    const { provider_integration_id } = body;
    if (params) {
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params }),
      };
    }
    const response = this.getMethod<any>(
      `${INTEGRATIONS_API}/${provider_integration_id}/workspaces`,
      {
        ...opts,
      }
    );
    return response;
  }
}

export class Models extends ApiResource {
  constructor(client: any) {
    super(client);
  }

  update(
    body: ModelUpdateParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<any> {
    const { provider_integration_id, ...restBody } = body;
    if (params) {
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params }),
      };
    }
    const response = this.put<any>(
      `${INTEGRATIONS_API}/${provider_integration_id}/models`,
      { body: restBody, ...opts }
    );
    return response;
  }

  list(
    body: ModelListParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<any> {
    const { provider_integration_id } = body;
    if (params) {
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params }),
      };
    }
    const response = this.getMethod<any>(
      `${INTEGRATIONS_API}/${provider_integration_id}/models`,
      {
        ...opts,
      }
    );
    return response;
  }
}
