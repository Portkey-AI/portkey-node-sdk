import { ApiResource } from "../apiResource";
import { APIResponseType, ApiClientInterface } from "../_types/generalTypes";
import { APIPromise, RequestOptions } from "../baseClient";
import { createHeaders } from "./createHeaders";

export interface UsersRetrieveParams{
    userId?: string;
}

export interface UsersRetrieveAllParams{
    pageSize?: number;
    currentPage?: number;
    email?: string;
    role?: string;
}

export interface UsersRetrieveResponse extends APIResponseType {
    object?: string,
    id?: string,
    first_name?: string,
    last_name?: string,
    role?: string,
    email?: string,
    created_at?: Date,
    last_updated_at?: Date
    workspace_ids?: string[]
}

export interface UsersRetrieveAllResponse extends APIResponseType {
    total?: number,
    object?: string,
    data?: UsersRetrieveResponse[]
}

export interface UsersUpdateParams{
    userId?: string,
    role?: "admin" | "member" | any,
}

export interface UserInviteParams{
    email?: string,
    role?: string,
    workspaces?: Record<string,unknown>[]
}

export interface UserInviteResponse extends APIResponseType {
    id?: string,
    invite_link?: string,
}

export interface UserInviteRetrieveParams{
    inviteId?: string,
}

export interface UserInviteRetrieveResponse extends APIResponseType {
    object?: string,
    id?: string,
    email?: string,
    role?: string,
    created_at?: Date,
    expires_at?: Date,
    accepted_at?: Date,
    status?: string
    invited_by?: string
}

export interface UserInviteRetrieveAllParams{
    email?: string,
    role?: string,
    status?: "pending" | "accepted" | "expired"| "cancelled"| any,
    pageSize?: number,
    currentPage?: number
}

export interface UserInviteRetrieveAllResponse extends APIResponseType {
    object?: string,
    total?: number,
    data?: UserInviteRetrieveResponse[]
}

export interface UserInviteRemoveParams {
    inviteId?: string,
}

export interface WorkspacesCreateParams{
    name?: string,
    description?: string,
    defaults?: Record<string, any>,
    users?: Record<string, string>[],
}
export interface WorkspacesRetrieveParams {
    workspaceId?: string;
}
export interface WorkspacesRetrieveAllParams {
    page_size?: number;
    current_page?: number;
}

export interface WorkspacesCreateResponse extends APIResponseType {
    id?: string,
    slug?: string,
    name?: string,
    description?: string,
    created_at?: Date,
    last_updated_at?: Date,
    defaults?: Record<string, any>,
    users?: Record<string, string>[],
}
export interface WorkspacesRetrieveResponse extends APIResponseType {
    id?: string,
    slug?: string,
    name?: string,
    description?: string,
    created_at?: Date,
    last_updated_at?: Date,
    defaults?: Record<string, any>,
    users?: Record<string, any>[],
}
export interface WorkspacesRetrieveAllResponse extends APIResponseType {
    total?: number,
    object?: string,
    data?: WorkspacesRetrieveResponse[]
}
export interface WorkspacesUpdateParams{
    workspaceId?: string,
    name?: string,
    description?: string,
    defaults?: Record<string, any>,
}

export interface WorkspacesUpdateResponse extends APIResponseType {
    id?: string,
    slug?: string,
    name?: string,
    description?: string,
    created_at?: Date,
    last_updated_at?: Date,
    defaults?: Record<string, any>,
    object?: string,
}

export interface WorkspacesRemoveParams{
    workspaceId?: string;
    name?: string;

}
export interface WorkspaceMemberAddParams{
    workspaceId?: string,
    users?: { id: string, role: "member" | "admin" }[],
}
export interface WorkspaceMemberRetrieveParams{
    workspaceId?: string,
    userId?: string,
}
export interface WorkspaceMemberRetrieveAllParams {
    workspaceId?: string,
    page_size?: number,
    current_page?: number,
    email?: string,
    role?: "admin" | "manager" | "member" | any,
}
export interface WorkspaceMemberRetrieveResponse extends APIResponseType {
    object?: string,
    id?: string,
    first_name?: string,
    last_name?: string,
    org_role?: string,
    role?: string,
    created_at?: Date,
    last_updated_at?: Date,
    status?: string
}
export interface WorkspaceMemberRetrieveAllResponse extends APIResponseType {
    total?: number,
    object?: string,
    data?: WorkspaceMemberRetrieveResponse[]
}
export interface WorkspaceMemberRemoveParams{
    workspaceId?: string,
    userId?: string,
}
export interface WorkspaceMemberUpdateParams{
    workspaceId?: string,
    userId?: string,
    role?: "admin" | "member" | any,
}
// Function to convert UsersRetrieveParams to query parameters
function toQueryParams(params?: (UsersRetrieveAllParams | UserInviteRetrieveAllParams | WorkspacesRetrieveParams | WorkspacesRetrieveAllParams | WorkspaceMemberRetrieveAllParams)): string {
    if (!params) {
        return '';
    }
    const queryParams = Object.entries(params)
        .filter(([, value]) => value !== undefined && value !== null)
        .map(([key, value]) => `${key}=${value}`)
        .join('&');
    
    return queryParams ? `?${queryParams}` : '';
}

