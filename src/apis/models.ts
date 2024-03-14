import { ApiClientInterface } from "../_types/generalTypes";
import { ApiResource } from "../apiResource";
import { RequestOptions } from "../baseClient";
import { OPEN_AI_API_KEY, PORTKEY_BASE_URL } from "../constants";
import { overrideConfig } from "../utils";
import { createHeaders } from "./createHeaders";
import OpenAI from "openai";

export class Models extends ApiResource {
  async list(params?: ApiClientInterface, opts?: RequestOptions): Promise<any> {
    if (params) {
      const config = overrideConfig(this.client.config, params.config);
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params, config }),
      };
    }

    const OAIclient = new OpenAI({
      apiKey: OPEN_AI_API_KEY,
      baseURL: PORTKEY_BASE_URL,
      defaultHeaders: {...this.client.customHeaders, ...this.client.portkeyHeaders},
    });

    const result = await OAIclient.models.list(opts);
    return result;
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
      baseURL: PORTKEY_BASE_URL,
      defaultHeaders: {...this.client.customHeaders, ...this.client.portkeyHeaders},
    });

    const result = await OAIclient.models.retrieve(model, opts);
    return result;
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
      baseURL: PORTKEY_BASE_URL,
      defaultHeaders: {...this.client.customHeaders, ...this.client.portkeyHeaders},
    });

    const result = await OAIclient.models.del(model, opts);
    return result;
  }
}
