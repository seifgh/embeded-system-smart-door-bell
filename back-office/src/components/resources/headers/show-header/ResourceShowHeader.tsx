import {
  CaretLeftOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { Button, Popconfirm } from "antd";
import Title from "antd/lib/typography/Title";
import React, { FC } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ResourceOnDeleteFunc } from "../../types";
import "./styles.scss";
type Props = {
  title: string;
  updateRoutePrefix: string;
  onDelete: ResourceOnDeleteFunc;
};

const ResourceShowHeader: FC<Props> = ({
  title,
  updateRoutePrefix,
  onDelete,
}) => {
  const navigate = useNavigate();
  const recordId = useParams().recordId as string;

  return (
    <div className="res-show-header">
      <div>
        <Button
          className="btn"
          shape="circle"
          icon={<CaretLeftOutlined />}
          type="dashed"
          size="large"
          onClick={() => navigate(-1)}
        />
        <Title style={{ margin: 0 }} level={2}>
          {title}
        </Title>
      </div>
      <div className="btns">
        <Button
          type="primary"
          shape="round"
          size="large"
          onClick={() => navigate(`${updateRoutePrefix}/${recordId}`)}
        >
          <EditOutlined />
          Modify
        </Button>
        <Popconfirm
          title="Are you sure to delete this item?"
          onConfirm={() => onDelete(recordId)}
          okText="Yes"
          cancelText="No"
          placement="topLeft"
        >
          <Button type="dashed" shape="round" size="large" danger>
            <DeleteOutlined />
            Delete
          </Button>
        </Popconfirm>
      </div>
    </div>
  );
};

export default ResourceShowHeader;
