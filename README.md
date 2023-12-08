<div align="center">
<img src="https://assets.portkey.ai/header.png" height=150><br />

## Ship Ambitious Gen AI Apps with Portkey's full-stack LLMOps Platform

```bash
npm install portkey-ai
```

</div>

## **💡 Features**

**🚪 AI Gateway:**
*  **Unified API Signature**: If you've used OpenAI, you already know how to use Portkey with any other provider.
*  **Interoperability**: Write once, run with any provider. Switch between _any model_ from _any provider_ seamlessly. 
*  **Automated Fallbacks & Retries**: Ensure your application remains functional even if a primary service fails.
*  **Load Balancing & A/B Testing**: Efficiently distribute incoming requests among multiple models and run A/B tests at scale.
*  **Semantic Caching**: Reduce costs and latency by intelligently caching results.

**🔬 Observability:**
*  **Logging**: Keep track of all requests for monitoring and debugging.
*  **Requests Tracing**: Understand the journey of each request for optimization.
*  **Custom Tags**: Segment and categorize requests for better insights.


## **🚀 Quick Start**

#### First, install the SDK & export Portkey API Key
[Get Portkey API key here.](https://app.portkey.ai/signup)
```bash
$ npm install portkey-ai
$ export PORTKEY_API_KEY="PORTKEY_API_KEY"
```

#### Now, let's make a request with GPT-4

```js
import Portkey from 'portkey-ai';

// Construct a client with a virtual key
const portkey = new Portkey({
    apiKey: "PORTKEY_API_KEY",
    virtualKey: "VIRTUAL_KEY"
})

async function main() {
    const chatCompletion = await portkey.chat.completions.create({
        messages: [{ role: 'user', content: 'Say this is a test' }],
        model: 'gpt-3.5-turbo',
    });

    console.log(chatCompletion.choices);
};

main();
```

Portkey fully adheres to the OpenAI SDK signature. This means that you can instantly switch to Portkey and start using Portkey's advanced production features right out of the box.




## **📔 List of Portkey Features**

You can set all of these features while constructing your LLMOptions object.


| Feature | Config Key | Value(Type) | Required |
|--|--|--|--|
| API Key OR Virtual Key | `api_key` OR `virtual_key` | `string` | ✅ Required |
| Provider Name       | `provider`        | `openai`, `cohere`, `anthropic`, `azure-openai` | ✅ Required  |
| Model Name        | `model`        | The relevant model name from the provider. For example, `gpt-3.5-turbo` OR `claude-2` | ❔ Optional |
| Weight (For Loadbalance) | `weight` | `integer` | ❔ Optional |
| Cache Type          | `cache_status`          | `simple`, `semantic`                             | ❔ Optional |
| Force Cache Refresh | `cache_force_refresh`   | `True`, `False` (Boolean)                                 | ❔ Optional |
| Cache Age           | `cache_age`             | `integer` (in seconds)                           | ❔ Optional |
| Trace ID            | `trace_id`              | `string`                                         | ❔ Optional |
| Retries         | `retry`           | `integer` [0,5]                                  | ❔ Optional |
| Metadata            | `metadata`              | `json object` [More info](https://docs.portkey.ai/key-features/custom-metadata)          | ❔ Optional |
| All Model Params | As per the model/provider | This is params like `top_p`, `temperature`, etc | ❔ Optional |

## **🤝 Supported Providers**

|| Provider  | Support Status  | Supported Endpoints |
|---|---|---|---|
| <img src="https://assets.portkey.ai/openai.png" width=18 />| OpenAI | ✅ Supported  | `/completion`, `/chatcompletion` |
| <img src="https://assets.portkey.ai/azure.png" width=18>| Azure OpenAI | ✅ Supported  | `/completion`, `/chatcompletion` |
| <img src="https://assets.portkey.ai/anthropic.png" width=18>| Anthropic  | ✅ Supported  | `/complete` |
| <img src="https://assets.portkey.ai/cohere.png" width=18>| Cohere  | ✅ Supported  | `generate` |


---

#### [📝 Full Documentation](https://docs.portkey.ai/) | [🛠️ Integration Requests](https://github.com/Portkey-AI/portkey-node-sdk/issues) | 

<a href="https://twitter.com/intent/follow?screen_name=portkeyai"><img src="https://img.shields.io/twitter/follow/portkeyai?style=social&logo=twitter" alt="follow on Twitter"></a>
<a href="https://discord.gg/sDk9JaNfK8" target="_blank"><img src="https://img.shields.io/discord/1143393887742861333?logo=discord" alt="Discord"></a>
