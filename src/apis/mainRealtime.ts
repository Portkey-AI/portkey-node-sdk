import { ClientSecretCreateParams } from 'openai/resources/realtime/client-secrets';
import { ApiResource } from '../apiResource';
import { ApiClientInterface } from '../_types/generalTypes';
import { finalResponse, initOpenAIClient, overrideConfig } from '../utils';
import { RequestOptions } from '../baseClient';
import { createHeaders } from './createHeaders';

export class MainRealtime extends ApiResource {
  clientSecrets: ClientSecrets;
  constructor(client: any) {
    super(client);
    this.clientSecrets = new ClientSecrets(client);
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
