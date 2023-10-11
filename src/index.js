import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Suspense } from "react";
import { lazy } from "react";
import { Provider } from "react-redux";

import Index from "./routes/Index";
import store from "./store/index";

const RootLayout = lazy(() => import("./routes/RootLayout"));
const AddProduct = lazy(() => import("./routes/AddProduct"));
const EditProduct = lazy(() => import("./routes/EditProduct"));
const DetailsProduct = lazy(() => import("./routes/DetailsProduct"));
const ErrorPage = lazy(() => import("./routes/ErrorPage"));
const loadingMessage = <center>loading Please Wait...</center>;
// const productsParamsHandler = ({ params }) => {
//   if (isNaN(params.id))
//     throw new Response("Bad Request", {
//       statusText: "Make sure you Link.",
//       status: 400,
//     });
// };
const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={loadingMessage}>
        <RootLayout />
      </Suspense>
    ),
    errorElement: (
      <Suspense fallback={loadingMessage}>
        <ErrorPage />
      </Suspense>
    ),
    children: [
      { index: true, element: <Index /> },
      {
        path: "products",
        element: <Index />,
      },
      {
        path: "products/add",
        element: (
          <Suspense fallback={loadingMessage}>
            <AddProduct />
          </Suspense>
        ),
      },
      {
        path: "products/:id/edit",
        element: (
          <Suspense fallback={loadingMessage}>
            <EditProduct />
          </Suspense>
        ),
        // loader: productsParamsHandler
      },
      {
        path: "products/:id/details",
        element: (
          <Suspense fallback={loadingMessage}>
            <DetailsProduct />
          </Suspense>
        ),

        // loader: productsParamsHandler
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
