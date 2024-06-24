import type { Portkey } from "./index";

export class ApiResource {
	protected client: Portkey;
	protected post: Portkey["_post"]
	protected put: Portkey["_put"]
	protected get: Portkey["_get"]
	protected delete: Portkey["_delete"]

	constructor(client: Portkey) {
		this.client = client
		this.post = client._post.bind(client)
		this.put = client._put.bind(client)
		this.get = client._get.bind(client)
		this.delete = client._delete.bind(client)
	}
}