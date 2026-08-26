import React, { useMemo, useState } from "react";
import {
  Search,
  ShieldCheck,
  Activity,
  UserCheck,
  AlertTriangle,
  CheckCircle2,
  SlidersHorizontal,
  Eye,
} from "lucide-react";

import AuditLogFilterForm from "./AuditLogFilterForm";
import AuditLogTable from "./AuditLogTable";

const AuditLogMaster = () => {
  // ==========================================
  // STATE
  // ==========================================

  const [search, setSearch] = useState("");

  const [filters, setFilters] = useState({
    user: "all",
    module: "all",
    action: "all",
    status: "all",
    date: "",
  });

  const [selectedLog, setSelectedLog] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  // ==========================================
  // TEMPORARY FRONTEND DATA
  // ==========================================
  // This will later come from the database/API.

  const [auditLogs] = useState([
    {
      id: 1,
      date: "2026-08-26",
      time: "10:32 AM",
      userId: "USR-001",
      userName: "Admin",
      action: "Create",
      module: "Products",
      record: "PRD-001",
      description:
        "Created new product Paracetamol 500mg.",
      status: "Success",
      ipAddress: "192.168.1.10",
    },

    {
      id: 2,
      date: "2026-08-26",
      time: "11:05 AM",
      userId: "USR-002",
      userName: "John",
      action: "Update",
      module: "Invoices",
      record: "TF-20260826-0001",
      description:
        "Updated customer invoice TF-20260826-0001.",
      status: "Success",
      ipAddress: "192.168.1.12",
    },

    {
      id: 3,
      date: "2026-08-26",
      time: "11:20 AM",
      userId: "USR-003",
      userName: "Mary",
      action: "Delete",
      module: "Customers",
      record: "CUS-004",
      description:
        "Deleted customer record CUS-004.",
      status: "Success",
      ipAddress: "192.168.1.15",
    },

    {
      id: 4,
      date: "2026-08-26",
      time: "12:10 PM",
      userId: "USR-001",
      userName: "Admin",
      action: "Login",
      module: "Authentication",
      record: "-",
      description:
        "Admin successfully logged into the system.",
      status: "Success",
      ipAddress: "192.168.1.10",
    },

    {
      id: 5,
      date: "2026-08-26",
      time: "12:35 PM",
      userId: "USR-004",
      userName: "David",
      action: "Update",
      module: "Stock",
      record: "STK-003",
      description:
        "Adjusted stock quantity for product STK-003.",
      status: "Success",
      ipAddress: "192.168.1.18",
    },

    {
      id: 6,
      date: "2026-08-26",
      time: "01:05 PM",
      userId: "USR-005",
      userName: "Sarah",
      action: "Login",
      module: "Authentication",
      record: "-",
      description:
        "Failed login attempt.",
      status: "Failed",
      ipAddress: "192.168.1.20",
    },
  ]);

  // ==========================================
  // FILTER LOGS
  // ==========================================

  const filteredLogs = useMemo(() => {
    const query = search.toLowerCase().trim();

    return auditLogs.filter((log) => {
      const matchesSearch =
        log.userName
          ?.toLowerCase()
          .includes(query) ||
        log.userId
          ?.toLowerCase()
          .includes(query) ||
        log.action
          ?.toLowerCase()
          .includes(query) ||
        log.module
          ?.toLowerCase()
          .includes(query) ||
        log.record
          ?.toLowerCase()
          .includes(query) ||
        log.description
          ?.toLowerCase()
          .includes(query);

      const matchesUser =
        filters.user === "all" ||
        log.userId === filters.user;

      const matchesModule =
        filters.module === "all" ||
        log.module === filters.module;

      const matchesAction =
        filters.action === "all" ||
        log.action === filters.action;

      const matchesStatus =
        filters.status === "all" ||
        log.status === filters.status;

      const matchesDate =
        !filters.date ||
        log.date === filters.date;

      return (
        matchesSearch &&
        matchesUser &&
        matchesModule &&
        matchesAction &&
        matchesStatus &&
        matchesDate
      );
    });
  }, [
    auditLogs,
    search,
    filters,
  ]);

  // ==========================================
  // STATISTICS
  // ==========================================

  const totalLogs = auditLogs.length;

  const successfulActions = auditLogs.filter(
    (log) => log.status === "Success"
  ).length;

  const failedActions = auditLogs.filter(
    (log) => log.status === "Failed"
  ).length;

  const uniqueUsers = new Set(
    auditLogs.map((log) => log.userId)
  ).size;

  // ==========================================
  // VIEW LOG
  // ==========================================

  const handleViewLog = (log) => {
    setSelectedLog(log);
    setShowDetails(true);
  };

  // ==========================================
  // FILTER CHANGE
  // ==========================================

  const handleFilterChange = (updatedFilters) => {
    setFilters(updatedFilters);
  };

  // ==========================================
  // RESET FILTERS
  // ==========================================

  const handleResetFilters = () => {
    setFilters({
      user: "all",
      module: "all",
      action: "all",
      status: "all",
      date: "",
    });

    setSearch("");
  };

  return (
    <div className="space-y-6">

      {/* ======================================
          HEADER
      ======================================= */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        <div className="flex items-center gap-3">

          <div className="p-3 bg-gray-100 rounded-xl">
            <ShieldCheck
              size={23}
              className="text-gray-700"
            />
          </div>

          <div>

            <h1 className="text-2xl font-bold text-gray-900">
              Audit Log
            </h1>

            <p className="text-sm text-gray-500 mt-1">
              Monitor and review important activities performed in the system.
            </p>

          </div>

        </div>

      </div>

      {/* ======================================
          STATISTICS
      ======================================= */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">

        <StatCard
          title="Total Activities"
          value={totalLogs}
          icon={Activity}
        />

        <StatCard
          title="Successful Actions"
          value={successfulActions}
          icon={CheckCircle2}
        />

        <StatCard
          title="Failed Actions"
          value={failedActions}
          icon={AlertTriangle}
        />

        <StatCard
          title="Active Users"
          value={uniqueUsers}
          icon={UserCheck}
        />

      </div>

      {/* ======================================
          SEARCH
      ======================================= */}

      <div className="bg-white border border-gray-200 rounded-2xl p-5">

        <div className="relative">

          <Search
            size={19}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search user, module, action, record..."
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-gray-200"
          />

        </div>

      </div>

      {/* ======================================
          FILTERS
      ======================================= */}

      <AuditLogFilterForm
        filters={filters}
        logs={auditLogs}
        onChange={handleFilterChange}
        onReset={handleResetFilters}
      />

      {/* ======================================
          AUDIT TABLE
      ======================================= */}

      <AuditLogTable
        logs={filteredLogs}
        onView={handleViewLog}
      />

      {/* ======================================
          LOG DETAILS
      ======================================= */}

      {showDetails && selectedLog && (
        <AuditLogDetails
          log={selectedLog}
          onClose={() => {
            setShowDetails(false);
            setSelectedLog(null);
          }}
        />
      )}

    </div>
  );
};

// ==========================================
// STAT CARD
// ==========================================

const StatCard = ({
  title,
  value,
  icon: Icon,
}) => {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm text-gray-500">
            {title}
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-2">
            {value}
          </h2>

        </div>

        <div className="p-3 bg-gray-100 rounded-xl">

          <Icon
            size={20}
            className="text-gray-700"
          />

        </div>

      </div>

    </div>
  );
};

// ==========================================
// AUDIT LOG DETAILS
// ==========================================

const AuditLogDetails = ({
  log,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">

      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden">

        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">

          <div className="flex items-center gap-3">

            <div className="p-3 bg-gray-100 rounded-xl">
              <Eye
                size={20}
                className="text-gray-700"
              />
            </div>

            <div>

              <h2 className="text-xl font-bold text-gray-900">
                Activity Details
              </h2>

              <p className="text-sm text-gray-500">
                Audit record information
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-600"
          >
            Close
          </button>

        </div>

        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">

          <DetailItem
            label="Date"
            value={log.date}
          />

          <DetailItem
            label="Time"
            value={log.time}
          />

          <DetailItem
            label="User"
            value={`${log.userName} (${log.userId})`}
          />

          <DetailItem
            label="Action"
            value={log.action}
          />

          <DetailItem
            label="Module"
            value={log.module}
          />

          <DetailItem
            label="Record"
            value={log.record}
          />

          <DetailItem
            label="Status"
            value={log.status}
          />

          <DetailItem
            label="IP Address"
            value={log.ipAddress}
          />

          <div className="sm:col-span-2">

            <DetailItem
              label="Description"
              value={log.description}
            />

          </div>

        </div>

      </div>

    </div>
  );
};

// ==========================================
// DETAIL ITEM
// ==========================================

const DetailItem = ({
  label,
  value,
}) => {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">

      <p className="text-xs text-gray-500">
        {label}
      </p>

      <p className="text-sm font-medium text-gray-900 mt-1 break-words">
        {value || "-"}
      </p>

    </div>
  );
};

export default AuditLogMaster;