import { ApiResource } from "../apiResource";
import { APIPromise, RequestOptions } from "../baseClient";
import { Stream } from "../streaming";


export class Post extends ApiResource {
    create(
        url: string,
        _body: PostBodyNonStreaming,
        opts?: RequestOptions
    ): APIPromise<PostResponse>;
    create(
        url: string,
        _body: PostBodyStreaming,
        opts?: RequestOptions
    ): APIPromise<Stream<PostResponse>>
    create(
        url: string,
        _body: Record<string, any>,
        opts?: RequestOptions,
    ): APIPromise<Stream<PostResponse>> | APIPromise<PostResponse>
    create(
        url: string,
        _body: PostBodyParams,
        opts?: RequestOptions
    ): APIPromise<PostResponse> | APIPromise<Stream<PostResponse>> {
        const body = _body
        const response = this.post<PostResponse>(url, { body, ...opts }) as
            | APIPromise<PostResponse>
            | APIPromise<Stream<PostResponse>>
        return response
    }
}

export type PostResponse = Record<string, any>

export interface PostBodyStreaming extends Record<string, any> {
    stream?: true;
}

export interface PostBodyNonStreaming extends Record<string, any> {
    stream?: false;
}

export type PostBodyParams = PostBodyNonStreaming | PostBodyStreaming;
