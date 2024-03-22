import { APIResponseType, ApiClientInterface } from "../_types/generalTypes";
import { ModelParams } from "../_types/portkeyConstructs";
import { ApiResource } from "../apiResource";
import { APIPromise, RequestOptions } from "../baseClient";
import { Stream } from "../streaming";
import { overrideConfig } from "../utils";
import { createHeaders } from "./createHeaders";

export class Generations extends ApiResource {
	create(
		_body: GenerationsBody,
		opts?: RequestOptions
	): APIPromise<Generation> {
		const warning = "This API has been deprecated. Please use the Prompt API for the saved prompt."
		console.warn(warning)
		const body = { "variables": _body.variables }
		return this.post<Generation>(`/v1/prompts/${_body.promptID}/generate`, { body, ...opts })
	}
}

export interface GenerationsBody extends ModelParams {
	promptID: string;
	variables?: Record<string, any>;
}

export interface Generation extends APIResponseType {
	success: boolean;
	data: Record<string, any>;
}

export interface PromptBodyBase extends ModelParams {
	promptID?: string;
	variables?: Record<string, any>;
}

export interface PromptsCreateStreaming extends PromptBodyBase {
	stream?: true;
}

export interface PromptsCreateNonStreaming extends PromptBodyBase {
	stream?: false;
}

export type PromptsCreateParams = PromptsCreateNonStreaming | PromptsCreateStreaming

type PromptsResponse = Record<string, any> & APIResponseType;

export class Prompt extends ApiResource {
	completions: PromptCompletions = new PromptCompletions(this.client);

	render(
		_body: PromptsCreateNonStreaming,
		params?: ApiClientInterface,
		opts?: RequestOptions
	): APIPromise<PromptsResponse> {
		const body = _body
		if (params) {
			this.client.customHeaders = { ...this.client.customHeaders, ...createHeaders({ ...params }) }
		}
		const promptId = _body.promptID
		const response = this.post<PromptsResponse>(`/prompts/${promptId}/render`, { body, ...opts }) 
		return response
	}
}


export class PromptCompletions extends ApiResource {
	create(
		_body: PromptsCreateNonStreaming,
		params?: ApiClientInterface,
		opts?: RequestOptions
	): APIPromise<PromptsResponse>;
	create(
		_body: PromptsCreateStreaming,
		params?: ApiClientInterface,
		opts?: RequestOptions
	): APIPromise<Stream<PromptsResponse>>;
	create(
		_body: PromptsCreateParams,
		params?: ApiClientInterface,
		opts?: RequestOptions,
	): APIPromise<Stream<PromptsResponse> | PromptsResponse>;
	create(
		_body: PromptsCreateParams,
		params?: ApiClientInterface,
		opts?: RequestOptions
	): APIPromise<PromptsResponse> | APIPromise<Stream<PromptsResponse>> {
		if (params) {
			const config = overrideConfig(this.client.config, params.config)
			this.client.customHeaders = { ...this.client.customHeaders, ...createHeaders({ ...params, config }) }
		}
		const promptId = _body.promptID
		const body = _body
		const stream = _body.stream ?? false
		delete body.promptID
		body.stream = stream
		const response = this.post<PromptsResponse>(`/prompts/${promptId}/completions`, { body, ...opts, stream }) as
			| APIPromise<PromptsResponse>
			| APIPromise<Stream<PromptsResponse>>
		return response
	}
}
