import { Avatar, Row } from "antd";
import Text from "antd/lib/typography/Text";
import { FC } from "react";
import { useStore } from "../../../../store/StoreContext";
import "./styles.scss";

const HeaderUserCard: FC = () => {
  const {
    state: {
      admin: { data },
    },
  } = useStore();

  return (
    <Row align="middle" className="header-user-card">
      <Avatar
        shape="circle"
        style={{ backgroundColor: "var(--dark-cl)" }}
        size="large"
      >
        {data.fullName.slice(0, 2)}
      </Avatar>
      <div className="details">
        <Text ellipsis>{data.fullName}</Text>

        <Text type="success" ellipsis>
          {data.role}
        </Text>
      </div>
    </Row>
  );
};

export default HeaderUserCard;
