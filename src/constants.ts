export const MISSING_API_KEY_ERROR_MESSAGE = `Portkey API Key Not Found
Resolution: \

1. Get your Portkey API key from https://app.portkey.ai/api-keys \

2. Pass it while instantiating the Portkey client with apiKey param, or set it as an environment variable with export PORTKEY_API_KEY=YOUR_API_KEY
`;

export const MISSING_BASE_URL = `No Base url provided. Please provide a valid base url.
For example: https://api.portkey.ai
`;

export const MISSING_CONFIG_MESSAGE =
  "The 'config' parameter is not set. Please provide a valid Config object";

export const MISSING_MODE_MESSAGE =
  "The 'mode' parameter is not set. Please provide a valid mode literal.";

export const INVALID_PORTKEY_MODE = `Argument of type '{}' cannot be assigned to parameter "mode" of \
type "ModesLiteral | Modes | None"
`;

export const LOCALHOST_CONNECTION_ERROR = `Could not instantiate the Portkey client. \
You can either add a valid 'apiKey' parameter (from https://app.portkey.ai/api-keys) \
or set the 'baseURL' parameter to your AI Gateway's instance's URL.`;

export const CUSTOM_HOST_CONNECTION_ERROR = `We could not connect to the AI Gateway's instance. \
Please check the 'baseURL' parameter in the Portkey client.`;

export const DEFAULT_MAX_RETRIES = 2;
export const DEFAULT_TIMEOUT = 60;
export const PORTKEY_HEADER_PREFIX = 'x-portkey-';
export const PORTKEY_BASE_URL = 'https://api.portkey.ai/v1';
export const LOCAL_BASE_URL = 'http://localhost:8787/v1';
export const PORTKEY_GATEWAY_URL = PORTKEY_BASE_URL;

export const PORTKEY_API_KEY_ENV = 'PORTKEY_API_KEY';
export const PORTKEY_PROXY_ENV = 'PORTKEY_PROXY';

export const OPEN_AI_API_KEY = 'DUMMY-KEY';

// API routes
export const CHAT_COMPLETE_API = '/chat/completions';
export const TEXT_COMPLETE_API = '/completions';
export const PROMPT_API = '/prompt/complete';
export const FEEDBACK_API = '/feedback';
export const EMBEDDINGS_API = '/embeddings';
export const LOGS_API = '/logs';
