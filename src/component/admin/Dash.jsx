import React from "react";
import {
  TrendingUp,
  TrendingDown,
  Package,
  Users,
  Wallet,
  AlertTriangle,
  ShoppingCart,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

const Dash = () => {
  const stats = [
    {
      title: "Total Revenue",
      value: "₦0.00",
      change: "0%",
      description: "vs previous period",
      icon: Wallet,
      positive: true,
    },
    {
      title: "Gross Profit",
      value: "₦0.00",
      change: "0%",
      description: "vs previous period",
      icon: TrendingUp,
      positive: true,
    },
    {
      title: "Total Sales",
      value: "0",
      change: "0%",
      description: "vs previous period",
      icon: ShoppingCart,
      positive: true,
    },
    {
      title: "Outstanding Payments",
      value: "₦0.00",
      change: "0%",
      description: "customer balances",
      icon: Wallet,
      positive: false,
    },
  ];

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Dashboard
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Welcome to the Tema Foods Management System.
          </p>
        </div>

        <button className="px-4 py-2.5 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition">
          Generate Report
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="bg-white border border-gray-200 rounded-2xl p-5"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-500">
                    {stat.title}
                  </p>

                  <h2 className="text-2xl font-bold text-gray-900 mt-2">
                    {stat.value}
                  </h2>
                </div>

                <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
                  <Icon size={20} />
                </div>
              </div>

              <div className="flex items-center gap-2 mt-4">
                {stat.positive ? (
                  <ArrowUpRight size={16} />
                ) : (
                  <ArrowDownRight size={16} />
                )}

                <span className="text-sm font-medium">
                  {stat.change}
                </span>

                <span className="text-xs text-gray-400">
                  {stat.description}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Sales & Top Products */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* Sales Chart Placeholder */}
        <div className="xl:col-span-2 bg-white border border-gray-200 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-semibold text-gray-900">
                Sales Overview
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Sales performance over time
              </p>
            </div>

            <select className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none">
              <option>Weekly</option>
              <option>Monthly</option>
              <option>Yearly</option>
            </select>
          </div>

          <div className="h-72 flex items-center justify-center border border-dashed border-gray-200 rounded-xl">
            <p className="text-sm text-gray-400">
              Sales chart will appear here
            </p>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6">
          <h2 className="font-semibold text-gray-900">
            Top-Selling Products
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Best performing products
          </p>

          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-center h-48 border border-dashed border-gray-200 rounded-xl">
              <p className="text-sm text-gray-400">
                No sales data yet
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Low Stock */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
              <Package size={20} />
            </div>

            <div>
              <h2 className="font-semibold">
                Low Stock
              </h2>

              <p className="text-sm text-gray-500">
                Products requiring attention
              </p>
            </div>
          </div>

          <div className="mt-6 text-center py-8">
            <p className="text-2xl font-bold">0</p>

            <p className="text-sm text-gray-500 mt-1">
              Low-stock products
            </p>
          </div>
        </div>

        {/* Expiry */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
              <AlertTriangle size={20} />
            </div>

            <div>
              <h2 className="font-semibold">
                Expiry Alerts
              </h2>

              <p className="text-sm text-gray-500">
                Products approaching expiry
              </p>
            </div>
          </div>

          <div className="mt-6 text-center py-8">
            <p className="text-2xl font-bold">0</p>

            <p className="text-sm text-gray-500 mt-1">
              Expiring products
            </p>
          </div>
        </div>

        {/* Customers */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
              <Users size={20} />
            </div>

            <div>
              <h2 className="font-semibold">
                Customers
              </h2>

              <p className="text-sm text-gray-500">
                Registered customers
              </p>
            </div>
          </div>

          <div className="mt-6 text-center py-8">
            <p className="text-2xl font-bold">0</p>

            <p className="text-sm text-gray-500 mt-1">
              Total customers
            </p>
          </div>
        </div>

      </div>

    </div>
  );
};

export default Dash;