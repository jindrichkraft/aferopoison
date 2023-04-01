export type APIEndpoint = '/project';

export interface IAPIResponse {
  success: boolean;
  message: string | null;
  data: unknown | null;
}
