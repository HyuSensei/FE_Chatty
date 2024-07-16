import React, { useEffect, Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDataUser } from "../redux/userSlice";

const HomePage = lazy(() => import("../pages/HomePage/HomePage"));
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));
const NotFound = lazy(() => import("../pages/NotFound"));
const WellCome = lazy(() => import("../pages/WellCome"));

const Router = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, loading } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getDataUser());
  }, []);

  return (
    <Routes>
      {loading ? (
        <Route path="*" element={<div></div>} />
      ) : (
        <>
          <Route
            path="/"
            element={
              <Suspense fallback={<div></div>}>
                {isAuthenticated ? <HomePage /> : <Navigate to="/wellcome" />}
              </Suspense>
            }
          />
          <Route
            path="/login"
            element={
              <Suspense fallback={<div></div>}>
                {isAuthenticated ? <Navigate to="/" /> : <Login />}
              </Suspense>
            }
          />
          <Route
            path="/register"
            element={
              <Suspense fallback={<div></div>}>
                {isAuthenticated ? <Navigate to="/" /> : <Register />}
              </Suspense>
            }
          />
          <Route
            path="/wellcome"
            element={
              <Suspense fallback={<div></div>}>
                {isAuthenticated ? <Navigate to="/" /> : <WellCome />}
              </Suspense>
            }
          />
          <Route
            path="*"
            element={
              <Suspense fallback={<div></div>}>
                <NotFound />
              </Suspense>
            }
          />
        </>
      )}
    </Routes>
  );
};

export default Router;
