export interface RetrySettings {
    attempts: number;
    on_status_codes: Array<number>
}

export interface Function {
    name: string;
    description: string;
    parameters: string;
}

export interface ModelParams {
    model?: string;
    suffix?: string;
    max_tokens?: number;
    temperature?: number;
    top_k?: number;
    top_p?: number;
    n?: number;
    stop_sequences?: Array<any>;
    timeout?: number;
    functions?: Array<Function>;
    function_call?: string | Function;
    logprobs?: number;
    echo?: boolean;
    stop?: Array<string>;
    presence_penalty?: number;
    frequency_penalty?: number;
    best_of?: number;
    logit_bias?: Record<string, number>;
    user?: string;
    organization?: string;
}

export interface Message {
    role: string
    content: string
}

export const ModelParamsList = [
	"model", "suffix", "max_tokens", "temperature", "top_k", "top_p", "n", "stop_sequences", "timeout", "functions", "function_call", "logprobs", "echo", "stop", "presence_penalty", "frequency_penalty", "best_of", "logit_bias", "user", "organization"
]