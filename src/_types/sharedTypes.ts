export type Metadata = Record<string, string>;

export interface CursorPageParams {
  after?: string;

  limit?: number;
}
