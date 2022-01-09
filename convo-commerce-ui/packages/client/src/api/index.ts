import { requestInterceptor, responseInterceptor } from "./interceptors";

import axiosInstance from "./api";

axiosInstance.interceptors.request.use(requestInterceptor);
axiosInstance.interceptors.response.use(responseInterceptor);

export default axiosInstance;
