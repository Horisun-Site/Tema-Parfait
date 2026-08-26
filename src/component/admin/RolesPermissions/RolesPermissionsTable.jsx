import React from "react";
import { Shield, Users, Edit, Trash2, Eye } from "lucide-react";

const RolesPermissionsTable = ({ roles = [], onView, onEdit, onDelete }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
      {/* ================================
          TABLE HEADER
      ================================= */}

      <div className="px-5 py-4 border-b border-gray-200">
        <h3 className="font-semibold text-gray-900">System Roles</h3>

        <p className="text-sm text-gray-500 mt-1">
          Manage roles and their assigned permissions.
        </p>
      </div>

      {/* ================================
          DESKTOP TABLE
      ================================= */}

      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="text-left px-5 py-4 text-xs font-semibold text-gray-500 uppercase">
                Role
              </th>

              <th className="text-left px-5 py-4 text-xs font-semibold text-gray-500 uppercase">
                Description
              </th>

              <th className="text-left px-5 py-4 text-xs font-semibold text-gray-500 uppercase">
                Users
              </th>

              <th className="text-left px-5 py-4 text-xs font-semibold text-gray-500 uppercase">
                Permissions
              </th>

              <th className="text-left px-5 py-4 text-xs font-semibold text-gray-500 uppercase">
                Status
              </th>

              <th className="text-right px-5 py-4 text-xs font-semibold text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {roles.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-5 py-12 text-center">
                  <Shield size={40} className="mx-auto text-gray-300" />

                  <p className="mt-3 text-gray-500">No roles found.</p>
                </td>
              </tr>
            ) : (
              roles.map((role) => (
                <tr
                  key={role.id}
                  className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition"
                >
                  {/* Role */}

                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        <Shield size={18} className="text-gray-700" />
                      </div>

                      <div>
                        <p className="font-medium text-gray-900">
                          {role.roleName}
                        </p>

                        <p className="text-xs text-gray-500">{role.roleCode}</p>
                      </div>
                    </div>
                  </td>

                  {/* Description */}

                  <td className="px-5 py-4">
                    <p className="text-sm text-gray-600 max-w-xs">
                      {role.description || "No description"}
                    </p>
                  </td>

                  {/* Users */}

                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <Users size={16} className="text-gray-500" />

                      <span className="text-sm text-gray-700">
                        {role.users || 0}
                      </span>
                    </div>
                  </td>

                  {/* Permissions */}

                  <td className="px-5 py-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-medium">
                      {Array.isArray(role.permissions)
                        ? role.permissions.length
                        : Object.values(role.permissions || {}).reduce(
                            (total, permissions) => total + permissions.length,
                            0
                          )}{" "}
                      permissions
                    </span>
                  </td>

                  {/* Status */}

                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        role.status === "Active"
                          ? "bg-gray-100 text-gray-700"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {role.status || "Active"}
                    </span>
                  </td>

                  {/* Actions */}

                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => onView?.(role)}
                        className="p-2 rounded-lg hover:bg-gray-100 transition"
                        title="View permissions"
                      >
                        <Eye size={17} className="text-gray-600" />
                      </button>

                      <button
                        type="button"
                        onClick={() => onEdit?.(role)}
                        className="p-2 rounded-lg hover:bg-gray-100 transition"
                        title="Edit role"
                      >
                        <Edit size={17} className="text-gray-600" />
                      </button>

                      <button
                        type="button"
                        onClick={() => onDelete?.(role)}
                        className="p-2 rounded-lg hover:bg-gray-100 transition"
                        title="Delete role"
                      >
                        <Trash2 size={17} className="text-gray-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ================================
          MOBILE CARDS
      ================================= */}

      <div className="md:hidden divide-y divide-gray-100">
        {roles.length === 0 ? (
          <div className="px-5 py-12 text-center">
            <Shield size={40} className="mx-auto text-gray-300" />

            <p className="mt-3 text-gray-500">No roles found.</p>
          </div>
        ) : (
          roles.map((role) => (
            <div key={role.id} className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <Shield size={18} className="text-gray-700" />
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {role.roleName}
                    </h4>

                    <p className="text-xs text-gray-500">{role.roleCode}</p>
                  </div>
                </div>

                <span className="px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 text-xs">
                  {role.status || "Active"}
                </span>
              </div>

              <p className="text-sm text-gray-600 mt-4">
                {role.description || "No description"}
              </p>

              <div className="grid grid-cols-2 gap-3 mt-4">
                <div className="bg-gray-50 rounded-xl p-3">
                  <p className="text-xs text-gray-500">Users</p>

                  <p className="font-semibold text-gray-900 mt-1">
                    {role.users || 0}
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-3">
                  <p className="text-xs text-gray-500">Permissions</p>

                  <p className="font-semibold text-gray-900 mt-1">
                    {Array.isArray(role.permissions)
                      ? role.permissions.length
                      : Object.values(role.permissions || {}).reduce(
                          (total, permissions) => total + permissions.length,
                          0
                        )}{" "}
                    permissions
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => onView?.(role)}
                  className="px-3 py-2 rounded-lg border border-gray-200 text-sm hover:bg-gray-50"
                >
                  View
                </button>

                <button
                  type="button"
                  onClick={() => onEdit?.(role)}
                  className="px-3 py-2 rounded-lg border border-gray-200 text-sm hover:bg-gray-50"
                >
                  Edit
                </button>

                <button
                  type="button"
                  onClick={() => onDelete?.(role)}
                  className="px-3 py-2 rounded-lg border border-gray-200 text-sm hover:bg-gray-50"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RolesPermissionsTable;
