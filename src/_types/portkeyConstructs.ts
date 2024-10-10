export interface RetrySettings {
  attempts: number;
  on_status_codes: Array<number>;
}

export interface FunctionInterface {
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
  functions?: Array<FunctionInterface>;
  function_call?: string | FunctionInterface;
  logprobs?: number;
  echo?: boolean;
  stop?: Array<string>;
  presence_penalty?: number;
  frequency_penalty?: number;
  best_of?: number;
  logit_bias?: Record<string, number>;
  user?: string;
  organization?: string;
  seed?: number;
  response_format?: any;
  service_tier?: string;
  top_logprobs?: number | null;
  parallel_tool_calls?: boolean;
  tools?: Array<Tool>;
  tool_choice?: any;
  [key: string]: any;
}

export interface Message {
  role: string;
  content: string;
}

export interface Tool {
  type?: string;
  function?: Record<string, any>;
}
