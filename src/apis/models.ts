import { ApiClientInterface } from "../_types/generalTypes";
import { ApiResource } from "../apiResource";
import { RequestOptions } from "../baseClient";
import { OPEN_AI_API_KEY } from "../constants";
import { defaultHeadersBuilder, finalResponse, overrideConfig } from "../utils";
import { createHeaders } from "./createHeaders";
import OpenAI from "openai";

export class Models extends ApiResource {
  async list(
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

    const OAIclient = new OpenAI({
      apiKey: OPEN_AI_API_KEY,
      baseURL: this.client.baseURL,
      defaultHeaders: defaultHeadersBuilder(this.client)
    });

    const result = await OAIclient.models.list(opts).withResponse();

    return finalResponse(result);
  }

  async retrieve(
    model: string,
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

    const OAIclient = new OpenAI({
      apiKey: OPEN_AI_API_KEY,
      baseURL: this.client.baseURL,
      defaultHeaders: defaultHeadersBuilder(this.client),
    });

    const result = await OAIclient.models.retrieve(model, opts).withResponse();

    return finalResponse(result);
  }

  async del(
    model: string,
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

    const OAIclient = new OpenAI({
      apiKey: OPEN_AI_API_KEY,
      baseURL: this.client.baseURL,
      defaultHeaders: defaultHeadersBuilder(this.client),
    });

    const result = await OAIclient.models.del(model, opts).withResponse();

    return finalResponse(result);
  }
}
