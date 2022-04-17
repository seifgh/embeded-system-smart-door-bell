import { FC } from "react";
import Header from "./header";
import SideBar from "./sideBar";
import "./styles.scss";

const HomePageLayout: FC = ({ children }) => {
  return (
    <div className="home-layout">
      <Header />
      <SideBar />
      <main className="home-content">{children}</main>
    </div>
  );
};

export default HomePageLayout;
