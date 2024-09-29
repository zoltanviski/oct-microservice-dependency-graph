import GraphPage from "./pages/graph/GraphPage";
import Header from "./components/header/Header";
import { Provider } from "react-redux";
import React from "react";
import classes from "./App.module.scss";
import store from "./redux/store";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Header />

      <div className={classes.contentContainer}>
        <GraphPage />
      </div>
    </Provider>
  );
};

export default App;
