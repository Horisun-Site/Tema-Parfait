import React from "react";
import { Eye } from "lucide-react";

const StockTable = ({
  stockItems = [],
  onView,
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
      {/* =========================
          TABLE HEADER
      ========================== */}

      <div className="px-6 py-5 border-b border-gray-200">
        <h2 className="font-semibold text-gray-900">
          Inventory Stock
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Current stock position for all products.
        </p>
      </div>

      {/* =========================
          TABLE
      ========================== */}

      <div className="overflow-x-auto">
        <table className="w-full min-w-[1200px]">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
                Product
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
                Category
              </th>

              <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase">
                Opening
              </th>

              <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase">
                Stock In
              </th>

              <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase">
                Stock Out
              </th>

              <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase">
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

              <th className="px-6 py-4 text-center text-xs font-semibold text-gray-500 uppercase">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {stockItems.length > 0 ? (
              stockItems.map((item) => {
                const isLow =
                  Number(item.currentStock || 0) <=
                  Number(item.reorderLevel || 0);

                return (
                  <tr
                    key={item.id}
                    className="hover:bg-gray-50 transition"
                  >
                    {/* Product */}

                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-900">
                          {item.product}
                        </p>

                        <p className="text-xs text-gray-500 mt-1">
                          {item.productCode}
                        </p>
                      </div>
                    </td>

                    {/* Category */}

                    <td className="px-6 py-4 text-sm text-gray-600">
                      {item.category}
                    </td>

                    {/* Opening */}

                    <td className="px-6 py-4 text-sm text-gray-700 text-right">
                      {Number(item.openingStock || 0).toLocaleString()}
                    </td>

                    {/* Stock In */}

                    <td className="px-6 py-4 text-sm text-gray-700 text-right">
                      {Number(item.stockIn || 0).toLocaleString()}
                    </td>

                    {/* Stock Out */}

                    <td className="px-6 py-4 text-sm text-gray-700 text-right">
                      {Number(item.stockOut || 0).toLocaleString()}
                    </td>

                    {/* Balance */}

                    <td className="px-6 py-4 text-sm font-semibold text-gray-900 text-right">
                      {Number(item.currentStock || 0).toLocaleString()}
                    </td>

                    {/* Cost */}

                    <td className="px-6 py-4 text-sm text-gray-700 text-right">
                      {formatCurrency(item.costPrice)}
                    </td>

                    {/* Stock Value */}

                    <td className="px-6 py-4 text-sm font-medium text-gray-900 text-right">
                      {formatCurrency(item.stockValue)}
                    </td>

                    {/* Status */}

                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                        {isLow ? "Low Stock" : "In Stock"}
                      </span>
                    </td>

                    {/* Action */}

                    <td className="px-6 py-4 text-center">
                      <button
                        type="button"
                        onClick={() => onView?.(item)}
                        className="inline-flex items-center justify-center p-2 rounded-lg hover:bg-gray-100 text-gray-600"
                        title="View Stock"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan="10"
                  className="px-6 py-12 text-center text-gray-500"
                >
                  No stock records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StockTable;