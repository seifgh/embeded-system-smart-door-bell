import { AdminRole } from "../constants/enums";

export type AdminData = {
  fullName: string;
  role: AdminRole;
  email: string;
  createdAt: string;
  updatedAt: string;
};

export type StoreState = {
  admin: {
    isAuthenticated: boolean;
    data: AdminData;
    isLoading: boolean;
  };
  layout: {
    showAside: boolean;
  };
};
export type Store = {
  state: StoreState;
  actions: { [key: string]: Function };
};
