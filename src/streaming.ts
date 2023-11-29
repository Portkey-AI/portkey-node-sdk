import { Fetch } from "./baseClient";
import { APIError } from "./error";

type Bytes = string | ArrayBuffer | Uint8Array | Buffer | null | undefined;

type ServerSentEvent = {
    event: string | null;
    data: string;
    raw: string[];
};

export const safeJSON = (text: string) => {
	try {
		return JSON.parse(text);
	} catch (err) {
		return undefined;
	}
};

export const createResponseHeaders = (
	headers: Awaited<ReturnType<Fetch>>["headers"],
): Record<string, string> => {
	return new Proxy(
		Object.fromEntries(
			// @ts-ignore
			headers.entries(),
		),
		{
			get (target, name) {
				const key = name.toString();
				return target[key.toLowerCase()] || target[key];
			},
		},
	);
};


export class Stream<Item> implements AsyncIterable<Item> {

	private response: Response;
	private decoder: SSEDecoder;

	constructor (response: Response) {
		this.response = response;
		this.decoder = new SSEDecoder();
	}

	private async *iterMessages (): AsyncGenerator<ServerSentEvent, void, unknown> {
		if (!this.response.body) {
			throw new Error("Attempted to iterate over a response with no body");
		}
		const lineDecoder = new LineDecoder();

		const iter = readableStreamAsyncIterable<Bytes>(this.response.body);
		for await (const chunk of iter) {
			for (const line of lineDecoder.decode(chunk)) {
				const sse = this.decoder.decode(line);
				if (sse) yield sse;
			}
		}

		for (const line of lineDecoder.flush()) {
			const sse = this.decoder.decode(line);
			if (sse) yield sse;
		}
	}

	async *[Symbol.asyncIterator] (): AsyncIterator<Item, any, undefined> {
		let done = false;
		try {
			for await (const sse of this.iterMessages()) {
				if (sse.event === null) {
					try {
						yield sse.data === "[DONE]" ? { "model": "", "choices": [{}] } : JSON.parse(sse.data)
					} catch (e) {
						console.error("Could not parse message into JSON:", sse.data);
						console.error("From chunk:", sse.raw);
						throw e;
					}
				}

				if (sse.event === "ping") {
					continue;
				}

				if (sse.event === "error") {
					throw APIError
				}
			}
			done = true;
		} catch (e) {
			if (e instanceof Error && e.name === "AbortError") return;
			throw e;
		}
	}
}

class SSEDecoder {
	private data: string[];
	private event: string | null;
	private chunks: string[];

	constructor () {
		this.event = null;
		this.data = [];
		this.chunks = [];
	}

	decode (line: string) {
		if (line.endsWith("\r")) {
			line = line.substring(0, line.length - 1);
		}

		if (!line) {
			// empty line and we didn't previously encounter any messages
			if (!this.event && !this.data.length) return null;

			const sse: ServerSentEvent = {
				event: this.event,
				data: this.data.join("\n"),
				raw: this.chunks,
			};

			this.event = null;
			this.data = [];
			this.chunks = [];

			return sse;
		}

		this.chunks.push(line);

		if (line.startsWith(":")) {
			return null;
		}

		let [fieldname, _, value] = partition(line, ":");

		if (value.startsWith(" ")) {
			value = value.substring(1);
		}

		if (fieldname === "event") {
			this.event = value;
		} else if (fieldname === "data") {
			this.data.push(value);
		}

		return null;
	}
}

/**
 * A re-implementation of httpx's `LineDecoder` in Python that handles incrementally
 * reading lines from text.
 *
 * https://github.com/encode/httpx/blob/920333ea98118e9cf617f246905d7b202510941c/httpx/_decoders.py#L258
 */
class LineDecoder {
	// prettier-ignore
	static NEWLINE_CHARS = new Set(["\n", "\r", "\x0b", "\x0c", "\x1c", "\x1d", "\x1e", "\x85", "\u2028", "\u2029"]);
	static NEWLINE_REGEXP = /\r\n|[\n\r\x0b\x0c\x1c\x1d\x1e\x85\u2028\u2029]/g;

