export type APIEndpoint = '/project' | `/project/${number}` | '/issue';

export interface IAPIResponse {
  success: boolean;
  message: string | null;
  data: unknown | null;
}
