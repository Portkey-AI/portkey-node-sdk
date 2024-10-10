import { ApiClientInterface } from './_types/generalTypes';
import * as API from './apis';
import { PostBodyParams, PostResponse } from './apis/postMethod';
import { ApiClient, APIPromise, RequestOptions } from './baseClient';
import { MISSING_API_KEY_ERROR_MESSAGE, PORTKEY_BASE_URL } from './constants';
import { Stream } from './streaming';
import { castToError, readEnv } from './utils';

export class Portkey extends ApiClient {
  declare apiKey: string | null;
  declare baseURL: string;
  virtualKey: string | null;
  config: Record<string, unknown> | string | null | undefined;
  provider: string | null | undefined;
  traceID: string | null | undefined;
  metadata: Record<string, unknown> | null | undefined;
  Authorization?: string;
  cacheForceRefresh?: boolean | null | undefined;
  debug?: boolean | null | undefined;
  customHost?: string | null | undefined;
  openaiProject?: string | null | undefined;
  openaiOrganization?: string | null | undefined;
  awsSecretAccessKey?: string | null | undefined;
  awsAccessKeyId?: string | null | undefined;
  awsSessionToken?: string | null | undefined;
  awsRegion?: string | null | undefined;
  vertexProjectId?: string | null | undefined;
  vertexRegion?: string | null | undefined;
  workersAiAccountId?: string | null | undefined;
  azureResourceName?: string | null | undefined;
  azureDeploymentId?: string | null | undefined;
  azureApiVersion?: string | null | undefined;
  azureEndpointName?: string | null | undefined;
  huggingfaceBaseUrl?: string | null | undefined;
  forwardHeaders?: Array<string> | null | undefined;
  requestTimeout?: number | null | undefined;
  cacheNamespace?: string | null | undefined;
  strictOpenAiCompliance?: boolean | null | undefined;
  anthropicBeta?: string | null | undefined;
  anthropicVersion?: string | null | undefined;
  mistralFimCompletion?: string | null | undefined;
  constructor({
    apiKey = readEnv('PORTKEY_API_KEY') ?? null,
    baseURL = readEnv('PORTKEY_BASE_URL') ?? null,
    config,
    virtualKey,
    provider,
    traceID,
    metadata,
    Authorization,
    cacheForceRefresh,
    debug,
    customHost,
    openaiProject,
    openaiOrganization,
    awsSecretAccessKey,
    awsAccessKeyId,
    awsSessionToken,
    awsRegion,
    vertexProjectId,
    vertexRegion,
    workersAiAccountId,
    azureResourceName,
    azureDeploymentId,
    azureApiVersion,
    azureEndpointName,
    huggingfaceBaseUrl,
    forwardHeaders,
    cacheNamespace,
    requestTimeout,
    strictOpenAiCompliance,
    anthropicBeta,
    anthropicVersion,
    mistralFimCompletion,
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
      debug,
      customHost,
      cacheNamespace,
      openaiProject,
      openaiOrganization,
      awsSecretAccessKey,
      awsAccessKeyId,
      awsSessionToken,
      awsRegion,
      vertexProjectId,
      vertexRegion,
      workersAiAccountId,
      azureResourceName,
      azureDeploymentId,
      azureApiVersion,
      azureEndpointName,
      huggingfaceBaseUrl,
      forwardHeaders,
      requestTimeout,
      strictOpenAiCompliance,
      anthropicBeta,
      anthropicVersion,
      mistralFimCompletion,
    });

    this.apiKey = apiKey;
    if (!this.apiKey) {
      throw castToError(MISSING_API_KEY_ERROR_MESSAGE);
    }
    this.virtualKey = virtualKey || null;
    this.config = config || null;
    this.baseURL = baseURL || PORTKEY_BASE_URL;
    this.provider = provider;
    this.traceID = traceID;
    this.metadata = metadata;
    this.cacheForceRefresh = cacheForceRefresh;
    this.debug = debug;
    this.customHost = customHost;
    this.cacheNamespace = cacheNamespace;
    this.openaiProject = openaiProject;
    this.openaiOrganization = openaiOrganization;
    this.awsSecretAccessKey = awsSecretAccessKey;
    this.awsAccessKeyId = awsAccessKeyId;
    this.awsSessionToken = awsSessionToken;
    this.awsRegion = awsRegion;
    this.vertexProjectId = vertexProjectId;
    this.vertexRegion = vertexRegion;
    this.workersAiAccountId = workersAiAccountId;
    this.azureResourceName = azureResourceName;
    this.azureDeploymentId = azureDeploymentId;
    this.azureApiVersion = azureApiVersion;
    this.azureEndpointName = azureEndpointName;
    this.huggingfaceBaseUrl = huggingfaceBaseUrl;
    this.forwardHeaders = forwardHeaders;
    this.requestTimeout = requestTimeout;
    this.strictOpenAiCompliance = strictOpenAiCompliance;
    this.anthropicBeta = anthropicBeta;
    this.anthropicVersion = anthropicVersion;
    this.mistralFimCompletion = mistralFimCompletion;
  }

  completions: API.Completions = new API.Completions(this);
  chat = new API.Chat(this);
  embeddings = new API.Embeddings(this);
  files = new API.MainFiles(this);
  images = new API.Images(this);
  models = new API.Models(this);
  generations = new API.Generations(this);
  prompts = new API.Prompt(this);
  feedback = new API.Feedback(this);
  batches = new API.Batches(this);
  fineTuning = new API.FineTuning(this);
  moderations = new API.Moderations(this);
  audio = new API.Audio(this);
  uploads = new API.Uploads(this);
  admin = new API.Admin(this);
  virtualKeys = new API.VirtualKeys(this);
  apiKeys = new API.ApiKeys(this);
  configs = new API.Configs(this);
  beta = {
    assistants: new API.Assistants(this),
    threads: new API.Threads(this),
    vectorStores: new API.VectorStores(this),
    chat: new API.BetaChat(this),
  };

  post = (
    url: string,
    _body: PostBodyParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<Stream<PostResponse>> | APIPromise<PostResponse> => {
    return new API.postMethod(this).create(url, _body, params, opts);
  };
}
