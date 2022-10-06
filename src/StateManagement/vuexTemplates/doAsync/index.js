import http from "../httpMethod";

export function validateInput(url, httpMethod) {
    if (!url) throw new Error("url is required.");

    if (!httpMethod)
        throw new Error(
            "httpMethod is required and must index the http service and resolve to a method."
        );
}

export const doAsync = ({ url, httpMethod = "get", config = {}, data, dispatch, errorMessage, successMessage } = {}) => {
    validateInput(url, httpMethod);
    return http[httpMethod](
        url, config, data, dispatch, errorMessage, successMessage
    );
};
