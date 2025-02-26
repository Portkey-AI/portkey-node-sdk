import { OpenAIRealtimeWebSocket } from 'openai/beta/realtime/websocket';

export class PortkeyAIRealtimeWebSocket extends OpenAIRealtimeWebSocket {
  constructor(
    props: {
      model: string;
      dangerouslyAllowBrowser?: boolean;
      headers?: Record<string, string>;
      onURL?: (url: URL) => void;
    },
    client: any
  ) {
    super({ ...props }, client);

    const customHeadersProtocol = Object.entries(props.headers || {})
      .map(([key, value]) => {
        if (key.toLowerCase().includes('api-key')) {
          return `${key}.${encodeURIComponent(value as any)}`;
        }
        return `${key}.${encodeURIComponent(value as any)}`;
      })
      .filter(Boolean);

    this.socket = new WebSocket(this.url.toString(), [
      'realtime',
      `openai-insecure-api-key.${client.apiKey}`,
      'openai-beta.realtime-v1',
      ...customHeadersProtocol,
    ]);
    this.socket.addEventListener('message', (event: MessageEvent) => {
      try {
        const parsedEvent = JSON.parse(event.data.toString());
        this._emit('event', parsedEvent);
        if (parsedEvent.type === 'error') {
          this._onError(parsedEvent);
        } else {
          this._emit(parsedEvent.type, parsedEvent);
        }
      } catch (err) {
        this._onError(null, 'could not parse websocket event', err);
      }
    });

    this.socket.addEventListener('error', (event: any) => {
      this._onError(null, event.message, null);
    });
  }
}
