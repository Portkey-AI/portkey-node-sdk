import { ApiResource } from "../apiResource";
import { APIResponseType, ApiClientInterface } from "../_types/generalTypes";
import { APIPromise, RequestOptions } from "../baseClient";
import { createHeaders } from "./createHeaders";

export interface ConfigCreateParams {
	name?: string;
	config?: Record<string, unknown>;
    isDefault?: number;
    workspace_id?:string;
}

export interface ConfigRetrieveParams {
	slug: string?;
}

export interface ConfigUpdateParams {
	slug: string;
	name: string;
    config: Record<string, unknown>;
    status: string;
}

export interface ConfigCreateResponse extends APIResponseType {
	success: boolean;
	data: Record<string, unknown>;
}
export interface ConfigRetrieveResponse extends APIResponseType {
    success: boolean;
    data: Record<string, unknown>;
}
export interface ConfigListResponse extends APIResponseType {
    sucess: boolean;
    data: Record<string, unknown>[];
}
export interface ConfigUpdateResponse extends APIResponseType {
    success: boolean;
    data: Record<string, unknown>;
}
export class Configs extends ApiResource {
    constructor(client: any) {
        super(client);
    }
	create(
		_body: ConfigCreateParams,
		params?: ApiClientInterface,
		opts?: RequestOptions
	): APIPromise<ConfigCreateResponse> {
		const body = _body;
		if (params) {
			this.client.customHeaders = { ...this.client.customHeaders, ...createHeaders({ ...params }) }
		}
		const response = this.post<ConfigCreateResponse>('/configs', { body, ...opts });
		return response;
	}

	retrieve(
		_body: ConfigRetrieveParams,
		params?: ApiClientInterface,
		opts?: RequestOptions
	): APIPromise<ConfigRetrieveResponse> {
		const body = _body;
		const slug = body.slug;
		if (params) {
			this.client.customHeaders = { ...this.client.customHeaders, ...createHeaders({ ...params }) }
		}
		const response = this.get<ConfigRetrieveResponse>(`/configs/${slug}`, { body, ...opts });
		return response;
	}

	update(
		_body: ConfigUpdateParams,
		params?: ApiClientInterface,
		opts?: RequestOptions
	): APIPromise<ConfigUpdateResponse> {
		const body = _body;
		const slug = body.slug;
		if (params) {
			this.client.customHeaders = { ...this.client.customHeaders, ...createHeaders({ ...params }) }
		}
		const response = this.put<ConfigUpdateResponse>(`/configs/${slug}`, { body, ...opts });
		return response;
	}
    list():APIPromise<ConfigListResponse>{
        const response = this.get<ConfigListResponse>('/configs', {});
        return response;
    }
}

