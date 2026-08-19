import React from "react";
import {
  Eye,
  Pencil,
  MoreHorizontal,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Clock3,
} from "lucide-react";

const BatchExpiryTable = ({
  batches = [],
  onView,
  onEdit,
  formatCurrency,
  getDaysUntilExpiry,
  getExpiryStatus,
}) => {
  // ==========================================
  // FORMAT DATE
  // ==========================================

  const formatDate = (date) => {
    if (!date) return "—";

    return new Date(date).toLocaleDateString("en-NG", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // ==========================================
  // STATUS CONFIGURATION
  // ==========================================

  const getStatusConfig = (status) => {
    switch (status) {
      case "Expired":
        return {
          label: "Expired",
          className:
            "bg-red-50 text-red-700 border-red-200",
          icon: XCircle,
        };

      case "Expiring Soon":
        return {
          label: "Expiring Soon",
          className:
            "bg-orange-50 text-orange-700 border-orange-200",
          icon: AlertTriangle,
        };

      case "Expiring Within 30 Days":
        return {
          label: "Within 30 Days",
          className:
            "bg-yellow-50 text-yellow-700 border-yellow-200",
          icon: Clock3,
        };

      default:
        return {
          label: "Active",
          className:
            "bg-green-50 text-green-700 border-green-200",
          icon: CheckCircle2,
        };
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">

      {/* ======================================
          TABLE HEADER
      ======================================= */}

      <div className="px-6 py-5 border-b border-gray-200">

        <div>
          <h2 className="font-semibold text-gray-900">
            Batch & Expiry Records
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Monitor product batches and their expiry dates.
          </p>
        </div>

      </div>

      {/* ======================================
          TABLE
      ======================================= */}

      <div className="overflow-x-auto">

        <table className="w-full min-w-[1350px]">

          <thead className="bg-gray-50 border-b border-gray-200">

            <tr>

              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
                Batch
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
                Product
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
                Supplier
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
                Manufactured
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
                Expiry
              </th>

              <th className="px-6 py-4 text-center text-xs font-semibold text-gray-500 uppercase">
                Received
              </th>

              <th className="px-6 py-4 text-center text-xs font-semibold text-gray-500 uppercase">
                Remaining
              </th>

              <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase">
                Stock Value
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
                Status
              </th>

              <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase">
                Actions
              </th>

            </tr>

          </thead>

          <tbody className="divide-y divide-gray-100">

            {/* ==================================
                EMPTY STATE
            =================================== */}

            {batches.length === 0 ? (

              <tr>

                <td
                  colSpan="10"
                  className="px-6 py-16 text-center"
                >

                  <div className="flex flex-col items-center">

                    <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">

                      <Clock3
                        size={22}
                        className="text-gray-400"
                      />

                    </div>

                    <p className="text-sm font-medium text-gray-600">
                      No batch records found
                    </p>

                    <p className="text-xs text-gray-400 mt-1">
                      Add a batch or change your search/filter.
                    </p>

                  </div>

                </td>

              </tr>

            ) : (

              /* ==================================
                 BATCH ROWS
              =================================== */

              batches.map((batch) => {

                const status = getExpiryStatus
                  ? getExpiryStatus(batch.expiryDate)
                  : "Active";

                const daysRemaining =
                  getDaysUntilExpiry
                    ? getDaysUntilExpiry(
                        batch.expiryDate
                      )
                    : null;

                const statusConfig =
                  getStatusConfig(status);

                const StatusIcon =
                  statusConfig.icon;

                const stockValue =
                  Number(
                    batch.quantityRemaining || 0
                  ) *
                  Number(
                    batch.costPrice || 0
                  );

                return (
                  <tr
                    key={batch.id}
                    className="hover:bg-gray-50 transition"
                  >

                    {/* Batch */}

                    <td className="px-6 py-4">

                      <div>

                        <p className="text-sm font-semibold text-gray-900">
                          {batch.batchNumber || "—"}
                        </p>

                        <p className="text-xs text-gray-400 mt-1">
                          {batch.productCode || "—"}
                        </p>

                      </div>

                    </td>

                    {/* Product */}

                    <td className="px-6 py-4">

                      <p className="text-sm font-medium text-gray-800">
                        {batch.product || "—"}
                      </p>

                    </td>

                    {/* Supplier */}

                    <td className="px-6 py-4">

                      <p className="text-sm text-gray-600">
                        {batch.supplier || "—"}
                      </p>

                    </td>

                    {/* Manufacturing Date */}

                    <td className="px-6 py-4">

                      <span className="text-sm text-gray-600">
                        {formatDate(
                          batch.manufacturingDate
                        )}
                      </span>

                    </td>

                    {/* Expiry Date */}

                    <td className="px-6 py-4">

                      <div>

                        <p
                          className={`text-sm font-medium ${
                            daysRemaining !== null &&
                            daysRemaining < 0
                              ? "text-red-600"
                              : daysRemaining !== null &&
                                daysRemaining <= 7
                              ? "text-orange-600"
                              : "text-gray-700"
                          }`}
                        >
                          {formatDate(
                            batch.expiryDate
                          )}
                        </p>

                        {daysRemaining !== null && (
                          <p className="text-xs text-gray-400 mt-1">
                            {daysRemaining < 0
                              ? `${Math.abs(
                                  daysRemaining
                                )} day(s) overdue`
                              : daysRemaining === 0
                              ? "Expires today"
                              : `${daysRemaining} day(s) left`}
                          </p>
                        )}

                      </div>

                    </td>

                    {/* Received */}

                    <td className="px-6 py-4 text-center">

                      <span className="text-sm font-semibold text-gray-800">
                        {Number(
                          batch.quantityReceived || 0
                        ).toLocaleString()}
                      </span>

                    </td>

                    {/* Remaining */}

                    <td className="px-6 py-4 text-center">

                      <span className="text-sm font-semibold text-gray-900">
                        {Number(
                          batch.quantityRemaining || 0
                        ).toLocaleString()}
                      </span>

                    </td>

                    {/* Stock Value */}

                    <td className="px-6 py-4 text-right">

                      <span className="text-sm font-medium text-gray-800">
                        {formatCurrency
                          ? formatCurrency(
                              stockValue
                            )
                          : `₦${stockValue.toLocaleString()}`}
                      </span>

                    </td>

                    {/* Status */}

                    <td className="px-6 py-4">

                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-medium ${statusConfig.className}`}
                      >

                        <StatusIcon size={14} />

                        {statusConfig.label}

                      </span>

                    </td>

                    {/* Actions */}

                    <td className="px-6 py-4">

                      <div className="flex items-center justify-end gap-2">

                        <button
                          type="button"
                          onClick={() =>
                            onView?.(batch)
                          }
                          className="p-2 rounded-lg hover:bg-gray-100 transition"
                          title="View Batch"
                        >
                          <Eye size={17} />
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            onEdit?.(batch)
                          }
                          className="p-2 rounded-lg hover:bg-gray-100 transition"
                          title="Edit Batch"
                        >
                          <Pencil
                            size={17}
                          />
                        </button>

                        <button
                          type="button"
                          className="p-2 rounded-lg hover:bg-gray-100 transition"
                          title="More Actions"
                        >
                          <MoreHorizontal
                            size={17}
                          />
                        </button>

                      </div>

                    </td>

                  </tr>
                );
              })

            )}

          </tbody>

        </table>

      </div>

      {/* ======================================
          FOOTER
      ======================================= */}

      {batches.length > 0 && (

        <div className="px-6 py-4 border-t border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">

          <p className="text-sm text-gray-500">

            Showing{" "}

            <span className="font-medium text-gray-700">
              {batches.length}
            </span>{" "}

            {batches.length === 1
              ? "batch"
              : "batches"}

          </p>

          <p className="text-sm text-gray-500">

            Remaining units:{" "}

            <span className="font-semibold text-gray-900">

              {batches
                .reduce(
                  (total, batch) =>
                    total +
                    Number(
                      batch.quantityRemaining || 0
                    ),
                  0
                )
                .toLocaleString()}

            </span>

          </p>

        </div>

      )}

    </div>
  );
};

export default BatchExpiryTable;