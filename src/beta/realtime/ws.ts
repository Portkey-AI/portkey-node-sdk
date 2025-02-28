import { OpenAIRealtimeWS } from 'openai/beta/realtime/ws';
import WebSocket from 'ws';

export class PortkeyAIRealtimeWS extends OpenAIRealtimeWS {
  override url!: URL;
  override socket!: WebSocket;

  constructor(props: { model: string; options?: any }, client: any) {
    const options = {
      ...props.options,
      headers: {
        ...(props.options?.headers || {}),
        ...client.customHeaders,
      },
    };

    super({ ...props, options }, client);
  }
}
