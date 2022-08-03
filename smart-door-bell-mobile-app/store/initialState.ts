import { StoreState } from "./types";

const initialState: StoreState = {
  authToken: "",
  user: {
    isAuthenticated: false,
    data: {
      fullName: "",
      email: "",
      createdAt: "",
      updatedAt: "",
    },
    isLoading: false,
  },
};

export default initialState;
