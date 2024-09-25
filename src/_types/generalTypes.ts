export type Headers = Record<string, string | null | undefined>

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
    huggingfaceBaseUrl?: string | null | undefined;
    forwardHeaders?: Array<string> | null | undefined;
    cacheNamespace?: string | null | undefined;
    requestTimeout?: number | null | undefined;
    strictOpenAiCompliance?: boolean | null | undefined;
    anthropicBeta?: string | null | undefined;
}

export interface APIResponseType {
    getHeaders: () => Record<string, string> | null | undefined
}