import { ApiResource } from "../apiResource";
import { APIResponseType, ApiClientInterface } from "../_types/generalTypes";
import { APIPromise, RequestOptions } from "../baseClient";
import { createHeaders } from "./createHeaders";

export interface VirtualKeysAddParams {
    name?: string;
    provider?: string;
    key?: string;
    note?: string | null;
    apiVersion?: string | null;
    resourceName?: string | null;
    deploymentName?: string | null;
    workspace_id?: string;
    usage_limits?: Record<string, unknown>;
}

export interface VirtualKeysListParams {
    workspace_id?: string;
}

export interface VirtualKeysGetParams {
    slug?: string;
}

export interface VirtualKeysUpdateParams {
    slug?: string;
    name?: string;
    key?: string;
    note?: string | null;
    usage_limits?: Record<string, unknown>;
    rate_limits?: Record<string, unknown>[];
}

export interface VirtualKeysDeleteParams {
    slug?: string;
}

export interface UsageLimits {
    credit_limit?: number;
    periodic_reset?: string;
    alert_threshold?: number;
}

export interface VirtualKeysAddResponse extends APIResponseType {
    id?: string;
    slug?:string;
    object?: string;
}

export interface VirtualKeysListResponse extends APIResponseType {
    object?:string,
    total?:number,
    data?: VirtualKeysGetResponse[];
}

export interface VirtualKeysGetResponse extends APIResponseType {
    id: string,
    ai_provider_name: string,
    model_config: Record<string, unknown>,
    masked_api_key: string,
    slug: string,
    name: string,
    usage_limits: Record<string, unknown>,
    status: string,
    note: null|string,
    created_at: Date,
    rate_limits: Record<string, unknown>[],
    object: string,
}

export interface VirtualKeysUpdateResponse extends APIResponseType {
    id?:string;
    slug?:string;
    object?: string;
}
function toQueryParams(params?: VirtualKeysListParams): string {
    if (!params) {
        return '';
    }
    const queryParams = Object.entries(params)
        .filter(([, value]) => value !== undefined && value !== null)
        .map(([key, value]) => `${key}=${value}`)
        .join('&');

    return queryParams ? `?${queryParams}` : '';
}

export class VirtualKeys extends ApiResource {
    constructor(client: any) {
        super(client);
    }

    add(
        body: VirtualKeysAddParams,
        params?: ApiClientInterface,
        opts?: RequestOptions
    ): APIPromise<VirtualKeysAddResponse> {
        if (params) {
            this.client.customHeaders = { ...this.client.customHeaders, ...createHeaders({ ...params }) }
        }
        const response = this.post<VirtualKeysAddResponse>('/virtual-keys', { body, ...opts });
        return response;
    }

    list(
        _body?: VirtualKeysListParams,
        params?: ApiClientInterface,
        opts?: RequestOptions
    ): APIPromise<VirtualKeysListResponse> {
        const body=_body;
        if (params) {
            this.client.customHeaders = { ...this.client.customHeaders, ...createHeaders({ ...params }) }
        }
        const query = toQueryParams(body);
        const response = this.getMethod<VirtualKeysListResponse>(`/virtual-keys${query}`, { ...opts });
        return response;
    }

    get(
        body: VirtualKeysGetParams,
        params?: ApiClientInterface,
        opts?: RequestOptions
    ): APIPromise<VirtualKeysGetResponse> {
        const { slug } = body;
        if (params) {
            this.client.customHeaders = { ...this.client.customHeaders, ...createHeaders({ ...params }) }
        }
        const response = this.getMethod<VirtualKeysGetResponse>(`/virtual-keys/${slug}`, { ...opts });
        return response;
    }

    update(
        body: VirtualKeysUpdateParams,
        params?: ApiClientInterface,
        opts?: RequestOptions
    ): APIPromise<VirtualKeysUpdateResponse> {
        const { slug, ...restBody } = body;
        if (params) {
            this.client.customHeaders = { ...this.client.customHeaders, ...createHeaders({ ...params }) }
        }
        const response = this.put<VirtualKeysUpdateResponse>(`/virtual-keys/${slug}`, { body: restBody, ...opts });
        return response;
    }

    delete(
        body: VirtualKeysDeleteParams,
        params?: ApiClientInterface,
        opts?: RequestOptions
    ): APIPromise<any> {
        const { slug } = body;
        if (params) {
            this.client.customHeaders = { ...this.client.customHeaders, ...createHeaders({ ...params }) }
        }
        const response = this.deleteMethod<any>(`/virtual-keys/${slug}`, { ...opts });
        return response;
    }
}