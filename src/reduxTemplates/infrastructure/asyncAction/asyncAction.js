import http from '../httpMethods'
import { getStore } from "../../createStore";
import { selectjwtToken } from "../userContext/userContext.selectors";

export function handleException(exception, methodType, url) {
	console.log(
		`Unable to process this ${methodType} request 
      for end-point ${url}
      Failed with response:`,
		exception.status
	)
}

export function createHeader(httpHeaders) {
  const accessToken = selectjwtToken(getStore().getState());
  const requestOptions = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  return httpHeaders
    ? {
        headers: {
          ...requestOptions.headers,
          ...httpHeaders.headers,
          Authorization: `Bearer ${accessToken}`,
        },
      }
    : requestOptions;
}

const asyncAction = ({ url, methodType = 'get', httpHeaders = {} } = {}) => {
	httpHeaders = {
		...httpHeaders,
		...createHeader(httpHeaders),
	}

	return http[methodType](url, httpHeaders)
		.then((body) => {
			return Promise.resolve(body)
		})
		.catch((exception) => {
			handleException(exception, methodType, url)
		})
		.then((response) => {
			return response
		})
}

export default asyncAction
