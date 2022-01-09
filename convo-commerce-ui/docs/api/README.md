## Api

- In React-starter, we are using [axios instance](https://axios-http.com/docs/instance) for get and post request with [p-retry](https://github.com/sindresorhus/p-retry).
- To use p-retry with axios instance, we can call `getWithRetries` and `postWithRetries` with axios instance object.
- If a request url does not able to connect with axios instance, it will re-try connect with url 2 more times and show the error.
- For logging, we are using [interceptors](https://axios-http.com/docs/interceptors). It will log the request and response data in JSON format.