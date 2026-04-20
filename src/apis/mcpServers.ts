import { ApiClientInterface, APIResponseType } from '../_types/generalTypes';
import { ApiResource } from '../apiResource';
import { APIPromise, RequestOptions } from '../baseClient';
import { createHeaders } from './createHeaders';
import { toQueryParams } from '../utils';

export interface MCPServersCreateParams {
  name: string;
  mcp_integration_id: string;
  workspace_id?: string;
  description?: string | null;
  slug?: string;
}

export interface MCPServersCreateResponse extends APIResponseType {
  id?: string;
  slug?: string;
}

export interface MCPServersListParams {
  workspace_id?: string;
  current_page?: number;
  page_size?: number;
  id?: string;
  search?: string;
}

export interface MCPServerMetadata {
  title?: string | null;
  description?: string | null;
  icons?: any[] | null;
  server_name?: string | null;
  server_version?: string | null;
  protocol_version?: string | null;
  sync_status?: string;
  last_synced_at?: string | null;
}

export interface MCPServerData extends APIResponseType {
  id?: string;
  slug?: string;
  name?: string;
  description?: string | null;
  workspace_id?: string;
  organisation_id?: string;
  mcp_integration_id?: string;
  owner_id?: string;
  url?: string;
  metadata?: MCPServerMetadata;
  created_at?: string;
  updated_at?: string;
}

export interface MCPServersListResponse extends APIResponseType {
  data?: MCPServerData[];
  total?: number;
}

export interface MCPServersRetrieveParams {
  id: string;
}

export interface MCPServersUpdateParams {
  id: string;
  name?: string;
  description?: string | null;
}

export interface MCPServersUpdateResponse extends APIResponseType {
  id?: string;
  slug?: string;
}

export interface MCPServersDeleteParams {
  id: string;
}

export interface MCPServersTestParams {
  id: string;
}

export interface MCPServersTokensGetParams {
  id: string;
}

export interface MCPServersTokensSetParams {
  id: string;
  access_token: string;
  refresh_token?: string;
}

export interface MCPServersTokensDeleteParams {
  id: string;
}

export interface MCPServersClientInfoParams {
  id: string;
}

export interface MCPServerCapability {
  name: string;
  type: 'tool' | 'prompt' | 'resource';
  enabled?: boolean;
  description?: string | null;
  schema?: Record<string, any> | null;
}

export interface MCPServersCapabilitiesListParams {
  id: string;
}

export interface MCPServersCapabilitiesUpdateParams {
  id: string;
  capabilities: Array<{
    name: string;
    type: 'tool' | 'prompt' | 'resource';
    enabled: boolean;
  }>;
}

export interface MCPServersCapabilitiesSyncParams {
  id: string;
  capabilities: Array<{
    name: string;
    type: 'tool' | 'prompt' | 'resource';
    description?: string | null;
    schema?: Record<string, any> | null;
  }>;
}

export interface MCPServersUserAccessCheckParams {
  id: string;
}

export interface MCPServersUserAccessListParams {
  id: string;
}

export interface MCPServersUserAccessUpdateParams {
  id: string;
  user_access?: Array<{
    id?: string;
    user_id?: string;
    enabled: boolean;
  }>;
  default_user_access?: 'allow' | 'deny';
}

export interface MCPServersMetadataGetParams {
  id: string;
}

export interface MCPServersMetadataSyncParams {
  id: string;
  server_name?: string | null;
  server_version?: string | null;
  protocol_version?: string | null;
  title?: string | null;
  description?: string | null;
  website_url?: string | null;
  icons?: any[] | null;
  capability_flags?: Record<string, any> | null;
  instructions?: string | null;
}

export interface MCPServersConnectionsListParams {
  id: string;
  user_id?: string;
  workspace_id?: string;
  current_page?: number;
  page_size?: number;
}

export interface MCPServersConnectionsDeleteParams {
  id: string;
  user_id?: string;
  workspace_id?: string;
}

export class MCPServers extends ApiResource {
  capabilities: MCPServersCapabilities;
  userAccess: MCPServersUserAccess;
  metadata: MCPServersMetadata;
  connections: MCPServersConnections;

  constructor(client: any) {
    super(client);
    this.capabilities = new MCPServersCapabilities(client);
    this.userAccess = new MCPServersUserAccess(client);
    this.metadata = new MCPServersMetadata(client);
    this.connections = new MCPServersConnections(client);
  }

