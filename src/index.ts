import { LLMOptions } from "./_types/portkeyConstructs";
import * as API from "./apis";
import { ApiClient } from "./baseClient";
import { MISSING_API_KEY_ERROR_MESSAGE, PORTKEY_BASE_URL } from "./constants";
import { castToError, readEnv } from "./utils";

interface ApiClientInterface {
    apiKey?: string | null;
    baseURL?: string | null;
    mode?: string | null;
    llms?: [LLMOptions] | null;
}


export class Portkey extends ApiClient {
    override apiKey: string | null;
    override baseURL: string;
    mode: string | null;
    llms: [LLMOptions] | null;

    constructor({
        apiKey = readEnv('PORTKEY_API_KEY') ?? null,
        baseURL = readEnv('PORTKEY_BASE_URL') ?? null,
        mode,
        llms
    }: ApiClientInterface) {

        super({
            apiKey,
            baseURL
        });
        this.apiKey = apiKey;
        if (!this.apiKey) {
            throw castToError(MISSING_API_KEY_ERROR_MESSAGE)
        }
        this.baseURL = baseURL || PORTKEY_BASE_URL;
        this.mode = mode || null;
        this.llms = llms || null;
    }

    completions: API.Completions = new API.Completions(this);
    chatCompletions = new API.ChatCompletions(this);
    // generations =  new API.Generations();
}