import { ApiClientInterface, APIResponseType } from '../_types/generalTypes';
import { ApiResource } from '../apiResource';
import { APIPromise, RequestOptions } from '../baseClient';
import { createHeaders } from './createHeaders';
import { toQueryParams } from '../utils';

export type MCPIntegrationAuthType =
  | 'oauth_auto'
  | 'oauth_client_credentials'
  | 'headers'
  | 'none';

export type MCPIntegrationTransport = 'http' | 'sse';

export interface MCPIntegrationsCreateParams {
  name: string;
  url: string;
  auth_type: MCPIntegrationAuthType;
  transport: MCPIntegrationTransport;
  workspace_id?: string;
  organisation_id?: string;
  slug?: string;
  description?: string | null;
  configurations?: Record<string, any>;
}

export interface MCPIntegrationsCreateResponse extends APIResponseType {
  id?: string;
  slug?: string;
}

export interface MCPIntegrationsListParams {
  organisation_id?: string;
  workspace_id?: string;
  type?: 'workspace' | 'organisation' | 'all';
  page_size?: number;
  current_page?: number;
  search?: string;
}

export interface MCPIntegrationData extends APIResponseType {
  id?: string;
  slug?: string;
  name?: string;
  description?: string | null;
  url?: string;
  auth_type?: MCPIntegrationAuthType;
  transport?: MCPIntegrationTransport;
  configurations?: Record<string, any>;
  workspace_id?: string | null;
  organisation_id?: string;
  owner_id?: string;
  created_at?: string;
  updated_at?: string;
}

export interface MCPIntegrationsListResponse extends APIResponseType {
  data?: MCPIntegrationData[];
  total?: number;
}

export interface MCPIntegrationsRetrieveParams {
  id: string;
}

export interface MCPIntegrationsUpdateParams {
  id: string;
  name?: string;
  description?: string | null;
  url?: string;
  auth_type?: MCPIntegrationAuthType;
  transport?: MCPIntegrationTransport;
  configurations?: Record<string, any>;
}

export interface MCPIntegrationsUpdateResponse extends APIResponseType {
  id?: string;
  slug?: string;
}

export interface MCPIntegrationsDeleteParams {
  id: string;
}

export interface MCPIntegrationsSyncParams {
  id: string;
  server_info?: {
    name?: string;
    version?: string;
    title?: string;
    description?: string;
    website_url?: string;
    icons?: any[];
    protocol_version?: string;
    capabilities?: Record<string, any>;
    instructions?: string;
  };
  capabilities?: Array<{
    name?: string;
    type?: 'tool' | 'prompt' | 'resource' | 'resource_template';
    title?: string;
    description?: string;
    icons?: any[];
    _meta?: Record<string, any>;
    input_schema?: Record<string, any>;
    inputSchema?: Record<string, any>;
    output_schema?: Record<string, any>;
    outputSchema?: Record<string, any>;
    execution?: Record<string, any>;
    annotations?: Record<string, any>;
    arguments?: any[];
    uri?: string;
    mime_type?: string;
    mimeType?: string;
    size?: number;
    uri_template?: string;
    uriTemplate?: string;
  }>;
}

export interface MCPIntegrationsTestParams {
  id: string;
}

export interface MCPIntegrationsWorkspacesListParams {
  id: string;
}

export interface MCPIntegrationsWorkspacesUpdateParams {
  id: string;
  workspaces: Array<{
    id: string;
    enabled: boolean;
  }>;
  global_workspace_access?: {
    enabled: boolean;
  } | null;
  override_existing_workspace_access?: boolean;
}

export interface MCPIntegrationsCapabilitiesListParams {
  id: string;
}

export interface MCPIntegrationsCapabilitiesUpdateParams {
  id: string;
  capabilities: Array<{
    name: string;
    type: 'tool' | 'prompt' | 'resource';
    enabled: boolean;
  }>;
}

export interface MCPIntegrationsMetadataGetParams {
  id: string;
}

export class MCPIntegrations extends ApiResource {
  workspaces: MCPIntegrationsWorkspaces;
  capabilities: MCPIntegrationsCapabilities;
  metadata: MCPIntegrationsMetadata;

