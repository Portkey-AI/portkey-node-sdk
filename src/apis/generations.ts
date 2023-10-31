import { ModelParams } from "../_types/portkeyConstructs";
import { ApiResource } from "../apiResource";
import { APIPromise, RequestOptions } from "../baseClient";

export class Generations extends ApiResource {
    create(
        _body: GenerationsBody,
        opts?: RequestOptions
    ): APIPromise<Generation> {
        const config = this.client.config || {
            mode: this.client.mode,
            options: this.client.llms
        }
        const body = { "variables": _body.variables }
        return this.post<Generation>(`/v1/prompts/${_body.promptId}/generate`, { body, ...opts })
    }
}

export interface GenerationsBody extends ModelParams {
    promptId: string;
    variables?: Record<string, any>
}

export interface Generation {
    success: boolean,
    data: Record<string, any>
}
