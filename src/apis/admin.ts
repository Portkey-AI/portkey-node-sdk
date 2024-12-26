import { ApiResource } from '../apiResource';
import { APIResponseType, ApiClientInterface } from '../_types/generalTypes';
import { APIPromise, RequestOptions } from '../baseClient';
import { createHeaders } from './createHeaders';
import { toQueryParams } from '../utils';

export interface UsersGetParams {
  userId?: string;
}

export interface UsersGetResponse extends APIResponseType {
  object?: string;
  id?: string;
  first_name?: string;
  last_name?: string;
  role?: string;
  email?: string;
  created_at?: Date;
  last_updated_at?: Date;
  workspace_ids?: string[];
}

export interface UsersListParams {
  pageSize?: number | string;
  currentPage?: number;
  email?: string;
  role?: 'admin' | 'member' | 'owner' | any;
}

export interface UsersListResponse extends APIResponseType {
  total?: number;
  object?: string;
  data?: UsersGetResponse[];
}

export interface UsersUpdateParams {
  userId?: string;
  role?: 'admin' | 'member' | any;
}
export interface UsersDeleteParams {
  userId?: string;
}
export interface UserInviteParams {
  email?: string;
  role?: string;
  workspaces?: Record<string, any>[];
  workspace_api_key_details?: Record<string, any>;
}

export interface UserInviteResponse extends APIResponseType {
  id?: string;
  invite_link?: string;
}

export interface UserInviteGetParams {
  inviteId?: string;
}

export interface UserInviteGetResponse extends APIResponseType {
  object?: string;
  id?: string;
  email?: string;
  role?: 'admin' | 'member' | any;
  created_at?: Date;
  expires_at?: Date;
  accepted_at?: Date | null;
  status?: string;
  invited_by?: string;
}

export interface UserInviteListParams {
  email?: string;
  role?: 'admin' | 'member' | any;
  status?: 'pending' | 'accepted' | 'expired' | 'cancelled' | any;
  pageSize?: number;
  currentPage?: number;
}

export interface UserInviteListResponse extends APIResponseType {
  object?: string;
  total?: number;
  data?: UserInviteGetResponse[];
}

export interface UserInviteDeleteParams {
  inviteId?: string;
}

export interface WorkspacesAddParams {
  name?: string;
  description?: string;
  defaults?: Record<string, any>;
  users?: string[];
}

export interface WorkspacesAddResponse extends APIResponseType {
  id?: string;
  slug?: string;
  name?: string;
  description?: string;
  created_at?: Date;
  last_updated_at?: Date;
  defaults?: Record<string, any>;
  users?: Record<string, string>[];
  object?: string;
}

export interface WorkspacesGetParams {
  workspaceId?: string;
}

export interface WorkspacesGetResponse extends APIResponseType {
  id?: string;
  slug?: string;
  name?: string;
  description?: string;
  created_at?: Date;
  last_updated_at?: Date;
  defaults?: Record<string, any> | null;
  users?: Record<string, any>[];
}

export interface WorkspacesListParams {
  page_size?: number;
  current_page?: number;
}

export interface WorkspacesListResponse extends APIResponseType {
  total?: number;
  object?: string;
  data?: WorkspacesGetResponse[];
}

export interface WorkspacesUpdateParams {
  workspaceId?: string;
  name?: string;
  description?: string;
  defaults?: Record<string, any>;
}

export interface WorkspacesUpdateResponse extends APIResponseType {
  id?: string;
  slug?: string;
  name?: string;
  description?: string;
  created_at?: Date;
  is_default?: number;
  last_updated_at?: Date;
  defaults?: Record<string, any>;
  object?: string;
}

export interface WorkspacesDeleteParams {
  workspaceId?: string;
  name?: string;
}

export interface WorkspaceMemberAddParams {
  workspaceId?: string;
  users?: { id: string; role: 'member' | 'admin' }[];
}

export interface WorkspaceMemberGetParams {
  workspaceId?: string;
  userId?: string;
}

