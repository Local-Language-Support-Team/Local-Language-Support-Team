import axiosInstance, { executeAxiosRequest } from "./api";

const { getWithRetries, postWithRetries } = axiosInstance;

jest.mock("./api", () => {
  const originalModule = jest.requireActual("./api");

  const MOCK_GET = {
    data: "Something",
    status: 200,
    statusText: "",
    headers: {},
    config: {},
  };

  return {
    __esModule: true,
    ...originalModule,
    default: {
      ...originalModule.default,
      get: jest.fn<Promise<any>, any[]>().mockResolvedValue(MOCK_GET),
      post: jest.fn<Promise<any>, any[]>().mockResolvedValue(MOCK_GET),
    },
  };
});

const MOCK_ENDPOINT = "/test/endpoint";

describe("API Utilities", () => {
  describe("executeAxiosRequest", () => {
    it("should execute axios request", async () => {
      const result: any = await executeAxiosRequest(
        axiosInstance,
        "get",
        MOCK_ENDPOINT
      );
      expect(result.data).toEqual("Something");
    });
  });

  describe("getWithRetries", () => {
    it("should return a promise that resolves to expected value", async () => {
      const result = await getWithRetries("/lalala", undefined, axiosInstance);
      expect(result.data).toEqual("Something");
    });
  });

  describe("postWithRetries", () => {
    it("should return a promise that resolves to expected value", async () => {
      const result = await postWithRetries("/lalala", undefined, axiosInstance);
      expect(result.data).toEqual("Something");
    });
  });
});
