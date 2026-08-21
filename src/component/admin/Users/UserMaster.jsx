import React, { useMemo, useState } from "react";
import {
  Users,
  UserPlus,
  Search,
  ShieldCheck,
  UserCheck,
  UserX,
  SlidersHorizontal,
} from "lucide-react";

import UserTable from "./UserTable";
import UserForm from "./UserForm";

const UserMaster = () => {
  // =========================
  // USERS
  // =========================

  const [users, setUsers] = useState([
    {
      id: 1,
      name: "John Doe",
      username: "johndoe",
      email: "john@example.com",
      phone: "08012345678",
      role: "Administrator",
      status: "Active",
      lastLogin: "Today, 10:45 AM",
    },
    {
      id: 2,
      name: "Sarah Williams",
      username: "sarahw",
      email: "sarah@example.com",
      phone: "08023456789",
      role: "Manager",
      status: "Active",
      lastLogin: "Today, 09:20 AM",
    },
    {
      id: 3,
      name: "Michael Brown",
      username: "michaelb",
      email: "michael@example.com",
      phone: "08034567890",
      role: "Sales",
      status: "Active",
      lastLogin: "Yesterday, 04:15 PM",
    },
    {
      id: 4,
      name: "David Johnson",
      username: "davidj",
      email: "david@example.com",
      phone: "08045678901",
      role: "Inventory",
      status: "Inactive",
      lastLogin: "Aug 18, 2026",
    },
  ]);

  // =========================
  // SEARCH & FILTER
  // =========================

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // =========================
  // MODAL
  // =========================

  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  // =========================
  // VIEW USER
  // =========================

  const [viewingUser, setViewingUser] = useState(null);

  // =========================
  // FILTER USERS
  // =========================

  const filteredUsers = useMemo(() => {
    const query = search.toLowerCase().trim();

    return users.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(query) ||
        user.username.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.role.toLowerCase().includes(query);

      const matchesRole =
        roleFilter === "all" ||
        user.role === roleFilter;

      const matchesStatus =
        statusFilter === "all" ||
        user.status === statusFilter;

      return (
        matchesSearch &&
        matchesRole &&
        matchesStatus
      );
    });
  }, [
    users,
    search,
    roleFilter,
    statusFilter,
  ]);

  // =========================
  // STATISTICS
  // =========================

  const totalUsers = users.length;

  const activeUsers = users.filter(
    (user) => user.status === "Active"
  ).length;

  const inactiveUsers = users.filter(
    (user) => user.status === "Inactive"
  ).length;

  const administrators = users.filter(
    (user) => user.role === "Administrator"
  ).length;

  // =========================
  // ADD USER
  // =========================

  const handleAddUser = () => {
    setEditingUser(null);
    setShowForm(true);
  };

  // =========================
  // EDIT USER
  // =========================

  const handleEditUser = (user) => {
    setEditingUser(user);
    setShowForm(true);
  };

  // =========================
  // VIEW USER
  // =========================

  const handleViewUser = (user) => {
    setViewingUser(user);
  };

  // =========================
  // DELETE USER
  // =========================

  const handleDeleteUser = (user) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${user.name}?`
    );

    if (!confirmed) {
      return;
    }

    setUsers((prev) =>
      prev.filter((item) => item.id !== user.id)
    );
  };

  // =========================
  // SAVE USER
  // =========================

  const handleSaveUser = (userData) => {
    if (editingUser) {
      // UPDATE EXISTING USER

      setUsers((prev) =>
        prev.map((user) =>
          user.id === editingUser.id
            ? {
                ...user,
                ...userData,
              }
            : user
        )
      );
    } else {
      // CREATE NEW USER

      const newUser = {
        ...userData,
        id: Date.now(),
        lastLogin: "Never",
      };

      setUsers((prev) => [
        newUser,
        ...prev,
      ]);
    }

    setShowForm(false);
    setEditingUser(null);
  };

  return (
    <div className="space-y-6">

      {/* =========================
          PAGE HEADER
      ========================== */}

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

        <div>

          <div className="flex items-center gap-3">

            <div className="p-3 bg-gray-100 rounded-xl">
              <Users className="w-6 h-6 text-gray-700" />
            </div>

            <div>

              <h1 className="text-2xl font-bold text-gray-900">
                Users
              </h1>

              <p className="text-sm text-gray-500 mt-1">
                Manage system users and their access accounts.
              </p>

            </div>

          </div>

        </div>

        {/* ADD USER */}

        <button
          type="button"
          onClick={handleAddUser}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gray-900 text-white hover:bg-gray-800 transition"
        >
          <UserPlus className="w-4 h-4" />
          Add User
        </button>

      </div>

      {/* =========================
          STATISTICS
      ========================== */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">

        {/* TOTAL USERS */}

        <div className="bg-white border border-gray-200 rounded-2xl p-5">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-gray-500">
                Total Users
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-2">
                {totalUsers}
              </h2>

            </div>

            <div className="p-3 bg-gray-100 rounded-xl">
              <Users className="w-5 h-5 text-gray-700" />
            </div>

          </div>

        </div>

        {/* ACTIVE */}

        <div className="bg-white border border-gray-200 rounded-2xl p-5">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-gray-500">
                Active Users
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-2">
                {activeUsers}
              </h2>

            </div>

            <div className="p-3 bg-gray-100 rounded-xl">
              <UserCheck className="w-5 h-5 text-gray-700" />
            </div>

          </div>

        </div>

        {/* INACTIVE */}

        <div className="bg-white border border-gray-200 rounded-2xl p-5">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-gray-500">
                Inactive Users
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-2">
                {inactiveUsers}
              </h2>

            </div>

            <div className="p-3 bg-gray-100 rounded-xl">
              <UserX className="w-5 h-5 text-gray-700" />
            </div>

          </div>

        </div>

        {/* ADMINISTRATORS */}

        <div className="bg-white border border-gray-200 rounded-2xl p-5">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-gray-500">
                Administrators
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-2">
                {administrators}
              </h2>

            </div>

            <div className="p-3 bg-gray-100 rounded-xl">
              <ShieldCheck className="w-5 h-5 text-gray-700" />
            </div>

          </div>

        </div>

      </div>

      {/* =========================
          SEARCH & FILTERS
      ========================== */}

      <div className="bg-white border border-gray-200 rounded-2xl p-5">

        <div className="flex flex-col lg:flex-row gap-4">

          {/* SEARCH */}

          <div className="relative flex-1">

            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
            />

            <input
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search name, username, email or role..."
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-gray-200"
            />

          </div>

          {/* ROLE */}

          <select
            value={roleFilter}
            onChange={(e) =>
              setRoleFilter(e.target.value)
            }
            className="px-4 py-3 border border-gray-200 rounded-xl outline-none bg-white"
          >

            <option value="all">
              All Roles
            </option>

            <option value="Administrator">
              Administrator
            </option>

            <option value="Manager">
              Manager
            </option>

            <option value="Sales">
              Sales
            </option>

            <option value="Inventory">
              Inventory
            </option>

            <option value="Accountant">
              Accountant
            </option>

          </select>

          {/* STATUS */}

          <div className="flex items-center gap-2">

            <SlidersHorizontal className="w-5 h-5 text-gray-500" />

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value)
              }
              className="px-4 py-3 border border-gray-200 rounded-xl outline-none bg-white"
            >

              <option value="all">
                All Status
              </option>

              <option value="Active">
                Active
              </option>

              <option value="Inactive">
                Inactive
              </option>

            </select>

          </div>

        </div>

      </div>

      {/* =========================
          USER TABLE
      ========================== */}

      <UserTable
        users={filteredUsers}
        onView={handleViewUser}
        onEdit={handleEditUser}
        onDelete={handleDeleteUser}
      />

      {/* =========================
          USER FORM
      ========================== */}

      {showForm && (
        <UserForm
          onClose={() => {
            setShowForm(false);
            setEditingUser(null);
          }}
          onSave={handleSaveUser}
          initialData={editingUser}
        />
      )}

      {/* =========================
          VIEW USER MODAL
      ========================== */}

      {viewingUser && (

        <div className="fixed inset-0 z-[100] bg-black/40 flex items-center justify-center p-4">

          <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl">

            <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between">

              <div>

                <h2 className="text-xl font-semibold text-gray-900">
                  User Details
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Account information
                </p>

              </div>

              <button
                type="button"
                onClick={() => setViewingUser(null)}
                className="px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-500"
              >
                ✕
              </button>

            </div>

            <div className="p-6 space-y-4">

              <div>
                <p className="text-xs text-gray-500">
                  Full Name
                </p>

                <p className="font-medium text-gray-900 mt-1">
                  {viewingUser.name}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500">
                  Username
                </p>

                <p className="font-medium text-gray-900 mt-1">
                  {viewingUser.username}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500">
                  Email
                </p>

                <p className="font-medium text-gray-900 mt-1">
                  {viewingUser.email}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500">
                  Phone
                </p>

                <p className="font-medium text-gray-900 mt-1">
                  {viewingUser.phone || "Not provided"}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">

                <div>
                  <p className="text-xs text-gray-500">
                    Role
                  </p>

                  <p className="font-medium text-gray-900 mt-1">
                    {viewingUser.role}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">
                    Status
                  </p>

                  <p className="font-medium text-gray-900 mt-1">
                    {viewingUser.status}
                  </p>
                </div>

              </div>

              <div>
                <p className="text-xs text-gray-500">
                  Last Login
                </p>

                <p className="font-medium text-gray-900 mt-1">
                  {viewingUser.lastLogin || "Never"}
                </p>
              </div>

            </div>

            <div className="px-6 py-4 border-t border-gray-200 flex justify-end">

              <button
                type="button"
                onClick={() => setViewingUser(null)}
                className="px-5 py-3 rounded-xl bg-gray-900 text-white hover:bg-gray-800"
              >
                Close
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
};

export default UserMaster;