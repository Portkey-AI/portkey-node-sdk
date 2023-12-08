import type { Portkey } from "./index";

export class ApiResource {
	protected client: Portkey;
	protected post: Portkey["_post"]

	constructor(client: Portkey) {
		this.client = client
		this.post = client._post.bind(client)
	}
}