import type { Portkey } from './index';

export class ApiResource {
  protected client: Portkey;
  protected post: Portkey['_post'];
  protected put: Portkey['_put'];

  constructor(client: Portkey) {
    this.client = client;
    this.post = client._post.bind(client);
    this.put = client._put.bind(client);
  }
}
