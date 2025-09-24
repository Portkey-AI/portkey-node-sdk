import { OpenAIRealtimeWebSocket } from 'openai/beta/realtime/websocket';

export class PorkteyRealtimeWebSocket extends OpenAIRealtimeWebSocket {
  override url!: URL;
  override socket!: any;

  constructor(props: { model: string; options?: any }, client: any) {
    super({ ...props }, client);
  }
}
