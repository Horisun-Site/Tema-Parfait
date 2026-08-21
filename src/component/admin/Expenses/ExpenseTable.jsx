import React from "react";
import {
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";

const ExpenseTable = ({
  expenses = [],
  onView,
  onEdit,
  onDelete,
}) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(amount || 0);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">

      {/* HEADER */}

      <div className="px-6 py-5 border-b border-gray-200">
        <h2 className="font-semibold text-gray-900">
          Expense Records
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          View and manage all recorded business expenses.
        </p>
      </div>

      {/* TABLE */}

      <div className="overflow-x-auto">
        <table className="w-full min-w-[1100px]">

          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>

              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
                Reference
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
                Date
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
                Category
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
                Description
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
                Payee
              </th>

              <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase">
                Amount
              </th>

              <th className="px-6 py-4 text-center text-xs font-semibold text-gray-500 uppercase">
                Payment
              </th>

              <th className="px-6 py-4 text-center text-xs font-semibold text-gray-500 uppercase">
                Status
              </th>

              <th className="px-6 py-4 text-center text-xs font-semibold text-gray-500 uppercase">
                Actions
              </th>

            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">

            {expenses.length > 0 ? (

              expenses.map((expense) => (

                <tr
                  key={expense.id}
                  className="hover:bg-gray-50 transition"
                >

                  {/* REFERENCE */}

                  <td className="px-6 py-4">
                    <p className="font-medium text-gray-900">
                      {expense.reference || "—"}
                    </p>
                  </td>

                  {/* DATE */}

                  <td className="px-6 py-4 text-sm text-gray-600">
                    {expense.date || "—"}
                  </td>

                  {/* CATEGORY */}

                  <td className="px-6 py-4 text-sm text-gray-600 capitalize">
                    {expense.category?.replaceAll("_", " ") || "—"}
                  </td>

                  {/* DESCRIPTION */}

                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-900 max-w-[220px] truncate">
                      {expense.description || "—"}
                    </p>
                  </td>

                  {/* PAYEE */}

                  <td className="px-6 py-4 text-sm text-gray-600">
                    {expense.payee || "—"}
                  </td>

                  {/* AMOUNT */}

                  <td className="px-6 py-4 text-sm font-semibold text-gray-900 text-right">
                    {formatCurrency(expense.amount)}
                  </td>

                  {/* PAYMENT */}

                  <td className="px-6 py-4 text-center">

                    <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 capitalize">
                      {expense.paymentMethod?.replaceAll("_", " ") || "—"}
                    </span>

                  </td>

                  {/* STATUS */}

                  <td className="px-6 py-4 text-center">

                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                        expense.status === "Approved"
                          ? "bg-gray-900 text-white"
                          : expense.status === "Rejected"
                          ? "bg-gray-200 text-gray-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {expense.status || "Pending"}
                    </span>

                  </td>

                  {/* ACTIONS */}

                  <td className="px-6 py-4">

                    <div className="flex items-center justify-center gap-1">

                      {/* VIEW */}

                      <button
                        type="button"
                        onClick={() => onView?.(expense)}
                        className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition"
                        title="View Expense"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      {/* EDIT */}

                      <button
                        type="button"
                        onClick={() => onEdit?.(expense)}
                        className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition"
                        title="Edit Expense"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>

                      {/* DELETE */}

                      <button
                        type="button"
                        onClick={() => onDelete?.(expense)}
                        className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition"
                        title="Delete Expense"
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
                  colSpan="9"
                  className="px-6 py-12 text-center text-gray-500"
                >
                  No expense records found.
                </td>

              </tr>

            )}

          </tbody>

        </table>
      </div>

    </div>
  );
};

export default ExpenseTable;