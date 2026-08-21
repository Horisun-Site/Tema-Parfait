import React from "react";
import {
  Eye,
  FileText,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

const ReportTable = ({
  reportType = "sales",
  data = [],
  onView,
}) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(amount || 0);
  };

  // =========================
  // EMPTY STATE
  // =========================

  if (!data.length) {
    return (
      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200">
          <h2 className="font-semibold text-gray-900">
            Report Details
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Detailed records for the selected report.
          </p>
        </div>

        <div className="px-6 py-14 text-center">
          <div className="mx-auto w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
            <FileText className="w-6 h-6 text-gray-500" />
          </div>

          <h3 className="font-medium text-gray-900 mt-4">
            No report records found
          </h3>

          <p className="text-sm text-gray-500 mt-1">
            There are no records available for the selected report.
          </p>
        </div>
      </div>
    );
  }

  // =========================
  // SALES TABLE
  // =========================

  if (reportType === "sales") {
    return (
      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200">
          <h2 className="font-semibold text-gray-900">
            Sales Report Details
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Detailed sales transactions.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
                  Invoice
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
                  Customer
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
                  Date
                </th>

                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase">
                  Amount
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
              {data.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4">
                    <p className="font-medium text-gray-900">
                      {item.invoiceNumber}
                    </p>
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-600">
                    {item.customer}
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-600">
                    {item.date}
                  </td>

                  <td className="px-6 py-4 text-sm font-semibold text-gray-900 text-right">
                    {formatCurrency(item.amount)}
                  </td>

                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                      {item.status}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-center">
                    <button
                      type="button"
                      onClick={() => onView?.(item)}
                      className="inline-flex items-center justify-center p-2 rounded-lg hover:bg-gray-100 text-gray-600"
                      title="View Report"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // =========================
  // INVENTORY TABLE
  // =========================

  if (reportType === "inventory") {
    return (
      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200">
          <h2 className="font-semibold text-gray-900">
            Inventory Report Details
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Stock movement and inventory position.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px]">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
                  Product
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
                  Code
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
                  Stock Value
                </th>

                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-500 uppercase">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {data.map((item) => {
                const isLow =
                  Number(item.balance || 0) <=
                  Number(item.reorderLevel || 0);

                return (
                  <tr
                    key={item.id}
                    className="hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-900">
                        {item.product}
                      </p>
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-600">
                      {item.productCode}
                    </td>

                    <td className="px-6 py-4 text-right">
                      <span className="inline-flex items-center gap-1 text-sm text-gray-700">
                        <TrendingUp className="w-4 h-4" />
                        {Number(item.stockIn || 0).toLocaleString()}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-right">
                      <span className="inline-flex items-center gap-1 text-sm text-gray-700">
                        <TrendingDown className="w-4 h-4" />
                        {Number(item.stockOut || 0).toLocaleString()}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-sm font-semibold text-gray-900 text-right">
                      {Number(item.balance || 0).toLocaleString()}
                    </td>

                    <td className="px-6 py-4 text-sm font-semibold text-gray-900 text-right">
                      {formatCurrency(item.stockValue)}
                    </td>

                    <td className="px-6 py-4 text-center">
                      <button
                        type="button"
                        onClick={() => onView?.(item)}
                        className="inline-flex items-center justify-center p-2 rounded-lg hover:bg-gray-100 text-gray-600"
                        title="View Report"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // =========================
  // EXPENSE TABLE
  // =========================

  if (reportType === "expenses") {
    return (
      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200">
          <h2 className="font-semibold text-gray-900">
            Expense Report Details
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Detailed business expense records.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[950px]">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
                  Reference
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
                  Category
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
                  Description
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
                  Date
                </th>

                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase">
                  Amount
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
              {data.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {item.reference}
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-600">
                    {item.category}
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-600">
                    {item.description}
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-600">
                    {item.date}
                  </td>

                  <td className="px-6 py-4 text-sm font-semibold text-gray-900 text-right">
                    {formatCurrency(item.amount)}
                  </td>

                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                      {item.status}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-center">
                    <button
                      type="button"
                      onClick={() => onView?.(item)}
                      className="inline-flex items-center justify-center p-2 rounded-lg hover:bg-gray-100 text-gray-600"
                      title="View Report"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // =========================
  // CUSTOMER TABLE
  // =========================

  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
      <div className="px-6 py-5 border-b border-gray-200">
        <h2 className="font-semibold text-gray-900">
          Customer Report Details
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Customer account and payment information.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px]">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
                Customer
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
                Phone
              </th>

              <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase">
                Purchases
              </th>

              <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase">
                Payments
              </th>

              <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase">
                Balance
              </th>

              <th className="px-6 py-4 text-center text-xs font-semibold text-gray-500 uppercase">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {data.map((item) => (
              <tr
                key={item.id}
                className="hover:bg-gray-50 transition"
              >
                <td className="px-6 py-4 font-medium text-gray-900">
                  {item.customer}
                </td>

                <td className="px-6 py-4 text-sm text-gray-600">
                  {item.phone}
                </td>

                <td className="px-6 py-4 text-sm text-gray-700 text-right">
                  {formatCurrency(item.purchases)}
                </td>

                <td className="px-6 py-4 text-sm text-gray-700 text-right">
                  {formatCurrency(item.payments)}
                </td>

                <td className="px-6 py-4 text-sm font-semibold text-gray-900 text-right">
                  {formatCurrency(item.balance)}
                </td>

                <td className="px-6 py-4 text-center">
                  <button
                    type="button"
                    onClick={() => onView?.(item)}
                    className="inline-flex items-center justify-center p-2 rounded-lg hover:bg-gray-100 text-gray-600"
                    title="View Report"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportTable;