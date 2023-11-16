export const MISSING_API_KEY_ERROR_MESSAGE = `No API key found for Portkey.
Please set either the PORTKEY_API_KEY environment variable or \
pass the api_key in the to initialization of Portkey.
API keys can be found or created at Portkey Dashboard \

Here's how you get it:
1. Visit https://app.portkey.ai/
1. Click on your profile icon on the top left
2. From the dropdown menu, click on "Copy API Key"
`

export const MISSING_BASE_URL = `No Base url provided. Please provide a valid base url.
For example: https://api.portkey.ai
`

export const MISSING_CONFIG_MESSAGE = `The 'config' parameter is not set. Please provide a valid Config object`

export const MISSING_MODE_MESSAGE = `The 'mode' parameter is not set. Please provide a valid mode literal.`


export const INVALID_PORTKEY_MODE = `Argument of type '{}' cannot be assigned to parameter "mode" of \
type "ModesLiteral | Modes | None"
`

export const DEFAULT_MAX_RETRIES = 2
export const DEFAULT_TIMEOUT = 60
export const PORTKEY_HEADER_PREFIX = "x-portkey-"
export const PORTKEY_BASE_URL = "https://api.portkey.ai"

export const PORTKEY_API_KEY_ENV = "PORTKEY_API_KEY"
export const PORTKEY_PROXY_ENV = "PORTKEY_PROXY"

// API routes
export const CHAT_COMPLETE_API = "/v1/proxy/chat/completions"
export const TEXT_COMPLETE_API = "/v1/proxy/complete"
export const PROMPT_API = "/v1/prompt/complete"
export const FEEDBACK_API = "/v1/feedback"
export const PORTKEY_GATEWAY_URL = `${PORTKEY_BASE_URL}/v1/proxy`