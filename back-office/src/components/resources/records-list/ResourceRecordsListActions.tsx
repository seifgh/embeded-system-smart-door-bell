import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, Popconfirm } from "antd";
import React, { FC } from "react";
import { Link } from "react-router-dom";
import { ResourceOnDeleteFunc } from "../types";

type Props = {
  recordId: string | number;
  onDelete: ResourceOnDeleteFunc;
};

const ResourceRecordsListActions: FC<Props> = ({ recordId, onDelete }) => {
  return (
    <>
      <div className="res-data-table-actions">
        <Link to={"show/" + recordId}>
          <Button icon={<EyeOutlined />} shape="circle" type="primary" />
        </Link>
        <Link to={"update/" + recordId}>
          <Button icon={<EditOutlined />} shape="circle" type="dashed" />
        </Link>
        <Popconfirm
          title="Are you sure to delete this item?"
          onConfirm={() => onDelete(recordId)}
          okText="Yes"
          cancelText="No"
          placement="topLeft"
        >
          <Button
            icon={<DeleteOutlined />}
            shape="circle"
            danger
            type="dashed"
          />
        </Popconfirm>
      </div>
    </>
  );
};

export default ResourceRecordsListActions;
