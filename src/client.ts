import { ApiClientInterface } from "./_types/generalTypes";
import * as Types from "./_types/portkeyConstructs";
import * as API from "./apis";
import { PostBodyParams } from "./apis/postMethod";
import { ApiClient, RequestOptions } from "./baseClient";
import { MISSING_API_KEY_ERROR_MESSAGE, PORTKEY_BASE_URL, OPEN_AI_API_KEY, PORTKEY_DEV_BASE_URL } from "./constants";
import { castToError, readEnv } from "./utils";

export class Portkey extends ApiClient {
	override apiKey: string | null;
	override baseURL: string;
	virtualKey: string | null;
	config: Record<string, unknown> | string | null | undefined;
	provider: string | null | undefined;
	traceID: string | null | undefined;
	metadata: Record<string, unknown> | null | undefined;
	Authorization?: string;
	cacheForceRefresh?: boolean | null | undefined;
	constructor({
		apiKey = readEnv("PORTKEY_API_KEY") ?? null,
		baseURL = readEnv("PORTKEY_BASE_URL") ?? null,
		config,
		virtualKey,
		provider,
		traceID,
		metadata,
		Authorization,
		cacheForceRefresh
	}: ApiClientInterface) {

		super({
			apiKey,
			baseURL,
			config,
			virtualKey,
			provider,
			traceID,
			metadata,
			Authorization,
			cacheForceRefresh,
		});
		
		// console.log("Portkey Class: OpenAI client: ", this.openai_client);
		

		this.apiKey = apiKey;
		if (!this.apiKey) {
			throw castToError(MISSING_API_KEY_ERROR_MESSAGE)
		}
		this.virtualKey = virtualKey || null
		this.config = config || null
		this.baseURL = baseURL || PORTKEY_BASE_URL;
		this.provider = provider
		this.traceID = traceID
		this.metadata = metadata
		this.cacheForceRefresh = cacheForceRefresh;
	}

	completions: API.Completions = new API.Completions(this);
	chat = new API.Chat(this);
	generations = new API.Generations(this);
	prompts = new API.Prompt(this);
	feedback = new API.Feedback(this);
	embeddings = new API.Embeddings(this);
	images = new API.Images(this);
	files = new API.MainFiles(this);
	beta = {
		assistants: new API.Assistants(this),
		threads: new API.Threads(this)
	};


	post = (
		url: string,
		_body: PostBodyParams,
		params?: ApiClientInterface,
		opts?: RequestOptions
	) => {
		return new API.postMethod(this).create(url, _body, params, opts)
	};

}