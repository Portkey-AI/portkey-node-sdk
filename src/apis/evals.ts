import {
  EvalCreateParams,
  EvalCreateResponse,
  EvalListParams,
  EvalRetrieveResponse,
  EvalUpdateParams,
  EvalUpdateResponse,
} from 'openai/resources/evals/evals';
import { ApiResource } from '../apiResource';
import { ApiClientInterface } from '../_types/generalTypes';
import { RequestOptions } from '../baseClient';
import { finalResponse, initOpenAIClient, overrideConfig } from '../utils';
import { createHeaders } from './createHeaders';
import {
  RunCreateParams,
  RunCreateResponse,
  RunListParams,
  RunRetrieveResponse,
} from 'openai/resources/evals/runs/runs';

export class Evals extends ApiResource {
  runs: EvalsRuns;
  constructor(client: any) {
    super(client);
    this.runs = new EvalsRuns(client);
  }

  async create(
    body: EvalCreateParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): Promise<EvalCreateResponse> {
    if (params) {
      const config = overrideConfig(this.client.config, params.config);
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params, config }),
      };
    }
    const OAIclient = initOpenAIClient(this.client);
    const result = await OAIclient.evals.create(body, opts);
    return result;
  }

  async retrieve(
    evalId: string,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): Promise<EvalRetrieveResponse> {
    if (params) {
      const config = overrideConfig(this.client.config, params.config);
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params, config }),
      };
    }
    const OAIclient = initOpenAIClient(this.client);
    const result = await OAIclient.evals.retrieve(evalId, opts).withResponse();
    return finalResponse(result);
  }

  async update(
    evalId: string,
    body: EvalUpdateParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): Promise<EvalUpdateResponse> {
    if (params) {
      const config = overrideConfig(this.client.config, params.config);
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params, config }),
      };
    }
    const OAIclient = initOpenAIClient(this.client);
    const result = await OAIclient.evals
      .update(evalId, body, opts)
      .withResponse();
    return finalResponse(result);
  }

  async list(
    query?: EvalListParams,
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
    const result = await OAIclient.evals.list(query, opts).withResponse();
    return finalResponse(result);
  }

  async del(
    evalId: string,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): Promise<void> {
    if (params) {
      const config = overrideConfig(this.client.config, params.config);
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params, config }),
      };
    }
    const OAIclient = initOpenAIClient(this.client);
    const result = await OAIclient.evals.del(evalId, opts).withResponse();
    return finalResponse(result);
  }
}

export class EvalsRuns extends ApiResource {
  constructor(client: any) {
    super(client);
  }

  async create(
    evalId: string,
    body: RunCreateParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): Promise<RunCreateResponse> {
    if (params) {
      const config = overrideConfig(this.client.config, params.config);
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params, config }),
      };
    }
    const OAIclient = initOpenAIClient(this.client);
    const result = await OAIclient.evals.runs
      .create(evalId, body, opts)
      .withResponse();
    return finalResponse(result);
  }

  async retrieve(
    evalId: string,
    runId: string,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): Promise<RunRetrieveResponse> {
    if (params) {
      const config = overrideConfig(this.client.config, params.config);
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params, config }),
      };
    }
    const OAIclient = initOpenAIClient(this.client);
    const result = await OAIclient.evals.runs
      .retrieve(evalId, runId, opts)
      .withResponse();
    return finalResponse(result);
  }

  async list(
    evalId: string,
    query?: RunListParams,
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
    const result = await OAIclient.evals.runs
      .list(evalId, query, opts)
      .withResponse();
    return finalResponse(result);
  }

  async del(
    evalId: string,
    runId: string,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): Promise<void> {
    if (params) {
      const config = overrideConfig(this.client.config, params.config);
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params, config }),
      };
    }
    const OAIclient = initOpenAIClient(this.client);
    const result = await OAIclient.evals.runs
      .del(evalId, runId, opts)
      .withResponse();
    return finalResponse(result);
  }

  async cancel(
    evalId: string,
    runId: string,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): Promise<void> {
    if (params) {
      const config = overrideConfig(this.client.config, params.config);
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params, config }),
      };
    }
    const OAIclient = initOpenAIClient(this.client);
    const result = await OAIclient.evals.runs
      .cancel(evalId, runId, opts)
      .withResponse();
    return finalResponse(result);
  }
}
