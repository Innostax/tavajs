import axios from "axios";
import { BASE_URL } from "../httpMethod/baseurlConstant";

export const apiClient = axios.create({
    baseURL: BASE_URL
});

const buildHeaders = (config) => {
    const { headers } = config;
    if (headers) {
        return {
            Accept: "application/json",
            "Content-Type": "application/json",
            ...headers
        };
    }
    return {
        Accept: "application/json",
        "Content-Type": "application/json"
    };
};

const request = async (url, httpMethod, config, data) => {
    const response = await apiClient.request({
        url,
        method: httpMethod,
        headers: buildHeaders(config),
        data
    });
    return response;
};

const buildRequestFunction = (httpMethod) => (url, config, data) => request(url, httpMethod, config, data );

export default {
    get: buildRequestFunction("get"),
    post: buildRequestFunction("post"),
    put: buildRequestFunction("put"),
    patch: buildRequestFunction("patch"),
    delete: buildRequestFunction("delete"),
};
