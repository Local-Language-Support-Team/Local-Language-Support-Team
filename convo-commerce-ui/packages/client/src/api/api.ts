import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  Method,
} from "axios";
import pRetry from "p-retry";

const MAX_RETRIES = 2;

/**
 * @description By default AxiosInstance itself doesn't have [IndexSignature](https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html)
 *
 * @interface AxiosInstanceWithIndexSignature
 * @extends {AxiosInstance}
 */
export interface AxiosInstanceWithIndexSignature extends AxiosInstance {
  [key: string]: any; // Add index signature
}

export const instance: AxiosInstanceWithIndexSignature = axios.create({
  baseURL: "/api/",
  timeout: 1000,
  headers: { "Content-Type": "application/json" },
});

/**
 * @description Execute Axios request
 *
 * @template T - Type of response data
 * @template R - Type of response
 * @param {Method} action - HTTP method
 * @param {string} url - URL
 * @param {AxiosRequestConfig} [config] - Axios request config
 * @return {*}  {Promise<R>}
 */
export const executeAxiosRequest = async <T = any>(
  axiosInstance: AxiosInstanceWithIndexSignature,
  action: Method,
  url: string,
  config?: AxiosRequestConfig
): Promise<T> => {
  const response = await axiosInstance[action.toLowerCase()](url, config);

  return response;
};

/**
 * @description Execute Axios request with retries
 *
 * @template T - Type of response data
 * @template R - Type of response
 * @param {string} url - URL
 * @param {AxiosRequestConfig} [config] - Axios request config
 * @param {AxiosInstance} [axiosInstance] - Axios instance
 * @return {*}  {Promise<R>}
 */
const getWithRetries = <T = any, R = AxiosResponse<T>>(
  url: string,
  config?: AxiosRequestConfig,
  axiosInstance: AxiosInstanceWithIndexSignature = instance
): Promise<R> =>
  pRetry(() => executeAxiosRequest(axiosInstance, "get", url, config), {
    retries: MAX_RETRIES,
    onFailedAttempt: (error: any) => {
      /* istanbul ignore next */
      if (error.retriesLeft === 0) {
        // eslint-disable-next-line no-console
        console.error(
          error.attemptNumber,
          " failed unable to connect with server!"
        );
      }
    },
  });

/**
 * @description Execute Axios request with retries
 *
 * @template T - Type of response data
 * @template R - Type of response
 * @param {string} url - URL
 * @param {AxiosRequestConfig} [config] - Axios request config
 * @param {AxiosInstance} [axiosInstance] - Axios instance
 * @return {*}  {Promise<R>}
 */
const postWithRetries = <T = any, R = AxiosResponse<T>>(
  url: string,
  config?: AxiosRequestConfig,
  /* istanbul ignore next */
  axiosInstance: AxiosInstanceWithIndexSignature = instance
): Promise<R> =>
  pRetry(() => executeAxiosRequest(axiosInstance, "post", url, config), {
    retries: MAX_RETRIES,
    onFailedAttempt: (error: any) => {
      /* istanbul ignore next */
      if (error.retriesLeft === 0) {
        // eslint-disable-next-line no-console
        console.error(
          error.attemptNumber,
          " failed unable to connect with server!"
        );
      }
    },
  });

export interface AxiosInstanceWithRetries
  extends AxiosInstanceWithIndexSignature {
  getWithRetries: typeof getWithRetries;
  postWithRetries: typeof postWithRetries;
}

instance.getWithRetries = getWithRetries;
instance.postWithRetries = postWithRetries;

export default instance;
