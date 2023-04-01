export type APIEndpoint = '/project' | `/project/${number}`;

export interface IAPIResponse {
  success: boolean;
  message: string | null;
  data: unknown | null;
}
