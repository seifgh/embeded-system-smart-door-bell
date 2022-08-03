import { FC } from "react";
import { Outlet } from "react-router-dom";
import HomePageLayout from "../../../../layouts/home";

const ClientHomeResourcePage: FC = () => {
  return (
    <HomePageLayout>
      <Outlet />
    </HomePageLayout>
  );
};

export default ClientHomeResourcePage;
