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
import { OutputItemListParams } from 'openai/resources/evals/runs/output-items';

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
    evalID: string,
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
    const result = await OAIclient.evals.retrieve(evalID, opts).withResponse();
    return finalResponse(result);
  }

  async update(
    evalID: string,
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
      .update(evalID, body, opts)
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

  async delete(
    evalID: string,
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
    const result = await OAIclient.evals.delete(evalID, opts).withResponse();
    return finalResponse(result);
  }
}

export class EvalsRuns extends ApiResource {
  outputItems: OutputItems;
  constructor(client: any) {
    super(client);
    this.outputItems = new OutputItems(client);
  }

  async create(
    evalID: string,
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
      .create(evalID, body, opts)
      .withResponse();
    return finalResponse(result);
  }

  async retrieve(
    runID: string,
    { eval_id }: { eval_id: string },
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
      .retrieve(runID, { eval_id }, opts)
      .withResponse();
    return finalResponse(result);
  }

  async list(
    evalID: string,
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
      .list(evalID, query, opts)
      .withResponse();
    return finalResponse(result);
  }

  async delete(
    runID: string,
    { eval_id }: { eval_id: string },
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
      .delete(runID, { eval_id }, opts)
      .withResponse();
    return finalResponse(result);
  }

  async cancel(
    runID: string,
    { eval_id }: { eval_id: string },
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
    const body = {};
    const options = { body, ...opts };
    const result = await OAIclient.evals.runs
      .cancel(runID, { eval_id }, options)
      .withResponse();
    return finalResponse(result);
  }
}

export class OutputItems extends ApiResource {
  async retrieve(
    outputItemID: string,
    { eval_id, run_id }: { eval_id: string; run_id: string },
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
    const result = await OAIclient.evals.runs.outputItems
      .retrieve(outputItemID, { eval_id, run_id }, opts)
      .withResponse();
    return finalResponse(result);
  }

  async list(
    runID: string,
    query?: OutputItemListParams,
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
    const result = await OAIclient.evals.runs.outputItems
      .list(runID, query as any, opts)
      .withResponse();
    return finalResponse(result);
  }
}
