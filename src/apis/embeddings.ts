import { log } from "console";
import Portkey from "..";
import { APIResponseType, ApiClientInterface } from "../_types/generalTypes";
import { ModelParams } from "../_types/portkeyConstructs";
import { ApiResource } from "../apiResource";
import { APIPromise, RequestOptions } from "../baseClient";
import { EMBEDDINGS_API, OPEN_AI_API_KEY, PORTKEY_DEV_BASE_URL } from "../constants";
import { overrideConfig } from "../utils";
import { createHeaders } from "./createHeaders";
import OpenAI from 'openai';

export interface EmbeddingsBody extends ModelParams {
    input: string | Array<string> | Array<number> | Array<Array<number>>;
    model: (string & {}) | 'text-embedding-ada-002' | 'text-embedding-3-small' | 'text-embedding-3-large';
    dimensions?: number;
    encoding_format?: 'float' | 'base64';
    user?: string;
}

export type EmbeddingsResponse = Record<string, any> & APIResponseType

export class Embeddings extends ApiResource {
    create(
        _body: EmbeddingsBody,
        params?: ApiClientInterface,
        opts?: RequestOptions
    ): APIPromise<EmbeddingsResponse> {
        const body = _body
        if (params) {
            const config = overrideConfig(this.client.config, params.config)
            this.client.customHeaders = { ...this.client.customHeaders, ...createHeaders({ ...params, config }) }
        }
        const response = this.post<EmbeddingsResponse>(EMBEDDINGS_API, { body, ...opts })
        return response
    }
}
