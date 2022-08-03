import { FC, useState } from "react";
import initialState from "./initialState";
import StoreContext from "./StoreContext";
import { StoreState, UserData } from "./types";

const StoreProvider: FC = ({ children }) => {
  const [state, setState] = useState<StoreState>(initialState);

  const setUser = (userData: UserData, authToken: string) => {
    setState({
      user: {
        isAuthenticated: true,
        data: userData,
        isLoading: false,
      },
    });
  };

  return (
    <StoreContext.Provider
      value={{
        state,
        actions: { setUser },
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;
