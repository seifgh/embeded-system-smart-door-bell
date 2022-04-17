import { MenuOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { FC } from "react";
import HeaderUserCard from "./user-card/HeaderUserCard";
import Logo from "../../../components/shared/Logo";
import "./styles.scss";

const Header: FC = () => {
  return (
    <header>
      <div className="section-1">
        <Button type="dashed" shape="circle" icon={<MenuOutlined />} />
        <Logo className="logo" />
      </div>

      <div className="section-2">
        <HeaderUserCard />
      </div>
    </header>
  );
};

export default Header;
