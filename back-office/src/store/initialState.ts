import { AdminRole } from "../constants/enums";
import { StoreState } from "./types";

const initialState: StoreState = {
  admin: {
    isAuthenticated: false,
    data: {
      fullName: "",
      email: "",
      role: AdminRole.MANAGER,
      createdAt: "",
      updatedAt: "",
    },
    isLoading: false,
  },
  layout: {
    showAside: true,
  },
};

export default initialState;
