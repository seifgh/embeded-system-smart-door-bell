import { Spin } from "antd";
import { FC } from "react";
import clientHomeResourceService, {
  ListClientHomeRecord,
} from "../../../../api/services/resources/clientHomeResource";
import { ShowClientRecord } from "../../../../api/services/resources/clientResource";
import ClientHomeResourceClientColumn from "../../../../components/resources/columns/client-home-resource-client-column/ClientHomeResourceClientColumn";
import ResourceDateColumn from "../../../../components/resources/columns/resource-date-column/ResourceDateColumn";
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
    dataIndex: "name",
    title: "Name",
  },
  {
    dataIndex: "owner",
    title: "Owner",
    render: (owner: ShowClientRecord) => (
      <ClientHomeResourceClientColumn client={owner} />
    ),
  },
  {
    dataIndex: "members",
    title: "Members",
    render: (members: ShowClientRecord[]) =>
      (members.length &&
        members.map((member) => (
          <ClientHomeResourceClientColumn key={member.id} client={member} />
        ))) ||
      "No members",
  },
  {
    dataIndex: "createdAt",
    title: "Created at",
    render: (date: string) => <ResourceDateColumn date={new Date(date)} />,
  },
];
const ClientHomeResourceListPage: FC = () => {
  let { isLoading, paginatedRecords, onDelete } =
    useResourceList<ListClientHomeRecord>(clientHomeResourceService);

  return (
    <>
      <ResourceListHeader title="Clients home" />
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

export default ClientHomeResourceListPage;
