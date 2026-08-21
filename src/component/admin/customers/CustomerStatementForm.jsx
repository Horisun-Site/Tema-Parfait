import React, { useEffect, useState } from "react";
import {
  X,
  FileText,
  CalendarDays,
  Search,
  Printer,
} from "lucide-react";

const CustomerStatementForm = ({
  onClose,
  onGenerate,
  customers = [],
  selectedCustomer = null,
}) => {
  const [customerId, setCustomerId] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  useEffect(() => {
    if (selectedCustomer) {
      setCustomerId(selectedCustomer.id);
    }
  }, [selectedCustomer]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!customerId) {
      alert("Please select a customer.");
      return;
    }

    if (!fromDate || !toDate) {
      alert("Please select the statement period.");
      return;
    }

    if (new Date(fromDate) > new Date(toDate)) {
      alert("The start date cannot be after the end date.");
      return;
    }

    const customer = customers.find(
      (item) => String(item.id) === String(customerId)
    );

    onGenerate?.({
      customerId,
      customer,
      fromDate,
      toDate,
    });
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/40 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl max-h-[92vh] overflow-y-auto">
        {/* HEADER */}

        <div className="sticky top-0 bg-white z-10 flex items-center justify-between px-6 py-5 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gray-100 rounded-xl">
              <FileText className="w-5 h-5 text-gray-700" />
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Generate Customer Statement
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Select a customer and statement period.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 text-gray-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* FORM */}

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* CUSTOMER */}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Customer
            </label>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

              <select
                value={customerId}
                onChange={(e) => setCustomerId(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-gray-200 bg-white"
              >
                <option value="">Select customer</option>

                {customers.map((customer) => (
                  <option key={customer.id} value={customer.id}>
                    {customer.name} ({customer.customerCode})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* SELECTED CUSTOMER */}

          {selectedCustomer && (
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
              <p className="text-sm text-gray-500">
                Selected Customer
              </p>

              <p className="font-semibold text-gray-900 mt-1">
                {selectedCustomer.name}
              </p>

              <p className="text-sm text-gray-500 mt-1">
                {selectedCustomer.customerCode}
              </p>
            </div>
          )}

          {/* DATE RANGE */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* FROM */}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                From Date
              </label>

              <div className="relative">
                <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

                <input
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-gray-200"
                />
              </div>
            </div>

            {/* TO */}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                To Date
              </label>

              <div className="relative">
                <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

                <input
                  type="date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-gray-200"
                />
              </div>
            </div>
          </div>

          {/* ACTIONS */}

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-3 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gray-900 text-white hover:bg-gray-800"
            >
              <FileText className="w-4 h-4" />
              Generate Statement
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomerStatementForm;