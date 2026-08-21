import React from "react";
import {
  ArrowDownLeft,
  ArrowUpRight,
  FileText,
  CreditCard,
  RotateCcw,
} from "lucide-react";

const CustomerStatementTable = ({
  transactions = [],
  customer = null,
}) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(Number(amount || 0));
  };

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-NG", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getTransactionIcon = (type) => {
    switch (type) {
      case "invoice":
        return <FileText className="w-4 h-4" />;

      case "payment":
        return <CreditCard className="w-4 h-4" />;

      case "return":
        return <RotateCcw className="w-4 h-4" />;

      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const getTransactionLabel = (type) => {
    switch (type) {
      case "invoice":
        return "Invoice";

      case "payment":
        return "Payment";

      case "return":
        return "Sales Return";

      default:
        return "Transaction";
    }
  };

  const totalDebit = transactions.reduce(
    (total, transaction) =>
      total + Number(transaction.debit || 0),
    0
  );

  const totalCredit = transactions.reduce(
    (total, transaction) =>
      total + Number(transaction.credit || 0),
    0
  );

  const openingBalance = Number(
    transactions[0]?.openingBalance || 0
  );

  const closingBalance =
    openingBalance + totalDebit - totalCredit;

  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
      {/* =========================
          CUSTOMER HEADER
      ========================== */}

      <div className="px-6 py-5 border-b border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="font-semibold text-gray-900">
              Customer Statement
            </h2>

            {customer && (
              <div className="mt-2">
                <p className="text-sm font-medium text-gray-900">
                  {customer.name}
                </p>

                <p className="text-xs text-gray-500 mt-1">
                  {customer.customerCode}
                </p>
              </div>
            )}
          </div>

          <div className="text-left md:text-right">
            <p className="text-sm text-gray-500">
              Closing Balance
            </p>

            <p
              className={`text-xl font-bold mt-1 ${
                closingBalance > 0
                  ? "text-gray-900"
                  : "text-gray-600"
              }`}
            >
              {formatCurrency(closingBalance)}
            </p>
          </div>
        </div>
      </div>

      {/* =========================
          SUMMARY
      ========================== */}

      <div className="grid grid-cols-1 sm:grid-cols-3 border-b border-gray-200">
        {/* Opening */}

        <div className="p-5 border-b sm:border-b-0 sm:border-r border-gray-200">
          <p className="text-xs font-medium text-gray-500 uppercase">
            Opening Balance
          </p>

          <p className="text-lg font-bold text-gray-900 mt-2">
            {formatCurrency(openingBalance)}
          </p>
        </div>

        {/* Debit */}

        <div className="p-5 border-b sm:border-b-0 sm:border-r border-gray-200">
          <p className="text-xs font-medium text-gray-500 uppercase">
            Total Debit
          </p>

          <p className="text-lg font-bold text-gray-900 mt-2">
            {formatCurrency(totalDebit)}
          </p>
        </div>

        {/* Credit */}

        <div className="p-5">
          <p className="text-xs font-medium text-gray-500 uppercase">
            Total Credit
          </p>

          <p className="text-lg font-bold text-gray-900 mt-2">
            {formatCurrency(totalCredit)}
          </p>
        </div>
      </div>

      {/* =========================
          TABLE
      ========================== */}

      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px]">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
                Date
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
                Reference
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
                Description
              </th>

              <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase">
                Debit
              </th>

              <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase">
                Credit
              </th>

              <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase">
                Balance
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {transactions.length > 0 ? (
              transactions.map((transaction, index) => (
                <tr
                  key={transaction.id || index}
                  className="hover:bg-gray-50 transition"
                >
                  {/* Date */}

                  <td className="px-6 py-4 text-sm text-gray-700">
                    {formatDate(transaction.date)}
                  </td>

                  {/* Reference */}

                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-gray-900">
                      {transaction.reference || "-"}
                    </span>
                  </td>

                  {/* Description */}

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gray-100 rounded-lg text-gray-600">
                        {getTransactionIcon(transaction.type)}
                      </div>

                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {getTransactionLabel(transaction.type)}
                        </p>

                        <p className="text-xs text-gray-500 mt-1">
                          {transaction.description || "-"}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Debit */}

                  <td className="px-6 py-4 text-right">
                    {transaction.debit ? (
                      <div className="inline-flex items-center gap-1 text-sm font-medium text-gray-900">
                        <ArrowUpRight className="w-3.5 h-3.5" />
                        {formatCurrency(transaction.debit)}
                      </div>
                    ) : (
                      <span className="text-sm text-gray-400">
                        -
                      </span>
                    )}
                  </td>

                  {/* Credit */}

                  <td className="px-6 py-4 text-right">
                    {transaction.credit ? (
                      <div className="inline-flex items-center gap-1 text-sm font-medium text-gray-700">
                        <ArrowDownLeft className="w-3.5 h-3.5" />
                        {formatCurrency(transaction.credit)}
                      </div>
                    ) : (
                      <span className="text-sm text-gray-400">
                        -
                      </span>
                    )}
                  </td>

                  {/* Balance */}

                  <td className="px-6 py-4 text-right">
                    <span className="text-sm font-semibold text-gray-900">
                      {formatCurrency(transaction.balance)}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="px-6 py-12 text-center"
                >
                  <div className="flex flex-col items-center">
                    <FileText className="w-8 h-8 text-gray-300" />

                    <p className="text-sm text-gray-500 mt-3">
                      No transactions found for this statement.
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>

          {/* =========================
              TOTALS
          ========================== */}

          {transactions.length > 0 && (
            <tfoot className="bg-gray-50 border-t border-gray-200">
              <tr>
                <td
                  colSpan="3"
                  className="px-6 py-4 text-right text-sm font-semibold text-gray-900"
                >
                  Totals
                </td>

                <td className="px-6 py-4 text-right text-sm font-bold text-gray-900">
                  {formatCurrency(totalDebit)}
                </td>

                <td className="px-6 py-4 text-right text-sm font-bold text-gray-900">
                  {formatCurrency(totalCredit)}
                </td>

                <td className="px-6 py-4 text-right text-sm font-bold text-gray-900">
                  {formatCurrency(closingBalance)}
                </td>
              </tr>
            </tfoot>
          )}
        </table>
      </div>
    </div>
  );
};

export default CustomerStatementTable;