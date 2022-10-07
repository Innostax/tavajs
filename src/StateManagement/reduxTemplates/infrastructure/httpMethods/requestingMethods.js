import { BASE_URL } from "./methods.constants";

const requetMethods = {
    get,
    post,
    put,
    patch,
    delete: deleteRequest,
};

const get = (url, requestWithConfig) => {
    return fetchApi(url, requestWithConfig);
}

const post = (url, requestWithConfig) => {
    requestWithConfig = {
        method: "POST",
        ...requestWithConfig,
    };

    return fetchApi(url, requestWithConfig);
}

const put = (url, requestWithConfig) => {
    requestWithConfig = {
        method: "PUT",
        ...requestWithConfig,
    };
    return fetchApi(url, requestWithConfig);
}

const patch = (url, requestWithConfig) => {
    requestWithConfig = {
        method: "PATCH",
        ...requestWithConfig,
    };
    return fetchApi(url, requestWithConfig);
}

const deleteRequest = (url, requestWithConfig) => {
    requestWithConfig = {
        method: "DELETE",
        ...requestWithConfig,
    };
    return fetchApi(url, requestWithConfig);
}

const fetchApi = (url, requestWithConfig) => {
    if (!url) {
        throw new Error("You must specify a url");
    }

    return fetch(withBaseUrl(url), requestWithConfig).then((response) => {
        if (response.ok) {
            return response.json();
        }
        return Promise.reject(response);
    });
}

const withBaseUrl = (url) => {
    return `${BASE_URL}/${url}`;
}

export default requetMethods;
