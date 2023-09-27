export type Headers = Record<string, string | null | undefined>

export interface ApiClientInterface {
    apiKey: string | null;
    baseURL: string | null;
}