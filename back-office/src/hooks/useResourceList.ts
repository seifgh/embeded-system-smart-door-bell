import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BaseResource } from "../api/services/resources/interfaces";
import { PaginatedResponse } from "../api/services/resources/types";
import {
  notifyItemDeletedSuccessfully,
  notifyUnexpectedError,
} from "../utils/notifications";
import useQueryPagination from "./useQueryPagination";

const useResourceList = <RecordType>(
  resourceService: BaseResource<RecordType, any, any, any>
) => {
  const { page } = useQueryPagination();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [paginatedRecords, setPaginatedRecords] = useState<
    PaginatedResponse<RecordType>
  >({
    items: [],
    meta: {
      currentPage: 1,
      totalItems: 0,
      itemsPerPage: 0,
      totalPages: 0,
    },
  });

  const fetchRecords = useCallback(() => {
    console.log("Fetching");
    setIsLoading(true);
    resourceService
      .getMany(page)
      .then((data) => {
        if (page > data.meta.totalPages) {
          navigate("?page=" + data.meta.totalPages);
        }
        setPaginatedRecords(data);
      })
      .catch((err) => {
        console.log({ err });
      })
      .finally(() => setIsLoading(false));
  }, [page, navigate, resourceService]);

  const onDelete = (id: number | string) => {
    setIsLoading(true);
    resourceService
      .deleteOne(id)
      .then(notifyItemDeletedSuccessfully)
      .catch(notifyUnexpectedError)
      .finally(fetchRecords);
  };

  useEffect(() => {
    fetchRecords();
  }, [fetchRecords]);

  return {
    paginatedRecords,
    onDelete,
    isLoading,
  };
};

export default useResourceList;
