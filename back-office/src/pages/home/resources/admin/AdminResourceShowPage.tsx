import { Spin } from "antd";
import { FC } from "react";
import adminResourceService, {
  ShowAdminRecord,
} from "../../../../api/services/resources/adminResource";
import AdminResourceRoleColumn from "../../../../components/resources/columns/admin-resource-role-column/AdminResourceRoleColumn";
import ResourceDateColumn from "../../../../components/resources/columns/resource-date-column/ResourceDateColumn";
import ResourceShowHeader from "../../../../components/resources/headers/show-header/ResourceShowHeader";
import ResourceRecordShow from "../../../../components/resources/record-show/ResourceRecordShow";
import { ResourceRecordShowColumn } from "../../../../components/resources/record-show/types";
import { AdminRole } from "../../../../constants/enums";
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
  {
    dataIndex: "updatedAt",
    title: "Updated at",
    render: (date: string) => <ResourceDateColumn date={new Date(date)} />,
  },
];

const AdminResourceShowPage: FC = () => {
  const { isLoading, recordData, onDelete } = useResourceShow<ShowAdminRecord>(
    adminResourceService,
    "/admin"
  );

  return (
    <>
      <ResourceShowHeader
        title="Show admin"
        updateRoutePrefix="/admin/update"
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

export default AdminResourceShowPage;
