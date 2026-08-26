import React from "react";
import {
  Search,
  CalendarDays,
  User,
  Activity,
  RotateCcw,
} from "lucide-react";

const AuditLogFilterForm = ({
  filters = {},
  onChange,
  onReset,
}) => {
  const {
    search = "",
    user = "all",
    module = "all",
    action = "all",
    status = "all",
    startDate = "",
    endDate = "",
  } = filters;

  const handleChange = (field, value) => {
    onChange?.({
      ...filters,
      [field]: value,
    });
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5">
      
      {/* ==========================================
          HEADER
      ========================================== */}

      <div className="flex items-center justify-between gap-4 mb-5">

        <div>
          <h3 className="font-semibold text-gray-900">
            Filter Audit Logs
          </h3>

          <p className="text-sm text-gray-500 mt-1">
            Search and filter system activity records.
          </p>
        </div>

        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 text-sm text-gray-700 hover:bg-gray-50 transition"
        >
          <RotateCcw size={16} />

          Reset
        </button>

      </div>

      {/* ==========================================
          FILTERS
      ========================================== */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">

        {/* Search */}

        <div className="xl:col-span-3">

          <label className="block text-sm font-medium text-gray-700 mb-2">
            Search
          </label>

          <div className="relative">

            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              value={search}
              onChange={(e) =>
                handleChange(
                  "search",
                  e.target.value
                )
              }
              placeholder="Search user, action, description, IP address..."
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-gray-200"
            />

          </div>

        </div>

        {/* User */}

        <div>

          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
            <User size={16} />

            User
          </label>

          <select
            value={user}
            onChange={(e) =>
              handleChange(
                "user",
                e.target.value
              )
            }
            className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white outline-none"
          >

            <option value="all">
              All Users
            </option>

            <option value="admin">
              Super Admin
            </option>

            <option value="manager">
              Manager
            </option>

            <option value="sales">
              Sales Staff
            </option>

            <option value="inventory">
              Inventory Staff
            </option>

          </select>

        </div>

        {/* Module */}

        <div>

          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
            <Activity size={16} />

            Module
          </label>

          <select
            value={module}
            onChange={(e) =>
              handleChange(
                "module",
                e.target.value
              )
            }
            className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white outline-none"
          >

            <option value="all">
              All Modules
            </option>

            <option value="dashboard">
              Dashboard
            </option>

            <option value="products">
              Products
            </option>

            <option value="customers">
              Customers
            </option>

            <option value="suppliers">
              Suppliers
            </option>

            <option value="inventory">
              Inventory
            </option>

            <option value="sales">
              Sales
            </option>

            <option value="invoices">
              Invoices
            </option>

            <option value="payments">
              Payments
            </option>

            <option value="reports">
              Reports
            </option>

            <option value="administration">
              Administration
            </option>

          </select>

        </div>

        {/* Action */}

        <div>

          <label className="block text-sm font-medium text-gray-700 mb-2">
            Action
          </label>

          <select
            value={action}
            onChange={(e) =>
              handleChange(
                "action",
                e.target.value
              )
            }
            className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white outline-none"
          >

            <option value="all">
              All Actions
            </option>

            <option value="login">
              Login
            </option>

            <option value="logout">
              Logout
            </option>

            <option value="create">
              Create
            </option>

            <option value="update">
              Update
            </option>

            <option value="delete">
              Delete
            </option>

            <option value="view">
              View
            </option>

            <option value="export">
              Export
            </option>

            <option value="approve">
              Approve
            </option>

          </select>

        </div>

        {/* Status */}

        <div>

          <label className="block text-sm font-medium text-gray-700 mb-2">
            Status
          </label>

          <select
            value={status}
            onChange={(e) =>
              handleChange(
                "status",
                e.target.value
              )
            }
            className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white outline-none"
          >

            <option value="all">
              All Statuses
            </option>

            <option value="success">
              Success
            </option>

            <option value="failed">
              Failed
            </option>

          </select>

        </div>

        {/* Start Date */}

        <div>

          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
            <CalendarDays size={16} />

            Start Date
          </label>

          <input
            type="date"
            value={startDate}
            onChange={(e) =>
              handleChange(
                "startDate",
                e.target.value
              )
            }
            className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white outline-none"
          />

        </div>

        {/* End Date */}

        <div>

          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
            <CalendarDays size={16} />

            End Date
          </label>

          <input
            type="date"
            value={endDate}
            onChange={(e) =>
              handleChange(
                "endDate",
                e.target.value
              )
            }
            className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white outline-none"
          />

        </div>

      </div>

    </div>
  );
};

export default AuditLogFilterForm;