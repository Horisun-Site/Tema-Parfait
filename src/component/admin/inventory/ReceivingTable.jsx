import React from "react";
import {
  Eye,
  Pencil,
  MoreHorizontal,
  PackageCheck,
} from "lucide-react";

const ReceivingTable = ({
  receivings = [],
  onView,
  onEdit,
}) => {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">

      {/* Header */}
      <div className="px-6 py-5 border-b border-gray-200">
        <div>
          <h2 className="font-semibold text-gray-900">
            Goods Received
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            View and manage stock received from suppliers.
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">

        <table className="w-full min-w-[1200px]">

          <thead className="bg-gray-50 border-b border-gray-200">

            <tr>

              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                GRN
              </th>

              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                Supplier
              </th>

              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                Product
              </th>

              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                Batch
              </th>

              <th className="text-center px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                Quantity
              </th>

              <th className="text-right px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                Unit Cost
              </th>

              <th className="text-right px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                Total
              </th>

              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                Date
              </th>

              <th className="text-right px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                Actions
              </th>

            </tr>

          </thead>

          <tbody className="divide-y divide-gray-100">

            {receivings.length === 0 ? (

              <tr>

                <td
                  colSpan="9"
                  className="px-6 py-16 text-center"
                >

                  <div className="flex flex-col items-center">

                    <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                      <PackageCheck
                        size={22}
                        className="text-gray-400"
                      />
                    </div>

                    <p className="text-sm font-medium text-gray-600">
                      No stock received yet
                    </p>

                    <p className="text-xs text-gray-400 mt-1">
                      Create a GRN to record received stock.
                    </p>

                  </div>

                </td>

              </tr>

            ) : (

              receivings.map((receiving) => (

                <tr
                  key={receiving.grnNumber}
                  className="hover:bg-gray-50 transition"
                >

                  {/* GRN */}
                  <td className="px-6 py-4">

                    <p className="text-sm font-semibold text-gray-900">
                      {receiving.grnNumber}
                    </p>

                  </td>

                  {/* Supplier */}
                  <td className="px-6 py-4">

                    <p className="text-sm text-gray-700">
                      {receiving.supplier || "—"}
                    </p>

                  </td>

                  {/* Product */}
                  <td className="px-6 py-4">

                    <p className="text-sm font-medium text-gray-800">
                      {receiving.product || "—"}
                    </p>

                  </td>

                  {/* Batch */}
                  <td className="px-6 py-4">

                    <span className="inline-flex px-2.5 py-1 rounded-md bg-gray-100 text-xs font-medium text-gray-600">
                      {receiving.batchNumber || "—"}
                    </span>

                  </td>

                  {/* Quantity */}
                  <td className="px-6 py-4 text-center">

                    <span className="text-sm font-semibold text-gray-900">
                      {Number(
                        receiving.quantity || 0
                      ).toLocaleString()}
                    </span>

                  </td>

                  {/* Unit Cost */}
                  <td className="px-6 py-4 text-right">

                    <span className="text-sm text-gray-700">
                      ₦
                      {Number(
                        receiving.cost || 0
                      ).toLocaleString()}
                    </span>

                  </td>

                  {/* Total */}
                  <td className="px-6 py-4 text-right">

                    <span className="text-sm font-semibold text-gray-900">
                      ₦
                      {Number(
                        receiving.total || 0
                      ).toLocaleString()}
                    </span>

                  </td>

                  {/* Date */}
                  <td className="px-6 py-4">

                    <span className="text-sm text-gray-600">
                      {receiving.receivingDate || "—"}
                    </span>

                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4">

                    <div className="flex items-center justify-end gap-2">

                      {/* View */}
                      <button
                        type="button"
                        onClick={() =>
                          onView?.(receiving)
                        }
                        className="p-2 rounded-lg hover:bg-gray-100 transition"
                        title="View GRN"
                      >
                        <Eye size={17} />
                      </button>

                      {/* Edit */}
                      <button
                        type="button"
                        onClick={() =>
                          onEdit?.(receiving)
                        }
                        className="p-2 rounded-lg hover:bg-gray-100 transition"
                        title="Edit GRN"
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

      {/* Footer */}
      {receivings.length > 0 && (
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">

          <p className="text-sm text-gray-500">
            Showing{" "}
            <span className="font-medium text-gray-700">
              {receivings.length}
            </span>{" "}
            {receivings.length === 1
              ? "GRN"
              : "GRNs"}
          </p>

          <p className="text-sm text-gray-500">
            Total value:{" "}
            <span className="font-semibold text-gray-900">
              ₦
              {receivings
                .reduce(
                  (sum, item) =>
                    sum + Number(item.total || 0),
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

export default ReceivingTable;