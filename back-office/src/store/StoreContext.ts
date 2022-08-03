import { createContext, useContext } from "react";
import initialState from "./initialState";
import { Store } from "./types";

const StoreContext = createContext<Store>({
  state: initialState,
  actions: {},
});

export default StoreContext;

export const useStore = () => {
  return useContext(StoreContext);
};
