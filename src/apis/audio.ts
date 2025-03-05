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
    _body: TranscriptionCreateBody,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): Promise<any> {
    const body: TranscriptionCreateBody = _body;
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
    _body: TranslationCreateBody,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): Promise<any> {
    const body: TranslationCreateBody = _body;
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
    _body: SpeechCreateBody,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): Promise<any> {
    const body: SpeechCreateBody = _body;
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

export interface TranscriptionCreateBody extends TranscriptionCreateParams {
  [key: string]: any;
}

export interface TranslationCreateBody extends TranslationCreateParams {
  [key: string]: any;
}

export interface SpeechCreateBody extends SpeechCreateParams {
  [key: string]: any;
}
