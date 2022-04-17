import { CaretLeftOutlined } from "@ant-design/icons";
import { Button } from "antd";
import Title from "antd/lib/typography/Title";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.scss";

type Props = {
  title: string;
};

const ResourceCreateHeader: FC<Props> = ({ title }) => {
  const navigate = useNavigate();
  return (
    <div className="res-create-header">
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
  );
};

export default ResourceCreateHeader;
