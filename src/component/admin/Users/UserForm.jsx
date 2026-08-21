import React, { useEffect, useState } from "react";
import {
  X,
  Save,
  User,
  Mail,
  Phone,
  ShieldCheck,
  Lock,
} from "lucide-react";

const UserForm = ({
  onClose,
  onSave,
  initialData = null,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    role: "",
    password: "",
    confirmPassword: "",
    status: "Active",
  });

  const [error, setError] = useState("");

  // =========================
  // LOAD EXISTING USER
  // =========================

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        username: initialData.username || "",
        email: initialData.email || "",
        phone: initialData.phone || "",
        role: initialData.role || "",
        password: "",
        confirmPassword: "",
        status: initialData.status || "Active",
      });
    } else {
      setFormData({
        name: "",
        username: "",
        email: "",
        phone: "",
        role: "",
        password: "",
        confirmPassword: "",
        status: "Active",
      });
    }

    setError("");
  }, [initialData]);

  // =========================
  // HANDLE CHANGE
  // =========================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
  };

  // =========================
  // SUBMIT
  // =========================

  const handleSubmit = (e) => {
    e.preventDefault();

    // Name
    if (!formData.name.trim()) {
      setError("Please enter the user's full name.");
      return;
    }

    // Username
    if (!formData.username.trim()) {
      setError("Please enter a username.");
      return;
    }

    // Email
    if (!formData.email.trim()) {
      setError("Please enter the user's email address.");
      return;
    }

    // Role
    if (!formData.role) {
      setError("Please select a user role.");
      return;
    }

    // Password only required when creating a user
    if (!initialData && !formData.password) {
      setError("Please enter a password.");
      return;
    }

    // Password confirmation
    if (
      formData.password &&
      formData.password !== formData.confirmPassword
    ) {
      setError("Passwords do not match.");
      return;
    }

    // Password length
    if (
      formData.password &&
      formData.password.length < 6
    ) {
      setError(
        "Password must be at least 6 characters."
      );
      return;
    }

    const userData = {
      name: formData.name.trim(),
      username: formData.username.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      role: formData.role,
      status: formData.status,
    };

    // Only send password when it has been entered
    if (formData.password) {
      userData.password = formData.password;
    }

    onSave?.(userData);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/40 flex items-center justify-center p-4">

      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl max-h-[92vh] overflow-y-auto">

        {/* =========================
            HEADER
        ========================== */}

        <div className="sticky top-0 z-10 bg-white flex items-center justify-between px-6 py-5 border-b border-gray-200">

          <div className="flex items-center gap-3">

            <div className="p-3 bg-gray-100 rounded-xl">
              <User className="w-5 h-5 text-gray-700" />
            </div>

            <div>

              <h2 className="text-xl font-semibold text-gray-900">
                {initialData
                  ? "Edit User"
                  : "Add New User"}
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                {initialData
                  ? "Update the user's account information."
                  : "Create a new system user account."}
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 text-gray-500"
          >
            <X className="w-5 h-5" />
          </button>

        </div>

        {/* =========================
            FORM
        ========================== */}

        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-6"
        >

          {/* ERROR */}

          {error && (
            <div className="bg-gray-100 border border-gray-300 text-gray-700 px-4 py-3 rounded-xl text-sm">
              {error}
            </div>
          )}

          {/* =========================
              NAME + USERNAME
          ========================== */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {/* NAME */}

            <div>

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>

              <div className="relative">

                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. John Doe"
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-gray-200"
                />

              </div>

            </div>

            {/* USERNAME */}

            <div>

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>

              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="e.g. johndoe"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-gray-200"
              />

            </div>

          </div>

          {/* =========================
              EMAIL + PHONE
          ========================== */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {/* EMAIL */}

            <div>

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>

              <div className="relative">

                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="user@example.com"
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-gray-200"
                />

              </div>

            </div>

            {/* PHONE */}

            <div>

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>

              <div className="relative">

                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="08012345678"
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-gray-200"
                />

              </div>

            </div>

          </div>

          {/* =========================
              ROLE + STATUS
          ========================== */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {/* ROLE */}

            <div>

              <label className="block text-sm font-medium text-gray-700 mb-2">
                User Role
              </label>

              <div className="relative">

                <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />

                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-gray-200 bg-white"
                >

                  <option value="">
                    Select role
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

              </div>

            </div>

            {/* STATUS */}

            <div>

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Account Status
              </label>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-gray-200 bg-white"
              >

                <option value="Active">
                  Active
                </option>

                <option value="Inactive">
                  Inactive
                </option>

              </select>

            </div>

          </div>

          {/* =========================
              PASSWORD
          ========================== */}

          <div className="border border-gray-200 rounded-xl p-5">

            <div className="flex items-center gap-3 mb-4">

              <div className="p-2 bg-gray-100 rounded-lg">
                <Lock className="w-4 h-4 text-gray-700" />
              </div>

              <div>

                <h3 className="text-sm font-semibold text-gray-900">
                  {initialData
                    ? "Change Password"
                    : "Account Password"}
                </h3>

                <p className="text-xs text-gray-500 mt-1">
                  {initialData
                    ? "Leave blank to keep the current password."
                    : "Set a secure password for this account."}
                </p>

              </div>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              {/* PASSWORD */}

              <div>

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>

                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder={
                    initialData
                      ? "Leave blank to keep"
                      : "Enter password"
                  }
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-gray-200"
                />

              </div>

              {/* CONFIRM */}

              <div>

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>

                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm password"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-gray-200"
                />

              </div>

            </div>

          </div>

          {/* =========================
              ACTIONS
          ========================== */}

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">

            <button
              type="button"
              onClick={onClose}
              className="px-5 py-3 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gray-900 text-white hover:bg-gray-800 transition"
            >
              <Save className="w-4 h-4" />

              {initialData
                ? "Update User"
                : "Create User"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default UserForm;