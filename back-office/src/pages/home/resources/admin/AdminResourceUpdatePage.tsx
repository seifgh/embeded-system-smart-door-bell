import { Input, Select, Spin } from "antd";
import { FC } from "react";
import adminResourceService, {
  ShowAdminRecord,
  UpdateAdminRecord,
} from "../../../../api/services/resources/adminResource";
import ResourceUpdateHeader from "../../../../components/resources/headers/update-header/ResourceUpdateHeader";
import ResourceRecordEdit from "../../../../components/resources/record-edit/ResourceRecordEdit";
import { ResourceRecordEditField } from "../../../../components/resources/record-edit/types";
import { AdminRole } from "../../../../constants/enums";
import useResourceUpdate from "../../../../hooks/useResourceUpdate";
import {
  emailValidationRules,
  fullNameValidationRules,
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
    input: <Input.Password placeholder="************" size="large" />,
  },
  {
    label: "Role",
    name: "role",
    input: (
      <Select size="large">
        <Select.Option value={AdminRole.MANAGER}>Manager</Select.Option>
        <Select.Option value={AdminRole.SUPERUSER}>Superuser</Select.Option>
      </Select>
    ),
  },
];

const AdminResourceUpdatePage: FC = () => {
  const { isLoading, form, onSubmit } = useResourceUpdate<
    ShowAdminRecord,
    UpdateAdminRecord
  >(adminResourceService, "/admin");

  return (
    <>
      <ResourceUpdateHeader title="Update admin" />
      <Spin spinning={isLoading}>
        <ResourceRecordEdit fields={FIELDS} form={form} onSubmit={onSubmit} />
      </Spin>
    </>
  );
};

export default AdminResourceUpdatePage;
