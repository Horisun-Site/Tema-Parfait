import React from "react";
import {
  ShieldCheck,
  User,
  Eye,
  Clock,
  FileText,
} from "lucide-react";

const AuditLogTable = ({
  logs = [],
  onView,
}) => {
  // ==========================================
  // ACTION BADGE
  // ==========================================

  const getActionBadge = (action) => {
    const styles = {
      CREATE:
        "bg-gray-100 text-gray-700",
      UPDATE:
        "bg-gray-100 text-gray-700",
      DELETE:
        "bg-gray-100 text-gray-700",
      LOGIN:
        "bg-gray-100 text-gray-700",
      LOGOUT:
        "bg-gray-100 text-gray-700",
      VIEW:
        "bg-gray-100 text-gray-700",
      EXPORT:
        "bg-gray-100 text-gray-700",
      ADJUST:
        "bg-gray-100 text-gray-700",
    };

    return (
      styles[action?.toUpperCase()] ||
      "bg-gray-100 text-gray-600"
    );
  };

  // ==========================================
  // FORMAT DATE
  // ==========================================

  const formatDateTime = (date, time) => {
    if (!date) {
      return "—";
    }

    return `${date}${time ? ` • ${time}` : ""}`;
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">

      {/* ======================================
          HEADER
      ======================================= */}

      <div className="px-5 py-4 border-b border-gray-200">

        <h3 className="font-semibold text-gray-900">
          Audit Records
        </h3>

        <p className="text-sm text-gray-500 mt-1">
          Track activities and changes performed within the system.
        </p>

      </div>

      {/* ======================================
          DESKTOP TABLE
      ======================================= */}

      <div className="hidden lg:block overflow-x-auto">

        <table className="w-full">

          <thead>

            <tr className="border-b border-gray-200 bg-gray-50">

              <th className="text-left px-5 py-4 text-xs font-semibold text-gray-500 uppercase whitespace-nowrap">
                User
              </th>

              <th className="text-left px-5 py-4 text-xs font-semibold text-gray-500 uppercase whitespace-nowrap">
                Action
              </th>

              <th className="text-left px-5 py-4 text-xs font-semibold text-gray-500 uppercase whitespace-nowrap">
                Module
              </th>

              <th className="text-left px-5 py-4 text-xs font-semibold text-gray-500 uppercase whitespace-nowrap">
                Record
              </th>

              <th className="text-left px-5 py-4 text-xs font-semibold text-gray-500 uppercase">
                Description
              </th>

              <th className="text-left px-5 py-4 text-xs font-semibold text-gray-500 uppercase whitespace-nowrap">
                Date & Time
              </th>

              <th className="text-left px-5 py-4 text-xs font-semibold text-gray-500 uppercase whitespace-nowrap">
                IP Address
              </th>

              <th className="text-right px-5 py-4 text-xs font-semibold text-gray-500 uppercase">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {logs.length === 0 ? (

              <tr>

                <td
                  colSpan="8"
                  className="px-5 py-14 text-center"
                >

                  <ShieldCheck
                    size={42}
                    className="mx-auto text-gray-300"
                  />

                  <p className="mt-3 font-medium text-gray-700">
                    No audit records found.
                  </p>

                  <p className="text-sm text-gray-500 mt-1">
                    System activities will appear here.
                  </p>

                </td>

              </tr>

            ) : (

              logs.map((log) => (

                <tr
                  key={log.id}
                  className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition"
                >

                  {/* USER */}

                  <td className="px-5 py-4">

                    <div className="flex items-center gap-3">

                      <div className="p-2 bg-gray-100 rounded-lg">
                        <User
                          size={17}
                          className="text-gray-600"
                        />
                      </div>

                      <div>

                        <p className="font-medium text-gray-900">
                          {log.userName || "System"}
                        </p>

                        <p className="text-xs text-gray-500">
                          {log.userRole || "System User"}
                        </p>

                      </div>

                    </div>

                  </td>

                  {/* ACTION */}

                  <td className="px-5 py-4">

                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${getActionBadge(
                        log.action
                      )}`}
                    >
                      {log.action || "UNKNOWN"}
                    </span>

                  </td>

                  {/* MODULE */}

                  <td className="px-5 py-4">

                    <span className="text-sm font-medium text-gray-800">
                      {log.module || "—"}
                    </span>

                  </td>

                  {/* RECORD */}

                  <td className="px-5 py-4">

                    <div className="flex items-center gap-2">

                      <FileText
                        size={16}
                        className="text-gray-400"
                      />

                      <span className="text-sm text-gray-700">
                        {log.recordId || "—"}
                      </span>

                    </div>

                  </td>

                  {/* DESCRIPTION */}

                  <td className="px-5 py-4">

                    <p className="text-sm text-gray-600 max-w-xs">
                      {log.description ||
                        "No description provided."}
                    </p>

                  </td>

                  {/* DATE */}

                  <td className="px-5 py-4">

                    <div className="flex items-center gap-2">

                      <Clock
                        size={15}
                        className="text-gray-400"
                      />

                      <span className="text-sm text-gray-600 whitespace-nowrap">
                        {formatDateTime(
                          log.date,
                          log.time
                        )}
                      </span>

                    </div>

                  </td>

                  {/* IP */}

                  <td className="px-5 py-4">

                    <span className="text-sm text-gray-600 whitespace-nowrap">
                      {log.ipAddress || "—"}
                    </span>

                  </td>

                  {/* VIEW */}

                  <td className="px-5 py-4">

                    <div className="flex justify-end">

                      <button
                        type="button"
                        onClick={() =>
                          onView?.(log)
                        }
                        className="p-2 rounded-lg hover:bg-gray-100 transition"
                        title="View audit details"
                      >

                        <Eye
                          size={17}
                          className="text-gray-600"
                        />

                      </button>

                    </div>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

      {/* ======================================
          MOBILE / TABLET CARDS
      ======================================= */}

      <div className="lg:hidden divide-y divide-gray-100">

        {logs.length === 0 ? (

          <div className="px-5 py-14 text-center">

            <ShieldCheck
              size={42}
              className="mx-auto text-gray-300"
            />

            <p className="mt-3 font-medium text-gray-700">
              No audit records found.
            </p>

            <p className="text-sm text-gray-500 mt-1">
              System activities will appear here.
            </p>

          </div>

        ) : (

          logs.map((log) => (

            <div
              key={log.id}
              className="p-5"
            >

              {/* TOP */}

              <div className="flex items-start justify-between gap-4">

                <div className="flex items-center gap-3">

                  <div className="p-2.5 bg-gray-100 rounded-lg">

                    <User
                      size={18}
                      className="text-gray-600"
                    />

                  </div>

                  <div>

                    <h4 className="font-semibold text-gray-900">
                      {log.userName || "System"}
                    </h4>

                    <p className="text-xs text-gray-500">
                      {log.userRole || "System User"}
                    </p>

                  </div>

                </div>

                <span
                  className={`px-2.5 py-1 rounded-full text-xs font-semibold ${getActionBadge(
                    log.action
                  )}`}
                >
                  {log.action || "UNKNOWN"}
                </span>

              </div>

              {/* DESCRIPTION */}

              <p className="text-sm text-gray-600 mt-4">
                {log.description ||
                  "No description provided."}
              </p>

              {/* DETAILS */}

              <div className="grid grid-cols-2 gap-3 mt-4">

                {/* MODULE */}

                <div className="bg-gray-50 rounded-xl p-3">

                  <p className="text-xs text-gray-500">
                    Module
                  </p>

                  <p className="font-medium text-gray-900 mt-1">
                    {log.module || "—"}
                  </p>

                </div>

                {/* RECORD */}

                <div className="bg-gray-50 rounded-xl p-3">

                  <p className="text-xs text-gray-500">
                    Record
                  </p>

                  <p className="font-medium text-gray-900 mt-1 truncate">
                    {log.recordId || "—"}
                  </p>

                </div>

                {/* DATE */}

                <div className="bg-gray-50 rounded-xl p-3">

                  <p className="text-xs text-gray-500">
                    Date & Time
                  </p>

                  <p className="font-medium text-gray-900 mt-1">
                    {formatDateTime(
                      log.date,
                      log.time
                    )}
                  </p>

                </div>

                {/* IP */}

                <div className="bg-gray-50 rounded-xl p-3">

                  <p className="text-xs text-gray-500">
                    IP Address
                  </p>

                  <p className="font-medium text-gray-900 mt-1">
                    {log.ipAddress || "—"}
                  </p>

                </div>

              </div>

              {/* VIEW */}

              <div className="flex justify-end mt-4">

                <button
                  type="button"
                  onClick={() =>
                    onView?.(log)
                  }
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-700 hover:bg-gray-50 transition"
                >

                  <Eye size={16} />

                  View Details

                </button>

              </div>

            </div>

          ))

        )}

      </div>

    </div>
  );
};

export default AuditLogTable;