import * as Types from "./_types/portkeyConstructs";
import * as API from "./apis";
import { ApiClient } from "./baseClient";
import { MISSING_API_KEY_ERROR_MESSAGE, PORTKEY_BASE_URL } from "./constants";
import { castToError, readEnv } from "./utils";

interface ApiClientInterface {
    apiKey?: string | null;
    baseURL?: string | null;
    mode?: string | null;
    llms?: [Types.LLMOptions] | null;
    configSlug?: string | null;
}

export class Portkey extends ApiClient {
    override apiKey: string | null;
    override baseURL: string;
    mode: string | null;
    llms: [Types.LLMOptions] | null;
    configSlug: string | null;

    constructor({
        apiKey = readEnv('PORTKEY_API_KEY') ?? null,
        baseURL = readEnv('PORTKEY_BASE_URL') ?? null,
        mode,
        llms,
        configSlug
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
        this.llms = this.constructLlms(llms || null);
        this.configSlug = configSlug || null;
    }

    protected constructLlms(llms?: [Types.LLMOptions] | null): [Types.LLMOptions] | null {
        if (!llms) {
            return llms || null
        }
        llms.forEach(llm => {
            for (const key in llm) {
                if (Types.ModelParamsList.includes(key)) {
                    if (!llm.override_params) {
                        llm.override_params = {}
                    }
                    llm.override_params[key] = llm[key as keyof Types.LLMOptions]
                    delete llm[key as keyof Types.LLMOptions];
                }

            }
        })
        return llms;
    }

    completions: API.Completions = new API.Completions(this);
    chatCompletions = new API.ChatCompletions(this);
    // generations =  new API.Generations();
}

export import LLMOptions = Types.LLMOptions;