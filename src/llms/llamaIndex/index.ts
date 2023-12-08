import { PORTKEY_GATEWAY_URL } from "../../constants";
import { CallbackManager, StreamCallbackResponse, EventType, Event } from "llamaindex"
import { Portkey } from "../../../src"

export type MessageType =
  | "user"
  | "assistant"
  | "system"
  | "generic"
  | "function"
  | "memory";

export interface ChatMessage {
  content: any;
  role: MessageType;
}

export interface ChatResponse {
  message: ChatMessage;
  raw?: Record<string, any>;
  delta?: string;
}

// NOTE in case we need CompletionResponse to diverge from ChatResponse in the future
export type CompletionResponse = ChatResponse;

export enum Tokenizers {
  CL100K_BASE = "cl100k_base",
}

export interface LLMMetadata {
  model: string;
  temperature: number;
  topP: number;
  maxTokens?: number;
  contextWindow: number;
  tokenizer: Tokenizers | undefined;
}

/**
 * Unified language model interface
 */
interface LLM {
  _metadata?: LLMMetadata;
  // Whether a LLM has streaming support
  hasStreaming: boolean;
  /**
   * Get a chat response from the LLM
   * @param messages
   *
   * The return type of chat() and complete() are set by the "streaming" parameter being set to True.
   */
  chat<
    T extends boolean | undefined = undefined,
    R = T extends true ? AsyncGenerator<string, void, unknown> : ChatResponse,
  >(
    messages: ChatMessage[],
    parentEvent?: Event,
    streaming?: T,
  ): Promise<R>;

  /**
   * Get a prompt completion from the LLM
   * @param prompt the prompt to complete
   */
  complete<
    T extends boolean | undefined = undefined,
    R = T extends true ? AsyncGenerator<string, void, unknown> : ChatResponse,
  >(
    prompt: string,
    parentEvent?: Event,
    streaming?: T,
  ): Promise<R>;

  /**
   * Calculates the number of tokens needed for the given chat messages
   */
  tokens(messages: ChatMessage[]): number;
}

export class PortkeyLlama implements LLM {
  hasStreaming = true;

  apiKey: string | null | undefined;
  baseURL: string | undefined;
  virtualKey: string | null | undefined;
  config: Record<string, unknown> | string | null | undefined;
  provider: string | null | undefined;
  traceID: string | null | undefined;
  metadata: Record<string, unknown> | null | undefined;
  client: any;
  callbackManager?: CallbackManager | undefined;

  constructor(init?: Partial<PortkeyLlama>) {
    this.apiKey = init?.apiKey ?? null;
    this.baseURL = init?.baseURL;
    this.virtualKey = init?.virtualKey
    this.config = init?.config
    this.baseURL = init?.baseURL || PORTKEY_GATEWAY_URL;
    this.provider = init?.provider
    this.traceID = init?.traceID
    this.metadata = init?.metadata
    this.client = new Portkey({
      apiKey: this.apiKey,
      baseURL: this.baseURL,
      virtualKey: this.virtualKey,
      config: this.config,
      provider: this.provider,
      traceID: this.traceID,
      metadata: this.metadata
    })
    this.callbackManager = init?.callbackManager;
  }

  tokens(messages: ChatMessage[]): number {
    throw new Error("Method not implemented.");
  }

  getmetadata(): LLMMetadata {
    throw new Error("metadata not implemented for Portkey");
  }

  async chat<
    T extends boolean | undefined = undefined,
    R = T extends true ? AsyncGenerator<string, void, unknown> : ChatResponse,
  >(
    messages: ChatMessage[],
    parentEvent?: Event | undefined,
    streaming?: T,
    params?: Record<string, any>,
  ): Promise<R> {
    if (streaming) {
      return this.streamChat(messages, parentEvent, params) as R;
    } else {
      const resolvedParams = params || {};
      const response = await this.client.chat.completions.create({
        messages,
        ...resolvedParams,
      });

      const content = response.choices[0]?.message?.content ?? "";
      const role = response.choices[0]?.message?.role || "assistant";
      return { message: { content, role: role as MessageType } } as R;
    }
  }

  async complete<
    T extends boolean | undefined = undefined,
    R = T extends true ? AsyncGenerator<string, void, unknown> : ChatResponse,
  >(
    prompt: string,
    parentEvent?: Event | undefined,
    streaming?: T,
  ): Promise<R> {
    return this.chat(
      [{ content: prompt, role: "user" }],
      parentEvent,
      streaming,
    );
  }

  async *streamChat(
    messages: ChatMessage[],
    parentEvent?: Event,
    params?: Record<string, any>,
  ): AsyncGenerator<string, void, unknown> {
    // Wrapping the stream in a callback.
    const onLLMStream = this.callbackManager?.onLLMStream
      ? this.callbackManager.onLLMStream
      : () => { };

    const chunkStream = await this.client.chat.completions.create({
      messages,
      ...params,
      stream: true,
    });

    const event: Event = parentEvent ?? {
      id: "unspecified",
      type: "llmPredict" as EventType,
    };

    //Indices
    let idx_counter = 0;
    for await (const part of chunkStream) {
      //Increment
      if (part.choices[0]?.index) {
        part.choices[0].index = idx_counter
      }
      const is_done: boolean =
        part.choices[0]?.finish_reason === "stop" ? true : false;
      //onLLMStream Callback

      const stream_callback: StreamCallbackResponse = {
        event: event,
        index: idx_counter,
        isDone: is_done,
        // token: part,
      };
      onLLMStream(stream_callback);

      idx_counter++;

      yield part.choices[0]?.delta?.content ?? "";
    }
    return;
  }

  streamComplete(
    query: string,
    parentEvent?: Event,
  ): AsyncGenerator<string, void, unknown> {
    return this.streamChat([{ content: query, role: "user" }], parentEvent);
  }
}
