export type UserData = {
  fullName: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  imageUrl: string;
};

export type StoreState = {
  user: {
    isAuthenticated: boolean;
    data: UserData;
    isLoading: boolean;
  };
};
export type Store = {
  state: StoreState;
  actions: { [key: string]: Function };
};
