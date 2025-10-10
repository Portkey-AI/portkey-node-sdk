import { ClientSecretCreateParams } from 'openai/resources/realtime/client-secrets';
import { ApiResource } from '../apiResource';
import { ApiClientInterface } from '../_types/generalTypes';
import { finalResponse, initOpenAIClient, overrideConfig } from '../utils';
import { APIPromise, RequestOptions } from '../baseClient';
import { createHeaders } from './createHeaders';
import {
  CallAcceptParams,
  CallReferParams,
  CallRejectParams,
} from 'openai/resources/realtime/calls';

export class MainRealtime extends ApiResource {
  clientSecrets: ClientSecrets;
  calls: Calls;

  constructor(client: any) {
    super(client);
    this.clientSecrets = new ClientSecrets(client);
    this.calls = new Calls(client);
  }
}

export class ClientSecrets extends ApiResource {
  constructor(client: any) {
    super(client);
  }

  async create(
    _body: ClientSecretCreateParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): Promise<any> {
    const body: ClientSecretCreateParams = _body;
    if (params) {
      const config = overrideConfig(this.client.config, params.config);
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params, config }),
      };
    }
    const OAIclient = initOpenAIClient(this.client);
    const result = await OAIclient.realtime.clientSecrets
      .create(body, opts)
      .withResponse();
    return finalResponse(result);
  }
}

export class Calls extends ApiResource {
  constructor(client: any) {
    super(client);
  }

  accept(
    callID: string,
    body: CallAcceptParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<void> {
    if (params) {
      const config = overrideConfig(this.client.config, params.config);
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params, config }),
      };
    }
    const OAIclient = initOpenAIClient(this.client);
    const result = OAIclient.realtime.calls.accept(callID, body, opts);
    return result as any;
  }

  hangup(
    callID: string,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<void> {
    if (params) {
      const config = overrideConfig(this.client.config, params.config);
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params, config }),
      };
    }
    const OAIclient = initOpenAIClient(this.client);
    const result = OAIclient.realtime.calls.hangup(callID, opts);
    return result as any;
  }

  refer(
    callID: string,
    body: CallReferParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<void> {
    if (params) {
      const config = overrideConfig(this.client.config, params.config);
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params, config }),
      };
    }
    const OAIclient = initOpenAIClient(this.client);
    const result = OAIclient.realtime.calls.refer(callID, body, opts);
    return result as any;
  }

  reject(
    callID: string,
    body: CallRejectParams | null | undefined = {},
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<void> {
    if (params) {
      const config = overrideConfig(this.client.config, params.config);
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params, config }),
      };
    }
    const OAIclient = initOpenAIClient(this.client);
    const result = OAIclient.realtime.calls.reject(callID, body, opts);
    return result as any;
  }
}
