import {
  Transcription,
  TranscriptionCreateParams,
  TranscriptionCreateParamsNonStreaming,
  TranscriptionCreateParamsStreaming,
  TranscriptionCreateResponse,
  TranscriptionStreamEvent,
  TranscriptionVerbose,
} from 'openai/resources/audio/transcriptions';
import { ApiClientInterface } from '../_types/generalTypes';
import { ApiResource } from '../apiResource';
import { APIPromise, RequestOptions } from '../baseClient';
import { finalResponse, initOpenAIClient, overrideConfig } from '../utils';
import { createHeaders } from './createHeaders';
import { TranslationCreateParams } from 'openai/resources/audio/translations';
import { SpeechCreateParams } from 'openai/resources/audio/speech';
import { Stream } from '../streaming';
import { AUDIO_FILE_DURATION_HEADER } from '../constants';
import getAudioFileDuration from '../getAudioDuration';
import { isRunningInBrowser } from '../core';

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
  create(
    body: TranscriptionCreateParamsNonStreaming<'json' | undefined>,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): Promise<APIPromise<Transcription>>;
  create(
    body: TranscriptionCreateParamsNonStreaming<'verbose_json'>,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): Promise<APIPromise<TranscriptionVerbose>>;
  create(
    body: TranscriptionCreateParamsNonStreaming<'srt' | 'vtt' | 'text'>,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): Promise<APIPromise<string>>;
  create(
    body: TranscriptionCreateParamsNonStreaming,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): Promise<APIPromise<Transcription>>;
  create(
    body: TranscriptionCreateParamsStreaming,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): Promise<APIPromise<Stream<TranscriptionStreamEvent>>>;
  create(
    body: TranscriptionCreateParamsStreaming,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): Promise<
    | APIPromise<TranscriptionCreateResponse>
    | APIPromise<string>
    | APIPromise<Stream<TranscriptionStreamEvent>>
  >;
  async create(
    body: TranscriptionCreateParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): Promise<
    | APIPromise<TranscriptionCreateResponse>
    | APIPromise<string>
    | APIPromise<Stream<TranscriptionStreamEvent>>
  > {
    // @ts-ignore
    const path = body.file?.path;
    if (path && this.client.calculateAudioDuration && !isRunningInBrowser()) {
      const duration = await getAudioFileDuration(path);
      if (duration) {
        params = {
          ...params,
          [AUDIO_FILE_DURATION_HEADER]: duration,
        };
      }
    }
    if (params) {
      const config = overrideConfig(this.client.config, params.config);
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params, config }),
      };
    }
    const OAIclient = initOpenAIClient(this.client);

    const response = OAIclient.audio.transcriptions.create(body as any, opts);

    return response as any;
  }
}

export class translations extends ApiResource {
  async create(
    _body: TranslationCreateBody,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): Promise<any> {
    const body: any = _body;
    const path = body.file?.path;
    if (path && this.client.calculateAudioDuration && !isRunningInBrowser()) {
      const duration = await getAudioFileDuration(path);
      if (duration) {
        params = {
          ...params,
          [AUDIO_FILE_DURATION_HEADER]: duration,
        };
      }
    }
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

export interface TranslationCreateBody extends TranslationCreateParams {
  [key: string]: any;
}

export interface SpeechCreateBody extends SpeechCreateParams {
  [key: string]: any;
}
