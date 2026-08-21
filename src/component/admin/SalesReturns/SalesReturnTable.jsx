import React from "react";
import {
  Eye,
  Pencil,
  RotateCcw,
  FileText,
} from "lucide-react";

const SalesReturnTable = ({
  returns = [],
  onView,
  onEdit,
  formatCurrency,
}) => {

  const getStatusClass = (status) => {
    switch (status) {
      case "Approved":
        return "bg-gray-900 text-white";

      case "Rejected":
        return "bg-gray-200 text-gray-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getRefundClass = (status) => {
    switch (status) {
      case "Completed":
        return "bg-gray-900 text-white";

      case "Pending":
        return "bg-gray-100 text-gray-700";

      default:
        return "bg-gray-200 text-gray-700";
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">

      {/* ======================================
          HEADER
      ======================================= */}

      <div className="px-5 py-4 border-b border-gray-200 flex items-center gap-3">

        <div className="p-2.5 bg-gray-100 rounded-xl">
          <RotateCcw
            size={18}
            className="text-gray-700"
          />
        </div>

        <div>
          <h2 className="font-semibold text-gray-900">
            Sales Return Records
          </h2>

          <p className="text-sm text-gray-500">
            {returns.length} return
            {returns.length !== 1 ? "s" : ""} found
          </p>
        </div>

      </div>

      {/* ======================================
          DESKTOP TABLE
      ======================================= */}

      <div className="hidden lg:block overflow-x-auto">

        <table className="w-full">

          <thead className="bg-gray-50 border-b border-gray-200">

            <tr>

              <th className="text-left px-5 py-4 text-xs font-semibold text-gray-500 uppercase">
                Return
              </th>

              <th className="text-left px-5 py-4 text-xs font-semibold text-gray-500 uppercase">
                Invoice
              </th>

              <th className="text-left px-5 py-4 text-xs font-semibold text-gray-500 uppercase">
                Customer
              </th>

              <th className="text-left px-5 py-4 text-xs font-semibold text-gray-500 uppercase">
                Date
              </th>

              <th className="text-left px-5 py-4 text-xs font-semibold text-gray-500 uppercase">
                Amount
              </th>

              <th className="text-left px-5 py-4 text-xs font-semibold text-gray-500 uppercase">
                Status
              </th>

              <th className="text-left px-5 py-4 text-xs font-semibold text-gray-500 uppercase">
                Refund
              </th>

              <th className="text-right px-5 py-4 text-xs font-semibold text-gray-500 uppercase">
                Actions
              </th>

            </tr>

          </thead>

          <tbody className="divide-y divide-gray-100">

            {returns.length === 0 ? (
              <tr>

                <td
                  colSpan="8"
                  className="px-5 py-12 text-center"
                >

                  <RotateCcw
                    size={35}
                    className="mx-auto text-gray-300"
                  />

                  <p className="mt-3 text-gray-500">
                    No sales returns found.
                  </p>

                </td>

              </tr>
            ) : (
              returns.map((item) => (

                <tr
                  key={item.id}
                  className="hover:bg-gray-50 transition"
                >

                  {/* RETURN */}

                  <td className="px-5 py-4">

                    <div className="font-semibold text-gray-900">
                      {item.returnNumber}
                    </div>

                    <div className="text-xs text-gray-500 mt-1">
                      {item.items?.length || 0} product line
                      {item.items?.length !== 1 ? "s" : ""}
                    </div>

                  </td>

                  {/* INVOICE */}

                  <td className="px-5 py-4">

                    <div className="flex items-center gap-2">

                      <FileText
                        size={15}
                        className="text-gray-400"
                      />

                      <span className="text-sm text-gray-700">
                        {item.invoiceNumber}
                      </span>

                    </div>

                  </td>

                  {/* CUSTOMER */}

                  <td className="px-5 py-4">

                    <div className="font-medium text-gray-900">
                      {item.customer}
                    </div>

                    <div className="text-xs text-gray-500 mt-1">
                      {item.customerId}
                    </div>

                  </td>

                  {/* DATE */}

                  <td className="px-5 py-4 text-sm text-gray-600">
                    {item.date}
                  </td>

                  {/* AMOUNT */}

                  <td className="px-5 py-4">

                    <span className="font-semibold text-gray-900">
                      {formatCurrency(
                        item.totalAmount
                      )}
                    </span>

                  </td>

                  {/* STATUS */}

                  <td className="px-5 py-4">

                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getStatusClass(
                        item.status
                      )}`}
                    >
                      {item.status}
                    </span>

                  </td>

                  {/* REFUND */}

                  <td className="px-5 py-4">

                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getRefundClass(
                        item.refundStatus
                      )}`}
                    >
                      {item.refundStatus}
                    </span>

                  </td>

                  {/* ACTIONS */}

                  <td className="px-5 py-4">

                    <div className="flex justify-end gap-2">

                      <button
                        type="button"
                        onClick={() =>
                          onView?.(item)
                        }
                        className="p-2 rounded-lg hover:bg-gray-100 transition"
                        title="View"
                      >
                        <Eye
                          size={17}
                          className="text-gray-600"
                        />
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          onEdit?.(item)
                        }
                        className="p-2 rounded-lg hover:bg-gray-100 transition"
                        title="Edit"
                      >
                        <Pencil
                          size={17}
                          className="text-gray-600"
                        />
                      </button>

                    </div>

                  </td>

                </tr>

              ))
            )}

          </tbody>

        </table>

      </div>

      {/* ======================================
          MOBILE CARDS
      ======================================= */}

      <div className="lg:hidden divide-y divide-gray-100">

        {returns.length === 0 ? (
          <div className="px-5 py-12 text-center">

            <RotateCcw
              size={35}
              className="mx-auto text-gray-300"
            />

            <p className="mt-3 text-gray-500">
              No sales returns found.
            </p>

          </div>
        ) : (
          returns.map((item) => (

            <div
              key={item.id}
              className="p-5 space-y-4"
            >

              <div className="flex items-start justify-between gap-4">

                <div>

                  <h3 className="font-semibold text-gray-900">
                    {item.returnNumber}
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    {item.invoiceNumber}
                  </p>

                </div>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusClass(
                    item.status
                  )}`}
                >
                  {item.status}
                </span>

              </div>

              <div className="grid grid-cols-2 gap-4">

                <div>
                  <p className="text-xs text-gray-500">
                    Customer
                  </p>

                  <p className="text-sm font-medium text-gray-900 mt-1">
                    {item.customer}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">
                    Date
                  </p>

                  <p className="text-sm font-medium text-gray-900 mt-1">
                    {item.date}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">
                    Return Value
                  </p>

                  <p className="text-sm font-semibold text-gray-900 mt-1">
                    {formatCurrency(
                      item.totalAmount
                    )}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">
                    Refund
                  </p>

                  <span
                    className={`inline-flex mt-1 px-2.5 py-1 rounded-full text-xs font-medium ${getRefundClass(
                      item.refundStatus
                    )}`}
                  >
                    {item.refundStatus}
                  </span>
                </div>

              </div>

              <div className="flex justify-end gap-2 pt-2">

                <button
                  type="button"
                  onClick={() =>
                    onView?.(item)
                  }
                  className="inline-flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50"
                >
                  <Eye size={15} />
                  View
                </button>

                <button
                  type="button"
                  onClick={() =>
                    onEdit?.(item)
                  }
                  className="inline-flex items-center gap-2 px-3 py-2 bg-gray-900 text-white rounded-lg text-sm hover:bg-gray-800"
                >
                  <Pencil size={15} />
                  Edit
                </button>

              </div>

            </div>

          ))
        )}

      </div>

    </div>
  );
};

export default SalesReturnTable;