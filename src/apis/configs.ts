import { ApiResource } from "../apiResource";
import { APIResponseType, ApiClientInterface } from "../_types/generalTypes";
import { APIPromise, RequestOptions } from "../baseClient";
import { createHeaders } from "./createHeaders";

export interface ConfigsCreateParams {
	name?: string;
	config?: Record<string, unknown>;
    isDefault?: number;
    workspace_id?:string;
}
export interface ConfigsRetrieveParams {
	slug?: string;
}

export interface ConfigsUpdateParams {
	slug?: string;
	name?: string;
    config?: Record<string, unknown>;
    status?: string;
}

export interface ConfigsCreateResponse extends APIResponseType {
	id?: string;
	version_id?: string;
	slug?: string;
	object?: string;
}
export interface ConfigsRetrieveResponse extends APIResponseType {
    ide?: string;
	name?: string;
	workspace_id?: string;
	slug?: string;
	organization_id?: string;
	is_default?: number;
	status?: string;
	owner_id?: string;
	created_at?: string;
	updated_by?: string;
	last_updated_at?: string;
	config?: Record<string, unknown>;
	format?: string;
	type?: string;
	version_id?: string;
	object?: string;
}
export interface ConfigsListResponse extends APIResponseType {
    object?: boolean;
	total?: number;
    data?: Record<string, unknown>[];
}
export interface ConfigsUpdateResponse extends APIResponseType {
    version_id?: string;
    object?: string;
}
export class Configs extends ApiResource {
    constructor(client: any) {
        super(client);
    }
	create(
		_body: ConfigsCreateParams,
		params?: ApiClientInterface,
		opts?: RequestOptions
	): APIPromise<ConfigsCreateResponse> {
		const body = _body;
		if (params) {
			this.client.customHeaders = { ...this.client.customHeaders, ...createHeaders({ ...params }) }
		}
		const response = this.post<ConfigsCreateResponse>('/configs', { body, ...opts });
		return response;
	}

	retrieve(
		_body: ConfigsRetrieveParams,
		params?: ApiClientInterface,
		opts?: RequestOptions
	): APIPromise<ConfigsRetrieveResponse> {
		const body = _body;
		const slug = body.slug;
		if (params) {
			this.client.customHeaders = { ...this.client.customHeaders, ...createHeaders({ ...params }) }
		}
		const response = this.get<ConfigsRetrieveResponse>(`/configs/${slug}`, { body, ...opts });
		return response;
	}

	update(
		_body: ConfigsUpdateParams,
		params?: ApiClientInterface,
		opts?: RequestOptions
	): APIPromise<ConfigsUpdateResponse> {
		const body = _body;
		const slug = body.slug;
		if (params) {
			this.client.customHeaders = { ...this.client.customHeaders, ...createHeaders({ ...params }) }
		}
		const response = this.put<ConfigsUpdateResponse>(`/configs/${slug}`, { body, ...opts });
		return response;
	}
    list(
		_body?:any, //? will be removed when query params will be introduced
		params?: ApiClientInterface,
		opts?: RequestOptions
	):APIPromise<ConfigsListResponse>{
		const body = _body;
		if (params) {
            this.client.customHeaders = { ...this.client.customHeaders, ...createHeaders({ ...params }) }
        }
        const response = this.get<ConfigsListResponse>(`/configs`, { body, ...opts});
        return response;
    }
}

