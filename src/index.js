import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import { createStore } from "redux";
import Amplify from "aws-amplify";
import awsExports from "./aws-exports";
import rootReducer from "./redux/reducers";

Amplify.configure(awsExports);

// const store = createStore(rootReducer);

ReactDOM.render(
  // <Provider store={store}>
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  // </Provider>,
  document.getElementById("root")
);