export interface WorkspaceMemberGetResponse extends APIResponseType {
  first_name?: string;
  last_name?: string;
  org_role?: string;
  role?: string;
  created_at?: Date;
  last_updated_at?: Date;
  status?: string;
  workspace_id?: string;
  scopes?: string[];
  settings?: Record<string, any> | null;
  object?: string;
}

export interface WorkspaceMemberListParams {
  workspaceId?: string;
  page_size?: number;
  current_page?: number;
  email?: string;
  role?: 'admin' | 'manager' | 'member' | any;
}

export interface WorkspaceMemberListResponse extends APIResponseType {
  total?: number;
  object?: string;
  data?: WorkspaceMemberGetResponse[];
}

export interface WorkspaceMemberDeleteParams {
  workspaceId?: string;
  userId?: string;
}

export interface WorkspaceMemberUpdateParams {
  workspaceId?: string;
  userId?: string;
  role?: 'admin' | 'member' | any;
}
// Function to convert UsersGetParams to query parameters

export class Admin extends ApiResource {
  users: Users;
  workspaces: Workspaces;
  constructor(client: any) {
    super(client);
    this.users = new Users(client);
    this.workspaces = new Workspaces(client);
  }
}

export class Users extends ApiResource {
  invites: Invites = new Invites(this.client);

  retrieve(
    _body: UsersGetParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<UsersGetResponse> {
    const body = _body;
    const userId = body.userId;

    if (params) {
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params }),
      };
    }
    const response = this.getMethod<UsersGetResponse>(
      `/admin/users/${userId}`,
      { ...opts }
    );
    return response;
  }

  list(
    _body: UsersListParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<UsersListResponse> {
    const body = _body;
    if (params) {
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params }),
      };
    }
    const query = toQueryParams(body);
    const response = this.getMethod<UsersListResponse>(`/admin/users${query}`, {
      ...opts,
    });
    return response;
  }

  update(
    _body: UsersUpdateParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<any> {
    const body = _body;
    const userId = body.userId;
    delete body.userId;
    if (params) {
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params }),
      };
    }
    const response = this.put<any>(`/admin/users/${userId}`, { body, ...opts });
    return response;
  }

  delete(
    _body: UsersDeleteParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<any> {
    const body = _body;
    const userId = body.userId;
    if (params) {
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params }),
      };
    }
    const response = this.deleteMethod<any>(`/admin/users/${userId}`, {
      body,
      ...opts,
    });
    return response;
  }
}

export class Invites extends ApiResource {
  create(
    _body: UserInviteParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<UserInviteResponse> {
    const body = _body;
    if (params) {
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params }),
      };
    }
    const response = this.post<UserInviteResponse>('/admin/users/invites', {
      body,
      ...opts,
    });
    return response;
  }

  retrieve(
    _body: UserInviteGetParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<UserInviteGetResponse> {
    const body = _body;
    const inviteId = body.inviteId;
    if (params) {
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params }),
      };
    }
    const response = this.getMethod<UserInviteGetResponse>(
      `/admin/users/invites/${inviteId}`,
      { ...opts }
    );
    return response;
  }

  list(
    _body?: UserInviteListParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<UserInviteListResponse> {
    const body = _body;
    if (params) {
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params }),
      };
    }
    const query = body ? toQueryParams(body) : '';
    const response = this.getMethod<UserInviteListResponse>(
      `/admin/users/invites${query}`,
      { ...opts }
    );
    return response;
  }

  delete(
    _body: UserInviteDeleteParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<any> {
    const body = _body;
    const inviteId = body.inviteId;
    if (params) {
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params }),
      };
    }
    const response = this.deleteMethod<any>(
      `/admin/users/invites/${inviteId}`,
      { body, ...opts }
    );
    return response;
  }

  resend(
    _body: UserInviteGetParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<any> {
    const body = _body;
    const inviteId = body.inviteId;
    if (params) {
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params }),
      };
    }

    const response = this.post<any>(`/admin/users/invites/${inviteId}/resend`, {
      ...opts,
    });
    return response;
  }
}

