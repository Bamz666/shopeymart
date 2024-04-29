import React, { Component, useEffect } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { NavbarComponent } from "./components";
import { Home, Sukses } from "./pages";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RegisterAdmin from "./pages/RegisterAdmin";
import DashboardProduct from "./pages/DashboardProduct";
import AddProduct from "./pages/AddProduct";
import DashboardStore from "./pages/DashboardStore";
import AddStore from "./pages/AddStore";
import UpdateStore from "./pages/UpdateStore";

export default function App() {
  const userToken = localStorage.getItem("token");
  const navigate = useNavigate();
  const location = useLocation();

  const role = localStorage.getItem("role");

  useEffect(() => {
    if (!userToken) {
      navigate("/login");
    }
    if (location.pathname === "/login" && userToken) {
      navigate("/");
    }
  }, [userToken]);

  const setLastVisitedPage = () => {
    if (location.pathname !== "/login" && userToken) {
      localStorage.setItem("last_visited_page", location.pathname);
    }
  };

  const redirectLastVisitedPage = () => {
    if (userToken && location.pathname === "/login") {
      navigate(localStorage.getItem("last_visited_page"));
    }
  };

  useEffect(() => {
    redirectLastVisitedPage();
    setLastVisitedPage();
    // if (
    //   role === "ROLE_CUSTOMER" &&
    //   location.pathname === "/dashboard/product"
    // ) {
    //   redirectLastVisitedPage();
    // }
  }, [location]);
  //bikin route buat handle kesalahan ketikan route lalu direct ke halaman not found 404
  return (
    <>
      <NavbarComponent />
      <Routes>
        {userToken ? (
          <>
            <Route path="/" element={<Home />} exact />
            <Route path="/sukses" element={<Sukses />} exact />
            {role === "ROLE_ADMIN" ? (
              <>
                <Route
                  path="/dashboard/product"
                  element={<DashboardProduct />}
                  exact
                />
                <Route
                  path="/dashboard/store"
                  element={<DashboardStore />}
                  exact
                />

                <Route path="/addProduct" element={<AddProduct />} exact />
                <Route path="/addStore" element={<AddStore />} exact />
                <Route
                  path="/updateStore/:id"
                  element={<UpdateStore />}
                  exact
                />
              </>
            ) : null}
          </>
        ) : (
          <>
            <Route path="/login" element={<Login />} exact />
            <Route path="/register" element={<Register />} exact />
            <Route path="/registerAdmin" element={<RegisterAdmin />} exact />
          </>
        )}
      </Routes>
    </>
  );
}
