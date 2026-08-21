import React from "react";
import {
  Eye,
  Pencil,
  Package,
  MoreHorizontal,
} from "lucide-react";

const StockTable = ({
  stockItems = [],
  onView,
  onEdit,
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

      {/* Header */}
      <div className="px-6 py-5 border-b border-gray-200">
        <div>
          <h2 className="font-semibold text-gray-900">
            Inventory Stock
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Current stock position for all products.
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">

        <table className="w-full min-w-[1300px]">

          <thead className="bg-gray-50 border-b border-gray-200">

            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
                Product
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
                Category
              </th>

              <th className="px-6 py-4 text-center text-xs font-semibold text-gray-500 uppercase">
                Opening
              </th>

              <th className="px-6 py-4 text-center text-xs font-semibold text-gray-500 uppercase">
                Stock In
              </th>

              <th className="px-6 py-4 text-center text-xs font-semibold text-gray-500 uppercase">
                Stock Out
              </th>

              <th className="px-6 py-4 text-center text-xs font-semibold text-gray-500 uppercase">
                Balance
              </th>

              <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase">
                Cost Price
              </th>

              <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase">
                Stock Value
              </th>

              <th className="px-6 py-4 text-center text-xs font-semibold text-gray-500 uppercase">
                Status
              </th>

              <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase">
                Actions
              </th>
            </tr>

          </thead>

          <tbody className="divide-y divide-gray-100">

            {stockItems.length === 0 ? (

              <tr>
                <td
                  colSpan="10"
                  className="px-6 py-16 text-center"
                >
                  <div className="flex flex-col items-center">

                    <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                      <Package
                        size={22}
                        className="text-gray-400"
                      />
                    </div>

                    <p className="text-sm font-medium text-gray-600 mt-3">
                      No stock records found
                    </p>

                    <p className="text-xs text-gray-400 mt-1">
                      Try changing your search or stock filter.
                    </p>

                  </div>
                </td>
              </tr>

            ) : (

              stockItems.map((item) => (

                <tr
                  key={item.id}
                  className="hover:bg-gray-50 transition"
                >

                  {/* Product */}
                  <td className="px-6 py-4">

                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        {item.product}
                      </p>

                      <p className="text-xs text-gray-400 mt-1">
                        {item.productCode}
                      </p>
                    </div>

                  </td>

                  {/* Category */}
                  <td className="px-6 py-4">

                    <span className="text-sm text-gray-600">
                      {item.category || "—"}
                    </span>

                  </td>

                  {/* Opening */}
                  <td className="px-6 py-4 text-center">

                    <span className="text-sm text-gray-700">
                      {Number(
                        item.openingStock || 0
                      ).toLocaleString()}
                    </span>

                  </td>

                  {/* Stock In */}
                  <td className="px-6 py-4 text-center">

                    <span className="text-sm font-medium text-gray-700">
                      {Number(
                        item.stockIn || 0
                      ).toLocaleString()}
                    </span>

                  </td>

                  {/* Stock Out */}
                  <td className="px-6 py-4 text-center">

                    <span className="text-sm font-medium text-gray-700">
                      {Number(
                        item.stockOut || 0
                      ).toLocaleString()}
                    </span>

                  </td>

                  {/* Balance */}
                  <td className="px-6 py-4 text-center">

                    <span className="text-sm font-bold text-gray-900">
                      {Number(
                        item.currentStock || 0
                      ).toLocaleString()}
                    </span>

                  </td>

                  {/* Cost */}
                  <td className="px-6 py-4 text-right">

                    <span className="text-sm text-gray-700">
                      {formatCurrency(item.costPrice)}
                    </span>

                  </td>

                  {/* Stock Value */}
                  <td className="px-6 py-4 text-right">

                    <span className="text-sm font-semibold text-gray-900">
                      {formatCurrency(item.stockValue)}
                    </span>

                  </td>

                  {/* Status */}
                  <td className="px-6 py-4 text-center">

                    {item.currentStock <= item.reorderLevel ? (

                      <span className="inline-flex px-2.5 py-1 rounded-full bg-red-50 text-red-600 text-xs font-medium">
                        Low Stock
                      </span>

                    ) : (

                      <span className="inline-flex px-2.5 py-1 rounded-full bg-green-50 text-green-600 text-xs font-medium">
                        In Stock
                      </span>

                    )}

                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4">

                    <div className="flex items-center justify-end gap-1">

                      <button
                        type="button"
                        onClick={() => onView?.(item)}
                        className="p-2 rounded-lg hover:bg-gray-100 transition"
                        title="View Stock"
                      >
                        <Eye size={17} />
                      </button>

                      <button
                        type="button"
                        onClick={() => onEdit?.(item)}
                        className="p-2 rounded-lg hover:bg-gray-100 transition"
                        title="Adjust Stock"
                      >
                        <Pencil size={17} />
                      </button>

                      <button
                        type="button"
                        className="p-2 rounded-lg hover:bg-gray-100 transition"
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

      {/* Footer */}
      {stockItems.length > 0 && (
        <div className="px-6 py-4 border-t border-gray-200">

          <p className="text-sm text-gray-500">
            Showing{" "}
            <span className="font-semibold text-gray-700">
              {stockItems.length}
            </span>{" "}
            product{stockItems.length !== 1 ? "s" : ""}
          </p>

        </div>
      )}

    </div>
  );
};

export default StockTable;