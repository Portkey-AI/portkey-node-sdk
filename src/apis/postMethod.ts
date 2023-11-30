import { ApiResource } from "../apiResource";
import { APIPromise, RequestOptions } from "../baseClient";



export class Post extends ApiResource {
    create(
        url: string,
        _body: Record<string, any>,
        opts?: RequestOptions
    ): APIPromise<Record<string, any>> {
        const body = _body
        const response = this.post<Record<string, any>>(url, { body, ...opts })
        return response
    }
}
