import { Outlet, Route, Routes, createBrowserRouter } from "react-router-dom";
import AppNavbar from "../components/Navbar";

import React, { Suspense, lazy } from "react";

function Root() {
  return (
    <>
      <AppNavbar />
      <Outlet />
    </>
  );
}

export default Root;
