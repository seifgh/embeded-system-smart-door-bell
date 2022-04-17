import { Input, Select, Spin } from "antd";
import { FC } from "react";
import adminResourceService, {
  CreateAdminRecord,
} from "../../../../api/services/resources/adminResource";
import ResourceCreateHeader from "../../../../components/resources/headers/create-header/ResourceCreateHeader";
import ResourceRecordEdit from "../../../../components/resources/record-edit/ResourceRecordEdit";
import { ResourceRecordEditField } from "../../../../components/resources/record-edit/types";
import { AdminRole } from "../../../../constants/enums";
import useResourceCreate from "../../../../hooks/useResourceCreate";
import {
  emailValidationRules,
  fullNameValidationRules,
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

const AdminResourceCreatePage: FC = () => {
  const { isLoading, form, onSubmit } = useResourceCreate<CreateAdminRecord>(
    adminResourceService,
    "/admin",
    {
      role: AdminRole.MANAGER,
    }
  );

  return (
    <>
      <ResourceCreateHeader title="Add new admin" />
      <Spin spinning={isLoading}>
        <ResourceRecordEdit fields={FIELDS} form={form} onSubmit={onSubmit} />
      </Spin>
    </>
  );
};

export default AdminResourceCreatePage;
