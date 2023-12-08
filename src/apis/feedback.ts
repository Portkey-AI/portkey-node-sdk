import { APIResponseType, ApiClientInterface } from "../_types/generalTypes";
import { ApiResource } from "../apiResource";
import { APIPromise, RequestOptions } from "../baseClient";
import { FEEDBACK_API } from "../constants";
import { overrideConfig } from "../utils";
import { createHeaders } from "./createHeaders";

interface FeedbackBodyBase {
    traceID?: string;
    value?: number;
    weight?: number;
    metadata?: Record<string, any>
}

type FeedbackBody = FeedbackBodyBase | Array<FeedbackBodyBase>

export interface FeedbackResponse extends APIResponseType {
    status: string;
    message: string;
}

export class Feedback extends ApiResource {
    create(
        _body: FeedbackBody,
        params?: ApiClientInterface,
        opts?: RequestOptions
    ): APIPromise<FeedbackResponse> {
        const body = _body
        if (params) {
            const config = overrideConfig(this.client.config, params.config)
            this.client.customHeaders = { ...this.client.customHeaders, ...createHeaders({ ...params, config }) }
        }
        const response = this.post<FeedbackResponse>(FEEDBACK_API, { body, ...opts })
        return response
    }
}
