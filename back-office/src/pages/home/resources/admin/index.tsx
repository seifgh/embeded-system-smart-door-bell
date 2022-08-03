import { FC } from "react";
import { Outlet } from "react-router-dom";
import HomePageLayout from "../../../../layouts/home";

const AdminResourcePage: FC = () => {
  return (
    <HomePageLayout>
      <Outlet />
    </HomePageLayout>
  );
};

export default AdminResourcePage;
