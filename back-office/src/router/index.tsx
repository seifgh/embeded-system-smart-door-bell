import { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminResourceCreatePage from "../pages/home/resources/admin/AdminResourceCreatePage";
import AdminResourceListPage from "../pages/home/resources/admin/AdminResourceListPage";
import AdminResourceShowPage from "../pages/home/resources/admin/AdminResourceShowPage";
import AdminResourceUpdatePage from "../pages/home/resources/admin/AdminResourceUpdatePage";
import ClientHomeResourceCreatePage from "../pages/home/resources/client-home/Create";
import ClientHomeResourceListPage from "../pages/home/resources/client-home/ClientHomeResourceListPage";
import ClientResourceListPage from "../pages/home/resources/client/ClientResourceListPage";
import ClientResourceShowPage from "../pages/home/resources/client/ClientResourceShowPage";
import ClientResourceUpdatePage from "../pages/home/resources/client/ClientResourceUpdatePage";
import DashboardPage from "../pages/home/DashboardPage";
import LoginPage from "../pages/login";
import HomePage from "../pages/home";
import AdminResourcePage from "../pages/home/resources/admin";
import ClientHomeResourcePage from "../pages/home/resources/client-home";
import ClientResourcePage from "../pages/home/resources/client";
import ClientResourceCreatePage from "../pages/home/resources/client/ClientResourceCreatePage";
import ClientHomeResourceShowPage from "../pages/home/resources/client-home/ClientHomeResourceShowPage";
import ClientHomeResourceUpdatePage from "../pages/home/resources/client-home/Update";

const Router: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<HomePage />}>
          <Route path="" element={<DashboardPage />} />

          <Route path="admin" element={<AdminResourcePage />}>
            <Route path="" element={<AdminResourceListPage />} />
            <Route path="show/:recordId" element={<AdminResourceShowPage />} />
            <Route
              path="update/:recordId"
              element={<AdminResourceUpdatePage />}
            />
            <Route path="create" element={<AdminResourceCreatePage />} />
          </Route>

          <Route path="client" element={<ClientResourcePage />}>
            <Route path="" element={<ClientResourceListPage />} />
            <Route path="show/:recordId" element={<ClientResourceShowPage />} />
            <Route
              path="update/:recordId"
              element={<ClientResourceUpdatePage />}
            />
            <Route path="create" element={<ClientResourceCreatePage />} />
          </Route>

          <Route path="client-home" element={<ClientHomeResourcePage />}>
            <Route path="" element={<ClientHomeResourceListPage />} />
            <Route
              path="show/:recordId"
              element={<ClientHomeResourceShowPage />}
            />
            <Route
              path="update/:recordId"
              element={<ClientHomeResourceUpdatePage />}
            />
            <Route path="create" element={<ClientHomeResourceCreatePage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
