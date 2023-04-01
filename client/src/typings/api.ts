export type APIEndpoint =
  | '/project'
  | `/project/${number}`
  | '/issue'
  | `/issue/${number}`;

export interface IAPIResponse {
  success: boolean;
  message: string | null;
  data: unknown | null;
}
