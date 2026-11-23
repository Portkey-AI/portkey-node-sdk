import { Stream } from '../src/streaming';

function chunkedSSEResponse(chunks: Array<Uint8Array | Buffer>): Response {
  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      for (const chunk of chunks) {
        controller.enqueue(chunk);
      }
      controller.close();
    },
  });

  return new Response(stream, {
    headers: { 'content-type': 'text/event-stream' },
  });
}

describe('Stream UTF-8 decoding', () => {
  test('reassembles multi-byte UTF-8 characters split across Uint8Array chunks', async () => {
    const payload =
      'data: {"choices":[{"index":0,"delta":{"content":"Café 日本"}}]}\n\n' +
      'data: [DONE]\n\n';
    const bytes = new TextEncoder().encode(payload);
    const cut = bytes.indexOf(0xe6) + 1;

    const sseStream = new Stream<any>(
      chunkedSSEResponse([bytes.slice(0, cut), bytes.slice(cut)])
    );

    const parts: string[] = [];
    for await (const chunk of sseStream) {
      parts.push(chunk.choices[0].delta.content);
    }

    expect(parts.join('')).toBe('Café 日本');
  });

  test('reassembles 4-byte UTF-8 characters split across Buffer chunks', async () => {
    const payload =
      'data: {"choices":[{"index":0,"delta":{"content":"😀"}}]}\n\n' +
      'data: [DONE]\n\n';
    const buf = Buffer.from(payload, 'utf8');
    const emojiStart = buf.indexOf(0xf0);

    const sseStream = new Stream<any>(
      chunkedSSEResponse([
        buf.subarray(0, emojiStart + 1),
        buf.subarray(emojiStart + 1, emojiStart + 2),
        buf.subarray(emojiStart + 2, emojiStart + 3),
        buf.subarray(emojiStart + 3),
      ])
    );

    const parts: string[] = [];
    for await (const chunk of sseStream) {
      parts.push(chunk.choices[0].delta.content);
    }

    expect(parts.join('')).toBe('😀');
  });
});
