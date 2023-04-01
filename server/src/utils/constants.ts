// Ports and Hosts
export const DEFAULT_EXPRESS_PORT = 3001;
export const DEFAULT_POSTGRES_PORT = 5432;
export const DEFAULT_POSTGRES_HOST = 'localhost';

// Routes
export const AUTH_ROUTE_PATH = '/auth';
export const PROJECTS_ROUTE_PATH = '/project';
export const ISSUES_ROUTE_PATH = '/issue';

// Auth
export const PASSWORD_SALT_ROUNDS = 10;
export const AUTH_TOKEN_TYPE = 'Bearer';
export const AUTH_TOKEN_EXPIRATION_IN_HOURS = 18;

// Status Codes
export const CREATED_CODE = 201;
export const BAD_REQUEST_CODE = 400;
export const UNAUTHORIZED_CODE = 401;
export const FORBIDDEN_CODE = 403;
export const CONFLICT_CODE = 409;
export const SERVER_ERROR_CODE = 500;

// Folders
export const BANNER_FOLDER = 'banners';
