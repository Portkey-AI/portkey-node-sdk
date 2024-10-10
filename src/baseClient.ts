import KeepAliveAgent from 'agentkeepalive';
import type { Agent } from 'node:http';
import {
  APIResponseType,
  ApiClientInterface,
  Headers,
} from './_types/generalTypes';
import { createHeaders } from './apis';
import { PORTKEY_HEADER_PREFIX } from './constants';
import {
  APIConnectionError,
  APIConnectionTimeoutError,
  APIError,
} from './error';
import { Stream, createResponseHeaders, safeJSON } from './streaming';
import { castToError, getPlatformProperties, parseBody } from './utils';
import { VERSION } from './version';
fetch;
const defaultHttpAgent: Agent = new KeepAliveAgent({
  keepAlive: true,
  timeout: 5 * 60 * 1000,
});
export type Fetch = (url: string, init?: RequestInit) => Promise<Response>;

export type HTTPMethod = 'post' | 'get' | 'put' | 'delete';

export type FinalRequestOptions = RequestOptions & {
  method: HTTPMethod;
  path: string;
};

export type RequestOptions = {
  method?: HTTPMethod;
  path?: string;
  query?: Record<string, any> | undefined;
  body?: Record<string, any> | undefined;
  headers?: Headers | undefined;
  httpAgent?: Agent;
  stream?: boolean | undefined;
};

type APIResponseProps = {
  response: Response;
  options: FinalRequestOptions;
  responseHeaders: globalThis.Headers;
};

type PromiseOrValue<T> = T | Promise<T>;

async function defaultParseResponse<T>(props: APIResponseProps): Promise<T> {
  const { response } = props;
  if (props.options.stream) {
    return new Stream(response) as any;
  }

  const contentType = response.headers.get('content-type');
  if (contentType?.includes('application/json')) {
    const headers = defaultParseHeaders(props);
    const json = {
      ...(await response.json()),
      getHeaders: () => headers,
    };

    return json as T;
  }

  const text = await response.text();
  return text as any as T;
}

function defaultParseHeaders(props: APIResponseProps): Record<string, string> {
  const { responseHeaders } = props;
  const parsedHeaders = createResponseHeaders(responseHeaders);
  const prefix = PORTKEY_HEADER_PREFIX;
  const filteredHeaders = Object.entries(parsedHeaders)
    .filter(([key, _]) => key.startsWith(prefix)) // eslint-disable-line @typescript-eslint/no-unused-vars
    .map(([key, value]) => [key.replace(prefix, ''), value]);
  return Object.fromEntries(filteredHeaders);
}

export class APIPromise<T> extends Promise<T> {
  private parsedPromise: Promise<T> | undefined;

  constructor(
    private responsePromise: Promise<APIResponseProps>,
    private parseResponse: (
      props: APIResponseProps
    ) => PromiseOrValue<T> = defaultParseResponse
  ) {
    super((resolve) => {
      // this is maybe a bit weird but this has to be a no-op to not implicitly
      // parse the response body; instead .then, .catch, .finally are overridden
      // to parse the response
      resolve(null as any);
    });
  }

  private parse(): Promise<T> {
    if (!this.parsedPromise) {
      this.parsedPromise = this.responsePromise.then(this.parseResponse);
    }
    return this.parsedPromise;
  }

  override then<TResult1 = T, TResult2 = never>(
    onfulfilled?:
      | ((value: T) => TResult1 | PromiseLike<TResult1>)
      | undefined
      | null,
    onrejected?:
      | ((reason: any) => TResult2 | PromiseLike<TResult2>)
      | undefined
      | null
  ): Promise<TResult1 | TResult2> {
    return this.parse().then(onfulfilled, onrejected);
  }

  override catch<TResult = never>(
    onrejected?:
      | ((reason: any) => TResult | PromiseLike<TResult>)
      | undefined
      | null
  ): Promise<T | TResult> {
    return this.parse().catch(onrejected);
  }

  override finally(onfinally?: (() => void) | undefined | null): Promise<T> {
    return this.parse().finally(onfinally);
  }
}

