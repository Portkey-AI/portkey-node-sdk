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
}

export interface APIResponseType {
    getHeaders: () => Record<string, string> | null | undefined
}