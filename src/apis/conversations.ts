import {
  ItemCreateParams,
  ItemDeleteParams,
  ItemListParams,
  ItemRetrieveParams,
} from 'openai/resources/conversations/items';
import { ApiClientInterface } from '../_types/generalTypes';
import { ApiResource } from '../apiResource';
import { RequestOptions } from '../baseClient';
import { finalResponse, initOpenAIClient, overrideConfig } from '../utils';
import { createHeaders } from './createHeaders';
import {
  ConversationCreateParams,
  ConversationUpdateParams,
} from 'openai/resources/conversations/conversations';

export class Conversations extends ApiResource {
  items: Items;
  constructor(client: any) {
    super(client);
    this.items = new Items(client);
  }

  async create(
    _body: ConversationCreateParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): Promise<any> {
    const body: ConversationCreateParams = _body;
    if (params) {
      const config = overrideConfig(this.client.config, params.config);
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params, config }),
      };
    }
    const OAIclient = initOpenAIClient(this.client);
    const result = await OAIclient.conversations
      .create(body, opts)
      .withResponse();
    return finalResponse(result);
  }

  async retrieve(
    conversationID: string,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): Promise<any> {
    if (params) {
      const config = overrideConfig(this.client.config, params.config);
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params, config }),
      };
    }
    const OAIclient = initOpenAIClient(this.client);
    const result = await OAIclient.conversations
      .retrieve(conversationID, opts)
      .withResponse();
    return finalResponse(result);
  }

  async update(
    conversationID: string,
    _body: ConversationUpdateParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): Promise<any> {
    const body: ConversationUpdateParams = _body;
    if (params) {
      const config = overrideConfig(this.client.config, params.config);
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params, config }),
      };
    }
    const OAIclient = initOpenAIClient(this.client);
    const result = await OAIclient.conversations
      .update(conversationID, body, opts)
      .withResponse();
    return finalResponse(result);
  }

  async delete(
    conversationID: string,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): Promise<any> {
    if (params) {
      const config = overrideConfig(this.client.config, params.config);
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params, config }),
      };
    }
    const OAIclient = initOpenAIClient(this.client);
    const result = await OAIclient.conversations
      .delete(conversationID, opts)
      .withResponse();
    return finalResponse(result);
  }
}

export class Items extends ApiResource {
  async create(
    conversationID: string,
    itemsCreateParams: ItemCreateParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): Promise<any> {
    if (params) {
      const config = overrideConfig(this.client.config, params.config);
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params, config }),
      };
    }
    const OAIclient = initOpenAIClient(this.client);
    const result = await OAIclient.conversations.items
      .create(conversationID, itemsCreateParams, opts)
      .withResponse();
    return finalResponse(result);
  }

  async retrieve(
    itemID: string,
    itemsRetrieveParams: ItemRetrieveParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): Promise<any> {
    if (params) {
      const config = overrideConfig(this.client.config, params.config);
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params, config }),
      };
    }
    const OAIclient = initOpenAIClient(this.client);
    const result = await OAIclient.conversations.items
      .retrieve(itemID, itemsRetrieveParams, opts)
      .withResponse();
    return finalResponse(result);
  }

  async list(
    conversationID: string,
    query?: ItemListParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): Promise<any> {
    if (params) {
      const config = overrideConfig(this.client.config, params.config);
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params, config }),
      };
    }
    const OAIclient = initOpenAIClient(this.client);
    const result = await OAIclient.conversations.items
      .list(conversationID, query, opts)
      .withResponse();
    return finalResponse(result);
  }

  async delete(
    itemID: string,
    itemsDeleteParams: ItemDeleteParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): Promise<any> {
    if (params) {
      const config = overrideConfig(this.client.config, params.config);
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params, config }),
      };
    }
    const OAIclient = initOpenAIClient(this.client);
    const result = await OAIclient.conversations.items
      .delete(itemID, itemsDeleteParams, opts)
      .withResponse();
    return finalResponse(result);
  }
}
