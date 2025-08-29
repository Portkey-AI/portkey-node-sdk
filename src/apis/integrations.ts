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
  note?: string;
  configuration?: Record<string, any>;
}

export interface IntegrationListParams {
  workspace_id?: string;
  current_page?: number;
  page_size?: number;
  type?: 'workspace' | 'organisation' | 'all';
}

export interface IntegrationGetParams {
  slug?: string;
}

export interface IntegrationDeleteParams {
  slug?: string;
}

export interface IntegrationUpdateParams {
  slug?: string;
  name?: string;
  description?: string;
  key?: string;
  configuration?: Record<string, any>;
  note?: string;
}

export interface WorkspaceAccessUpdateParams {
  slug?: string;
  global_workspace_access?: Record<string, any>;
  workspace_ids?: string[];
  override_existing_workspaces_access?: boolean;
  workspaces?: Record<string, any>[];
}

export interface WorkspaceAccessListParams {
  slug: string;
}

export interface ModelUpdateParams {
  slug: string;
  allow_all_models?: boolean;
  models?: Record<string, any>[];
}

export interface ModelListParams {
  slug: string;
}

export interface ModelDeleteParams {
  slug: string;
  slugs?: string;
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
    _body: IntegrationAddParams,
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
    _body: IntegrationGetParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<any> {
    const body = _body;
    const slug = body.slug;
    if (params) {
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params }),
      };
    }
    const response = this.getMethod<any>(`${INTEGRATIONS_API}/${slug}`, {
      ...opts,
    });
    return response;
  }

  update(
    _body: IntegrationUpdateParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<any> {
    const { slug, ...restBody } = _body;

    if (params) {
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params }),
      };
    }
    const response = this.put<any>(`${INTEGRATIONS_API}/${slug}`, {
      body: restBody,
      ...opts,
    });
    return response;
  }

  delete(
    _body: IntegrationDeleteParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<any> {
    const body = _body;
    const slug = body.slug;
    if (params) {
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params }),
      };
    }
    const response = this.deleteMethod<any>(`${INTEGRATIONS_API}/${slug}`, {
      ...opts,
    });
    return response;
  }
}

export class Workspaces extends ApiResource {
  constructor(client: any) {
    super(client);
  }

  update(
    _body: WorkspaceAccessUpdateParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<any> {
    const { slug, ...restBody } = _body;
    if (params) {
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params }),
      };
    }
    const response = this.put<any>(`${INTEGRATIONS_API}/${slug}/workspaces`, {
      body: restBody,
      ...opts,
    });
    return response;
  }

  list(
    _body: WorkspaceAccessListParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<any> {
    const body = _body;
    const slug = body.slug;
    if (params) {
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params }),
      };
    }
    const response = this.getMethod<any>(
      `${INTEGRATIONS_API}/${slug}/workspaces`,
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
    _body: ModelUpdateParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<any> {
    const { slug, ...restBody } = _body;
    if (params) {
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params }),
      };
    }
    const response = this.put<any>(`${INTEGRATIONS_API}/${slug}/models`, {
      body: restBody,
      ...opts,
    });
    return response;
  }

  list(
    _body: ModelListParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<any> {
    const body = _body;
    const slug = body.slug;
    if (params) {
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params }),
      };
    }
    const response = this.getMethod<any>(`${INTEGRATIONS_API}/${slug}/models`, {
      ...opts,
    });
    return response;
  }

  delete(
    _body: ModelDeleteParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<any> {
    const body = _body;
    const slug = body.slug;
    const slugs = body.slugs;
    if (params) {
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params }),
      };
    }
    const query = slugs ? `?slugs=${slugs}` : '';
    const response = this.deleteMethod<any>(
      `${INTEGRATIONS_API}/${slug}/models${query}`,
      {
        ...opts,
      }
    );
    return response;
  }
}
