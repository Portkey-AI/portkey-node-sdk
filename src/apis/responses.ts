import { ApiResource } from '../apiResource';
import { createHeaders } from './createHeaders';
import {
  finalResponse,
  initOpenAIClient,
  overrideConfig,
} from '../utils';
import { ApiClientInterface } from '../_types/generalTypes';
import { RequestOptions } from '../baseClient';

export class Responses extends ApiResource {
  inputItems: InputItems;

  constructor(client: any) {
    super(client);
    this.inputItems = new InputItems(client);
  }
}

export class InputItems extends ApiResource {
  async list(
    responseId: string,
    _query?: InputItemListParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): Promise<any> {
    const query: InputItemListParams | undefined = _query;
    if (params) {
      const config = overrideConfig(this.client.config, params.config);
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params, config }),
      };
    }

    const OAIclient = initOpenAIClient(this.client);

    const result = await OAIclient.responses.inputItems
      .list(responseId, query, opts)
      .withResponse();

    return finalResponse(result);
  }
}

export interface InputItemListParams extends CursorPageParams {
  before?: string;
  include?: Array<ResponseIncludable>;
  order?: 'asc' | 'desc';
  [key: string]: any;
}

export type ResponseIncludable =
  | 'file_search_call.results'
  | 'message.input_image.image_url'
  | 'computer_call_output.output.image_url';

export interface CursorPageParams {
  after?: string;
  limit?: number;
}
