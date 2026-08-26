import React, { useMemo, useState } from "react";
import {
  X,
  Shield,
  Save,
  CheckSquare,
  Square,
} from "lucide-react";

const RoleForm = ({
  role = null,
  onClose,
  onSave,
}) => {
  // ==========================================
  // PERMISSION STRUCTURE
  // ==========================================

  const permissionModules = [
    {
      id: "dashboard",
      name: "Dashboard",
      permissions: [
        {
          id: "dashboard.view",
          name: "View Dashboard",
        },
      ],
    },

    {
      id: "products",
      name: "Products",
      permissions: [
        {
          id: "products.view",
          name: "View Products",
        },
        {
          id: "products.create",
          name: "Add Products",
        },
        {
          id: "products.edit",
          name: "Edit Products",
        },
        {
          id: "products.delete",
          name: "Delete Products",
        },
      ],
    },

    {
      id: "customers",
      name: "Customers",
      permissions: [
        {
          id: "customers.view",
          name: "View Customers",
        },
        {
          id: "customers.create",
          name: "Add Customers",
        },
        {
          id: "customers.edit",
          name: "Edit Customers",
        },
        {
          id: "customers.delete",
          name: "Delete Customers",
        },
      ],
    },

    {
      id: "suppliers",
      name: "Suppliers",
      permissions: [
        {
          id: "suppliers.view",
          name: "View Suppliers",
        },
        {
          id: "suppliers.create",
          name: "Add Suppliers",
        },
        {
          id: "suppliers.edit",
          name: "Edit Suppliers",
        },
        {
          id: "suppliers.delete",
          name: "Delete Suppliers",
        },
      ],
    },

    {
      id: "receiving",
      name: "Stock Receiving",
      permissions: [
        {
          id: "receiving.view",
          name: "View Receiving",
        },
        {
          id: "receiving.create",
          name: "Create Receiving",
        },
        {
          id: "receiving.edit",
          name: "Edit Receiving",
        },
        {
          id: "receiving.delete",
          name: "Delete Receiving",
        },
      ],
    },

    {
      id: "stock",
      name: "Stock Control",
      permissions: [
        {
          id: "stock.view",
          name: "View Stock",
        },
        {
          id: "stock.create",
          name: "Create Stock Adjustment",
        },
        {
          id: "stock.edit",
          name: "Edit Stock",
        },
        {
          id: "stock.delete",
          name: "Delete Stock",
        },
      ],
    },

    {
      id: "batchExpiry",
      name: "Batch & Expiry",
      permissions: [
        {
          id: "batchExpiry.view",
          name: "View Batch & Expiry",
        },
        {
          id: "batchExpiry.create",
          name: "Create Batch",
        },
        {
          id: "batchExpiry.edit",
          name: "Edit Batch",
        },
        {
          id: "batchExpiry.delete",
          name: "Delete Batch",
        },
      ],
    },

    {
      id: "invoices",
      name: "Invoices",
      permissions: [
        {
          id: "invoices.view",
          name: "View Invoices",
        },
        {
          id: "invoices.create",
          name: "Create Invoice",
        },
        {
          id: "invoices.edit",
          name: "Edit Invoice",
        },
        {
          id: "invoices.delete",
          name: "Delete Invoice",
        },
      ],
    },

    {
      id: "salesReturns",
      name: "Sales Returns",
      permissions: [
        {
          id: "salesReturns.view",
          name: "View Sales Returns",
        },
        {
          id: "salesReturns.create",
          name: "Create Sales Return",
        },
        {
          id: "salesReturns.edit",
          name: "Edit Sales Return",
        },
        {
          id: "salesReturns.delete",
          name: "Delete Sales Return",
        },
      ],
    },

    {
      id: "payments",
      name: "Payments",
      permissions: [
        {
          id: "payments.view",
          name: "View Payments",
        },
        {
          id: "payments.create",
          name: "Record Payment",
        },
        {
          id: "payments.edit",
          name: "Edit Payment",
        },
        {
          id: "payments.delete",
          name: "Delete Payment",
        },
      ],
    },

    {
      id: "deliveryNotes",
      name: "Delivery Notes",
      permissions: [
        {
          id: "deliveryNotes.view",
          name: "View Delivery Notes",
        },
        {
          id: "deliveryNotes.create",
          name: "Create Delivery Note",
        },
        {
          id: "deliveryNotes.edit",
          name: "Edit Delivery Note",
        },
        {
          id: "deliveryNotes.delete",
          name: "Delete Delivery Note",
        },
      ],
    },

    {
      id: "reports",
      name: "Reports",
      permissions: [
        {
          id: "reports.view",
          name: "View Reports",
        },
        {
          id: "reports.export",
          name: "Export Reports",
        },
      ],
    },

    {
      id: "administration",
      name: "Administration",
      permissions: [
        {
          id: "administration.roles",
          name: "Manage Roles",
        },
        {
          id: "administration.users",
          name: "Manage Users",
        },
        {
          id: "administration.settings",
          name: "Manage Settings",
        },
      ],
    },
  ];

  // ==========================================
  // CONVERT OLD PERMISSION OBJECT
  // INTO PERMISSION ID ARRAY
  // ==========================================

  const normalizePermissions = (rolePermissions) => {
    if (Array.isArray(rolePermissions)) {
      return rolePermissions;
    }

    if (
      !rolePermissions ||
      typeof rolePermissions !== "object"
    ) {
      return [];
    }

    return Object.entries(rolePermissions).flatMap(
      ([moduleId, permissionList]) =>
        Array.isArray(permissionList)
          ? permissionList.map(
              (permission) =>
                `${moduleId}.${permission}`
            )
          : []
    );
  };

  // ==========================================
  // FORM STATE
  // ==========================================

  const [roleName, setRoleName] = useState(
    role?.roleName || role?.name || ""
  );

  const [description, setDescription] = useState(
    role?.description || ""
  );

  const [status, setStatus] = useState(
    role?.status || "Active"
  );

  const [permissions, setPermissions] = useState(
    normalizePermissions(role?.permissions)
  );

  const [isSaving, setIsSaving] = useState(false);

  // ==========================================
  // ALL PERMISSION IDS
  // ==========================================

  const allPermissionIds = useMemo(() => {
    return permissionModules.flatMap(
      (module) =>
        module.permissions.map(
          (permission) => permission.id
        )
    );
  }, []);

  // ==========================================
  // TOGGLE PERMISSION
  // ==========================================

  const togglePermission = (permissionId) => {
    setPermissions((current) => {
      if (current.includes(permissionId)) {
        return current.filter(
          (id) => id !== permissionId
        );
      }

      return [...current, permissionId];
    });
  };

  // ==========================================
  // CHECK MODULE
  // ==========================================

  const isModuleFullySelected = (module) => {
    return module.permissions.every(
      (permission) =>
        permissions.includes(permission.id)
    );
  };

  // ==========================================
  // TOGGLE MODULE
  // ==========================================

  const toggleModule = (module) => {
    const modulePermissionIds =
      module.permissions.map(
        (permission) => permission.id
      );

    const allSelected =
      modulePermissionIds.every((id) =>
        permissions.includes(id)
      );

    if (allSelected) {
      setPermissions((current) =>
        current.filter(
          (id) =>
            !modulePermissionIds.includes(id)
        )
      );
    } else {
      setPermissions((current) => [
        ...new Set([
          ...current,
          ...modulePermissionIds,
        ]),
      ]);
    }
  };

  // ==========================================
  // SELECT ALL
  // ==========================================

  const allPermissionsSelected =
    allPermissionIds.length > 0 &&
    allPermissionIds.every((id) =>
      permissions.includes(id)
    );

  const toggleAllPermissions = () => {
    if (allPermissionsSelected) {
      setPermissions([]);
    } else {
      setPermissions(allPermissionIds);
    }
  };

  // ==========================================
  // SUBMIT
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!roleName.trim()) {
      alert("Please enter a role name.");
      return;
    }

    if (permissions.length === 0) {
      alert(
        "Please select at least one permission."
      );
      return;
    }

    setIsSaving(true);

    const roleData = {
      roleName: roleName.trim(),

      roleCode:
        role?.roleCode ||
        role?.code ||
        `ROLE-${Date.now()}`,

      description: description.trim(),

      status,

      permissions,

      permissionCount:
        permissions.length,

      users:
        role?.users ||
        role?.userCount ||
        0,
    };

    try {
      await new Promise((resolve) =>
        setTimeout(resolve, 300)
      );

      onSave?.(roleData);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">

      <div className="w-full max-w-5xl max-h-[95vh] bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col">

        {/* HEADER */}

        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">

          <div className="flex items-center gap-3">

            <div className="p-3 bg-gray-100 rounded-xl">
              <Shield
                size={22}
                className="text-gray-700"
              />
            </div>

            <div>

              <h2 className="text-xl font-bold text-gray-900">
                {role
                  ? "Edit Role"
                  : "Create New Role"}
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Define the role and assign system permissions.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition"
          >
            <X size={21} />
          </button>

        </div>

        {/* FORM */}

        <form
          onSubmit={handleSubmit}
          className="flex-1 overflow-y-auto"
        >

          <div className="p-6 space-y-6">

            {/* ROLE INFORMATION */}

            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5">

              <h3 className="font-semibold text-gray-900 mb-4">
                Role Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <div>

                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Role Name *
                  </label>

                  <input
                    type="text"
                    value={roleName}
                    onChange={(e) =>
                      setRoleName(e.target.value)
                    }
                    placeholder="e.g. Sales Manager"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white outline-none focus:ring-2 focus:ring-gray-200"
                    required
                  />

                </div>

                <div>

                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>

                  <select
                    value={status}
                    onChange={(e) =>
                      setStatus(e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white outline-none"
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

              <div className="mt-4">

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>

                <textarea
                  value={description}
                  onChange={(e) =>
                    setDescription(e.target.value)
                  }
                  rows={3}
                  placeholder="Describe what this role is responsible for..."
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white outline-none resize-none"
                />

              </div>

            </div>

            {/* PERMISSIONS */}

            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">

              <div className="px-5 py-4 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

                <div>

                  <h3 className="font-semibold text-gray-900">
                    Permissions
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    Select what this role can access.
                  </p>

                </div>

                <button
                  type="button"
                  onClick={toggleAllPermissions}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 text-sm"
                >

                  {allPermissionsSelected ? (
                    <CheckSquare size={17} />
                  ) : (
                    <Square size={17} />
                  )}

                  {allPermissionsSelected
                    ? "Clear All"
                    : "Select All"}

                </button>

              </div>

              <div className="divide-y divide-gray-100">

                {permissionModules.map(
                  (module) => (

                    <div
                      key={module.id}
                      className="p-5"
                    >

                      <div className="flex items-center justify-between mb-4">

                        <h4 className="font-semibold text-gray-900">
                          {module.name}
                        </h4>

                        <button
                          type="button"
                          onClick={() =>
                            toggleModule(module)
                          }
                          className="text-sm text-gray-600 hover:text-gray-900"
                        >

                          {isModuleFullySelected(
                            module
                          )
                            ? "Clear"
                            : "Select All"}

                        </button>

                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">

                        {module.permissions.map(
                          (permission) => {

                            const selected =
                              permissions.includes(
                                permission.id
                              );

                            return (

                              <button
                                key={
                                  permission.id
                                }
                                type="button"
                                onClick={() =>
                                  togglePermission(
                                    permission.id
                                  )
                                }
                                className={`flex items-center gap-3 text-left p-3 rounded-xl border transition ${
                                  selected
                                    ? "border-gray-400 bg-gray-50"
                                    : "border-gray-200 hover:bg-gray-50"
                                }`}
                              >

                                {selected ? (
                                  <CheckSquare
                                    size={18}
                                    className="text-gray-700 shrink-0"
                                  />
                                ) : (
                                  <Square
                                    size={18}
                                    className="text-gray-400 shrink-0"
                                  />
                                )}

                                <span className="text-sm text-gray-700">
                                  {permission.name}
                                </span>

                              </button>

                            );
                          }
                        )}

                      </div>

                    </div>

                  )
                )}

              </div>

            </div>

          </div>

          {/* FOOTER */}

          <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">

            <div className="text-sm text-gray-500">
              {permissions.length} permission
              {permissions.length === 1
                ? ""
                : "s"} selected
            </div>

            <div className="flex items-center gap-3">

              <button
                type="button"
                onClick={onClose}
                className="px-5 py-3 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 transition"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isSaving}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gray-900 text-white hover:bg-gray-800 disabled:opacity-50 transition"
              >

                <Save size={17} />

                {isSaving
                  ? "Saving..."
                  : role
                  ? "Update Role"
                  : "Save Role"}

              </button>

            </div>

          </div>

        </form>

      </div>

    </div>
  );
};

export default RoleForm;