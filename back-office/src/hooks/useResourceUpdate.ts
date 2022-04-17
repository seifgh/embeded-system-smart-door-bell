import { Form } from "antd";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BaseResource } from "../api/services/resources/interfaces";
import {
  handleApiFormErrors,
  notifyItemUpdatedSuccessfully,
} from "../utils/notifications";

const useResourceUpdate = <ShowRecordType, UpdateRecordType>(
  resourceService: BaseResource<any, ShowRecordType, any, UpdateRecordType>,
  navigateToAfterUpdate: string
) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const recordId = useParams().recordId as string;
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    resourceService
      .getOne(recordId)
      .then((data: ShowRecordType) => {
        form.setFieldsValue(data);
      })
      .catch((err) => {
        console.log({ err });
        navigate("/");
      })
      .finally(() => setIsLoading(false));
  }, [form, navigate, recordId, resourceService]);

  const onSubmit = async (data: UpdateRecordType) => {
    setIsLoading(true);

    resourceService
      .update(recordId, data)
      .then(() => {
        notifyItemUpdatedSuccessfully();
        navigate(navigateToAfterUpdate);
      })
      .catch((err: AxiosError) => {
        handleApiFormErrors(err, form);
      })
      .finally(() => setIsLoading(false));
  };

  return {
    isLoading,
    form,
    onSubmit,
  };
};

export default useResourceUpdate;
