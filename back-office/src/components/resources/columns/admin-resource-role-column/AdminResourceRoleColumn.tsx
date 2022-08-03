import Text from "antd/lib/typography/Text";
import React, { FC } from "react";
import { AdminRole } from "../../../../constants/enums";
type Props = {
  role: AdminRole;
};
export const AdminResourceRoleColumn: FC<Props> = ({ role }) => {
  if (role === AdminRole.MANAGER) {
    return <Text type="success">Manager</Text>;
  } else {
    return <Text type="warning">Superuser</Text>;
  }
};

export default AdminResourceRoleColumn;
