import { OPEN_AI_API_KEY, PORTKEY_HEADER_PREFIX } from './constants';
import { createResponseHeaders } from './streaming';
import OpenAI from 'openai';
import type { Portkey } from './index';
import {
  UserInviteListParams,
  UsersListParams,
  WorkspaceMemberListParams,
  WorkspacesListParams,
} from './apis/admin';
import { VirtualKeysListParams } from './apis/virtualKeys';
import { ApiKeysListParams } from './apis/apiKeys';
import { CongfigsListParams } from './apis/configs';

type PlatformProperties = {
  'x-portkey-runtime'?: string;
  'x-portkey-runtime-version'?: string;
};
export const getPlatformProperties = (): PlatformProperties => {
  if (
    Object.prototype.toString.call(
      typeof process !== 'undefined' ? process : 0
    ) === '[object process]'
  ) {
    return {
      [`${PORTKEY_HEADER_PREFIX}runtime`]: 'node',
      [`${PORTKEY_HEADER_PREFIX}runtime-version`]: process.version,
    };
  }
  return {};
};

export const readEnv = (env: string): string | undefined => {
  if (typeof process !== 'undefined') {
    return process.env?.[env] ?? undefined;
  }
  return undefined;
};

export const castToError = (err: any): Error => {
  if (err instanceof Error) return err;
  return new Error(err);
};

export const isEmpty = (value: unknown) => {
  // Check if the value is null or undefined
  if (value == null) {
    return true;
  }

  // Check if the value is a string and has zero length
  if (typeof value === 'string' && value.trim().length === 0) {
    return true;
  }

  // Check if the value is an array and has zero elements
  if (Array.isArray(value) && value.length === 0) {
    return true;
  }

  // Check if the value is an object and has zero keys
  if (typeof value === 'object' && Object.keys(value).length === 0) {
    return true;
  }

  // If none of the above conditions are met, the value is not empty
  return false;
};

export const getPortkeyHeader = (key: string): string => {
  return `${PORTKEY_HEADER_PREFIX}${key}`;
};

type Config = Record<string, any> | string | null | undefined;

export const overrideConfig = (
  initialConfig?: Config,
  updatedConfig?: Config
): Config => {
  if (isEmpty(updatedConfig)) {
    return initialConfig;
  }
  return updatedConfig;
};

export const parseBody = (
  data: Record<string, unknown> | undefined | null
): Record<string, unknown> => {
  // Making sure that every key in the body is in snake case
  if (isEmpty(data)) {
    return {};
  }
  const parsedData: Record<string, unknown> = {};
  for (let k in data) {
    const v = data[k];
    // convert to snakecase
    k = k
      .replace('ID', 'Id')
      .replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);

    parsedData[k] = v;
  }
  return parsedData;
};

export function finalResponse(response: any) {
  const headers = portkeyHeaders(response.response.headers);
  const json = {
    ...(response.data?.body || response.data),
    getHeaders: () => headers,
  };
  return json;
}

export function portkeyHeaders(headers: any) {
  const parsedHeaders = createResponseHeaders(headers);
  const prefix = PORTKEY_HEADER_PREFIX;
  const filteredHeaders = Object.entries(parsedHeaders)
    .filter(([key, _]) => key.startsWith(prefix)) // eslint-disable-line @typescript-eslint/no-unused-vars
    .map(([key, value]) => [key.replace(prefix, ''), value]);

  return Object.fromEntries(filteredHeaders);
}

export function defaultHeadersBuilder(client: any) {
  const customHeaders = client.customHeaders;
  const portkeyHeaders = client.portkeyHeaders;

  // Logic to add Bearer only if it is not present.
  // Else it would be added everytime a request is made
  if (
    Object.prototype.hasOwnProperty.call(customHeaders, 'authorization') &&
    !customHeaders['authorization'].startsWith('Bearer')
  ) {
    client.customHeaders['authorization'] =
      'Bearer ' + client.customHeaders['authorization'];
  }

  return { ...customHeaders, ...portkeyHeaders };
}

export function initOpenAIClient(client: Portkey) {
  return new OpenAI({
    apiKey: client.apiKey || readEnv('OPENAI_API_KEY') || OPEN_AI_API_KEY,
    baseURL: client.baseURL,
    defaultHeaders: defaultHeadersBuilder(client),
    maxRetries: 0,
  });
}
export function toQueryParams(
  params?:
    | UsersListParams
    | UserInviteListParams
    | WorkspacesListParams
    | WorkspaceMemberListParams
    | VirtualKeysListParams
    | ApiKeysListParams
    | CongfigsListParams
): string {
  if (!params) {
    return '';
  }
  const queryParams = Object.entries(params)
    .filter(([, value]) => value !== undefined && value !== null)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');

  return queryParams ? `?${queryParams}` : '';
}
