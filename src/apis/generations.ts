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

export interface Functions {
	name?: Optional<string>;
	description?: Optional<string>;
	parameters?: Optional<object>;
}

export interface Tool{
	function?: Optional<Functions>;
	type?: Optional<string>;
}

export interface Messages {
	content?: Optional<string>;
	role?: Optional<string>;
}
  
export type PromptsCreateParams = PromptsCreateNonStreaming | PromptsCreateStreaming

type PromptsResponse = Record<string, any> & APIResponseType;

type Optional<T> = T | null | undefined;

type PromptRenderResponse = {
	success: boolean;
	data: {
		messages?: Optional<Messages[]>;
		prompt?: Optional<string>;
		model?: Optional<string>;
		suffix?: Optional<string>;
		max_tokens?: Optional<number>;
		temperature?: Optional<number>;
		top_k?: Optional<number>;
		top_p?: Optional<number>;
		n?: Optional<number>;
		stop_sequences?: Optional<string[]>;
		timeout?: Optional<number>;
		functions?: Optional<Functions[]>;
		function_call?: Optional<string | Functions>;
		logprobs?: Optional<boolean>;
		top_logprobs?: Optional<number>;
		echo?: Optional<boolean>;
		stop?: Optional<string | string[]>;
		presence_penalty?: Optional<number>;
		frequency_penalty?: Optional<number>;
		best_of?: Optional<number>;
		logit_bias?: Optional<{ [key: string]: number }>;
		user?: Optional<string>;
		organization?: Optional<string>;
		tool_choice?: Optional<string>;
		tools?: Optional<Tool[]>;
	};
  } & APIResponseType;

export class Prompt extends ApiResource {
	completions: PromptCompletions = new PromptCompletions(this.client);

	render(
		_body: PromptsCreateParams,
		params?: ApiClientInterface,
		opts?: RequestOptions
	): APIPromise<PromptRenderResponse> {
		const body = _body
		const promptId = _body.promptID
		
		if (params) {
			this.client.customHeaders = { ...this.client.customHeaders, ...createHeaders({ ...params }) }
		}
		const response = this.post<PromptRenderResponse>(`/prompts/${promptId}/render`, { body, ...opts }) 
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
