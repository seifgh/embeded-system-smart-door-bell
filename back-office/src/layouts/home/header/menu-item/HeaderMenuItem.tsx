import { FC, ReactNode } from "react";
import "./styles.scss";

type Props = {
  icon: ReactNode;
  title: string;
};

const HeaderMenuItem: FC<Props> = ({ icon, title, children }) => {
  return (
    <div className="header-menu-item">
      <div className="title">
        {icon} <span className="text">{title}</span>
      </div>
      <div className="links">{children}</div>
    </div>
  );
};

export default HeaderMenuItem;
