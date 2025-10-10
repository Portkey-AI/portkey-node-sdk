import { ApiResource } from '../apiResource';
import { createHeaders } from './createHeaders';
import { finalResponse, initOpenAIClient, overrideConfig } from '../utils';
import { ApiClientInterface } from '../_types/generalTypes';
import { APIPromise, RequestOptions } from '../baseClient';
import {
  ChatKitUploadFileParams,
  ChatKitUploadFileResponse,
} from 'openai/resources/beta/chatkit/chatkit';
import { SessionCreateParams } from 'openai/resources/beta/chatkit/sessions';
import {
  ChatKitThread,
  ChatSession,
  ThreadDeleteResponse,
  ThreadListItemsParams,
  ThreadListParams,
} from 'openai/resources/beta/chatkit/threads';

export class ChatKit extends ApiResource {
  sessions: ChatKitSessions;
  threads: ChatKitThreads;
  constructor(client: any) {
    super(client);
    this.sessions = new ChatKitSessions(client);
    this.threads = new ChatKitThreads(client);
  }

  uploadFile(
    body: ChatKitUploadFileParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<ChatKitUploadFileResponse> {
    if (params) {
      const config = overrideConfig(this.client.config, params.config);
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params, config }),
      };
    }
    const OAIclient = initOpenAIClient(this.client);
    const result = OAIclient.beta.chatkit.uploadFile(body, opts);
    return result as any;
  }
}

export class ChatKitSessions extends ApiResource {
  create(
    body: SessionCreateParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<ChatSession> {
    if (params) {
      const config = overrideConfig(this.client.config, params.config);
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params, config }),
      };
    }
    const OAIclient = initOpenAIClient(this.client);
    const result = OAIclient.beta.chatkit.sessions
      .create(body, opts)
      .withResponse();
    return finalResponse(result);
  }

  cancel(
    sessionID: string,
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
    const result = OAIclient.beta.chatkit.sessions
      .cancel(sessionID, opts)
      .withResponse();
    return finalResponse(result);
  }
}

export class ChatKitThreads extends ApiResource {
  retrieve(
    threadID: string,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<ChatKitThread> {
    if (params) {
      const config = overrideConfig(this.client.config, params.config);
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params, config }),
      };
    }
    const OAIclient = initOpenAIClient(this.client);
    const result = OAIclient.beta.chatkit.threads
      .retrieve(threadID, opts)
      .withResponse();
    return finalResponse(result);
  }

  list(
    query: ThreadListParams | null | undefined = {},
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<any> {
    if (params) {
      const config = overrideConfig(this.client.config, params.config);
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params, config }),
      };
    }
    const OAIclient = initOpenAIClient(this.client);
    const result = OAIclient.beta.chatkit.threads.list(query, opts);
    return result as any;
  }
  delete(
    threadID: string,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<ThreadDeleteResponse> {
    if (params) {
      const config = overrideConfig(this.client.config, params.config);
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params, config }),
      };
    }
    const OAIclient = initOpenAIClient(this.client);
    const result = OAIclient.beta.chatkit.threads
      .delete(threadID, opts)
      .withResponse();
    return finalResponse(result);
  }

  listItems(
    threadID: string,
    query: ThreadListItemsParams | null | undefined = {},
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<any> {
    if (params) {
      const config = overrideConfig(this.client.config, params.config);
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params, config }),
      };
    }
    const OAIclient = initOpenAIClient(this.client);
    const result = OAIclient.beta.chatkit.threads.listItems(
      threadID,
      query,
      opts
    );
    return result as any;
  }
}
