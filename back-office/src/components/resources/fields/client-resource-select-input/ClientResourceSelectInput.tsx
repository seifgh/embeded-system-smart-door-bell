import { Select } from "antd";
import { FC, useEffect, useState } from "react";
import clientResourceService from "../../../../api/services/resources/clientResource";

type Props = {
  value?: number | number[];
  onChange?: (id: number | number[]) => void;
  multiple?: boolean;
};
const ClientResourceSelectInput: FC<Props> = ({
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
    setIsLoading(true);
    setOptions([]);
    clientResourceService
      .searchByEmail((searchKey.length && searchKey) || "@")
      .then((clients) => {
        const options = clients.map((client) => ({
          value: client.id,
          label: client.email,
        }));
        setOptions(options);
      })
      .finally(() => setIsLoading(false));
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

export default ClientResourceSelectInput;
