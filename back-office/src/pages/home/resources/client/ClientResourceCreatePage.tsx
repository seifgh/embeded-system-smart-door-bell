import { InboxOutlined } from "@ant-design/icons";
import { Form, Input, Spin, Upload } from "antd";
import { FC } from "react";
import clientResourceService, {
  CreateClientRecord,
} from "../../../../api/services/resources/clientResource";
import ResourceCreateHeader from "../../../../components/resources/headers/create-header/ResourceCreateHeader";
import ResourceRecordEdit from "../../../../components/resources/record-edit/ResourceRecordEdit";
import { ResourceRecordEditField } from "../../../../components/resources/record-edit/types";
import useResourceCreate from "../../../../hooks/useResourceCreate";
import {
  clientImageValidationRules,
  emailValidationRules,
  fullNameValidationRules,
  getFileFieldValue,
  passwordValidationRules,
} from "../../../../utils/forms";

const FIELDS: ResourceRecordEditField[] = [
  {
    label: "Full name",
    name: "fullName",
    rules: fullNameValidationRules,
    input: <Input placeholder="John Doe" size="large" />,
  },
  {
    label: "Email",
    name: "email",
    rules: emailValidationRules,
    input: <Input placeholder="john.doe@mail.com" size="large" />,
  },
  {
    label: "Password",
    name: "password",
    rules: passwordValidationRules,
    input: <Input.Password placeholder="************" size="large" />,
  },
];

const ClientResourceCreatePage: FC = () => {
  const { isLoading, form, onSubmit } = useResourceCreate<CreateClientRecord>(
    clientResourceService,
    "/client",
    {}
  );

  return (
    <>
      <ResourceCreateHeader title="Add new client" />
      <Spin spinning={isLoading}>
        <ResourceRecordEdit fields={FIELDS} form={form} onSubmit={onSubmit}>
          <Form.Item
            label="Image"
            name="image"
            valuePropName="fileList"
            getValueFromEvent={getFileFieldValue}
            rules={clientImageValidationRules}
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

export default ClientResourceCreatePage;
