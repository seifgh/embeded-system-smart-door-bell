import React from "react";
import Router from "./router";
import StoreProvider from "./store/StoreProvider";

function App() {
  return (
    <StoreProvider>
      <Router />
    </StoreProvider>
  );
}

export default App;
