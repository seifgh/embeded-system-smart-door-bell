import { notification } from "antd";
import { FormInstance } from "antd/lib/form";
import { AxiosError } from "axios";

export const notifyUnexpectedError = () => {
  notification.error({
    message: "Oops",
    description: "Some thing went wrong, please try later.",
  });
};

export const notifyItemDeletedSuccessfully = () => {
  notification.success({
    message: "Success",
    description: "Item deleted successfully",
  });
};

export const notifyItemCreatedSuccessfully = () => {
  notification.success({
    message: "Success",
    description: "Item created successfully",
  });
};

export const notifyItemUpdatedSuccessfully = () => {
  notification.success({
    message: "Success",
    description: "Item updated successfully",
  });
};

export const handleApiFormErrors = (err: AxiosError, form: FormInstance) => {
  if (err.response?.data) {
    const { error } = err.response.data;
    if (error === "uniqueEmailError") {
      notification.error({
        message: "Error",
        description: `An item with ${form.getFieldValue(
          "email"
        )} already exists.`,
      });
      return;
    } else if (error === "fileNotAllowed") {
      notification.error({
        message: "Error",
        description: "File type is not allowed (jpg|jpeg|png).",
      });
      return;
    } else if (error === "imageRequired") {
      notification.error({
        message: "Error",
        description: "Client image is required.",
      });
      return;
    } else if (err.response.data.message) {
      const message = err.response.data.message as string[];
      notification.error({
        message: "Error",
        description: (
          <p
            dangerouslySetInnerHTML={{
              __html: message.join(".<br/> ") + ".",
            }}
          />
        ),
      });
      return;
    }
  }
  notifyUnexpectedError();
};
