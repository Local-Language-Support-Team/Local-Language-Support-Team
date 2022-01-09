import { AxiosRequestConfig, AxiosResponse } from "axios";
import { requestInterceptor, responseInterceptor } from "./interceptors";

describe("Request interceptor", () => {
  it("should verify request interceptor", () => {
    const requestMock: AxiosRequestConfig = {
      url: "dummyurl",
      method: "GET",
      params: {
        name: "test",
        age: 20,
      },
    };
    const expectedMock: AxiosRequestConfig = {
      url: "dummyurl",
      method: "GET",
      params: {
        name: "test",
        age: 20,
      },
      headers: {
        "custom-header": "custom",
      },
    };
    const response: AxiosRequestConfig = requestInterceptor(requestMock);
    expect(response).toEqual(expectedMock);
  });
});

describe("Response interceptor", () => {
  it("should verify response interceptor", () => {
    const responseMock: AxiosResponse = {
      data: {
        name: "test",
        age: 20,
      },
      status: 200,
      statusText: "ok",
      headers: {
        "custom-header": "custom",
      },
      config: {},
    };
    const response: AxiosResponse = responseInterceptor(responseMock);
    expect(response).toEqual(responseMock);
  });
});
