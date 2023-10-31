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
import { Portkey } from "portkey-ai";

const portkey = new Portkey({
    mode: "single",
    llms: [{ provider: "openai", virtual_key: "open-ai-xxx" }]
});

async function main() {
    const chatCompletion = await portkey.chat.completions.create({
        messages: [{ role: 'user', content: 'Say this is a test' }],
        model: 'gpt-4'
    });

    console.log(chatCompletion.choices);
};

main();
```

Portkey fully adheres to the OpenAI SDK signature. This means that you can instantly switch to Portkey and start using Portkey's advanced production features right out of the box.


## **🪜 Detailed Integration Guide**

**There are 4️ Steps to Integrate Portkey**
1. Setting your Portkey API key and your virtual key for AI providers.
2. Constructing your LLM with Portkey features, provider features (and prompt!).
3. Constructing the Portkey client and setting usage mode.
4. Making your request!

Let's dive in! If you are an advanced user and want to directly jump to various full-fledged examples, [click here](https://github.com/Portkey-AI/portkey-node-sdk/blob/main/examples).

---

### **Step 1️ : Get your Portkey API Key and your Virtual Keys for AI providers**

**Portkey API Key:** Log into [Portkey here](https://app.portkey.ai/), then click on the profile icon on top left and “Copy API Key”.
```bash
export PORTKEY_API_KEY="PORTKEY_API_KEY"
```
**Virtual Keys:** Navigate to the "Virtual Keys" page on [Portkey](https://app.portkey.ai/) and hit the "Add Key" button. Choose your AI provider and assign a unique name to your key. Your virtual key is ready!

### **Step 2️ : Construct your LLM, add Portkey features, provider features, and prompt**

**Portkey Features**:
You can find a comprehensive [list of Portkey features here](#📔-list-of-portkey-features). This includes settings for caching, retries, metadata, and more.

**Provider Features**:
Portkey is designed to be flexible. All the features you're familiar with from your LLM provider, like `top_p`, `top_k`, and `temperature`, can be used seamlessly. Check out the [complete list of provider features here](https://github.com/Portkey-AI/portkey-node-sdk/blob/539021dcae8fa0945cf7f0b8c27fc26a7dd56092/src/_types/portkeyConstructs.ts#L34).

**Setting the Prompt Input**:
This param lets you override any prompt that is passed during the completion call - set a model-specific prompt here to optimise the model performance. You can set the input in two ways. For models like Claude and GPT3, use `prompt` = `(str)`, and for models like GPT3.5 & GPT4, use `messages` = `[array]`.

Here's how you can combine everything:

```js
import { LLMOptions } from "portkey-ai";

// Portkey Config
const provider = "openai";
const virtual_key = "open-ai-xxx";
const trace_id = "portkey_sdk_test";
const cache_status = "semantic";

// Model Params
const model = "gpt-4";
const temperature = 1;

// Prompt
const messages = [{"role": "user", "content": "Who are you?"}];

const llm_a: LLMOptions = {
    provider: provider,
    virtual_key: virtual_key,
    cache_status: cache_status,
    trace_id: trace_id,
    model: model,
    temperature: temperature,
    messages: messages
};

```

### **Step 3️ : Construct the Portkey Client**

Portkey client's config takes 3 params: `api_key`, `mode`, `llms`.

* `api_key`: You can set your Portkey API key here or with `$ EXPORT` as done above.
* `mode`: There are **3** modes - Single, Fallback, Loadbalance.
  * **Single** - This is the standard mode. Use it if you do not want Fallback OR Loadbalance features.
  * **Fallback** - Set this mode if you want to enable the Fallback feature.
  * **Loadbalance** - Set this mode if you want to enable the Loadbalance feature. 
* `llms`: This is an array where we pass our LLMs constructed using the LLMOptions interface.

```js
import { Portkey } from "portkey-ai";

const portkey = new Portkey({ mode: "single", llms: [llm_a] });
```

### **Step 4️ : Call the Portkey Client!**

The Portkey client can do `ChatCompletions` and `Completions` calls.

Since our LLM is GPT4, we will use ChatCompletions:

```js
async function main() {
    const response = await portkey.chatCompletions.create({
        messages: [{ "role": "user", "content": "Who are you ?"}]
    });
    console.log(response.choices[0].message);
};

main();
```

You have integrated Portkey's Node SDK in just 4 steps!

---


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
