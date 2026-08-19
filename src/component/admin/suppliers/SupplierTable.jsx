import React from "react";
import {
  Eye,
  Pencil,
  MoreHorizontal,
} from "lucide-react";

const SupplierTable = ({
  suppliers,
  onView,
  onEdit,
}) => {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">

      {/* Table Header */}
      <div className="px-6 py-5 border-b border-gray-200">
        <div>
          <h2 className="font-semibold text-gray-900">
            Suppliers
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Manage registered suppliers and their accounts.
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">

        <table className="w-full min-w-[1000px]">

          <thead className="bg-gray-50 border-b border-gray-200">

            <tr>

              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                Supplier
              </th>

              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                Contact
              </th>

              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                Telephone
              </th>

              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                Payment Terms
              </th>

              <th className="text-right px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                Balance
              </th>

              <th className="text-center px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                Status
              </th>

              <th className="text-right px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                Actions
              </th>

            </tr>

          </thead>

          <tbody className="divide-y divide-gray-100">

            {suppliers.length === 0 ? (

              <tr>

                <td
                  colSpan="7"
                  className="px-6 py-16 text-center"
                >

                  <div className="flex flex-col items-center">

                    <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                      <span className="text-gray-400 text-lg">
                        —
                      </span>
                    </div>

                    <p className="text-sm font-medium text-gray-600">
                      No suppliers found
                    </p>

                    <p className="text-xs text-gray-400 mt-1">
                      Add your first supplier to get started.
                    </p>

                  </div>

                </td>

              </tr>

            ) : (

              suppliers.map((supplier) => (

                <tr
                  key={supplier.supplierId}
                  className="hover:bg-gray-50 transition"
                >

                  {/* Supplier */}
                  <td className="px-6 py-4">

                    <div>

                      <p className="font-medium text-gray-900">
                        {supplier.supplierName}
                      </p>

                      <p className="text-xs text-gray-500 mt-1">
                        {supplier.supplierId}
                      </p>

                    </div>

                  </td>

                  {/* Contact */}
                  <td className="px-6 py-4">

                    <div>

                      <p className="text-sm text-gray-700">
                        {supplier.contactPerson || "—"}
                      </p>

                      <p className="text-xs text-gray-500 mt-1">
                        {supplier.email || "No email"}
                      </p>

                    </div>

                  </td>

                  {/* Telephone */}
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {supplier.telephone || "—"}
                  </td>

                  {/* Payment Terms */}
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {supplier.paymentTerms || "—"}
                  </td>

                  {/* Balance */}
                  <td className="px-6 py-4 text-right">

                    <span
                      className={`text-sm font-semibold ${
                        Number(supplier.balance) > 0
                          ? "text-red-600"
                          : "text-gray-900"
                      }`}
                    >
                      ₦
                      {Number(
                        supplier.balance || 0
                      ).toLocaleString()}
                    </span>

                  </td>

                  {/* Status */}
                  <td className="px-6 py-4 text-center">

                    <span
                      className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
                        supplier.isActive
                          ? "bg-green-50 text-green-700"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {supplier.isActive
                        ? "Active"
                        : "Inactive"}
                    </span>

                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4">

                    <div className="flex items-center justify-end gap-2">

                      {/* View */}
                      <button
                        type="button"
                        onClick={() =>
                          onView(supplier)
                        }
                        className="p-2 rounded-lg hover:bg-gray-100 transition"
                        title="View Supplier"
                      >
                        <Eye size={17} />
                      </button>

                      {/* Edit */}
                      <button
                        type="button"
                        onClick={() =>
                          onEdit(supplier)
                        }
                        className="p-2 rounded-lg hover:bg-gray-100 transition"
                        title="Edit Supplier"
                      >
                        <Pencil size={17} />
                      </button>

                      {/* More */}
                      <button
                        type="button"
                        className="p-2 rounded-lg hover:bg-gray-100 transition"
                        title="More Actions"
                      >
                        <MoreHorizontal size={17} />
                      </button>

                    </div>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default SupplierTable;