import { FC } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AdminRole } from "../constants/enums";
import AdminResourcePage from "../pages/home/resources/admin";
import AdminResourceCreatePage from "../pages/home/resources/admin/AdminResourceCreatePage";
import AdminResourceListPage from "../pages/home/resources/admin/AdminResourceListPage";
import AdminResourceShowPage from "../pages/home/resources/admin/AdminResourceShowPage";
import AdminResourceUpdatePage from "../pages/home/resources/admin/AdminResourceUpdatePage";
import ClientResourcePage from "../pages/home/resources/client";
import ClientHomeResourcePage from "../pages/home/resources/client-home";
import ClientHomeResourceCreatePage from "../pages/home/resources/client-home/ClientHomeResourceCreatePage";
import ClientHomeResourceListPage from "../pages/home/resources/client-home/ClientHomeResourceListPage";
import ClientHomeResourceShowPage from "../pages/home/resources/client-home/ClientHomeResourceShowPage";
import ClientHomeResourceUpdatePage from "../pages/home/resources/client-home/ClientHomeResourceUpdatePage";
import ClientResourceCreatePage from "../pages/home/resources/client/ClientResourceCreatePage";
import ClientResourceListPage from "../pages/home/resources/client/ClientResourceListPage";
import ClientResourceShowPage from "../pages/home/resources/client/ClientResourceShowPage";
import ClientResourceUpdatePage from "../pages/home/resources/client/ClientResourceUpdatePage";
import LoginPage from "../pages/login";
import { useStore } from "../store/StoreContext";

const Router: FC = () => {
  const {
    state: {
      admin: {
        isAuthenticated,
        data: { role },
        isLoading,
      },
    },
  } = useStore();

  return (
    (!isLoading && (
      <BrowserRouter>
        <Routes>
          {isAuthenticated ? (
            <>
              {role === AdminRole.SUPERUSER && (
                <Route path="admin" element={<AdminResourcePage />}>
                  <Route path="" element={<AdminResourceListPage />} />
                  <Route
                    path="show/:recordId"
                    element={<AdminResourceShowPage />}
                  />
                  <Route
                    path="update/:recordId"
                    element={<AdminResourceUpdatePage />}
                  />
                  <Route path="create" element={<AdminResourceCreatePage />} />
                </Route>
              )}

              <Route path="client" element={<ClientResourcePage />}>
                <Route path="" element={<ClientResourceListPage />} />
                <Route
                  path="show/:recordId"
                  element={<ClientResourceShowPage />}
                />
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
                <Route
                  path="create"
                  element={<ClientHomeResourceCreatePage />}
                />
              </Route>
              <Route path="*" element={<Navigate to="/client" />} />
            </>
          ) : (
            <>
              <Route path="/login" element={<LoginPage />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
    )) ||
    null
  );
};

export default Router;
