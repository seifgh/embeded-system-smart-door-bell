import { Spin } from "antd";
import { FC } from "react";
import clientResourceService, {
  ListClientRecord,
} from "../../../../api/services/resources/clientResource";
import ResourceDateColumn from "../../../../components/resources/columns/resource-date-column/ResourceDateColumn";
import ResourceImageColumn from "../../../../components/resources/columns/resource-image-column/ResourceImageColumn";
import ResourceListHeader from "../../../../components/resources/headers/list-header/ResourceListHeader";
import ResourceRecordsList from "../../../../components/resources/records-list/ResourceRecordsList";
import { ResourceRecordsListColumn } from "../../../../components/resources/records-list/types";
import useResourceList from "../../../../hooks/useResourceList";

const COLUMNS: ResourceRecordsListColumn[] = [
  {
    dataIndex: "id",
    title: "ID",
  },
  {
    dataIndex: "imageUrl",
    title: "Image",
    render: (imageUrl: string) => (
      <ResourceImageColumn src={imageUrl} alt="Client image" />
    ),
  },
  {
    dataIndex: "fullName",
    title: "Full name",
  },

  {
    dataIndex: "email",
    title: "Email",
  },

  {
    dataIndex: "createdAt",
    title: "Created at",
    render: (date: string) => <ResourceDateColumn date={new Date(date)} />,
  },
];
const ClientResourceListPage: FC = () => {
  const { isLoading, paginatedRecords, onDelete } =
    useResourceList<ListClientRecord>(clientResourceService);
  return (
    <>
      <ResourceListHeader title="Clients" />
      <Spin spinning={isLoading}>
        <ResourceRecordsList
          columns={COLUMNS}
          records={paginatedRecords.items}
          paginationMeta={paginatedRecords.meta}
          onDelete={onDelete}
        />
      </Spin>
    </>
  );
};

export default ClientResourceListPage;
