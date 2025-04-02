import {
  LOCAL_BASE_URL,
  MISSING_API_KEY_ERROR_MESSAGE,
  OPEN_AI_API_KEY,
  PORTKEY_BASE_URL,
  PORTKEY_HEADER_PREFIX,
} from './constants';
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
import { LogsExportListParams } from './apis/logsExport';
import { getBrowserInfo } from './core';

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

  const browserInfo = getBrowserInfo();
  if (browserInfo) {
    return {
      [`${PORTKEY_HEADER_PREFIX}runtime`]: `browser: ${browserInfo.browser}`,
      [`${PORTKEY_HEADER_PREFIX}runtime-version`]: browserInfo.version,
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
    dangerouslyAllowBrowser: client.dangerouslyAllowBrowser ?? false,
    fetch: async (url: RequestInfo, init?: RequestInit): Promise<Response> => {
      // NOTE: For adding duplex option only when body is a Readable stream
      const fetchOptions: RequestInit = {
        ...init,
        ...(init?.body &&
          typeof (init.body as any)?.pipe === 'function' && { duplex: 'half' }),
      };

      let isRetrying = false;
      let response: Response | undefined;
      try {
        response = await fetch(url, fetchOptions);
      } catch (error) {
        isRetrying = true;
      }
      if (
        isRetrying ||
        (response && !response.ok && client._shouldRetry(response))
      ) {
        return await fetch(url, fetchOptions);
      } else if (response) {
        return response;
      } else {
        throw castToError(response);
      }
    },
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
    | LogsExportListParams
    | any
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

export function setBaseURL(baseURL: any, apiKey: any) {
  if (baseURL) {
    return baseURL;
  }
  return apiKey ? PORTKEY_BASE_URL : LOCAL_BASE_URL;
}

export function setApiKey(baseURL: any, apiKey: any) {
  if (apiKey) {
    return apiKey;
  }
  if (baseURL === PORTKEY_BASE_URL && !apiKey) {
    throw castToError(MISSING_API_KEY_ERROR_MESSAGE);
  }
}
