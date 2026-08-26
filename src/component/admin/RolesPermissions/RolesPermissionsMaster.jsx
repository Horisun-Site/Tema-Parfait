import React, { useMemo, useState } from "react";
import {
  Search,
  ShieldCheck,
  Plus,
  Users,
  KeyRound,
  CheckCircle2,
  SlidersHorizontal,
  Pencil,
  Trash2,
  Eye,
} from "lucide-react";

import RoleForm from "./RoleForm";
import RoleTable from "./RolesPermissionsTable";

const RolesPermissionsMaster = () => {
  // ==========================================
  // STATE
  // ==========================================

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [showForm, setShowForm] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);

  // ==========================================
  // TEMPORARY FRONTEND DATA
  // ==========================================
  // This will later come from the database.

  const [roles, setRoles] = useState([
    {
      id: 1,
      roleCode: "ROLE-001",
      roleName: "Super Admin",
      description:
        "Full access to all ERP modules and administration settings.",
      users: 1,
      status: "Active",

      permissions: {
        dashboard: ["view"],

        products: [
          "view",
          "create",
          "edit",
          "delete",
        ],

        customers: [
          "view",
          "create",
          "edit",
          "delete",
        ],

        suppliers: [
          "view",
          "create",
          "edit",
          "delete",
        ],

        receiving: [
          "view",
          "create",
          "edit",
          "delete",
        ],

        stock: [
          "view",
          "create",
          "edit",
          "delete",
        ],

        batchExpiry: [
          "view",
          "create",
          "edit",
          "delete",
        ],

        invoices: [
          "view",
          "create",
          "edit",
          "delete",
        ],

        salesReturns: [
          "view",
          "create",
          "edit",
          "delete",
        ],

        payments: [
          "view",
          "create",
          "edit",
          "delete",
        ],

        deliveryNotes: [
          "view",
          "create",
          "edit",
          "delete",
        ],

        reports: [
          "view",
          "create",
          "edit",
          "delete",
        ],

        administration: [
          "view",
          "create",
          "edit",
          "delete",
        ],
      },
    },

    {
      id: 2,
      roleCode: "ROLE-002",
      roleName: "Manager",
      description:
        "Manages sales, inventory, customers and reports.",
      users: 2,
      status: "Active",

      permissions: {
        dashboard: ["view"],

        products: [
          "view",
          "create",
          "edit",
        ],

        customers: [
          "view",
          "create",
          "edit",
        ],

        suppliers: [
          "view",
          "create",
          "edit",
        ],

        receiving: [
          "view",
          "create",
          "edit",
        ],

        stock: [
          "view",
          "edit",
        ],

        batchExpiry: [
          "view",
          "create",
          "edit",
        ],

        invoices: [
          "view",
          "create",
          "edit",
        ],

        salesReturns: [
          "view",
          "create",
          "edit",
        ],

        payments: [
          "view",
          "create",
          "edit",
        ],

        deliveryNotes: [
          "view",
          "create",
          "edit",
        ],

        reports: [
          "view",
        ],

        administration: [],
      },
    },

    {
      id: 3,
      roleCode: "ROLE-003",
      roleName: "Sales Staff",
      description:
        "Handles customers, invoices, payments and delivery operations.",
      users: 3,
      status: "Active",

      permissions: {
        dashboard: ["view"],

        products: ["view"],

        customers: [
          "view",
          "create",
          "edit",
        ],

        suppliers: [],

        receiving: [],

        stock: ["view"],

        batchExpiry: ["view"],

        invoices: [
          "view",
          "create",
          "edit",
        ],

        salesReturns: [
          "view",
          "create",
        ],

        payments: [
          "view",
          "create",
        ],

        deliveryNotes: [
          "view",
          "create",
        ],

        reports: [],

        administration: [],
      },
    },

    {
      id: 4,
      roleCode: "ROLE-004",
      roleName: "Inventory Staff",
      description:
        "Manages products, stock receiving, stock control and batch tracking.",
      users: 2,
      status: "Active",

      permissions: {
        dashboard: ["view"],

        products: [
          "view",
          "create",
          "edit",
        ],

        customers: ["view"],

        suppliers: [
          "view",
          "create",
          "edit",
        ],

        receiving: [
          "view",
          "create",
          "edit",
        ],

        stock: [
          "view",
          "create",
          "edit",
        ],

        batchExpiry: [
          "view",
          "create",
          "edit",
        ],

        invoices: [],

        salesReturns: [],

        payments: [],

        deliveryNotes: ["view"],

        reports: [],

        administration: [],
      },
    },
  ]);

  // ==========================================
  // FILTER ROLES
  // ==========================================

  const filteredRoles = useMemo(() => {
    const query = search.toLowerCase().trim();

    return roles.filter((role) => {
      const matchesSearch =
        role.roleName
          .toLowerCase()
          .includes(query) ||
        role.roleCode
          .toLowerCase()
          .includes(query) ||
        role.description
          .toLowerCase()
          .includes(query);

      const matchesStatus =
        statusFilter === "all" ||
        role.status.toLowerCase() ===
          statusFilter.toLowerCase();

      return (
        matchesSearch &&
        matchesStatus
      );
    });
  }, [roles, search, statusFilter]);

  // ==========================================
  // STATISTICS
  // ==========================================

  const totalRoles = roles.length;

  const activeRoles = roles.filter(
    (role) => role.status === "Active"
  ).length;

  const totalUsers = roles.reduce(
    (total, role) =>
      total + Number(role.users || 0),
    0
  );

  // Supports both permission shapes:
  // - New flat array: ["products.view", "products.create"]
  // - Old nested object: { products: ["view", "create"] }
  const totalPermissions = roles.reduce((total, role) => {
    const permissions = role.permissions;

    const count = Array.isArray(permissions)
      ? permissions.length
      : Object.values(permissions || {}).reduce(
          (groupTotal, groupPermissions) =>
            groupTotal + groupPermissions.length,
          0
        );

    return total + count;
  }, 0);

  // ==========================================
  // CREATE ROLE
  // ==========================================

  const handleCreateRole = () => {
    setSelectedRole(null);
    setShowForm(true);
  };

  // ==========================================
  // EDIT ROLE
  // ==========================================

  const handleEditRole = (role) => {
    setSelectedRole(role);
    setShowForm(true);
  };

  // ==========================================
  // VIEW ROLE
  // ==========================================

  const handleViewRole = (role) => {
    setSelectedRole(role);
    setShowForm(true);
  };

  // ==========================================
  // DELETE ROLE
  // ==========================================

  const handleDeleteRole = (role) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete the "${role.roleName}" role?`
    );

    if (!confirmed) {
      return;
    }

    setRoles((currentRoles) =>
      currentRoles.filter(
        (currentRole) =>
          currentRole.id !== role.id
      )
    );
  };

  // ==========================================
  // SAVE ROLE
  // ==========================================

  const handleSaveRole = (roleData) => {
    if (selectedRole) {
      setRoles((currentRoles) =>
        currentRoles.map((role) =>
          role.id === selectedRole.id
            ? {
                ...role,
                roleName: roleData.roleName,
                roleCode:
                  role.roleCode ||
                  roleData.roleCode,
                description:
                  roleData.description,
                status: roleData.status,
                permissions:
                  roleData.permissions,
                users: role.users || 0,
              }
            : role
        )
      );
    } else {
      const newRole = {
        id: Date.now(),

        roleCode: `ROLE-${String(
          roles.length + 1
        ).padStart(3, "0")}`,

        roleName: roleData.roleName,

        description:
          roleData.description,

        users: 0,

        status: roleData.status,

        permissions:
          roleData.permissions,
      };

      setRoles((currentRoles) => [
        ...currentRoles,
        newRole,
      ]);
    }

    setShowForm(false);
    setSelectedRole(null);
  };

  // ==========================================
  // CLOSE FORM
  // ==========================================

  const handleCloseForm = () => {
    setShowForm(false);
    setSelectedRole(null);
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
              Roles & Permissions
            </h1>

            <p className="text-sm text-gray-500 mt-1">
              Manage staff roles and control access to ERP modules.
            </p>
          </div>

        </div>

        <button
          type="button"
          onClick={handleCreateRole}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gray-900 text-white hover:bg-gray-800 transition"
        >
          <Plus size={18} />

          New Role
        </button>

      </div>

      {/* ======================================
          STATISTICS
      ======================================= */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">

        {/* Total Roles */}

        <StatCard
          title="Total Roles"
          value={totalRoles}
          icon={ShieldCheck}
        />

        {/* Active Roles */}

        <StatCard
          title="Active Roles"
          value={activeRoles}
          icon={CheckCircle2}
        />

        {/* Assigned Users */}

        <StatCard
          title="Assigned Users"
          value={totalUsers}
          icon={Users}
        />

        {/* Permissions */}

        <StatCard
          title="Assigned Permissions"
          value={totalPermissions}
          icon={KeyRound}
        />

      </div>

      {/* ======================================
          SEARCH & FILTER
      ======================================= */}

      <div className="bg-white border border-gray-200 rounded-2xl p-5">

        <div className="flex flex-col lg:flex-row gap-4">

          {/* Search */}

          <div className="relative flex-1">

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
              placeholder="Search role name, code or description..."
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-gray-200"
            />

          </div>

          {/* Filter */}

          <div className="flex items-center gap-2">

            <SlidersHorizontal
              size={19}
              className="text-gray-500"
            />

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value)
              }
              className="px-4 py-3 border border-gray-200 rounded-xl bg-white outline-none"
            >

              <option value="all">
                All Roles
              </option>

              <option value="active">
                Active
              </option>

              <option value="inactive">
                Inactive
              </option>

            </select>

          </div>

        </div>

      </div>

      {/* ======================================
          ROLE TABLE
      ======================================= */}

      <RoleTable
        roles={filteredRoles}
        onView={handleViewRole}
        onEdit={handleEditRole}
        onDelete={handleDeleteRole}
      />

      {/* ======================================
          ROLE FORM
      ======================================= */}

      {showForm && (
        <RoleForm
          role={selectedRole}
          onClose={handleCloseForm}
          onSave={handleSaveRole}
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

export default RolesPermissionsMaster;
