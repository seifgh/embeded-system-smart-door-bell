import { Input, Spin } from "antd";
import { FC } from "react";
import clientHomeResourceService, {
  ShowClientHomeRecord,
  UpdateClientHomeRecord,
} from "../../../../api/services/resources/clientHomeResource";
import ClientResourceSelectInput from "../../../../components/resources/fields/client-resource-select-input/ClientResourceSelectInput";
import ResourceUpdateHeader from "../../../../components/resources/headers/update-header/ResourceUpdateHeader";
import ResourceRecordEdit from "../../../../components/resources/record-edit/ResourceRecordEdit";
import { ResourceRecordEditField } from "../../../../components/resources/record-edit/types";
import useResourceUpdate from "../../../../hooks/useResourceUpdate";
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

const ClientHomeResourceUpdatePage: FC = () => {
  const { isLoading, form, onSubmit } = useResourceUpdate<
    ShowClientHomeRecord,
    UpdateClientHomeRecord
  >(clientHomeResourceService, "/client-home", (data) => ({
    ...data,
    ownerId: data.owner.id,
    membersIds: data.members.map((member) => member.id),
  }));

  return (
    <>
      <ResourceUpdateHeader title="Update client home" />
      <Spin spinning={isLoading}>
        <ResourceRecordEdit fields={FIELDS} form={form} onSubmit={onSubmit} />
      </Spin>
    </>
  );
};

export default ClientHomeResourceUpdatePage;
