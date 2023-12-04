export type Headers = Record<string, string | null | undefined>

export interface ApiClientInterface {
    apiKey?: string | null;
    baseURL?: string | null;
    virtualKey?: string | null | undefined;
    config?: Record<string, any> | string | null | undefined;
    provider?: string | null | undefined;
    traceID?: string | null | undefined;
    metadata?: string | null | undefined;
}