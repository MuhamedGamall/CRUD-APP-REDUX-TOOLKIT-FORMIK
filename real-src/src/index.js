import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.rtl.min.css";

import reportWebVitals from "./reportWebVitals";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import Root from "./routes/Root";
import Home from "./routes/Home";
import ErrorPage from "./routes/ErrorPage";

const AddProduct = lazy(() => import("./routes/AddProduct"));
const EditProduct = lazy(() => import("./routes/EditProduct"));
const DetailsProduct = lazy(() => import("./routes/DetailsProduct"));

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "products/add",
        element: (
          <Suspense fallback={<center>loading Please Wait...</center>}>
            <AddProduct />
          </Suspense>
        ),
      },
      {
        path: "products/:id/edit",
        element: (
          <Suspense fallback={<center>loading Please Wait...</center>}>
            <EditProduct />
          </Suspense>
        ),
      },
      {
        path: "products/:id/details",
        element: (
          <Suspense fallback={<center>loading Please Wait...</center>}>
            <DetailsProduct />
          </Suspense>
        ),
      },
    ],
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <RouterProvider router={routes} />
  </Provider>
  // </React.StrictMode>
);

reportWebVitals();