  constructor(client: any) {
    super(client);
    this.workspaces = new MCPIntegrationsWorkspaces(client);
    this.capabilities = new MCPIntegrationsCapabilities(client);
    this.metadata = new MCPIntegrationsMetadata(client);
  }

  create(
    body: MCPIntegrationsCreateParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<MCPIntegrationsCreateResponse> {
    if (params) {
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params }),
      };
    }
    const response = this.post<MCPIntegrationsCreateResponse>(
      '/mcp-integrations',
      {
        body,
        ...opts,
      }
    );
    return response;
  }

  list(
    _body?: MCPIntegrationsListParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<MCPIntegrationsListResponse> {
    const body = _body;
    if (params) {
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params }),
      };
    }
    const query = toQueryParams(body);
    const response = this.getMethod<MCPIntegrationsListResponse>(
      `/mcp-integrations${query}`,
      { ...opts }
    );
    return response;
  }

  retrieve(
    body: MCPIntegrationsRetrieveParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<MCPIntegrationData> {
    const { id } = body;
    if (params) {
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params }),
      };
    }
    const response = this.getMethod<MCPIntegrationData>(
      `/mcp-integrations/${id}`,
      { ...opts }
    );
    return response;
  }

  update(
    body: MCPIntegrationsUpdateParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<MCPIntegrationsUpdateResponse> {
    const { id, ...restBody } = body;
    if (params) {
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params }),
      };
    }
    const response = this.put<MCPIntegrationsUpdateResponse>(
      `/mcp-integrations/${id}`,
      { body: restBody, ...opts }
    );
    return response;
  }

  delete(
    body: MCPIntegrationsDeleteParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<APIResponseType> {
    const { id } = body;
    if (params) {
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params }),
      };
    }
    const response = this.deleteMethod<APIResponseType>(
      `/mcp-integrations/${id}`,
      { ...opts }
    );
    return response;
  }

  sync(
    body: MCPIntegrationsSyncParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<APIResponseType> {
    const { id, ...restBody } = body;
    if (params) {
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params }),
      };
    }
    const response = this.post<APIResponseType>(
      `/mcp-integrations/${id}/sync`,
      { body: restBody, ...opts }
    );
    return response;
  }

  test(
    body: MCPIntegrationsTestParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<APIResponseType> {
    const { id } = body;
    if (params) {
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params }),
      };
    }
    const response = this.post<APIResponseType>(
      `/mcp-integrations/${id}/test`,
      { body: {}, ...opts }
    );
    return response;
  }
}

export class MCPIntegrationsWorkspaces extends ApiResource {
  list(
    body: MCPIntegrationsWorkspacesListParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<APIResponseType> {
    const { id } = body;
    if (params) {
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params }),
      };
    }
    const response = this.getMethod<APIResponseType>(
      `/mcp-integrations/${id}/workspaces`,
      { ...opts }
    );
    return response;
  }

  update(
    body: MCPIntegrationsWorkspacesUpdateParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<APIResponseType> {
    const { id, ...restBody } = body;
    if (params) {
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params }),
      };
    }
    const response = this.put<APIResponseType>(
      `/mcp-integrations/${id}/workspaces`,
      { body: restBody, ...opts }
    );
    return response;
  }
}

export class MCPIntegrationsCapabilities extends ApiResource {
  list(
    body: MCPIntegrationsCapabilitiesListParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<APIResponseType> {
    const { id } = body;
    if (params) {
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params }),
      };
    }
    const response = this.getMethod<APIResponseType>(
      `/mcp-integrations/${id}/capabilities`,
      { ...opts }
    );
    return response;
  }

  update(
    body: MCPIntegrationsCapabilitiesUpdateParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<APIResponseType> {
    const { id, ...restBody } = body;
    if (params) {
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params }),
      };
    }
    const response = this.put<APIResponseType>(
      `/mcp-integrations/${id}/capabilities`,
      { body: restBody, ...opts }
    );
    return response;
  }
}

export class MCPIntegrationsMetadata extends ApiResource {
  get(
    body: MCPIntegrationsMetadataGetParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<APIResponseType> {
    const { id } = body;
    if (params) {
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params }),
      };
    }
    const response = this.getMethod<APIResponseType>(
      `/mcp-integrations/${id}/metadata`,
      { ...opts }
    );
    return response;
  }
}
