import type { Portkey } from './index';

export class ApiResource {
  protected client: Portkey;
  protected post: Portkey['_post'];
  protected put: Portkey['_put'];
  protected getMethod: Portkey['_get'];
  protected deleteMethod: Portkey['_delete'];

  constructor(client: Portkey) {
    this.client = client;
    this.post = client._post.bind(client);
    this.put = client._put.bind(client);
    this.getMethod = client._get.bind(client);
    this.deleteMethod = client._delete.bind(client); // delete is a reserved word
  }
}
