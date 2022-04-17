import { Input, Select, Spin } from "antd";
import { FC, useEffect, useState } from "react";
import clientHomeResourceService, {
  CreateClientHomeRecord,
} from "../../../../api/services/resources/clientHomeResource";
import clientResourceService from "../../../../api/services/resources/clientResource";
import ResourceCreateHeader from "../../../../components/resources/headers/create-header/ResourceCreateHeader";
import ResourceRecordEdit from "../../../../components/resources/record-edit/ResourceRecordEdit";
import { ResourceRecordEditField } from "../../../../components/resources/record-edit/types";
import useResourceCreate from "../../../../hooks/useResourceCreate";
import {
  nameValidationRules,
  ownerValidationRules,
} from "../../../../utils/forms";
type OwnerSelectInputProps = {
  value?: number | number[];
  onChange?: (id: number | number[]) => void;
  multiple?: boolean;
};
const OwnerSelectInput: FC<OwnerSelectInputProps> = ({
  value,
  onChange,
  multiple = false,
}) => {
  const [options, setOptions] = useState<
    {
      value: number | string;
      label: string;
    }[]
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleClientsSearch = (searchKey: string) => {
    if (searchKey.length) {
      setIsLoading(true);
      setOptions([]);
      clientResourceService
        .searchByEmail(searchKey)
        .then((clients) => {
          const options = clients.map((client) => ({
            value: client.id,
            label: client.email,
          }));
          setOptions(options);
        })
        .finally(() => setIsLoading(false));
    }
  };
  useEffect(() => {
    handleClientsSearch("@");
  }, []);

  return (
    <Select
      mode={(multiple && "multiple") || undefined}
      filterOption={false}
      onSearch={handleClientsSearch}
      showSearch={true}
      placeholder="Search owner by email"
      loading={isLoading}
      size="large"
      value={value}
      onChange={onChange}
      options={options}
    />
  );
};

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
    input: <OwnerSelectInput />,
  },
  {
    label: "Members",
    name: "membersIds",
    input: <OwnerSelectInput multiple />,
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
      <ResourceCreateHeader title="Add new client" />
      <Spin spinning={isLoading}>
        <ResourceRecordEdit fields={FIELDS} form={form} onSubmit={onSubmit} />
      </Spin>
    </>
  );
};

export default ClientHomeResourceCreatePage;
