import React from "react";
import {
  Eye,
  Pencil,
  CreditCard,
  CheckCircle2,
  Clock,
  XCircle,
} from "lucide-react";

const PaymentTable = ({
  payments = [],
  onView,
  onEdit,
  formatCurrency,
}) => {
  // ==========================================
  // PAYMENT STATUS
  // ==========================================

  const getStatusStyle = (status) => {
    switch (status) {
      case "Paid":
        return {
          className:
            "bg-gray-100 text-gray-800 border-gray-200",
          icon: CheckCircle2,
        };

      case "Pending":
        return {
          className:
            "bg-gray-50 text-gray-600 border-gray-200",
          icon: Clock,
        };

      case "Failed":
        return {
          className:
            "bg-gray-100 text-gray-700 border-gray-300",
          icon: XCircle,
        };

      default:
        return {
          className:
            "bg-gray-50 text-gray-600 border-gray-200",
          icon: Clock,
        };
    }
  };

  // ==========================================
  // EMPTY STATE
  // ==========================================

  if (payments.length === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded-2xl p-10">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="p-4 bg-gray-100 rounded-2xl mb-4">
            <CreditCard
              size={28}
              className="text-gray-500"
            />
          </div>

          <h3 className="text-lg font-semibold text-gray-900">
            No payments found
          </h3>

          <p className="text-sm text-gray-500 mt-1">
            Payment records will appear here once they
            are created.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">

      {/* ========================================
          TABLE HEADER
      ========================================= */}

      <div className="px-5 py-4 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <CreditCard
            size={19}
            className="text-gray-600"
          />

          <h3 className="font-semibold text-gray-900">
            Payment Records
          </h3>
        </div>
      </div>

      {/* ========================================
          TABLE
      ========================================= */}

      <div className="overflow-x-auto">
        <table className="w-full min-w-[1100px]">

          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>

              <th className="px-5 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Payment
              </th>

              <th className="px-5 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Invoice
              </th>

              <th className="px-5 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Customer
              </th>

              <th className="px-5 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Method
              </th>

              <th className="px-5 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Amount
              </th>

              <th className="px-5 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Date
              </th>

              <th className="px-5 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Status
              </th>

              <th className="px-5 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Actions
              </th>

            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">

            {payments.map((payment) => {

              const statusStyle =
                getStatusStyle(payment.status);

              const StatusIcon =
                statusStyle.icon;

              return (
                <tr
                  key={payment.id}
                  className="hover:bg-gray-50 transition"
                >

                  {/* Payment Number */}

                  <td className="px-5 py-4">

                    <div className="flex items-center gap-3">

                      <div className="p-2.5 bg-gray-100 rounded-xl">
                        <CreditCard
                          size={17}
                          className="text-gray-600"
                        />
                      </div>

                      <div>
                        <p className="font-medium text-gray-900">
                          {payment.paymentNumber}
                        </p>

                        <p className="text-xs text-gray-500 mt-1">
                          {payment.reference ||
                            "No reference"}
                        </p>
                      </div>

                    </div>

                  </td>

                  {/* Invoice */}

                  <td className="px-5 py-4">

                    <p className="text-sm font-medium text-gray-900">
                      {payment.invoiceNumber ||
                        "-"}
                    </p>

                  </td>

                  {/* Customer */}

                  <td className="px-5 py-4">

                    <p className="text-sm font-medium text-gray-900">
                      {payment.customer ||
                        "-"}
                    </p>

                    {payment.customerId && (
                      <p className="text-xs text-gray-500 mt-1">
                        {payment.customerId}
                      </p>
                    )}

                  </td>

                  {/* Payment Method */}

                  <td className="px-5 py-4">

                    <span className="text-sm text-gray-700">
                      {payment.method || "-"}
                    </span>

                  </td>

                  {/* Amount */}

                  <td className="px-5 py-4">

                    <span className="text-sm font-semibold text-gray-900">
                      {formatCurrency
                        ? formatCurrency(
                            payment.amount
                          )
                        : `₦${Number(
                            payment.amount || 0
                          ).toLocaleString()}`}
                    </span>

                  </td>

                  {/* Date */}

                  <td className="px-5 py-4">

                    <div>
                      <p className="text-sm text-gray-900">
                        {payment.date || "-"}
                      </p>

                      {payment.time && (
                        <p className="text-xs text-gray-500 mt-1">
                          {payment.time}
                        </p>
                      )}
                    </div>

                  </td>

                  {/* Status */}

                  <td className="px-5 py-4">

                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium ${statusStyle.className}`}
                    >
                      <StatusIcon size={14} />

                      {payment.status || "Pending"}
                    </span>

                  </td>

                  {/* Actions */}

                  <td className="px-5 py-4">

                    <div className="flex items-center justify-end gap-2">

                      <button
                        type="button"
                        onClick={() =>
                          onView?.(payment)
                        }
                        className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-100 transition"
                        title="View payment"
                      >
                        <Eye size={16} />
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          onEdit?.(payment)
                        }
                        className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-100 transition"
                        title="Edit payment"
                      >
                        <Pencil size={16} />
                      </button>

                    </div>

                  </td>

                </tr>
              );
            })}

          </tbody>

        </table>
      </div>

      {/* ========================================
          TABLE FOOTER
      ========================================= */}

      <div className="px-5 py-4 border-t border-gray-200 bg-gray-50">

        <p className="text-sm text-gray-500">
          Showing{" "}
          <span className="font-medium text-gray-900">
            {payments.length}
          </span>{" "}
          payment
          {payments.length !== 1 ? "s" : ""}
        </p>

      </div>

    </div>
  );
};

export default PaymentTable;