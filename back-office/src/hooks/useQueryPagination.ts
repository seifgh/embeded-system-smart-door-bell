import useQuery from "./useQuery";

type Result = {
  page: number;
};

const useQueryPagination = (): Result => {
  const queryPage = useQuery().get("page");
  const currentPage: number = (queryPage && Number.parseInt(queryPage)) || 1;

  return { page: currentPage };
};

export default useQueryPagination;
