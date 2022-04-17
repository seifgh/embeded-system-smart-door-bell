import { FC } from "react";
import clientResourceService, {
  ShowClientRecord,
} from "../../../../api/services/resources/clientResource";
import ResourceDateColumn from "../../../../components/resources/columns/resource-date-column/ResourceDateColumn";
import ResourceImageColumn from "../../../../components/resources/columns/resource-image-column/ResourceImageColumn";
import ResourceShowHeader from "../../../../components/resources/headers/show-header/ResourceShowHeader";
import ResourceRecordShow from "../../../../components/resources/record-show/ResourceRecordShow";
import { ResourceRecordShowColumn } from "../../../../components/resources/record-show/types";
import useResourceShow from "../../../../hooks/useResourceShow";

const COLUMNS: ResourceRecordShowColumn[] = [
  {
    dataIndex: "id",
    title: "ID",
  },
  {
    dataIndex: "fullName",
    title: "Full name",
  },
  {
    title: "Image",
    dataIndex: "imageUrl",
    render: (imageUrl: string) => (
      <ResourceImageColumn src={imageUrl} alt="Client image" />
    ),
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
  {
    dataIndex: "updatedAt",
    title: "Updated at",
    render: (date: string) => <ResourceDateColumn date={new Date(date)} />,
  },
];

const ClientResourceShowPage: FC = () => {
  const { isLoading, recordData, onDelete } = useResourceShow<ShowClientRecord>(
    clientResourceService,
    "/client"
  );

  return (
    <>
      <ResourceShowHeader
        title="Show client"
        updateRoutePrefix="/client/update"
        onDelete={onDelete}
      />

      <ResourceRecordShow
        columns={COLUMNS}
        isLoading={isLoading}
        recordData={recordData || {}}
      />
    </>
  );
};

export default ClientResourceShowPage;
