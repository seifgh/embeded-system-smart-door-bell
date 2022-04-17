import { InboxOutlined } from "@ant-design/icons";
import { Form, Input, Spin, Upload } from "antd";
import { FC } from "react";
import clientResourceService, {
  ShowClientRecord,
  UpdateClientRecord,
} from "../../../../api/services/resources/clientResource";
import ResourceUpdateHeader from "../../../../components/resources/headers/update-header/ResourceUpdateHeader";
import ResourceRecordEdit from "../../../../components/resources/record-edit/ResourceRecordEdit";
import { ResourceRecordEditField } from "../../../../components/resources/record-edit/types";
import useResourceUpdate from "../../../../hooks/useResourceUpdate";
import { getFileFieldValue } from "../../../../utils/forms";

const FIELDS: ResourceRecordEditField[] = [
  {
    label: "Full name",
    name: "fullName",
    rules: [{ required: true, message: "Full name is missing" }],
    input: <Input placeholder="John Doe" size="large" />,
  },
  {
    label: "Email",
    name: "email",
    rules: [
      { required: true, message: "Email is missing" },
      { type: "email", message: "Please type a valid email" },
    ],
    input: <Input placeholder="john.doe@mail.com" size="large" />,
  },
  {
    label: "Password",
    name: "password",
    input: <Input.Password placeholder="************" size="large" />,
  },
];

const ClientResourceUpdatePage: FC = () => {
  const { isLoading, form, onSubmit } = useResourceUpdate<
    ShowClientRecord,
    UpdateClientRecord
  >(clientResourceService, "/client");

  return (
    <>
      <ResourceUpdateHeader title="Update client" />
      <Spin spinning={isLoading}>
        <ResourceRecordEdit fields={FIELDS} form={form} onSubmit={onSubmit}>
          <Form.Item
            label="Image"
            name="image"
            valuePropName="fileList"
            getValueFromEvent={getFileFieldValue}
          >
            <Upload.Dragger
              name="image"
              customRequest={() => null}
              multiple={false}
            >
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Click or drag file to this area to upload
              </p>
            </Upload.Dragger>
          </Form.Item>
        </ResourceRecordEdit>
      </Spin>
    </>
  );
};

export default ClientResourceUpdatePage;
