import React, { useMemo, useState } from "react";
import {
  BarChart3,
  ShoppingCart,
  Package,
  Wallet,
  Users,
  TrendingUp,
  AlertCircle,
  CircleDollarSign,
  FileText,
} from "lucide-react";

const ReportsMaster = () => {
  const [reportType, setReportType] = useState("sales");
  const [period, setPeriod] = useState("this-month");

  // =========================
  // TEMPORARY REPORT DATA
  // =========================

  const reportData = {
    sales: {
      title: "Sales Report",
      description: "Overview of sales performance and revenue.",
      total: 2450000,
      transactions: 128,
      paid: 1980000,
      outstanding: 470000,
    },

    inventory: {
      title: "Inventory Report",
      description: "Overview of inventory movement and stock value.",
      total: 1240,
      transactions: 86,
      paid: 850000,
      outstanding: 120,
    },

    expenses: {
      title: "Expense Report",
      description: "Overview of business expenses.",
      total: 680000,
      transactions: 42,
      paid: 680000,
      outstanding: 0,
    },

    customers: {
      title: "Customer Report",
      description: "Overview of customers and outstanding balances.",
      total: 86,
      transactions: 74,
      paid: 1250000,
      outstanding: 320000,
    },
  };

  const currentReport = reportData[reportType];

  // =========================
  // CURRENCY
  // =========================

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(amount || 0);
  };

  // =========================
  // REPORT SUMMARY
  // =========================

  const summaryCards = useMemo(() => {
    if (reportType === "sales") {
      return [
        {
          title: "Total Sales",
          value: formatCurrency(currentReport.total),
          icon: ShoppingCart,
        },
        {
          title: "Transactions",
          value: currentReport.transactions.toLocaleString(),
          icon: FileText,
        },
        {
          title: "Paid Sales",
          value: formatCurrency(currentReport.paid),
          icon: CircleDollarSign,
        },
        {
          title: "Outstanding",
          value: formatCurrency(currentReport.outstanding),
          icon: AlertCircle,
        },
      ];
    }

    if (reportType === "inventory") {
      return [
        {
          title: "Stock Units",
          value: currentReport.total.toLocaleString(),
          icon: Package,
        },
        {
          title: "Stock Movements",
          value: currentReport.transactions.toLocaleString(),
          icon: TrendingUp,
        },
        {
          title: "Stock Value",
          value: formatCurrency(currentReport.paid),
          icon: CircleDollarSign,
        },
        {
          title: "Low Stock",
          value: currentReport.outstanding.toLocaleString(),
          icon: AlertCircle,
        },
      ];
    }

    if (reportType === "expenses") {
      return [
        {
          title: "Total Expenses",
          value: formatCurrency(currentReport.total),
          icon: Wallet,
        },
        {
          title: "Transactions",
          value: currentReport.transactions.toLocaleString(),
          icon: FileText,
        },
        {
          title: "Approved",
          value: formatCurrency(currentReport.paid),
          icon: CircleDollarSign,
        },
        {
          title: "Pending",
          value: formatCurrency(currentReport.outstanding),
          icon: AlertCircle,
        },
      ];
    }

    return [
      {
        title: "Total Customers",
        value: currentReport.total.toLocaleString(),
        icon: Users,
      },
      {
        title: "Active Accounts",
        value: currentReport.transactions.toLocaleString(),
        icon: FileText,
      },
      {
        title: "Customer Payments",
        value: formatCurrency(currentReport.paid),
        icon: CircleDollarSign,
      },
      {
        title: "Outstanding",
        value: formatCurrency(currentReport.outstanding),
        icon: AlertCircle,
      },
    ];
  }, [reportType, currentReport]);

  return (
    <div className="space-y-6">
      {/* =========================
          REPORT CONTROLS
      ========================== */}

      <div className="bg-white border border-gray-200 rounded-2xl p-5">
        <div className="flex flex-col lg:flex-row lg:items-end gap-4">
          {/* REPORT TYPE */}

          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Report Type
            </label>

            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white outline-none focus:ring-2 focus:ring-gray-200"
            >
              <option value="sales">Sales Report</option>
              <option value="inventory">Inventory Report</option>
              <option value="expenses">Expense Report</option>
              <option value="customers">Customer Report</option>
            </select>
          </div>

          {/* PERIOD */}

          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Reporting Period
            </label>

            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white outline-none focus:ring-2 focus:ring-gray-200"
            >
              <option value="today">Today</option>
              <option value="this-week">This Week</option>
              <option value="this-month">This Month</option>
              <option value="this-year">This Year</option>
              <option value="all-time">All Time</option>
            </select>
          </div>
        </div>
      </div>

      {/* =========================
          REPORT TITLE
      ========================== */}

      <div>
        <h2 className="text-xl font-bold text-gray-900">
          {currentReport.title}
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          {currentReport.description}
        </p>
      </div>

      {/* =========================
          SUMMARY CARDS
      ========================== */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {summaryCards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="bg-white border border-gray-200 rounded-2xl p-5"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">
                    {card.title}
                  </p>

                  <h3 className="text-2xl font-bold text-gray-900 mt-2">
                    {card.value}
                  </h3>
                </div>

                <div className="p-3 bg-gray-100 rounded-xl">
                  <Icon className="w-5 h-5 text-gray-700" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* =========================
          REPORT INFORMATION
      ========================== */}

      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gray-100 rounded-xl">
              <BarChart3 className="w-5 h-5 text-gray-700" />
            </div>

            <div>
              <h3 className="font-semibold text-gray-900">
                Report Overview
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                Reporting period:{" "}
                <span className="font-medium text-gray-700">
                  {period.replace("-", " ")}
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border border-gray-200 rounded-xl p-4">
              <p className="text-sm text-gray-500">
                Report Type
              </p>

              <p className="font-semibold text-gray-900 mt-1">
                {currentReport.title}
              </p>
            </div>

            <div className="border border-gray-200 rounded-xl p-4">
              <p className="text-sm text-gray-500">
                Reporting Period
              </p>

              <p className="font-semibold text-gray-900 mt-1 capitalize">
                {period.replace("-", " ")}
              </p>
            </div>

            <div className="border border-gray-200 rounded-xl p-4">
              <p className="text-sm text-gray-500">
                Report Status
              </p>

              <p className="font-semibold text-gray-900 mt-1">
                Ready
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsMaster;