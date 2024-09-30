import { ApiResource } from "../apiResource";
import { APIResponseType, ApiClientInterface } from "../_types/generalTypes";
import { APIPromise, RequestOptions } from "../baseClient";
import { createHeaders } from "./createHeaders";

export interface ApiKeysCreateParams {
	type?: string;
	"sub-type"?: string;
    name?: string;
    description?: string;
    workspace_id?:string;
    user_id?:string;
    rate_limits?: Record<string, unknown>[];
    usage_limits?: Record<string, unknown>;
    scopes: string[];
    defaults?: Record<string, unknown>;
}

export interface ApiKeysRetrieveParams {
    id?: string;
}

export interface ApiKeysUpdateParams {
	id?: string;
	name?: string;
    description?: string;
    rate_limits?: Record<string, unknown>[];
    usage_limits?: Record<string, unknown>;
    scopes?: string[];
    defaults?: Record<string, unknown>;
}
export interface ApiKeysListParams {
    page_size?: number;
    current_page?: number;
    workspace_id?: string;
}
export interface ApiKeysDeleteParams {
    id?: string;
}
export interface ApiKeysCreateResponse extends APIResponseType {
	id?: string;
    key?: string;
    object?: string;
}
export interface ApiKeysRetrieveResponse extends APIResponseType {
    id?: string;
    key?: string;
    name?: string;
    description?: string;
    type?: string;
    organisation_id?: string;
    workspace_id?: string;
    user_id?: string;
    status?: string;
    created_at?: Date;
    last_updated_at?: Date;
    creation_mode?: string;
    rate_limits?: Record<string, unknown>[];
    usage_limits?: Record<string, unknown>;
    reset_usage?:number;
    scopes?: string[];
    defaults?: Record<string, unknown>;
    object?: string;
}
export interface ApiKeysListResponse extends APIResponseType {
    total?: number;
    object?: string;
    data?: Record<string, unknown>[];
}
export interface ApiKeysUpdateResponse extends APIResponseType {
    object?: string;
    total?:number;
    data?: Record<string, unknown>[];
}
function toQueryParams(params?: ApiKeysListParams): string {
    if (!params) {
        return '';
    }
    const queryParams = Object.entries(params)
        .filter(([, value]) => value !== undefined && value !== null)
        .map(([key, value]) => `${key}=${value}`)
        .join('&');
    
    return queryParams ? `?${queryParams}` : '';
}
export class ApiKeys extends ApiResource {
    constructor(client: any) {
        super(client);
    }
	create(
		_body: ApiKeysCreateParams,
		params?: ApiClientInterface,
		opts?: RequestOptions
	): APIPromise<ApiKeysCreateResponse> {
		const body = _body;
        const type = body.type;
        const subType = body["sub-type"];
		if (params) {
			this.client.customHeaders = { ...this.client.customHeaders, ...createHeaders({ ...params }) }
		}
		const response = this.post<ApiKeysCreateResponse>(`/api-keys/${type}/${subType}`, { body, ...opts });
		return response;
	}

	retrieve(
		_body: ApiKeysRetrieveParams,
		params?: ApiClientInterface,
		opts?: RequestOptions
	): APIPromise<ApiKeysRetrieveResponse> {
		const body = _body;
		const id = body.id;
		if (params) {
			this.client.customHeaders = { ...this.client.customHeaders, ...createHeaders({ ...params }) }
		}
		const response = this.get<ApiKeysRetrieveResponse>(`/api-keys/${id}`, { body, ...opts });
		return response;
	}

	update(
		_body: ApiKeysUpdateParams,
		params?: ApiClientInterface,
		opts?: RequestOptions
	): APIPromise<ApiKeysUpdateResponse> {
		const body = _body;
		const id = body.id;
		if (params) {
			this.client.customHeaders = { ...this.client.customHeaders, ...createHeaders({ ...params }) }
		}
		const response = this.put<ApiKeysUpdateResponse>(`/api-keys/${id}`, { body, ...opts });
		return response;
	}
    list(
        _body: ApiKeysListParams,
		params?: ApiClientInterface,
		opts?: RequestOptions
    ):APIPromise<ApiKeysListResponse>{
        const body = _body;
		if (params) {
			this.client.customHeaders = { ...this.client.customHeaders, ...createHeaders({ ...params }) }
		}
        const query = toQueryParams(body);
        const response = this.get<ApiKeysListResponse>(`/api-keys${query}`, { body, ...opts });
        return response;
    }
    delete(
        _body: ApiKeysDeleteParams,
		params?: ApiClientInterface,
		opts?: RequestOptions
    ):APIPromise<any>{
        const body = _body;
        const id=body.id;
		if (params) {
			this.client.customHeaders = { ...this.client.customHeaders, ...createHeaders({ ...params }) }
		}
        const response = this.deleteMethod<any>(`/api-keys/${id}`, { body, ...opts });
        return response;
    }
}
