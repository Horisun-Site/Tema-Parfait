import React from "react";
import {
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";

const UserTable = ({
  users = [],
  onView,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">

      {/* =========================
          TABLE HEADER
      ========================== */}

      <div className="px-6 py-5 border-b border-gray-200">
        <h2 className="font-semibold text-gray-900">
          System Users
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Manage users who have access to the management system.
        </p>
      </div>

      {/* =========================
          TABLE
      ========================== */}

      <div className="overflow-x-auto">
        <table className="w-full min-w-[1000px]">

          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>

              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
                User
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
                Email
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
                Role
              </th>

              <th className="px-6 py-4 text-center text-xs font-semibold text-gray-500 uppercase">
                Status
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
                Last Login
              </th>

              <th className="px-6 py-4 text-center text-xs font-semibold text-gray-500 uppercase">
                Actions
              </th>

            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">

            {users.length > 0 ? (

              users.map((user) => (

                <tr
                  key={user.id}
                  className="hover:bg-gray-50 transition"
                >

                  {/* USER */}

                  <td className="px-6 py-4">

                    <div className="flex items-center gap-3">

                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center font-semibold text-gray-700">
                        {user.name
                          ?.charAt(0)
                          ?.toUpperCase()}
                      </div>

                      <div>
                        <p className="font-medium text-gray-900">
                          {user.name}
                        </p>

                        <p className="text-xs text-gray-500 mt-1">
                          {user.username}
                        </p>
                      </div>

                    </div>

                  </td>

                  {/* EMAIL */}

                  <td className="px-6 py-4 text-sm text-gray-600">
                    {user.email}
                  </td>

                  {/* ROLE */}

                  <td className="px-6 py-4">

                    <span className="inline-flex px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-medium">
                      {user.role}
                    </span>

                  </td>

                  {/* STATUS */}

                  <td className="px-6 py-4 text-center">

                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                        user.status === "Active"
                          ? "bg-gray-900 text-white"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {user.status}
                    </span>

                  </td>

                  {/* LAST LOGIN */}

                  <td className="px-6 py-4 text-sm text-gray-600">
                    {user.lastLogin || "Never"}
                  </td>

                  {/* ACTIONS */}

                  <td className="px-6 py-4">

                    <div className="flex items-center justify-center gap-2">

                      {/* VIEW */}

                      <button
                        type="button"
                        onClick={() => onView?.(user)}
                        title="View User"
                        className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      {/* EDIT */}

                      <button
                        type="button"
                        onClick={() => onEdit?.(user)}
                        title="Edit User"
                        className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>

                      {/* DELETE */}

                      <button
                        type="button"
                        onClick={() => onDelete?.(user)}
                        title="Delete User"
                        className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                    </div>

                  </td>

                </tr>

              ))

            ) : (

              <tr>

                <td
                  colSpan="6"
                  className="px-6 py-12 text-center text-gray-500"
                >
                  No users found.
                </td>

              </tr>

            )}

          </tbody>

        </table>
      </div>

    </div>
  );
};

export default UserTable;