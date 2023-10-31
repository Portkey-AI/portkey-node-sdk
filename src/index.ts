import { ModelParamsList, type LLMOptions } from "./_types/portkeyConstructs";
import * as API from "./apis";
import { ApiClient } from "./baseClient";
import { MISSING_API_KEY_ERROR_MESSAGE, PORTKEY_BASE_URL } from "./constants";
import { castToError, readEnv } from "./utils";

interface ApiClientInterface {
    apiKey?: string | null;
    baseURL?: string | null;
    mode?: string | null;
<<<<<<< Updated upstream
    llms?: [LLMOptions] | null;
=======
    llms?: Array<Types.LLMOptions> | null;
    config?: string | null;
>>>>>>> Stashed changes
}

export class Portkey extends ApiClient {
    override apiKey: string | null;
    override baseURL: string;
    mode: string | null;
<<<<<<< Updated upstream
    llms: [LLMOptions] | null;
=======
    llms: Array<Types.LLMOptions> | null;
    config: string | null;
>>>>>>> Stashed changes

    constructor({
        apiKey = readEnv('PORTKEY_API_KEY') ?? null,
        baseURL = readEnv('PORTKEY_BASE_URL') ?? null,
        mode,
<<<<<<< Updated upstream
        llms
=======
        llms,
        config
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
    }

    protected constructLlms(llms?: [LLMOptions] | null): [LLMOptions] | null {
=======
        this.config = config || null;
    }

    protected constructLlms(llms?: Array<Types.LLMOptions> | null): Array<Types.LLMOptions> | null {
>>>>>>> Stashed changes
        if (!llms) {
            return llms || null
        }
        llms.forEach(llm => {
            for (const key in llm) {
                if (ModelParamsList.includes(key)) {
                    if (!llm.override_params) {
                        llm.override_params = {}
                    }
                    llm.override_params[key] = llm[key as keyof LLMOptions]
                    delete llm[key as keyof LLMOptions];
                }

            }
        })
        return llms;
    }

    completions: API.Completions = new API.Completions(this);
    chatCompletions = new API.ChatCompletions(this);
    // generations =  new API.Generations();
}