export abstract class ApiClient {
  apiKey: string | null;
  baseURL: string;
  customHeaders: Record<string, string>;
  responseHeaders: Record<string, string>;
  portkeyHeaders: Record<string, string>;

  private fetch: Fetch;
  constructor({
    apiKey,
    baseURL,
    config,
    virtualKey,
    traceID,
    metadata,
    provider,
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
    this.apiKey = apiKey ?? '';
    this.baseURL = baseURL ?? '';
    this.customHeaders = createHeaders({
      apiKey,
      config,
      virtualKey,
      traceID,
      metadata,
      provider,
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
      anthropicVersion,
      mistralFimCompletion,
      anthropicBeta,
    });
    this.portkeyHeaders = this.defaultHeaders();
    this.fetch = fetch;
    this.responseHeaders = {};
  }

  protected defaultHeaders(): Record<string, string> {
    return {
      'Content-Type': 'application/json',
      [`${PORTKEY_HEADER_PREFIX}package-version`]: `portkey-${VERSION}`,
      ...getPlatformProperties(),
    };
  }

  _post<Rsp extends APIResponseType>(
    path: string,
    opts?: RequestOptions
  ): APIPromise<Rsp> {
    return this.methodRequest('post', path, opts);
  }

  _put<Rsp extends APIResponseType>(
    path: string,
    opts?: RequestOptions
  ): APIPromise<Rsp> {
    return this.methodRequest('put', path, opts);
  }

  _get<Rsp extends APIResponseType>(
    path: string,
    opts?: RequestOptions
  ): APIPromise<Rsp> {
    return this.methodRequest('get', path, opts);
  }

  _delete<Rsp extends APIResponseType>(
    path: string,
    opts?: RequestOptions
  ): APIPromise<Rsp> {
    return this.methodRequest('delete', path, opts);
  }

  protected generateError(
    status: number | undefined,
    errorResponse: object | undefined,
    message: string | undefined,
    headers: Headers | undefined
  ): APIError {
    return APIError.generate(status, errorResponse, message, headers);
  }

  async request(opts: FinalRequestOptions): Promise<APIResponseProps> {
    // Build the request.
    const { req, url } = this.buildRequest(opts);
    // Make the call to rubeus.
    const response = await this.fetch(url, req).catch(castToError);
    // Parse the response and check for errors.
    if (response instanceof Error) {
      if (response.name === 'AbortError') {
        throw new APIConnectionTimeoutError();
      }
      throw new APIConnectionError({ cause: response });
    }
    this.responseHeaders = createResponseHeaders(response.headers);
    if (!response.ok) {
      const errText = await response.text().catch(() => 'Unknown');
      const errJSON = safeJSON(errText);
      const errMessage = errJSON ? undefined : errText;
      throw this.generateError(
        response.status,
        errJSON,
        errMessage,
        this.responseHeaders
      );
    }
    // Receive and format the response.
    return { response, options: opts, responseHeaders: response.headers };
  }

  buildRequest(opts: FinalRequestOptions): { req: RequestInit; url: string } {
    const url = new URL(this.baseURL + opts.path!);
    const { method, body } = opts;
    const reqHeaders: Record<string, string> = {
      ...this.defaultHeaders(),
      ...this.customHeaders,
    };
    const httpAgent: Agent | undefined = defaultHttpAgent;
    let req: RequestInit;
    if (method === 'get') {
      req = {
        method,
        headers: reqHeaders,
        ...(httpAgent && { agent: httpAgent }),
      };
    } else {
      req = {
        method,
        body: JSON.stringify(parseBody(body)),
        headers: reqHeaders,
        ...(httpAgent && { agent: httpAgent }),
      };
    }
    return { req: req, url: url.toString() };
  }

  methodRequest<Rsp>(
    method: HTTPMethod,
    path: string,
    opts?: RequestOptions
  ): APIPromise<Rsp> {
    return new APIPromise(this.request({ method, path, ...opts }));
  }
}