export class Admin extends ApiResource {
    users: Users
    workspaces: Workspaces
    constructor(client: any) {
        super(client);
        this.users = new Users(client);
        this.workspaces= new Workspaces(client);
    }
}


export class Users extends ApiResource {

    invites: Invites

    constructor(client: any) {
        super(client);
        this.invites = new Invites(client);
    }

    retrieve(
        _body: UsersRetrieveParams,
		params?: ApiClientInterface,
		opts?: RequestOptions
    ): APIPromise<UsersRetrieveResponse> {
        const body = _body;
        const userId = body.userId;
        
        if (params) {
            this.client.customHeaders = { ...this.client.customHeaders, ...createHeaders({ ...params }) }
        }
        const response = this.get<UsersRetrieveResponse>(`/admin/users/${userId}`, {...opts });
        return response;
    }

    retrieveAll(
        _body: UsersRetrieveAllParams,
        params?: ApiClientInterface,
        opts?: RequestOptions
    ): APIPromise<UsersRetrieveAllResponse> {
        const body = _body;
        if (params) {
            this.client.customHeaders = { ...this.client.customHeaders, ...createHeaders({ ...params }) }
        }
        const query = toQueryParams(body);
        const response = this.get<UsersRetrieveAllResponse>(`/admin/users${query}`, { ...opts });
        return response;
    }
    
    update(
        _body: UsersUpdateParams,
        params?: ApiClientInterface,
        opts?: RequestOptions
    ): APIPromise<any> {
        const body = _body;
        const userId = _body.userId;
        delete body.userId;
        if (params) {
            this.client.customHeaders = { ...this.client.customHeaders, ...createHeaders({ ...params }) }
        }
        const response = this.put<any>(`/admin/users/${userId}`, { body, ...opts });
        return response;
    }

    remove(
        _body: UsersRetrieveParams,
        params?: ApiClientInterface,
        opts?: RequestOptions
    ): APIPromise<any> {
        const body = _body;
        const userId = _body.userId;
        if (params){
            this.client.customHeaders = { ...this.client.customHeaders, ...createHeaders({ ...params }) }
        }
        const response = this.deleteMethod<any>(`/admin/users/${userId}`, { body, ...opts });
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
            this.client.customHeaders = { ...this.client.customHeaders, ...createHeaders({ ...params }) }
        }
        const response = this.post<UserInviteResponse>('/admin/users/invites', { body, ...opts });
        return response;
    }

    retrieve(
        _body: UserInviteRetrieveParams,
		params?: ApiClientInterface,
		opts?: RequestOptions
    ): APIPromise<UserInviteRetrieveResponse> {
        const body = _body;
        const inviteId = _body.inviteId;
        if (params) {
            this.client.customHeaders = { ...this.client.customHeaders, ...createHeaders({ ...params }) }
        }
        const response = this.get<UserInviteRetrieveResponse>(`/admin/users/invites/${inviteId}`, { ...opts });
        return response;
    }

    retrieveAll(
        _body: UserInviteRetrieveAllParams,
        params?: ApiClientInterface,
        opts?: RequestOptions
    ): APIPromise<UserInviteRetrieveAllResponse> {
        const body = _body;
        if (params) {
            this.client.customHeaders = { ...this.client.customHeaders, ...createHeaders({ ...params }) }
        }
        const query = toQueryParams(body);
        const response = this.get<UserInviteRetrieveAllResponse>(`/admin/users/invites${query}`, { ...opts });
        return response;
    }

    delete(
        _body: UserInviteRemoveParams,
        params?: ApiClientInterface,
        opts?: RequestOptions
    ): APIPromise<any> {
        const body = _body;
        const inviteId = _body.inviteId;
        if (params){
            this.client.customHeaders = { ...this.client.customHeaders, ...createHeaders({ ...params }) }
        }
        const response = this.deleteMethod<any>(`/admin/users/invites/${inviteId}`, { body, ...opts });
        return response;
    }

}

export class Workspaces extends ApiResource {
    users: Member
    constructor(client: any) {
        super(client);
        this.users = new Member(client);
    }
    create(
        _body: WorkspacesCreateParams,
        params?: ApiClientInterface,
        opts?: RequestOptions
    ): APIPromise<WorkspacesCreateResponse> {
        const body = _body;
        if (params) {
            this.client.customHeaders = { ...this.client.customHeaders, ...createHeaders({ ...params }) }
        }
        const response = this.post<WorkspacesCreateResponse>('/admin/workspaces', { body, ...opts });
        return response;
    }
    retrieve(
        _body: WorkspacesRetrieveParams,
		params?: ApiClientInterface,
		opts?: RequestOptions
    ): APIPromise<WorkspacesRetrieveResponse> {
        const body = _body;
        const workspaceId = body.workspaceId;
        
        if (params) {
            this.client.customHeaders = { ...this.client.customHeaders, ...createHeaders({ ...params }) }
        }
        const response = this.get<WorkspacesRetrieveResponse>(`/admin/workspaces/${workspaceId}`, { ...opts });
        return response;
    }

