import { FC } from "react";
import { Outlet } from "react-router-dom";
import HomePageLayout from "../../layouts/home";
import "./styles.scss";

const HomePage: FC = () => {
  return (
    <HomePageLayout>
      <Outlet />
    </HomePageLayout>
  );
};

export default HomePage;
