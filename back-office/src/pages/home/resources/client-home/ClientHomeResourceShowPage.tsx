import { FC } from "react";
import clientHomeResourceService, {
  ShowClientHomeRecord,
} from "../../../../api/services/resources/clientHomeResource";
import { ShowClientRecord } from "../../../../api/services/resources/clientResource";
import ClientHomeResourceClientColumn from "../../../../components/resources/columns/client-home-resource-client-column/ClientHomeResourceClientColumn";
import ResourceDateColumn from "../../../../components/resources/columns/resource-date-column/ResourceDateColumn";
import ResourceShowHeader from "../../../../components/resources/headers/show-header/ResourceShowHeader";
import ResourceRecordShow from "../../../../components/resources/record-show/ResourceRecordShow";
import { ResourceRecordsListColumn } from "../../../../components/resources/records-list/types";
import useResourceShow from "../../../../hooks/useResourceShow";

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
    dataIndex: "raspberryPiCartKey",
    title: "RaspberryPi cart key",
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
      members.map((member) => (
        <ClientHomeResourceClientColumn key={member.id} client={member} />
      )),
  },
  {
    dataIndex: "createdAt",
    title: "Created at",
    render: (date: string) => <ResourceDateColumn date={new Date(date)} />,
  },
  {
    dataIndex: "updatedAt",
    title: "Updated at",
    render: (date: string) => <ResourceDateColumn date={new Date(date)} />,
  },
];

const ClientHomeResourceShowPage: FC = () => {
  const { isLoading, recordData, onDelete } =
    useResourceShow<ShowClientHomeRecord>(
      clientHomeResourceService,
      "/client-home"
    );

  return (
    <>
      <ResourceShowHeader
        title="Show client home"
        updateRoutePrefix="/client-home/update"
        onDelete={onDelete}
      />
      <ResourceRecordShow
        isLoading={isLoading}
        columns={COLUMNS}
        recordData={recordData || {}}
      />
    </>
  );
};

export default ClientHomeResourceShowPage;
