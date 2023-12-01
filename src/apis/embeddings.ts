import { ApiClientInterface } from "portkey-ai/_types/generalTypes";
import { ModelParams } from "../_types/portkeyConstructs";
import { ApiResource } from "../apiResource";
import { APIPromise, RequestOptions } from "../baseClient";
import { EMBEDDINGS_API } from "../constants";
import { overrideConfig } from "../utils";
import { createHeaders } from "./createHeaders";

export interface EmbeddingsBody extends ModelParams {
    input: string;
    model?: string;
}

export type Embeddings = Record<string, any>

export class Prompt extends ApiResource {
    create(
        _body: EmbeddingsBody,
        params?: ApiClientInterface,
        opts?: RequestOptions
    ): APIPromise<Embeddings> {
        const body = _body
        if (params) {
            const config = overrideConfig(this.client.config, params.config)
            this.client.customHeaders = { ...this.client.customHeaders, ...createHeaders({ ...params, config }) }
        }
        const response = this.post<Embeddings>(EMBEDDINGS_API, { body, ...opts })
        return response
    }
}


