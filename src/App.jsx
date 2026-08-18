// import React from "react";
// import {
//   BrowserRouter,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";

// import Dashboard from "./pages/admin/Dashboard";
// import AdminLayout from "../layouts/AdminLayout";

// const App = () => {
//   return (
//     <BrowserRouter>
//       <Routes>

//         {/* Root */}
//         <Route
//           path="/"
//           element={<Navigate to="/admin/dashboard" replace />}
//         />

//         {/* ERP */}
//         <Route path="/admin" element={<AdminLayout />}>

//           <Route
//             path="dashboard"
//             element={<Dashboard />}
//           />

//         </Route>

//       </Routes>
//     </BrowserRouter>
//   );
// };

// export default App;




// import React from "react";
// import {
//   BrowserRouter,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";

// import AdminLayout from "../layouts/AdminLayout";

// import Dashboard from "./pages/admin/Dashboard";

// import Invoices from "./pages/admin/Sales/Invoices";
// import Payments from "./pages/admin/Sales/Payments";
// import Returns from "./pages/admin/Sales/Returns";
// import DeliveryNotes from "./pages/admin/Sales/DeliveryNotes";

// import Products from "./pages/admin/Inventory/Products";
// import StockReceiving from "./pages/admin/Inventory/StockReceiving";
// import StockControl from "./pages/admin/Inventory/StockControl";
// import BatchExpiry from "./pages/admin/Inventory/BatchExpiry";

// import Customers from "./pages/admin/Customers/Customers";
// import Statements from "./pages/admin/Customers/Statements";

// import Suppliers from "./pages/admin/Suppliers/Suppliers";
// import Expenses from "./pages/admin/Expenses/Expenses";
// import Reports from "./pages/admin/Reports/Reports";

// import Users from "./pages/admin/Administration/Users";
// import Roles from "./pages/admin/Administration/Roles";
// import AuditLogs from "./pages/admin/Administration/AuditLogs";

// const App = () => {
//   return (
//     <BrowserRouter>

//       <Routes>

//         <Route
//           path="/"
//           element={
//             <Navigate
//               to="/admin/dashboard"
//               replace
//             />
//           }
//         />

//         <Route
//           path="/admin"
//           element={<AdminLayout />}
//         >

//           {/* Dashboard */}
//           <Route
//             path="dashboard"
//             element={<Dashboard />}
//           />

//           {/* Sales */}
//           <Route
//             path="sales/invoices"
//             element={<Invoices />}
//           />

//           <Route
//             path="sales/payments"
//             element={<Payments />}
//           />

//           <Route
//             path="sales/returns"
//             element={<Returns />}
//           />

//           <Route
//             path="sales/delivery-notes"
//             element={<DeliveryNotes />}
//           />

//           {/* Inventory */}
//           <Route
//             path="inventory/products"
//             element={<Products />}
//           />

//           <Route
//             path="inventory/receiving"
//             element={<StockReceiving />}
//           />

//           <Route
//             path="inventory/stock"
//             element={<StockControl />}
//           />

//           <Route
//             path="inventory/batches"
//             element={<BatchExpiry />}
//           />

//           {/* Customers */}
//           <Route
//             path="customers"
//             element={<Customers />}
//           />

//           <Route
//             path="customers/statements"
//             element={<Statements />}
//           />

//           {/* Other */}
//           <Route
//             path="suppliers"
//             element={<Suppliers />}
//           />

//           <Route
//             path="expenses"
//             element={<Expenses />}
//           />

//           <Route
//             path="reports"
//             element={<Reports />}
//           />

//           {/* Administration */}
//           <Route
//             path="settings/users"
//             element={<Users />}
//           />

//           <Route
//             path="settings/roles"
//             element={<Roles />}
//           />

//           <Route
//             path="settings/audit-log"
//             element={<AuditLogs />}
//           />

//         </Route>

//       </Routes>

//     </BrowserRouter>
//   );
// };

// export default App;




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