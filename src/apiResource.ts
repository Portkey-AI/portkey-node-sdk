import type { Portkey } from "./index";

export class ApiResource {
	protected client: Portkey;
	constructor(client: Portkey) {
		this.client = client
		this.post = client._post.bind(client)
	}
	protected post: Portkey["_post"]
}