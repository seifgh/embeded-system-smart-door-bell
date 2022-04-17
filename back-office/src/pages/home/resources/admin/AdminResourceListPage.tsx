import { Spin } from "antd";
import { FC } from "react";
import adminResourceService, {
  ListAdminRecord,
} from "../../../../api/services/resources/adminResource";
import AdminResourceRoleColumn from "../../../../components/resources/columns/admin-resource-role-column/AdminResourceRoleColumn";
import ResourceDateColumn from "../../../../components/resources/columns/resource-date-column/ResourceDateColumn";
import ResourceListHeader from "../../../../components/resources/headers/list-header/ResourceListHeader";
import ResourceRecordsList from "../../../../components/resources/records-list/ResourceRecordsList";
import { ResourceRecordsListColumn } from "../../../../components/resources/records-list/types";
import { AdminRole } from "../../../../constants/enums";
import useResourceList from "../../../../hooks/useResourceList";

const COLUMNS: ResourceRecordsListColumn[] = [
  {
    dataIndex: "id",
    title: "ID",
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
    dataIndex: "role",
    title: "Role",
    render: (role: AdminRole) => <AdminResourceRoleColumn role={role} />,
  },
  {
    dataIndex: "createdAt",
    title: "Created at",
    render: (date: string) => <ResourceDateColumn date={new Date(date)} />,
  },
];

const AdminResourceListPage: FC = () => {
  const { isLoading, paginatedRecords, onDelete } =
    useResourceList<ListAdminRecord>(adminResourceService);

  return (
    <>
      <ResourceListHeader title="Admins" />
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

export default AdminResourceListPage;
