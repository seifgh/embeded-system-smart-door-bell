import { Input, Spin } from "antd";
import { FC } from "react";
import clientHomeResourceService, {
  CreateClientHomeRecord,
} from "../../../../api/services/resources/clientHomeResource";
import ClientResourceSelectInput from "../../../../components/resources/fields/client-resource-select-input/ClientResourceSelectInput";
import ResourceCreateHeader from "../../../../components/resources/headers/create-header/ResourceCreateHeader";
import ResourceRecordEdit from "../../../../components/resources/record-edit/ResourceRecordEdit";
import { ResourceRecordEditField } from "../../../../components/resources/record-edit/types";
import useResourceCreate from "../../../../hooks/useResourceCreate";
import {
  nameValidationRules,
  ownerValidationRules,
} from "../../../../utils/forms";

const FIELDS: ResourceRecordEditField[] = [
  {
    label: "Name",
    name: "name",
    rules: nameValidationRules,
    input: <Input placeholder="Client home name" size="large" />,
  },
  {
    label: "Owner",
    name: "ownerId",
    rules: ownerValidationRules,
    input: <ClientResourceSelectInput />,
  },
  {
    label: "Members",
    name: "membersIds",
    input: <ClientResourceSelectInput multiple />,
  },
];

const ClientHomeResourceCreatePage: FC = () => {
  const { isLoading, form, onSubmit } =
    useResourceCreate<CreateClientHomeRecord>(
      clientHomeResourceService,
      "/client-home",
      {}
    );

  return (
    <>
      <ResourceCreateHeader title="Add new client home" />
      <Spin spinning={isLoading}>
        <ResourceRecordEdit fields={FIELDS} form={form} onSubmit={onSubmit} />
      </Spin>
    </>
  );
};

export default ClientHomeResourceCreatePage;
