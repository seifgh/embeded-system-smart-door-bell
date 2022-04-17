import { Avatar, Row } from "antd";
import Text from "antd/lib/typography/Text";
import { FC } from "react";
import "./styles.scss";

const HeaderUserCard: FC = () => {
  const user = {
    fullName: "Seif Gharres",
    email: "seifgh.dev@gmail.com",
    role: "Manager",
  };
  return (
    <Row align="middle" className="header-user-card">
      <Avatar
        shape="circle"
        style={{ backgroundColor: "var(--dark-cl)" }}
        size="large"
      >
        {user.fullName.slice(0, 2)}
      </Avatar>
      <div className="details">
        <Text ellipsis>{user.fullName}</Text>
        {/* <Text type="secondary" ellipsis>
          {user.email}
        </Text> */}
        <Text type="success" ellipsis>
          {user.role}
        </Text>
      </div>
    </Row>
  );
};

export default HeaderUserCard;
