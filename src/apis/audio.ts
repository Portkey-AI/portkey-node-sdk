import { TranscriptionCreateParams } from 'openai/resources/audio/transcriptions';
import { ApiClientInterface } from '../_types/generalTypes';
import { ApiResource } from '../apiResource';
import { RequestOptions } from '../baseClient';
import { finalResponse, initOpenAIClient, overrideConfig } from '../utils';
import { createHeaders } from './createHeaders';
import { TranslationCreateParams } from 'openai/resources/audio/translations';
import { SpeechCreateParams } from 'openai/resources/audio/speech';

export class Audio extends ApiResource {
  transcriptions: transcriptions;
  translations: translations;
  speech: speech;

  constructor(client: any) {
    super(client);
    this.transcriptions = new transcriptions(client);
    this.translations = new translations(client);
    this.speech = new speech(client);
  }
}

export class transcriptions extends ApiResource {
  async create(
    _body: TranscriptionCreateParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): Promise<any> {
    const body: TranscriptionCreateParams = _body;
    if (params) {
      const config = overrideConfig(this.client.config, params.config);
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params, config }),
      };
    }
    const OAIclient = initOpenAIClient(this.client);
    const response = await OAIclient.audio.transcriptions
      .create(body, opts)
      .withResponse();
    return finalResponse(response);
  }
}

export class translations extends ApiResource {
  async create(
    _body: TranslationCreateParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): Promise<any> {
    const body: TranslationCreateParams = _body;
    if (params) {
      const config = overrideConfig(this.client.config, params.config);
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params, config }),
      };
    }
    const OAIclient = initOpenAIClient(this.client);
    const response = await OAIclient.audio.translations
      .create(body, opts)
      .withResponse();
    return finalResponse(response);
  }
}

export class speech extends ApiResource {
  async create(
    _body: SpeechCreateParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): Promise<any> {
    const body: SpeechCreateParams = _body;
    if (params) {
      const config = overrideConfig(this.client.config, params.config);
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params, config }),
      };
    }
    const OAIclient = initOpenAIClient(this.client);
    const response = await OAIclient.audio.speech.create(body, opts);
    return response;
  }
}
