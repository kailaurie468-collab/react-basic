import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import App from "./App.js";
import Comment from "./Comment.js";
import { Provider } from "react-redux";
import store from "./store/index.js";
// import reportWebVitals from "./reportWebVitals.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
// 将react
root.render(
  // <React.StrictMode>
  //   {/* <App /> */}
  //   <Comment/>
  // </React.StrictMode>
  // 能够让react的组件树 都能够访问到redux的store
  <Provider store={store}>
    <Comment />,
  </Provider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
