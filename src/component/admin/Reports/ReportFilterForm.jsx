import React from "react";
import {
  SlidersHorizontal,
  RotateCcw,
} from "lucide-react";

const ReportFilterForm = ({
  reportType = "sales",
  period = "this-month",
  startDate = "",
  endDate = "",
  onReportTypeChange,
  onPeriodChange,
  onStartDateChange,
  onEndDateChange,
  onReset,
}) => {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5">
      <div className="flex flex-col gap-5">

        {/* =========================
            HEADER
        ========================== */}

        <div className="flex items-center gap-3">
          <div className="p-3 bg-gray-100 rounded-xl">
            <SlidersHorizontal className="w-5 h-5 text-gray-700" />
          </div>

          <div>
            <h2 className="font-semibold text-gray-900">
              Report Filters
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Select the type and period of report you want to view.
            </p>
          </div>
        </div>

        {/* =========================
            FILTERS
        ========================== */}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">

          {/* REPORT TYPE */}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Report Type
            </label>

            <select
              value={reportType}
              onChange={(e) =>
                onReportTypeChange?.(e.target.value)
              }
              className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white outline-none focus:ring-2 focus:ring-gray-200"
            >
              <option value="sales">
                Sales Report
              </option>

              <option value="inventory">
                Inventory Report
              </option>

              <option value="expenses">
                Expense Report
              </option>

              <option value="customers">
                Customer Report
              </option>
            </select>
          </div>

          {/* PERIOD */}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Period
            </label>

            <select
              value={period}
              onChange={(e) =>
                onPeriodChange?.(e.target.value)
              }
              className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white outline-none focus:ring-2 focus:ring-gray-200"
            >
              <option value="today">
                Today
              </option>

              <option value="this-week">
                This Week
              </option>

              <option value="this-month">
                This Month
              </option>

              <option value="this-quarter">
                This Quarter
              </option>

              <option value="this-year">
                This Year
              </option>

              <option value="all-time">
                All Time
              </option>

              <option value="custom">
                Custom Date Range
              </option>
            </select>
          </div>

          {/* START DATE */}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Start Date
            </label>

            <input
              type="date"
              value={startDate}
              onChange={(e) =>
                onStartDateChange?.(e.target.value)
              }
              disabled={period !== "custom"}
              className={`w-full px-4 py-3 border border-gray-200 rounded-xl outline-none ${
                period !== "custom"
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white focus:ring-2 focus:ring-gray-200"
              }`}
            />
          </div>

          {/* END DATE */}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              End Date
            </label>

            <input
              type="date"
              value={endDate}
              onChange={(e) =>
                onEndDateChange?.(e.target.value)
              }
              disabled={period !== "custom"}
              className={`w-full px-4 py-3 border border-gray-200 rounded-xl outline-none ${
                period !== "custom"
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white focus:ring-2 focus:ring-gray-200"
              }`}
            />
          </div>
        </div>

        {/* =========================
            RESET
        ========================== */}

        <div className="flex justify-end pt-2 border-t border-gray-100">
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 transition"
          >
            <RotateCcw className="w-4 h-4" />

            Reset Filters
          </button>
        </div>

      </div>
    </div>
  );
};

export default ReportFilterForm;