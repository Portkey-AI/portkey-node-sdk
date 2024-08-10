import { BatchCreateParams, BatchListParams } from "openai/resources/batches";
import { ApiClientInterface } from "../_types/generalTypes";
import { ApiResource } from "../apiResource";
import { RequestOptions } from "../baseClient";
import { OPEN_AI_API_KEY } from "../constants";
import { defaultHeadersBuilder, finalResponse, overrideConfig } from "../utils";
import { createHeaders } from "./createHeaders";
import OpenAI from "openai";

export class Batches extends ApiResource{

    async create(
        _body: BatchCreateParams,
        params?: ApiClientInterface,
        opts?: RequestOptions
    ): Promise<any> {
        const body: BatchCreateParams = _body;
        if (params) {
            const config = overrideConfig(this.client.config, params.config);
            this.client.customHeaders = {
                ...this.client.customHeaders,
                ...createHeaders({ ...params, config }),
            };
        }

        const OAIclient = new OpenAI({
            apiKey: OPEN_AI_API_KEY,
            baseURL: this.client.baseURL,
            defaultHeaders: defaultHeadersBuilder(this.client),
        });

        const result = await OAIclient.batches.create(body, opts).withResponse();
        return finalResponse(result);
    }

    async retrieve(
        batchId: string,
        params?: ApiClientInterface,
        opts?: RequestOptions
    ): Promise<any> {
        if (params) {
            const config = overrideConfig(this.client.config, params.config);
            this.client.customHeaders = {
                ...this.client.customHeaders,
                ...createHeaders({ ...params, config }),
            };
        }

        const OAIclient = new OpenAI({
            apiKey: OPEN_AI_API_KEY,
            baseURL: this.client.baseURL,
            defaultHeaders: defaultHeadersBuilder(this.client),
        });

        const result = await OAIclient.batches.retrieve(batchId, opts).withResponse();
        return finalResponse(result);
    }

    async list(
       _query?: BatchListParams,
       params?: ApiClientInterface,
       opts?: RequestOptions
    ): Promise<any> {
        const query: BatchListParams | undefined = _query;
        if (params) {
            const config = overrideConfig(this.client.config, params.config);
            this.client.customHeaders = {
                ...this.client.customHeaders,
                ...createHeaders({ ...params, config }),
            };
        }

        const OAIclient = new OpenAI({
            apiKey: OPEN_AI_API_KEY,
            baseURL: this.client.baseURL,
            defaultHeaders: defaultHeadersBuilder(this.client),
        });

        const result = await OAIclient.batches.list(query, opts).withResponse();
        return finalResponse(result);
    }

    async cancel(
        batchId: string,
        params?: ApiClientInterface,
        opts?: RequestOptions
    ): Promise<any> {
        if (params) {
            const config = overrideConfig(this.client.config, params.config);
            this.client.customHeaders = {
                ...this.client.customHeaders,
                ...createHeaders({ ...params, config }),
            };
        }

        const OAIclient = new OpenAI({
            apiKey: OPEN_AI_API_KEY,
            baseURL: this.client.baseURL,
            defaultHeaders: defaultHeadersBuilder(this.client),
        });
        const body = {}
        const options = { body, ...opts }

        const result = await OAIclient.batches.cancel(batchId, options).withResponse();
        return finalResponse(result);
    }
}

