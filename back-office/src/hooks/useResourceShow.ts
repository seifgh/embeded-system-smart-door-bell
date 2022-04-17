import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BaseResource } from "../api/services/resources/interfaces";
import {
  notifyItemDeletedSuccessfully,
  notifyUnexpectedError,
} from "../utils/notifications";

const useResourceShow = <RecordType>(
  resourceService: BaseResource<any, RecordType, any, any>,
  navigateToAfterDelete: string
) => {
  const { recordId } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [recordData, setRecordData] = useState<RecordType | null>(null);

  const onDelete = (id: number | string) => {
    setIsLoading(true);
    resourceService
      .deleteOne(id)
      .then(notifyItemDeletedSuccessfully)
      .catch(notifyUnexpectedError)
      .finally(() => {
        navigate(navigateToAfterDelete);
      });
  };

  useEffect(() => {
    setIsLoading(true);
    resourceService
      .getOne(recordId as string)
      .then((data) => {
        setRecordData(data);
      })
      .catch((err) => {
        console.log({ err });
        navigate("/");
      })
      .finally(() => setIsLoading(false));
  }, [recordId, navigate, resourceService]);

  return {
    recordData,
    isLoading,
    onDelete,
  };
};

export default useResourceShow;
