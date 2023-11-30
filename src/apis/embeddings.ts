import { ModelParams } from "../_types/portkeyConstructs";
import { ApiResource } from "../apiResource";
import { APIPromise, RequestOptions } from "../baseClient";
import { EMBEDDINGS_API } from "../constants";


export interface EmbeddingsBody extends ModelParams {
    input: string;
    model?: string;
}

export type Embeddings = Record<string, any>

export class Prompt extends ApiResource {
    create(
        _body: EmbeddingsBody,
        opts?: RequestOptions
    ): APIPromise<Embeddings> {
        const body = _body
        const response = this.post<Embeddings>(EMBEDDINGS_API, { body, ...opts })
        return response
    }
}


