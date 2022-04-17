import {
  DesktopOutlined,
  HomeOutlined,
  LogoutOutlined,
  PlusOutlined,
  UnorderedListOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button } from "antd";
import { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import HeaderMenuItem from "../header/menu-item/HeaderMenuItem";
import "./styles.scss";

const SideBar: FC = () => {
  const navigate = useNavigate();
  const logout = () => {
    navigate("/login");
  };
  return (
    <aside>
      <div className="menu">
        <HeaderMenuItem icon={<UserOutlined />} title="Clients">
          <Link to="/client">
            <Button type="link">
              <UnorderedListOutlined />
              List clients
            </Button>
          </Link>
          <Link to="/client/create">
            <Button type="link">
              <PlusOutlined />
              Add new
            </Button>
          </Link>
        </HeaderMenuItem>
        <HeaderMenuItem icon={<HomeOutlined />} title="Client Homes">
          <Link to="/client-home">
            <Button type="link">
              <UnorderedListOutlined />
              List client homes
            </Button>
          </Link>
          <Link to="/client-home/create">
            <Button type="link">
              <PlusOutlined />
              Add new
            </Button>
          </Link>
        </HeaderMenuItem>
        <HeaderMenuItem icon={<DesktopOutlined />} title="Administrators">
          <Link to="/admin">
            <Button type="link">
              <UnorderedListOutlined />
              List admins
            </Button>
          </Link>
          <Link to="/admin/create">
            <Button type="link">
              <PlusOutlined />
              Add new
            </Button>
          </Link>
        </HeaderMenuItem>
      </div>
      <div className="footer">
        <Button
          type="default"
          shape="round"
          danger
          block
          onClick={() => logout()}
        >
          <LogoutOutlined />
          Logout
        </Button>
        {/* <Button type="dashed" shape="circle" icon={<LogoutOutlined />} /> */}
      </div>
    </aside>
  );
};

export default SideBar;