export class Workspaces extends ApiResource {
  users: Member = new Member(this.client);

  create(
    _body: WorkspacesAddParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<WorkspacesAddResponse> {
    const body = _body;
    if (params) {
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params }),
      };
    }
    const response = this.post<WorkspacesAddResponse>('/admin/workspaces', {
      body,
      ...opts,
    });
    return response;
  }
  retrieve(
    _body: WorkspacesGetParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<WorkspacesGetResponse> {
    const body = _body;
    const workspaceId = body.workspaceId;

    if (params) {
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params }),
      };
    }
    const response = this.getMethod<WorkspacesGetResponse>(
      `/admin/workspaces/${workspaceId}`,
      { ...opts }
    );
    return response;
  }

  list(
    _body: WorkspacesListParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<WorkspacesListResponse> {
    const body = _body;
    if (params) {
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params }),
      };
    }
    const query = toQueryParams(body);
    const response = this.getMethod<WorkspacesListResponse>(
      `/admin/workspaces${query}`,
      { ...opts }
    );
    return response;
  }

  update(
    _body: WorkspacesUpdateParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<WorkspacesUpdateResponse> {
    const body = _body;
    const workspaceId = body.workspaceId;
    delete body.workspaceId;
    if (params) {
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params }),
      };
    }
    const response = this.put<WorkspacesUpdateResponse>(
      `/admin/workspaces/${workspaceId}`,
      { body, ...opts }
    );
    return response;
  }

  delete(
    _body: WorkspacesDeleteParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<any> {
    const body = _body;
    const workspaceId = body.workspaceId;
    if (params) {
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params }),
      };
    }
    const response = this.deleteMethod<any>(
      `/admin/workspaces/${workspaceId}`,
      { body, ...opts }
    );
    return response;
  }
}
export class Member extends ApiResource {
  create(
    _body: WorkspaceMemberAddParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<any> {
    const body = _body;
    const workspaceId = body.workspaceId;
    if (params) {
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params }),
      };
    }
    const response = this.post<any>(`/admin/workspaces/${workspaceId}/users`, {
      body,
      ...opts,
    });
    return response;
  }

  retrieve(
    _body: WorkspaceMemberGetParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<WorkspaceMemberGetResponse> {
    const body = _body;
    const workspaceId = body.workspaceId;
    const userId = body.userId;
    if (params) {
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params }),
      };
    }
    const response = this.getMethod<WorkspaceMemberGetResponse>(
      `/admin/workspaces/${workspaceId}/users/${userId}`,
      { ...opts }
    );
    return response;
  }

  list(
    _body: WorkspaceMemberListParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<WorkspaceMemberListResponse> {
    const body = _body;
    const workspaceId = body.workspaceId;
    if (params) {
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params }),
      };
    }
    const query = toQueryParams(body);
    const response = this.getMethod<WorkspaceMemberListResponse>(
      `/admin/workspaces/${workspaceId}/users${query}`,
      { ...opts }
    );
    return response;
  }

  delete(
    _body: WorkspaceMemberDeleteParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<any> {
    const body = _body;
    const workspaceId = body.workspaceId;
    const userId = body.userId;
    if (params) {
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params }),
      };
    }
    const response = this.deleteMethod<any>(
      `/admin/workspaces/${workspaceId}/users/${userId}`,
      { body, ...opts }
    );
    return response;
  }
  update(
    _body: WorkspaceMemberUpdateParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<any> {
    const body = _body;
    const workspaceId = body.workspaceId;
    const userId = body.userId;
    delete body.workspaceId;
    if (params) {
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params }),
      };
    }
    const response = this.put<any>(
      `/admin/workspaces/${workspaceId}/users/${userId}`,
      { body, ...opts }
    );
    return response;
  }
}
