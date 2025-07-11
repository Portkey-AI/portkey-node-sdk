import { ApiResource } from '../apiResource';
import { APIResponseType, ApiClientInterface } from '../_types/generalTypes';
import { APIPromise, RequestOptions } from '../baseClient';
import { createHeaders } from './createHeaders';
import { toQueryParams } from '../utils';
import { GUARDRAILS_API } from '../constants';

// Check interface for guardrail checks
export interface GuardrailCheck {
  id: string;
  parameters?: Record<string, any>;
  name?: string;
  is_enabled?: boolean;
}

// Feedback configuration interface
export interface GuardrailFeedback {
  value: number;
  weight: number;
  metadata: string;
}

// Success actions interface
export interface GuardrailSuccessActions {
  feedback: GuardrailFeedback;
}

// Fail actions interface
export interface GuardrailFailActions {
  feedback: GuardrailFeedback;
}

// Actions interface for guardrail actions
export interface GuardrailActions {
  deny: boolean;
  async: boolean;
  on_success: GuardrailSuccessActions;
  on_fail: GuardrailFailActions;
}

// Create Guardrail Request interface
export interface CreateGuardrailRequest {
  name: string;
  workspace_id?: string;
  organisation_id?: string;
  checks: GuardrailCheck[];
  actions: GuardrailActions;
}

// Create Guardrail Response interface
export interface CreateGuardrailResponse extends APIResponseType {
  id: string;
  slug: string;
  version_id: string;
}

// List Guardrails Request parameters
export interface ListGuardrailsParams {
  workspace_id?: string;
  organisation_id?: string;
  page_size?: number;
  current_page?: number;
}

// Guardrail Summary interface
export interface GuardrailSummary extends APIResponseType {
  id: string;
  name: string;
  slug: string;
  organisation_id?: string;
  workspace_id?: string | null;
  status: 'active' | 'archived';
  created_at: string;
  last_updated_at: string;
  owner_id: string;
  updated_by?: string | null;
}

// List Guardrails Response interface
export interface ListGuardrailsResponse extends APIResponseType {
  data: GuardrailSummary[];
  total: number;
}

// Get Guardrail parameters
export interface GetGuardrailParams {
  guardrailId: string;
}

// Guardrail Details interface
export interface GuardrailDetails extends GuardrailSummary {
  checks: GuardrailCheck[];
  actions: GuardrailActions;
}

// Update Guardrail Request interface
export interface UpdateGuardrailRequest {
  name?: string;
  checks?: GuardrailCheck[];
  actions?: GuardrailActions;
}

// Update Guardrail Response interface
export interface UpdateGuardrailResponse extends APIResponseType {
  id: string;
  slug: string;
  version_id: string;
}

// Update Guardrail parameters
export interface UpdateGuardrailParams {
  guardrailId?: string;
  workspace_id?: string;
}

// Delete Guardrail parameters
export interface DeleteGuardrailParams {
  guardrailId: string;
}

export class Guardrails extends ApiResource {
  create(
    _body: CreateGuardrailRequest,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<CreateGuardrailResponse> {
    const body = _body;
    if (params) {
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params }),
      };
    }
    const response = this.post<CreateGuardrailResponse>(GUARDRAILS_API, {
      body,
      ...opts,
    });
    return response;
  }

  list(
    _body?: ListGuardrailsParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<ListGuardrailsResponse> {
    const body = _body;
    if (params) {
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params }),
      };
    }
    const query = body ? toQueryParams(body) : '';
    const response = this.getMethod<ListGuardrailsResponse>(
      `${GUARDRAILS_API}${query}`,
      { ...opts }
    );
    return response;
  }

  retrieve(
    _body: GetGuardrailParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<GuardrailDetails> {
    const body = _body;
    const guardrailId = body.guardrailId;
    if (params) {
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params }),
      };
    }
    const response = this.getMethod<GuardrailDetails>(
      `${GUARDRAILS_API}/${guardrailId}`,
      { ...opts }
    );
    return response;
  }

  update(
    _body: UpdateGuardrailRequest & UpdateGuardrailParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<UpdateGuardrailResponse> {
    const body = _body;
    const guardrailId = body.guardrailId;
    delete body.guardrailId;
    if (params) {
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params }),
      };
    }
    const response = this.put<UpdateGuardrailResponse>(
      `${GUARDRAILS_API}/${guardrailId}`,
      { body, ...opts }
    );
    return response;
  }

  delete(
    _body: DeleteGuardrailParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<any> {
    const body = _body;
    const guardrailId = body.guardrailId;
    if (params) {
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params }),
      };
    }
    const response = this.deleteMethod<any>(
      `${GUARDRAILS_API}/${guardrailId}`,
      { body, ...opts }
    );
    return response;
  }
}
