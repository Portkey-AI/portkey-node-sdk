import { ApiClientInterface } from './_types/generalTypes';
import * as API from './apis';
import { PostBodyParams, PostResponse } from './apis/postMethod';
import { ApiClient, APIPromise, RequestOptions } from './baseClient';
import { isRunningInBrowser } from './core';
import { Stream } from './streaming';
import { readEnv, setApiKey, setBaseURL } from './utils';

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
  dangerouslyAllowBrowser?: boolean | null | undefined;
  vertexStorageBucketName?: string | null | undefined;
  providerFileName?: string | null | undefined;
  providerModel?: string | null | undefined;
  awsS3Bucket?: string | null | undefined;
  awsS3ObjectKey?: string | null | undefined;
  awsBedrockModel?: string | null | undefined;
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
    dangerouslyAllowBrowser,
    vertexStorageBucketName,
    providerFileName,
    providerModel,
    awsS3Bucket,
    awsS3ObjectKey,
    awsBedrockModel,
    ...rest
  }: ApiClientInterface) {
    if (isRunningInBrowser() && !dangerouslyAllowBrowser) {
      throw new Error(
        "It looks like you're running in a browser-like environment.\n\nThis is disabled by default, as it risks exposing your secret API credentials to attackers.\nIf you understand the risks and have appropriate mitigations in place,\nyou can set the `dangerouslyAllowBrowser` option to `true`, e.g.,\n\nnew Portkey({ ..., dangerouslyAllowBrowser: true, ... });"
      );
    }
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
      dangerouslyAllowBrowser,
      vertexStorageBucketName,
      providerFileName,
      providerModel,
      awsS3Bucket,
      awsS3ObjectKey,
      awsBedrockModel,
      ...rest,
    });
    this.baseURL = setBaseURL(baseURL, apiKey);
    this.apiKey = setApiKey(this.baseURL, apiKey);
    this.virtualKey = virtualKey || null;
    this.config = config || null;
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
    this.dangerouslyAllowBrowser = dangerouslyAllowBrowser ?? false;
    this.vertexStorageBucketName = vertexStorageBucketName;
    this.providerFileName = providerFileName;
    this.providerModel = providerModel;
    this.awsS3Bucket = awsS3Bucket;
    this.awsS3ObjectKey = awsS3ObjectKey;
    this.awsBedrockModel = awsBedrockModel;
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
  logs = new API.Logs(this);
  beta = {
    assistants: new API.Assistants(this),
    threads: new API.Threads(this),
    vectorStores: new API.VectorStores(this),
    chat: new API.BetaChat(this),
    realtime: new API.Realtime(this),
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
