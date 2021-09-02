import http from "../httpMethods";

export function handleException(exception, methodType, url) {
  console.log(
    `Unable to process this ${methodType} request 
      for end-point ${url}
      Failed with response:`,
    exception.status
  );
}

export function createHeader(httpHeaders) {
  const requestOptions = {
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify({ title: "React POST Request Example" }),
  };

  return httpHeaders
    ? {
        headers: {
          ...requestOptions.headers,
          ...httpHeaders.headers,
        },
      }
    : requestOptions;
}

const asyncAction = ({ url, methodType = "get", httpHeaders = {} } = {}) => {
  console.log(httpHeaders);
  try {
    httpHeaders = {
      ...httpHeaders,
      ...createHeader(httpHeaders),
    };

    return http[methodType](url, httpHeaders)
      .then((body) => {
        return Promise.resolve(body);
      })
      .catch((exception) => {
        handleException(exception, methodType, url);
      })
      .then((response) => {
        return response;
      });
  } catch (exception) {
    throw exception;
  }
};

export default asyncAction;
