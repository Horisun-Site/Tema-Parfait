import React from "react";
import {
  Eye,
  Pencil,
  Receipt,
  MoreHorizontal,
} from "lucide-react";

const InvoiceTable = ({
  invoices = [],
  onView,
  onEdit,
  formatCurrency,
}) => {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">

      {/* =========================
          TABLE HEADER
      ========================== */}

      <div className="px-6 py-5 border-b border-gray-200">
        <div className="flex items-center justify-between">

          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Invoice Records
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              View and manage all sales invoices.
            </p>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Receipt size={17} />

            <span>
              {invoices.length} invoice
              {invoices.length !== 1 ? "s" : ""}
            </span>
          </div>

        </div>
      </div>

      {/* =========================
          EMPTY STATE
      ========================== */}

      {invoices.length === 0 ? (
        <div className="py-16 px-6 text-center">

          <div className="w-14 h-14 mx-auto bg-gray-100 rounded-2xl flex items-center justify-center">
            <Receipt
              size={25}
              className="text-gray-500"
            />
          </div>

          <h3 className="mt-4 text-base font-semibold text-gray-900">
            No invoices found
          </h3>

          <p className="mt-1 text-sm text-gray-500 max-w-sm mx-auto">
            There are no invoices matching your current search or filter.
          </p>

        </div>
      ) : (

        /* =========================
           TABLE
        ========================== */

        <div className="overflow-x-auto">

          <table className="w-full min-w-[1200px]">

            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">

                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Invoice
                </th>

                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Date & Time
                </th>

                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Customer
                </th>

                <th className="text-right px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Subtotal
                </th>

                <th className="text-right px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Discount
                </th>

                <th className="text-right px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  VAT
                </th>

                <th className="text-right px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Total
                </th>

                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Payment
                </th>

                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Delivery
                </th>

                <th className="text-right px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Actions
                </th>

              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">

              {invoices.map((invoice) => (

                <tr
                  key={invoice.id}
                  className="hover:bg-gray-50 transition"
                >

                  {/* Invoice */}

                  <td className="px-6 py-4">

                    <div className="flex items-center gap-3">

                      <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center">
                        <Receipt
                          size={17}
                          className="text-gray-600"
                        />
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-gray-900">
                          {invoice.invoiceNumber}
                        </p>

                        <p className="text-xs text-gray-500 mt-0.5">
                          {invoice.customerId}
                        </p>
                      </div>

                    </div>

                  </td>

                  {/* Date & Time */}

                  <td className="px-6 py-4">

                    <p className="text-sm text-gray-900">
                      {invoice.date}
                    </p>

                    <p className="text-xs text-gray-500 mt-1">
                      {invoice.time}
                    </p>

                  </td>

                  {/* Customer */}

                  <td className="px-6 py-4">

                    <p className="text-sm font-medium text-gray-900">
                      {invoice.customer}
                    </p>

                  </td>

                  {/* Subtotal */}

                  <td className="px-6 py-4 text-right">

                    <span className="text-sm text-gray-700">
                      {formatCurrency(
                        invoice.subtotal
                      )}
                    </span>

                  </td>

                  {/* Discount */}

                  <td className="px-6 py-4 text-right">

                    <span className="text-sm text-gray-700">
                      {formatCurrency(
                        invoice.discount
                      )}
                    </span>

                  </td>

                  {/* VAT */}

                  <td className="px-6 py-4 text-right">

                    <span className="text-sm text-gray-700">
                      {formatCurrency(
                        invoice.vat
                      )}
                    </span>

                  </td>

                  {/* Total */}

                  <td className="px-6 py-4 text-right">

                    <span className="text-sm font-bold text-gray-900">
                      {formatCurrency(
                        invoice.total
                      )}
                    </span>

                  </td>

                  {/* Payment Status */}

                  <td className="px-6 py-4">

                    <StatusBadge
                      status={invoice.paymentStatus}
                      type="payment"
                    />

                  </td>

                  {/* Delivery Status */}

                  <td className="px-6 py-4">

                    <StatusBadge
                      status={invoice.deliveryStatus}
                      type="delivery"
                    />

                  </td>

                  {/* Actions */}

                  <td className="px-6 py-4">

                    <div className="flex items-center justify-end gap-2">

                      <button
                        type="button"
                        onClick={() =>
                          onView?.(invoice)
                        }
                        title="View Invoice"
                        className="p-2 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition"
                      >
                        <Eye size={17} />
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          onEdit?.(invoice)
                        }
                        title="Edit Invoice"
                        className="p-2 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition"
                      >
                        <Pencil size={17} />
                      </button>

                      <button
                        type="button"
                        title="More Options"
                        className="p-2 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition"
                      >
                        <MoreHorizontal size={17} />
                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>
      )}

    </div>
  );
};

/* ==========================================
   STATUS BADGE
========================================== */

const StatusBadge = ({ status, type }) => {

  const normalizedStatus =
    String(status || "").toLowerCase();

  let classes =
    "bg-gray-100 text-gray-600";

  if (
    normalizedStatus === "paid" ||
    normalizedStatus === "delivered" ||
    normalizedStatus === "completed"
  ) {
    classes =
      "bg-green-50 text-green-700";
  }

  if (
    normalizedStatus === "pending" ||
    normalizedStatus === "processing"
  ) {
    classes =
      "bg-yellow-50 text-yellow-700";
  }

  if (
    normalizedStatus === "cancelled" ||
    normalizedStatus === "failed"
  ) {
    classes =
      "bg-red-50 text-red-700";
  }

  if (
    type === "delivery" &&
    normalizedStatus === "pending"
  ) {
    classes =
      "bg-gray-100 text-gray-600";
  }

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${classes}`}
    >
      {status || "Unknown"}
    </span>
  );
};

export default InvoiceTable;