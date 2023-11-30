import { ModelParams } from "../_types/portkeyConstructs";
import { ApiResource } from "../apiResource";
import { APIPromise, RequestOptions } from "../baseClient";
import { Stream } from "../streaming";

export class Generations extends ApiResource {
	create(
		_body: GenerationsBody,
		opts?: RequestOptions
	): APIPromise<Generation> {
		const warning = "This API has been deprecated. Please use the Prompt API for the saved prompt."
		console.warn(warning)
		const body = { "variables": _body.variables }
		return this.post<Generation>(`/v1/prompts/${_body.promptId}/generate`, { body, ...opts })
	}
}

export interface GenerationsBody extends ModelParams {
	promptId: string;
	variables?: Record<string, any>;
}

export interface Generation {
	success: boolean;
	data: Record<string, any>;
}

export interface PromptBodyBase extends ModelParams {
	promptId?: string;
	variables?: Record<string, any>;
}

export interface PromptsCreateStreaming extends PromptBodyBase {
	stream?: true;
}

export interface PromptsCreateNonStreaming extends PromptBodyBase {
	stream?: false;
}

export type PromptsCreateParams = PromptsCreateNonStreaming | PromptsCreateStreaming

type PromptsResponse = Record<string, any>;
export class Prompt extends ApiResource {
	create(
		_body: PromptsCreateNonStreaming,
		opts?: RequestOptions
	): APIPromise<PromptsCreateNonStreaming>;
	create(
		_body: PromptsCreateStreaming,
		opts?: RequestOptions
	): APIPromise<Stream<PromptsCreateStreaming>>;
	create(
		_body: PromptsCreateParams,
		opts?: RequestOptions,
	): APIPromise<Stream<PromptsCreateStreaming> | PromptsCreateNonStreaming>;
	create(
		_body: PromptsCreateParams,
		opts?: RequestOptions
	): APIPromise<PromptsResponse> | APIPromise<Stream<PromptsResponse>> {
		const promptId = _body.promptId
		const body = _body
		const stream = _body.stream ?? false
		delete body.promptId
		const response = this.post<PromptsResponse>(`/v1/prompts/${promptId}/completions`, { body, ...opts, stream }) as
			| APIPromise<PromptsResponse>
			| APIPromise<Stream<PromptsResponse>>
		return response
	}
}