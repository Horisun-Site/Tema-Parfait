import React from "react";
import {
  Eye,
  Pencil,
  MoreHorizontal,
} from "lucide-react";

const CustomerTable = ({
  customers,
  onView,
  onEdit,
}) => {

  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">

      <div className="overflow-x-auto">

        <table className="w-full min-w-[1000px]">

          <thead className="bg-gray-50 border-b border-gray-200">

            <tr>

              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                Customer
              </th>

              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                Branch
              </th>

              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                Contact
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
                Action
              </th>

            </tr>

          </thead>

          <tbody className="divide-y divide-gray-100">

            {customers.length === 0 ? (

              <tr>

                <td
                  colSpan="7"
                  className="px-6 py-16 text-center"
                >

                  <p className="text-gray-500 text-sm">
                    No customers found.
                  </p>

                  <p className="text-gray-400 text-xs mt-1">
                    Add your first customer to get started.
                  </p>

                </td>

              </tr>

            ) : (

              customers.map((customer) => (

                <tr
                  key={customer.customerId}
                  className="hover:bg-gray-50 transition"
                >

                  <td className="px-6 py-4">

                    <div>

                      <p className="font-medium text-gray-900">
                        {customer.supermarketName}
                      </p>

                      <p className="text-xs text-gray-500 mt-1">
                        {customer.customerId}
                      </p>

                    </div>

                  </td>

                  <td className="px-6 py-4 text-sm text-gray-600">
                    {customer.branch || "—"}
                  </td>

                  <td className="px-6 py-4">

                    <p className="text-sm text-gray-700">
                      {customer.contactPerson || "—"}
                    </p>

                    <p className="text-xs text-gray-500 mt-1">
                      {customer.telephone || "—"}
                    </p>

                  </td>

                  <td className="px-6 py-4 text-sm text-gray-600">
                    {customer.paymentTerms || "—"}
                  </td>

                  <td className="px-6 py-4 text-right">

                    <span
                      className={`text-sm font-semibold ${
                        Number(customer.balance) > 0
                          ? "text-red-600"
                          : "text-gray-900"
                      }`}
                    >
                      ₦{Number(customer.balance || 0).toLocaleString()}
                    </span>

                  </td>

                  <td className="px-6 py-4 text-center">

                    <span
                      className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
                        customer.isActive
                          ? "bg-green-50 text-green-700"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {customer.isActive
                        ? "Active"
                        : "Inactive"}
                    </span>

                  </td>

                  <td className="px-6 py-4">

                    <div className="flex items-center justify-end gap-2">

                      <button
                        onClick={() => onView(customer)}
                        className="p-2 rounded-lg hover:bg-gray-100"
                        title="View"
                      >
                        <Eye size={17} />
                      </button>

                      <button
                        onClick={() => onEdit(customer)}
                        className="p-2 rounded-lg hover:bg-gray-100"
                        title="Edit"
                      >
                        <Pencil size={17} />
                      </button>

                      <button
                        className="p-2 rounded-lg hover:bg-gray-100"
                        title="More"
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

export default CustomerTable;