import { ModelParams } from "../_types/portkeyConstructs";
import { ApiResource } from "../apiResource";
import { APIPromise, RequestOptions } from "../baseClient";
import { PROMPT_API } from "../constants";

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

export class Prompt extends ApiResource {
    create(
        _body: GenerationsBody,
        opts?: RequestOptions
    ): APIPromise<Generation> {
        const body = { "variables": _body.variables }
        const response = this.post<Generation>(PROMPT_API, { body, ...opts })
        return response
    }
}