	buffer: string[];
	trailingCR: boolean;
	textDecoder: any; // TextDecoder found in browsers; not typed to avoid pulling in either "dom" or "node" types.

	constructor () {
		this.buffer = [];
		this.trailingCR = false;
	}

	decode (chunk: Bytes): string[] {
		let text = this.decodeText(chunk);

		if (this.trailingCR) {
			text = "\r" + text;
			this.trailingCR = false;
		}
		if (text.endsWith("\r")) {
			this.trailingCR = true;
			text = text.slice(0, -1);
		}

		if (!text) {
			return [];
		}

		const trailingNewline = LineDecoder.NEWLINE_CHARS.has(text[text.length - 1] || "");
		let lines = text.split(LineDecoder.NEWLINE_REGEXP);

		if (lines.length === 1 && !trailingNewline) {
			this.buffer.push(lines[0]!);
			return [];
		}

		if (this.buffer.length > 0) {
			lines = [this.buffer.join("") + lines[0], ...lines.slice(1)];
			this.buffer = [];
		}

		if (!trailingNewline) {
			this.buffer = [lines.pop() || ""];
		}

		return lines;
	}

	decodeText (bytes: Bytes): string {
		if (bytes == null) return "";
		if (typeof bytes === "string") return bytes;

		// Node:
		if (typeof Buffer !== "undefined") {
			if (bytes instanceof Buffer) {
				return bytes.toString();
			}
			if (bytes instanceof Uint8Array) {
				return Buffer.from(bytes)
					.toString();
			}

			throw new Error(
				`Unexpected: received non-Uint8Array (${bytes.constructor.name}) stream chunk in an environment with a global "Buffer" defined, which this library assumes to be Node. Please report this error.`,
			);
		}

		// Browser
		if (typeof TextDecoder !== "undefined") {
			if (bytes instanceof Uint8Array || bytes instanceof ArrayBuffer) {
				this.textDecoder ??= new TextDecoder("utf8");
				return this.textDecoder.decode(bytes);
			}

			throw new Error(
				`Unexpected: received non-Uint8Array/ArrayBuffer (${(bytes as any).constructor.name
				}) in a web platform. Please report this error.`,
			);
		}

		throw new Error(
			"Unexpected: neither Buffer nor TextDecoder are available as globals. Please report this error.",
		);
	}

	flush (): string[] {
		if (!this.buffer.length && !this.trailingCR) {
			return [];
		}

		const lines = [this.buffer.join("")];
		this.buffer = [];
		this.trailingCR = false;
		return lines;
	}
}

function partition (str: string, delimiter: string): [string, string, string] {
	const index = str.indexOf(delimiter);
	if (index !== -1) {
		return [str.substring(0, index), delimiter, str.substring(index + delimiter.length)];
	}

	return [str, "", ""];
}

/**
 * Most browsers don't yet have async iterable support for ReadableStream,
 * and Node has a very different way of reading bytes from its "ReadableStream".
 *
 * This polyfill was pulled from https://github.com/MattiasBuelens/web-streams-polyfill/pull/122#issuecomment-1627354490
 */
function readableStreamAsyncIterable<T> (stream: any): AsyncIterableIterator<T> {
	if (stream[Symbol.asyncIterator]) return stream;

	const reader = stream.getReader();
	return {
		async next () {
			try {
				const result = await reader.read();
				if (result?.done) reader.releaseLock(); // release lock when stream becomes closed
				return result;
			} catch (e) {
				reader.releaseLock(); // release lock when stream becomes errored
				throw e;
			}
		},
		async return () {
			const cancelPromise = reader.cancel();
			reader.releaseLock();
			await cancelPromise;
			return { done: true, value: undefined };
		},
		[Symbol.asyncIterator] () {
			return this;
		},
	};
}
