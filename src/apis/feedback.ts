import { FEEDBACK_API } from "portkey-ai/constants";
import { ApiResource } from "../apiResource";
import { APIPromise, RequestOptions } from "../baseClient";

interface FeedbackBodyBase {
    trace_id?: string;
    value?: string;
    weight?: string;
    metadata?: Record<string, any>
}

type FeedbackBody = FeedbackBodyBase | Array<FeedbackBodyBase>

export interface FeedbackResponse {
    status: string;
    message: string;
}

export class Feedback extends ApiResource {
    create(
        _body: FeedbackBody,
        opts?: RequestOptions
    ): APIPromise<FeedbackResponse> {
        const body = _body
        const response = this.post<FeedbackResponse>(FEEDBACK_API, { body, ...opts })
        return response
    }
}
