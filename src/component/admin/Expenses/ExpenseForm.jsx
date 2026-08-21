import React, { useEffect, useState } from "react";
import {
  X,
  Save,
  Calculator,
} from "lucide-react";

// =========================
// GET TODAY'S DATE
// =========================

const getTodayDate = () => {
  const today = new Date();

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const ExpenseForm = ({
  onClose,
  onSave,
  initialData = null,
}) => {
  const [formData, setFormData] = useState({
    reference: "",
    date: getTodayDate(),
    category: "",
    description: "",
    payee: "",
    amount: "",
    paymentMethod: "",
    status: "Pending",
    notes: "",
  });

  const [amountPreview, setAmountPreview] = useState(0);

  // =========================
  // LOAD EXISTING EXPENSE
  // =========================

  useEffect(() => {
    if (initialData) {
      setFormData({
        reference: initialData.reference || "",
        date: initialData.date || getTodayDate(),
        category: initialData.category || "",
        description: initialData.description || "",
        payee: initialData.payee || "",
        amount: initialData.amount || "",
        paymentMethod: initialData.paymentMethod || "",
        status: initialData.status || "Pending",
        notes: initialData.notes || "",
      });
    } else {
      // New expense = automatically today's date
      setFormData((prev) => ({
        ...prev,
        date: getTodayDate(),
      }));
    }
  }, [initialData]);

  // =========================
  // AMOUNT PREVIEW
  // =========================

  useEffect(() => {
    setAmountPreview(Number(formData.amount || 0));
  }, [formData.amount]);

  // =========================
  // HANDLE CHANGE
  // =========================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================
  // SUBMIT
  // =========================

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.date) {
      alert("Expense date could not be determined.");
      return;
    }

    if (!formData.category) {
      alert("Please select an expense category.");
      return;
    }

    if (!formData.description.trim()) {
      alert("Please enter an expense description.");
      return;
    }

    if (!formData.amount || Number(formData.amount) <= 0) {
      alert("Please enter a valid expense amount.");
      return;
    }

    if (!formData.paymentMethod) {
      alert("Please select a payment method.");
      return;
    }

    onSave?.({
      ...formData,
      amount: Number(formData.amount),
    });
  };

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

  return (
    <div className="fixed inset-0 z-[100] bg-black/40 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-xl max-h-[92vh] overflow-y-auto">

        {/* =========================
            HEADER
        ========================== */}

        <div className="sticky top-0 bg-white z-10 flex items-center justify-between px-6 py-5 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              {initialData ? "Edit Expense" : "Record Expense"}
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Record and manage business expenses.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 text-gray-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* =========================
            FORM
        ========================== */}

        <form onSubmit={handleSubmit} className="p-6 space-y-6">

          {/* =========================
              REFERENCE + DATE
          ========================== */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {/* REFERENCE */}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Expense Reference
              </label>

              <input
                type="text"
                name="reference"
                value={formData.reference}
                onChange={handleChange}
                placeholder="e.g. EXP-001"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-gray-200"
              />
            </div>

            {/* DATE */}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Expense Date
              </label>

              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-gray-200"
              />

              <p className="text-xs text-gray-500 mt-1">
                Automatically set to today.
              </p>
            </div>

          </div>

          {/* =========================
              CATEGORY + PAYEE
          ========================== */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Expense Category
              </label>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-gray-200 bg-white"
              >
                <option value="">Select category</option>
                <option value="rent">Rent</option>
                <option value="utilities">Utilities</option>
                <option value="transport">Transport</option>
                <option value="salaries">Salaries</option>
                <option value="supplies">Office Supplies</option>
                <option value="maintenance">Maintenance</option>
                <option value="marketing">Marketing</option>
                <option value="communication">Communication</option>
                <option value="fuel">Fuel</option>
                <option value="tax">Tax & Government Fees</option>
                <option value="bank_charges">Bank Charges</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Payee / Vendor
              </label>

              <input
                type="text"
                name="payee"
                value={formData.payee}
                onChange={handleChange}
                placeholder="Who was paid?"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-gray-200"
              />
            </div>

          </div>

          {/* =========================
              DESCRIPTION
          ========================== */}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>

            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="e.g. Monthly office electricity bill"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-gray-200"
            />
          </div>

          {/* =========================
              AMOUNT + PAYMENT METHOD
          ========================== */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amount
              </label>

              <input
                type="number"
                min="0"
                step="0.01"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                placeholder="Enter amount"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-gray-200"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Payment Method
              </label>

              <select
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-gray-200 bg-white"
              >
                <option value="">Select payment method</option>
                <option value="cash">Cash</option>
                <option value="bank_transfer">Bank Transfer</option>
                <option value="card">Card</option>
                <option value="mobile_money">Mobile Money</option>
                <option value="cheque">Cheque</option>
                <option value="other">Other</option>
              </select>
            </div>

          </div>

          {/* =========================
              AMOUNT PREVIEW
          ========================== */}

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
            <div className="flex items-center gap-3">

              <div className="p-3 bg-white border border-gray-200 rounded-xl">
                <Calculator className="w-5 h-5 text-gray-700" />
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Expense Amount
                </p>

                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {formatCurrency(amountPreview)}
                </p>
              </div>

            </div>
          </div>

          {/* =========================
              STATUS
          ========================== */}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-gray-200 bg-white"
            >
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          {/* =========================
              NOTES
          ========================== */}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notes
            </label>

            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows="4"
              placeholder="Additional information about this expense..."
              className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-gray-200 resize-none"
            />
          </div>

          {/* =========================
              ACTIONS
          ========================== */}

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
              <Save className="w-4 h-4" />

              {initialData
                ? "Update Expense"
                : "Save Expense"}
            </button>

          </div>

        </form>
      </div>
    </div>
  );
};

export default ExpenseForm;