  create(
    body: MCPServersCreateParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<MCPServersCreateResponse> {
    if (params) {
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params }),
      };
    }
    const response = this.post<MCPServersCreateResponse>('/mcp-servers', {
      body,
      ...opts,
    });
    return response;
  }

  list(
    _query?: MCPServersListParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<MCPServersListResponse> {
    if (params) {
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params }),
      };
    }
    const query = toQueryParams(_query);
    const response = this.getMethod<MCPServersListResponse>(
      `/mcp-servers${query}`,
      { ...opts }
    );
    return response;
  }

  retrieve(
    body: MCPServersRetrieveParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<MCPServerData> {
    const { id } = body;
    if (params) {
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params }),
      };
    }
    const response = this.getMethod<MCPServerData>(`/mcp-servers/${id}`, {
      ...opts,
    });
    return response;
  }

  update(
    body: MCPServersUpdateParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<MCPServersUpdateResponse> {
    const { id, ...restBody } = body;
    if (params) {
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params }),
      };
    }
    const response = this.put<MCPServersUpdateResponse>(`/mcp-servers/${id}`, {
      body: restBody,
      ...opts,
    });
    return response;
  }

  delete(
    body: MCPServersDeleteParams,
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
    const response = this.deleteMethod<APIResponseType>(`/mcp-servers/${id}`, {
      ...opts,
    });
    return response;
  }

  test(
    body: MCPServersTestParams,
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
    const response = this.post<APIResponseType>(`/mcp-servers/${id}/test`, {
      body: {},
      ...opts,
    });
    return response;
  }

  getTokens(
    body: MCPServersTokensGetParams,
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
      `/mcp-servers/${id}/tokens`,
      { ...opts }
    );
    return response;
  }

  setTokens(
    body: MCPServersTokensSetParams,
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
    const response = this.put<APIResponseType>(`/mcp-servers/${id}/tokens`, {
      body: restBody,
      ...opts,
    });
    return response;
  }

  deleteTokens(
    body: MCPServersTokensDeleteParams,
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
      `/mcp-servers/${id}/tokens`,
      { ...opts }
    );
    return response;
  }

  getClientInfo(
    body: MCPServersClientInfoParams,
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
      `/mcp-servers/${id}/client-info`,
      { ...opts }
    );
    return response;
  }
}

export class MCPServersCapabilities extends ApiResource {
  list(
    body: MCPServersCapabilitiesListParams,
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
      `/mcp-servers/${id}/capabilities`,
      { ...opts }
    );
    return response;
  }

  update(
    body: MCPServersCapabilitiesUpdateParams,
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
      `/mcp-servers/${id}/capabilities`,
      { body: restBody, ...opts }
    );
    return response;
  }

  sync(
    body: MCPServersCapabilitiesSyncParams,
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
      `/mcp-servers/${id}/capabilities/sync`,
      { body: restBody, ...opts }
    );
    return response;
  }
}

export class MCPServersUserAccess extends ApiResource {
  check(
    body: MCPServersUserAccessCheckParams,
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
      `/mcp-servers/${id}/user-access/check`,
      { ...opts }
    );
    return response;
  }

  list(
    body: MCPServersUserAccessListParams,
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
      `/mcp-servers/${id}/user-access`,
      { ...opts }
    );
    return response;
  }

  update(
    body: MCPServersUserAccessUpdateParams,
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
      `/mcp-servers/${id}/user-access`,
      { body: restBody, ...opts }
    );
    return response;
  }
}

export class MCPServersMetadata extends ApiResource {
  get(
    body: MCPServersMetadataGetParams,
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
      `/mcp-servers/${id}/metadata`,
      { ...opts }
    );
    return response;
  }

  sync(
    body: MCPServersMetadataSyncParams,
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
      `/mcp-servers/${id}/metadata/sync`,
      { body: restBody, ...opts }
    );
    return response;
  }
}

export class MCPServersConnections extends ApiResource {
  list(
    body: MCPServersConnectionsListParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<APIResponseType> {
    const { id, ...queryParams } = body;
    if (params) {
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params }),
      };
    }
    const query = toQueryParams(queryParams);
    const response = this.getMethod<APIResponseType>(
      `/mcp-servers/${id}/connections${query}`,
      { ...opts }
    );
    return response;
  }

  delete(
    body: MCPServersConnectionsDeleteParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<APIResponseType> {
    const { id, ...queryParams } = body;
    if (params) {
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params }),
      };
    }
    const query = toQueryParams(queryParams);
    const response = this.deleteMethod<APIResponseType>(
      `/mcp-servers/${id}/connections${query}`,
      { ...opts }
    );
    return response;
  }
}
