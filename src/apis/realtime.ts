import { ApiClientInterface } from '../_types/generalTypes';
import { ApiResource } from '../apiResource';
import { SessionCreateParams } from 'openai/resources/beta/realtime/sessions';
import { finalResponse, initOpenAIClient, overrideConfig } from '../utils';
import { createHeaders } from './createHeaders';
import { RequestOptions } from '../baseClient';

export class Realtime extends ApiResource {
  sessions: Sessions;
  constructor(client: any) {
    super(client);
    this.sessions = new Sessions(client);
  }
}

export class Sessions extends ApiResource {
  async create(
    _body: SessionCreateBody,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): Promise<any> {
    const body: SessionCreateBody = _body;
    if (params) {
      const config = overrideConfig(this.client.config, params.config);
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params, config }),
      };
    }

    const OAIclient = initOpenAIClient(this.client);
    const result = await OAIclient.beta.realtime.sessions
      .create(body, opts)
      .withResponse();

    return finalResponse(result);
  }
}

export interface SessionCreateBody extends SessionCreateParams {
  [key: string]: any;
}
