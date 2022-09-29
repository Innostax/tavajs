import { useQuery } from "react-query";

const AsyncData = (endPoint) => {
  async function fetchData() {
    return fetch(`https://jsonplaceholder.typicode.com/${endPoint}`).then(
      (res) => res.json()
    );
  }

  //useQuery hook will return all these values
  // const {
  //   data,
  //   dataUpdatedAt,
  //   error,
  //   errorUpdatedAt,
  //   failureCount,
  //   isError,
  //   isFetched,
  //   isFetchedAfterMount,
  //   isFetching,
  //   isIdle,
  //   isLoading,
  //   isLoadingError,
  //   isPlaceholderData,
  //   isPreviousData,
  //   isRefetchError,
  //   isStale,
  //   isSuccess,
  //   refetch,
  //   remove,
  //   status,
  // } =

  return useQuery("queryKey", fetchData);

  // or using the object syntax

  // const result = useQuery({
  //   queryKey,
  //   queryFn,
  //   enabled,
  // });
};

export default AsyncData;
