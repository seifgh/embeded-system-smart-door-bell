import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Button } from "antd";
import Title from "antd/lib/typography/Title";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.scss";

type Props = {
  title: string;
};

const ResourceListHeader: FC<Props> = ({ title }) => {
  const navigate = useNavigate();
  return (
    <div className="res-list-header">
      <Title style={{ margin: 0 }} level={2}>
        {title}
      </Title>
      <div className="btns">
        <Button
          type="primary"
          shape="round"
          size="large"
          onClick={() => navigate("create")}
        >
          <PlusOutlined />
          Add new
        </Button>
        <Button type="dashed" shape="circle" size="large">
          <SearchOutlined />
        </Button>
      </div>
    </div>
  );
};

export default ResourceListHeader;
