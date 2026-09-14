import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Admin Pages
import Dashboard from "./pages/admin/Dashboard";
import Products from "./pages/admin/Inventory/Products";

import Payments from "./pages/admin/Payments/Payments";

import Customers from "./pages/admin/Customers/Customers";
import Statements from "./pages/admin/Customers/Statements";

import Suppliers from "./pages/admin/Suppliers/Suppliers";
import Receiving from "./pages/admin/Inventory/Receiving";
import StockControl from "./pages/admin/Inventory/StockControl";
import BatchExpiry from "./pages/admin/Inventory/BatchExpiry";
import Invoices from "./pages/admin/Sales/Invoices";
import SalesReturn from "./pages/admin/Sales/SalesReturn";
import DeliveryNotes from "./pages/admin/DeliveryNotes/DeliveryNotes";

import Expenses from "./pages/admin/Expenses/Expenses";

import Reports from "./pages/admin/Reports/Reports";

import Users from "./pages/admin/Administration/Users";
import RolesPermissions from "./pages/admin/RolesPermissions/RolesPermissions";
import AuditLog from "./pages/admin/AuditLog/AuditLog";

// Admin Layout
import AdminLayout from "../layouts/AdminLayout";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* =========================
            ROOT
        ========================== */}
        <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />

        {/* =========================
            ERP / ADMIN
        ========================== */}
        <Route path="/admin" element={<AdminLayout />}>
          {/* Dashboard */}
          <Route path="dashboard" element={<Dashboard />} />
          {/* =========================
              INVENTORY
          ========================== */}
          {/* Product Master */}
          <Route path="inventory/products" element={<Products />} />
          <Route path="inventory/receiving" element={<Receiving />} />
          <Route path="inventory/stock" element={<StockControl />} />
          <Route path="inventory/batches" element={<BatchExpiry />} />
          {/* =========================
              SALES
          ========================== */}
          <Route path="sales/invoices" element={<Invoices />} />
          <Route path="sales/returns" element={<SalesReturn />} />
          <Route path="sales/payments" element={<Payments />} />
          <Route path="sales/delivery-notes" element={<DeliveryNotes />} />
          {/* =========================
              CUSTOMERS
          ========================== */}
          {/* Customer Database */}
          <Route path="customers" element={<Customers />} />
          <Route path="customers/statements" element={<Statements />} />
          <Route path="suppliers" element={<Suppliers />} />
          <Route path="expenses" element={<Expenses />} />
          <Route path="reports" element={<Reports />} />
          {/* =========================
              Administration
          ========================== */}
          {/* Administration */}
          <Route path="settings/users" element={<Users />} />
          <Route path="settings/roles" element={<RolesPermissions />} />
          <Route
            path="settings/audit-log"
            element={<AuditLog />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
