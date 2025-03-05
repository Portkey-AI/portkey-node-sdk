import {
  JobCreateParams,
  JobListEventsParams,
  JobListParams,
} from 'openai/resources/fine-tuning/jobs/jobs';
import { ApiClientInterface } from '../_types/generalTypes';
import { ApiResource } from '../apiResource';
import { RequestOptions } from '../baseClient';
import { finalResponse, initOpenAIClient, overrideConfig } from '../utils';
import { createHeaders } from './createHeaders';
import { CheckpointListParams } from 'openai/resources/fine-tuning/jobs/checkpoints';

export class FineTuning extends ApiResource {
  jobs: Jobs;
  constructor(client: any) {
    super(client);
    this.jobs = new Jobs(client);
  }
}

export class Jobs extends ApiResource {
  checkpoints: Checkpoints;
  constructor(client: any) {
    super(client);
    this.checkpoints = new Checkpoints(client);
  }

  async create(
    _body: JobCreateBody,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): Promise<any> {
    const body: JobCreateBody = _body;
    if (params) {
      const config = overrideConfig(this.client.config, params.config);
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params, config }),
      };
    }

    const OAIclient = initOpenAIClient(this.client);

    const result = await OAIclient.fineTuning.jobs
      .create(body, opts)
      .withResponse();
    return finalResponse(result);
  }

  async retrieve(
    fineTuningJobId: string,
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

    const result = await OAIclient.fineTuning.jobs
      .retrieve(fineTuningJobId, opts)
      .withResponse();
    return finalResponse(result);
  }

  async list(
    _query?: JobListParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): Promise<any> {
    const query: JobListParams | undefined = _query;
    if (params) {
      const config = overrideConfig(this.client.config, params.config);
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params, config }),
      };
    }

    const OAIclient = initOpenAIClient(this.client);

    const result = await OAIclient.fineTuning.jobs
      .list(query, opts)
      .withResponse();
    return finalResponse(result);
  }

  async cancel(
    fineTuningJobId: string,
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
    const body = {};
    const options = { body, ...opts };

    const result = await OAIclient.fineTuning.jobs
      .cancel(fineTuningJobId, options)
      .withResponse();
    return finalResponse(result);
  }

  async listEvents(
    fineTuningJobId: string,
    _query?: JobListEventsParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): Promise<any> {
    const query: JobListEventsParams | undefined = _query;
    if (params) {
      const config = overrideConfig(this.client.config, params.config);
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params, config }),
      };
    }

    const OAIclient = initOpenAIClient(this.client);

    const result = await OAIclient.fineTuning.jobs
      .listEvents(fineTuningJobId, query, opts)
      .withResponse();
    return finalResponse(result);
  }
}

export class Checkpoints extends ApiResource {
  async list(
    fineTuningJobId: string,
    _query?: CheckpointListParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): Promise<any> {
    const query: CheckpointListParams | undefined = _query;
    if (params) {
      const config = overrideConfig(this.client.config, params.config);
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params, config }),
      };
    }

    const OAIclient = initOpenAIClient(this.client);

    const result = await OAIclient.fineTuning.jobs.checkpoints
      .list(fineTuningJobId, query, opts)
      .withResponse();
    return finalResponse(result);
  }
}

export interface JobCreateBody extends JobCreateParams {
  role_arn: string;
  job_name: string;
  output_file: string;
  provider_options: Record<string, any>;
  portkey_options: Record<string, any>;
  [key: string]: any;
}
