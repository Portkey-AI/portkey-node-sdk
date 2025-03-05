export type Headers = Record<string, string | null | undefined>;

export interface ApiClientInterface {
  apiKey?: string | null;
  baseURL?: string | null;
  virtualKey?: string | null | undefined;
  config?: Record<string, unknown> | string | null | undefined;
  provider?: string | null | undefined;
  traceID?: string | null | undefined;
  metadata?: Record<string, unknown> | null | undefined;
  Authorization?: string | null | undefined;
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
  cacheNamespace?: string | null | undefined;
  requestTimeout?: number | null | undefined;
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
  [key: string]: any;
}

export interface APIResponseType {
  getHeaders: () => Record<string, string> | null | undefined;
}
