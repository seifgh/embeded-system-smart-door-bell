import { MenuOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { FC } from "react";
import Logo from "../../../components/shared/Logo";
import { useStore } from "../../../store/StoreContext";
import "./styles.scss";
import HeaderUserCard from "./user-card/HeaderUserCard";

const Header: FC = () => {
  const {
    actions: { toggleAside },
  } = useStore();

  return (
    <header>
      <div className="section-1">
        <Button
          type="dashed"
          shape="circle"
          icon={<MenuOutlined />}
          onClick={() => toggleAside()}
        />
        <Logo className="logo" />
      </div>

      <div className="section-2">
        <HeaderUserCard />
      </div>
    </header>
  );
};

export default Header;
