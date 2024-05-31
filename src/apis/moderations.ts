import { ModerationCreateParams } from "openai/resources";
import { ApiClientInterface } from "../_types/generalTypes";
import { ApiResource } from "../apiResource";
import { RequestOptions } from "../baseClient";
import { OPEN_AI_API_KEY } from "../constants";
import { defaultHeadersBuilder, finalResponse, overrideConfig } from "../utils";
import { createHeaders } from "./createHeaders";
import OpenAI from "openai";


export class Moderations extends ApiResource{
    async create(_body: ModerationCreateParams,
        params?: ApiClientInterface,
        opts?: RequestOptions
    ): Promise<any> {
        const body: ModerationCreateParams = _body;
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

        const result = await OAIclient.moderations.create(body, opts).withResponse();
        return finalResponse(result);
    }
}