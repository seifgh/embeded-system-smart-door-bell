import { FC } from "react";
import { Outlet } from "react-router-dom";
import HomePageLayout from "../../../../layouts/home";

const ClientResourcePage: FC = () => {
  return (
    <HomePageLayout>
      <Outlet />
    </HomePageLayout>
  );
};

export default ClientResourcePage;
