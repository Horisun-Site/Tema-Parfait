import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Admin Pages
import Dashboard from "./pages/admin/Dashboard";
import Products from "./pages/admin/Inventory/Products";
import Customers from "./pages/admin/Customers/Customers";

// Admin Layout
import AdminLayout from "../layouts/AdminLayout";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* =========================
            ROOT
        ========================== */}
        <Route
          path="/"
          element={
            <Navigate
              to="/admin/dashboard"
              replace
            />
          }
        />

        {/* =========================
            ERP / ADMIN
        ========================== */}
        <Route
          path="/admin"
          element={<AdminLayout />}
        >

          {/* Dashboard */}
          <Route
            path="dashboard"
            element={<Dashboard />}
          />

          {/* =========================
              INVENTORY
          ========================== */}

          {/* Product Master */}
          <Route
            path="inventory/products"
            element={<Products />}
          />

          {/* =========================
              CUSTOMERS
          ========================== */}

          {/* Customer Database */}
          <Route
            path="customers"
            element={<Customers />}
          />

        </Route>

      </Routes>
    </BrowserRouter>
  );
};

export default App;