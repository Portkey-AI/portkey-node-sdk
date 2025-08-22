import { HeadersLike } from 'openai/internal/headers';
import { ApiResource } from '../apiResource';
import { UnwrapWebhookEvent } from 'openai/resources/webhooks';
import { ApiClientInterface } from '../_types/generalTypes';
import { createHeaders } from './createHeaders';
import { initOpenAIClient, overrideConfig } from '../utils';

export class Webhooks extends ApiResource {
  constructor(client: any) {
    super(client);
  }

  async unwarp(
    payload: string,
    headers: HeadersLike,
    secret: string | undefined | null,
    tolerance = 300,
    params?: ApiClientInterface
  ): Promise<UnwrapWebhookEvent> {
    if (params) {
      const config = overrideConfig(this.client.config, params.config);
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params, config }),
      };
    }
    const OAIclient = initOpenAIClient(this.client);
    const result = await OAIclient.webhooks.unwrap(
      payload,
      headers,
      secret,
      tolerance
    );
    return result;
  }

  async verifySignature(
    payload: string,
    headers: HeadersLike,
    secret: string | undefined | null,
    tolerance = 300,
    params?: ApiClientInterface
  ): Promise<void> {
    if (params) {
      const config = overrideConfig(this.client.config, params.config);
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params, config }),
      };
    }
    const OAIclient = initOpenAIClient(this.client);
    const result = await OAIclient.webhooks.verifySignature(
      payload,
      headers,
      secret,
      tolerance
    );
    return result;
  }
}
