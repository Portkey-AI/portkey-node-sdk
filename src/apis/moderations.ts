import { ApiClientInterface } from '../_types/generalTypes';
import { ApiResource } from '../apiResource';
import { RequestOptions } from '../baseClient';
import { finalResponse, initOpenAIClient, overrideConfig } from '../utils';
import { createHeaders } from './createHeaders';

export interface ModerationCreateParams {
  input: string | Array<string> | Array<ModerationMultiModalInput>;
  model?: any;
  [key: string]: any;
}

interface ModerationMultiModalInput {
  type: string;
  text?: string;
  image_url?: object;
}

export class Moderations extends ApiResource {
  async create(
    _body: ModerationCreateParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): Promise<any> {
    const body: ModerationCreateParams = _body;
    if (params) {
      const config = overrideConfig(this.client.config, params.config);
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params, config }),
      };
    }

    const OAIclient = initOpenAIClient(this.client);

    const result = await OAIclient.moderations
      .create(body as any, opts)
      .withResponse();
    return finalResponse(result);
  }
}
