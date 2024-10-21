import { ApiResource } from "../apiResource";
import { APIResponseType, ApiClientInterface } from "../_types/generalTypes";
import { APIPromise, RequestOptions } from "../baseClient";
import { createHeaders } from "./createHeaders";
import { toQueryParams } from "../utils";

export interface LogsExportCreateParams {
    filters?:Record<string,any>;
    workspace_id?:string;
    description?:string;
    requested_data?:string[];
}
export interface LogsExportCreateResponse extends APIResponseType {
    id?:string;
    total?:number;
    object?:string;
}
export interface LogsExportListParams{
    workspace_id?:string;
}
export interface LogsExportListResponse extends APIResponseType {
    object?:string;
    total?: number;
    data?: Record<string,any>[];
}
export interface LogsExportUpdateParams{
    exportId?:string;
    workspace_id?:string;
    filters?:Record<string,any>;
    requested_data?:string[];
}
export interface LogsExportUpdateResponse extends APIResponseType{
    id?:string;
    total?:number;
    object?:string;
}
export interface LogsExportCancelParams {
    exportId?:string;
}
export interface LogsExportCancelResponse extends APIResponseType{
    message?:string;
    object?:string;
}
export interface LogsExportRetrieveParams {
    exportId:string;
}
export interface LogsExportRetrieveResponse extends APIResponseType{
    id?:string;
    organisation_id?: string;
    filters?:Record<string,any>; 
    requested_data?:string[];
    status?:string;
    description?:string;
    created_at?: Date;
    last_updated_at?:Date;
    created_by?: string;
    workspace_id?:string;
    total_records?:number;
    object?:string;
}
export interface LogsExportStartParams{
    exportId?:string;
}
export interface LogsExportStartResponse extends APIResponseType{
   message?:string;
   object?:string;
}
export interface LogsExportDownloadParams{
    exportId?: string;   
}
export interface LogsExportDownloadResponse extends APIResponseType{
    signed_url?:string;
}

export class LogsExport extends ApiResource {
    create(
        _body:LogsExportCreateParams,
        params?:ApiClientInterface,
        opts?:RequestOptions
    ):APIPromise<LogsExportCreateResponse>{
        const body = _body;
		if (params) {
			this.client.customHeaders = { ...this.client.customHeaders, ...createHeaders({ ...params }) }
		}
		const response = this.post<LogsExportCreateResponse>('/logs/exports', { body, ...opts });
		return response;
    }
    retrieve(
        _body:LogsExportRetrieveParams,
        params?: ApiClientInterface,
		opts?: RequestOptions
    ): APIPromise<LogsExportRetrieveResponse> {
		const body = _body;
		const exportId = body.exportId;
		if (params) {
			this.client.customHeaders = { ...this.client.customHeaders, ...createHeaders({ ...params }) }
		}
		const response = this.getMethod<LogsExportRetrieveResponse>(`/logs/exports/${exportId}`, {  ...opts });
		return response;
	}
    list(
        _body:LogsExportListParams,
        params?: ApiClientInterface,
		opts?: RequestOptions
    ): APIPromise<LogsExportListResponse>{
        const body = _body;
        const query = toQueryParams(body);
        if (params) {
            this.client.customHeaders = { ...this.client.customHeaders, ...createHeaders({ ...params }) }
        }
        const response = this.getMethod<LogsExportListResponse>(`/logs/exports${query}`, {...opts});
        return response;
    }
    update(
		_body: LogsExportUpdateParams,
		params?: ApiClientInterface,
		opts?: RequestOptions
	): APIPromise<LogsExportUpdateResponse> {
		const body = _body;
		const exportId = body.exportId;
		if (params) {
			this.client.customHeaders = { ...this.client.customHeaders, ...createHeaders({ ...params }) }
		}
		const response = this.put<LogsExportUpdateResponse>(`/logs/exports/${exportId}`, { body, ...opts });
		return response;
	}
    start(
        _body:LogsExportStartParams,
        params?:ApiClientInterface,
        opts?:RequestOptions
    ): APIPromise<LogsExportStartResponse>{
        const body = _body
        const exportId = body.exportId;
		if (params) {
			this.client.customHeaders = { ...this.client.customHeaders, ...createHeaders({ ...params }) }
		}
		const response = this.post<LogsExportStartResponse>(`/logs/exports/${exportId}/start`, { body, ...opts });
		return response;
    }
    cancel(
        _body:LogsExportCancelParams,
        params?:ApiClientInterface,
        opts?:RequestOptions
    ): APIPromise<LogsExportCancelResponse>{
        const body=_body;
        const exportId=body.exportId;
        if (params) {
			this.client.customHeaders = { ...this.client.customHeaders, ...createHeaders({ ...params }) }
		}
        const response = this.post<LogsExportCancelResponse>(`/logs/exports/${exportId}/cancel`, { body, ...opts });
		return response;
    }
    download(
        _body: LogsExportDownloadParams,
        params?:ApiClientInterface,
        opts?:RequestOptions
    ): APIPromise<LogsExportDownloadResponse>{
        const body=_body;
        const exportId=body.exportId;
        if (params) {
			this.client.customHeaders = { ...this.client.customHeaders, ...createHeaders({ ...params }) }
		}
        const response = this.getMethod<LogsExportDownloadResponse>(`/logs/exports/${exportId}/download`, { body, ...opts });
		return response;
    }
}