import { ApiResource } from "../apiResource";
import { APIResponseType, ApiClientInterface } from "../_types/generalTypes";
import { APIPromise, RequestOptions } from "../baseClient";
import { createHeaders } from "./createHeaders";

export interface ApiKeysCreateParams {
	name: string;
	config: Record<string, unknown>;
    isDefault: number;
    workspace_id:string;
}

export interface ApiKeysRetrieveParams {
	slug: string;
}

export interface ApiKeysUpdateParams {
	slug?: string;
	name?: string;
    config?: Record<string, unknown>;
    status?: string;
}
export interface ApiKeysListParams {
    page_size?: number;
    current_page?: number;
    workspace_id?: string;
}

export interface ApiKeysCreateResponse extends APIResponseType {
	success: boolean;
	data: Record<string, unknown>;
}
export interface ApiKeysRetrieveResponse extends APIResponseType {
    success: boolean;
    data: Record<string, unknown>;
}
export interface ApiKeysListResponse extends APIResponseType {
    sucess: boolean;
    data: Record<string, unknown>[];
}
export interface ApiKeysUpdateResponse extends APIResponseType {
    success: boolean;
    data: Record<string, unknown>;
}
function toQueryParams(params?: ApiKeysListResponse): string {
    if (!params) {
        return '';
    }
    const queryParams = Object.entries(params)
        .filter(([, value]) => value !== undefined && value !== null)
        .map(([key, value]) => `${key}=${value}`)
        .join('&');
    
    return queryParams ? `?${queryParams}` : '';
}
export class Configs extends ApiResource {
    constructor(client: any) {
        super(client);
    }
	create(
		_body: ApiKeysCreateParams,
		params?: ApiClientInterface,
		opts?: RequestOptions
	): APIPromise<ApiKeysCreateResponse> {
		const body = _body;
		if (params) {
			this.client.customHeaders = { ...this.client.customHeaders, ...createHeaders({ ...params }) }
		}
		const response = this.post<ApiKeysCreateResponse>('/configs', { body, ...opts });
		return response;
	}

	retrieve(
		_body: ApiKeysRetrieveParams,
		params?: ApiClientInterface,
		opts?: RequestOptions
	): APIPromise<ApiKeysRetrieveResponse> {
		const body = _body;
		const slug = body.slug;
		if (params) {
			this.client.customHeaders = { ...this.client.customHeaders, ...createHeaders({ ...params }) }
		}
		const response = this.get<ApiKeysRetrieveResponse>(`/configs/${slug}`, { body, ...opts });
		return response;
	}

	update(
		_body: ApiKeysUpdateParams,
		params?: ApiClientInterface,
		opts?: RequestOptions
	): APIPromise<ApiKeysUpdateResponse> {
		const body = _body;
		const slug = body.slug;
		if (params) {
			this.client.customHeaders = { ...this.client.customHeaders, ...createHeaders({ ...params }) }
		}
		const response = this.put<ApiKeysUpdateResponse>(`/configs/${slug}`, { body, ...opts });
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
        const response = this.get<ApiKeysListResponse>('/configs', { body, ...opts });
        return response;
    }
}
