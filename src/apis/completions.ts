import { APIResponseType, ApiClientInterface } from "../_types/generalTypes";
import { ModelParams } from "../_types/portkeyConstructs";
import { ApiResource } from "../apiResource";
import { APIPromise, RequestOptions } from "../baseClient";
import { OPEN_AI_API_KEY, PORTKEY_DEV_BASE_URL, TEXT_COMPLETE_API } from "../constants";
import { Stream } from "../streaming";
import { overrideConfig } from "../utils";
import { createHeaders } from "./createHeaders";
import OpenAI from 'openai';

export class Completions extends ApiResource {
    async create(
        _body: CompletionsBodyNonStreaming,
        params?: ApiClientInterface,
        opts?: RequestOptions
    ): Promise<TextCompletion>;
    async create(
        _body: CompletionsBodyStreaming,
        params?: ApiClientInterface,
        opts?: RequestOptions
    ): Promise<Stream<TextCompletion>>
    async create(
        _body: CompletionsBodyBase,
        params?: ApiClientInterface,
        opts?: RequestOptions,
    ): Promise<Stream<TextCompletion> | TextCompletion>;
    async create(
        _body: CompletionCreateParams,
        params?: ApiClientInterface,
        opts?: RequestOptions
    ): Promise<any>  {
        const body: CompletionCreateParams | CompletionsBodyBase | CompletionsBodyStreaming | CompletionsBodyNonStreaming  = _body
        // If config is present then override it.
        if (params) {
            const config = overrideConfig(this.client.config, params.config)
            this.client.customHeaders = { ...this.client.customHeaders, ...createHeaders({ ...params, config }) }
        }
        const stream = _body.stream ?? false


        const OAIclient = new OpenAI({
			apiKey: OPEN_AI_API_KEY,
			baseURL: PORTKEY_DEV_BASE_URL,
			defaultHeaders: this.client.customHeaders

		})
        const result =  await OAIclient.completions.create(body, opts)        
        return result;

        //  if(!stream){
        //      const result =  await OAIclient.completions.create(body, opts)
        //      return result ;
        //  }else{
        //     const final_response = []
        //      const result : any =  await OAIclient.completions.create(body, opts)
        //      return result
        //      for await (const chunk of result){
        //         final_response.push({
        //             id: chunk.id,
        //             object: chunk.object,
        //             created: chunk.created,
        //             model: chunk.model,
        //             choices: chunk.choices
        //         });
        //      }
        //      return final_response;
        //  }

        // this.client.responseHeaders
        // return this.post(TEXT_COMPLETE_API, { body, ...opts, stream }) as
        //     | APIPromise<TextCompletion>
        //     | APIPromise<Stream<TextCompletion>>
    }
}


export interface CompletionsBodyBase extends ModelParams {
    prompt: string;
}

export interface CompletionsBodyStreaming extends CompletionsBodyBase {
    stream?: true;
}

export interface CompletionsBodyNonStreaming extends CompletionsBodyBase {
    stream?: false;
}

export type CompletionCreateParams = CompletionsBodyNonStreaming | CompletionsBodyStreaming;

interface Usage {
    prompt_tokens?: number;
    completion_tokens?: number;
    total_tokens?: number;
}

interface Choices {
    index?: number;
    text?: string;
    logprobs: any;
    finish_reason?: string;
}

interface TextCompletion extends APIResponseType {
    id: string;
    object: string;
    created: number;
    model: string;
    choices: Array<Choices>;
    usage?: Usage;
}