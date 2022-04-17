import { Form } from "antd";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BaseResource } from "../api/services/resources/interfaces";
import {
  handleApiFormErrors,
  notifyItemCreatedSuccessfully,
} from "../utils/notifications";

const useResourceCreate = <RecordType>(
  resourceService: BaseResource<any, any, RecordType, any>,
  navigateToAfterCreate: string,
  defaultFieldsValue: { [key: string]: any }
) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    form.setFieldsValue(defaultFieldsValue);
  }, [form, defaultFieldsValue]);

  const onSubmit = async (data: RecordType) => {
    console.log({ data });
    setIsLoading(true);
    resourceService
      .create(data)
      .then(() => {
        notifyItemCreatedSuccessfully();
        navigate(navigateToAfterCreate);
      })
      .catch((err: AxiosError) => {
        handleApiFormErrors(err, form);
      })
      .finally(() => setIsLoading(false));
  };

  return {
    onSubmit,
    isLoading,
    form,
  };
};

export default useResourceCreate;
