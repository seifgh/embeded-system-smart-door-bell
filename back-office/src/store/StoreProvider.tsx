import { Spin } from "antd";
import { FC, useEffect, useState } from "react";
import authenticationService from "../api/services/authentication";
import initialState from "./initialState";
import StoreContext from "./StoreContext";
import { AdminData, StoreState } from "./types";

const StoreProvider: FC = ({ children }) => {
  const [state, setState] = useState<StoreState>(initialState);

  const setAdmin = (adminData: AdminData) => {
    setState({
      ...state,
      admin: {
        isAuthenticated: true,
        data: adminData,
        isLoading: false,
      },
    });
  };

  const logout = () => {
    setState({
      ...state,
      admin: {
        ...state.admin,
        isAuthenticated: false,
      },
    });
    delete localStorage.authToken;
  };

  const toggleAside = () => {
    setState({
      ...state,
      layout: {
        showAside: !state.layout.showAside,
      },
    });
  };

  useEffect(() => {
    setState({
      ...state,
      admin: {
        ...state.admin,
        isAuthenticated: false,
        isLoading: true,
      },
    });
    authenticationService
      .getAuthenticatedAdmin()
      .then((admin) => {
        if (admin) setAdmin(admin);
        else
          setState({
            ...state,
            admin: {
              ...state.admin,
              isAuthenticated: false,
              isLoading: false,
            },
          });
      })
      .catch(() => {
        setState({
          ...state,
          admin: {
            ...state.admin,
            isAuthenticated: false,
            isLoading: false,
          },
        });
      });
  }, []);

  return (
    <Spin spinning={state.admin.isLoading} size="large">
      <StoreContext.Provider
        value={{
          state,
          actions: { setAdmin, logout, toggleAside },
        }}
      >
        {children}
      </StoreContext.Provider>
    </Spin>
  );
};

export default StoreProvider;