    retrieveAll(
        _body: WorkspacesRetrieveAllParams,
        params?: ApiClientInterface,
        opts?: RequestOptions
    ): APIPromise<WorkspacesRetrieveAllResponse> {
        const body = _body;
        if (params) {
            this.client.customHeaders = { ...this.client.customHeaders, ...createHeaders({ ...params }) }
        }
        const query = toQueryParams(body);
        const response = this.get<WorkspacesRetrieveAllResponse>(`/admin/workspaces${query}`, { ...opts });
        return response;
    }
    
    update(
        _body: WorkspacesUpdateParams,
        params?: ApiClientInterface,
        opts?: RequestOptions
    ): APIPromise<WorkspacesUpdateResponse> {
        const body = _body;
        const workspaceId = _body.workspaceId;
        delete body.workspaceId;
        if (params) {
            this.client.customHeaders = { ...this.client.customHeaders, ...createHeaders({ ...params }) }
        }
        const response = this.put<WorkspacesUpdateResponse>(`/admin/workspaces/${workspaceId}`, { body, ...opts });
        return response;
    }

    delete(
        _body: WorkspacesRemoveParams,
        params?: ApiClientInterface,
        opts?: RequestOptions
    ): APIPromise<any> {
        const body = _body;
        const workspaceId = _body.workspaceId;
        if (params){
            this.client.customHeaders = { ...this.client.customHeaders, ...createHeaders({ ...params }) }
        }
        const response = this.deleteMethod<any>(`/admin/workspaces/${workspaceId}`, { body, ...opts });
        return response;
    }

}
export class Member extends ApiResource {

    add(
        _body: WorkspaceMemberAddParams,
        params?: ApiClientInterface,
        opts?: RequestOptions
    ): APIPromise<any> {
        const body = _body;
        const workspaceId = body.workspaceId;
        if (params) {
            this.client.customHeaders = { ...this.client.customHeaders, ...createHeaders({ ...params }) }
        }
        const response = this.post<any>(`/admin/workspaces/${workspaceId}/users`, { body, ...opts });
        return response;
    }

    retrieve(
        _body: WorkspaceMemberRetrieveParams,
		params?: ApiClientInterface,
		opts?: RequestOptions
    ): APIPromise<WorkspaceMemberRetrieveResponse> {
        const body = _body;
        const workspaceId = _body.workspaceId;
        const userId = _body.userId;
        if (params) {
            this.client.customHeaders = { ...this.client.customHeaders, ...createHeaders({ ...params }) }
        }
        const response = this.get<WorkspaceMemberRetrieveResponse>(`/admin/workspaces/${workspaceId}/users/${userId}`, { ...opts });
        return response;
    }

    retrieveAll(
        _body: WorkspaceMemberRetrieveAllParams,
        params?: ApiClientInterface,
        opts?: RequestOptions
    ): APIPromise<WorkspaceMemberRetrieveAllResponse> {
        const body = _body;
        const workspaceId = _body.workspaceId;
        if (params) {
            this.client.customHeaders = { ...this.client.customHeaders, ...createHeaders({ ...params }) }
        }
        const query = toQueryParams(body);
        const response = this.get<WorkspaceMemberRetrieveAllResponse>(`/admin/workspaces/${workspaceId}/users${query}`, { ...opts });
        return response;
    }

    remove(
        _body: WorkspaceMemberRemoveParams,
        params?: ApiClientInterface,
        opts?: RequestOptions
    ): APIPromise<any> {
        const body = _body;
        const workspaceId = body.workspaceId;
        const userId = body.userId;
        if (params){
            this.client.customHeaders = { ...this.client.customHeaders, ...createHeaders({ ...params }) }
        }
        const response = this.deleteMethod<any>(`/admin/workspaces/${workspaceId}/users/${userId}`, { body, ...opts });
        return response;
    }
    update(
        _body: WorkspaceMemberUpdateParams,
        params?: ApiClientInterface,
        opts?: RequestOptions
    ): APIPromise<any> {
        const body = _body;
        const workspaceId = body.workspaceId;
        const userId = _body.userId;
        delete body.workspaceId;
        if (params) {
            this.client.customHeaders = { ...this.client.customHeaders, ...createHeaders({ ...params }) }
        }
        const response = this.put<any>(`/admin/workspaces/${workspaceId}/users/${userId}`, { body, ...opts });
        return response;
    }
}