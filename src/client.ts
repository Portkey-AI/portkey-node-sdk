import { ApiClientInterface } from "./_types/generalTypes";
import * as Types from "./_types/portkeyConstructs";
import * as API from "./apis";
import { ApiClient } from "./baseClient";
import { MISSING_API_KEY_ERROR_MESSAGE, PORTKEY_BASE_URL } from "./constants";
import { castToError, readEnv } from "./utils";

export class Portkey extends ApiClient {
	override apiKey: string | null;
	override baseURL: string;
	virtualKey: string | null;
	config: Record<string, any> | string | null | undefined;
	provider: string | null | undefined;
	traceId: string | null | undefined;
	metadata: string | null | undefined;
	constructor({
		apiKey = readEnv("PORTKEY_API_KEY") ?? null,
		baseURL = readEnv("PORTKEY_BASE_URL") ?? null,
		config,
		virtualKey,
		provider,
		traceId,
		metadata
	}: ApiClientInterface) {

		super({
			apiKey,
			baseURL,
			config,
			virtualKey,
			provider,
			traceId,
			metadata
		});
		this.apiKey = apiKey;
		if (!this.apiKey) {
			throw castToError(MISSING_API_KEY_ERROR_MESSAGE)
		}
		this.virtualKey = virtualKey || null
		this.config = config || null
		this.baseURL = baseURL || PORTKEY_BASE_URL;
		this.provider = provider
		this.traceId = traceId
		this.metadata = metadata
	}

	completions: API.Completions = new API.Completions(this);
	chat = new API.Chat(this);
	generations = new API.Generations(this);
	prompts = new API.Prompt(this);
	post = new API.Post(this);
	feedback = new API.Feedback(this);
	embeddings = new API.Embeddings(this);
}