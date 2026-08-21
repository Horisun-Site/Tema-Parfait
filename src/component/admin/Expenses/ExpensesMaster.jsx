import React, { useMemo, useState } from "react";
import {
  Wallet,
  CircleDollarSign,
  Clock3,
  CheckCircle2,
  Search,
  Plus,
  X,
} from "lucide-react";

import ExpenseTable from "./ExpenseTable";
import ExpenseForm from "./ExpenseForm";

const ExpensesMaster = () => {

  // =========================
  // EXPENSE DATA
  // =========================

  const [expenses, setExpenses] = useState([
    {
      id: 1,
      reference: "EXP-001",
      date: "2026-08-20",
      category: "utilities",
      description: "Office electricity bill",
      payee: "Ikeja Electric",
      amount: 85000,
      paymentMethod: "bank_transfer",
      status: "Approved",
      notes: "",
    },

    {
      id: 2,
      reference: "EXP-002",
      date: "2026-08-20",
      category: "transport",
      description: "Delivery transportation",
      payee: "ABC Logistics",
      amount: 45000,
      paymentMethod: "cash",
      status: "Pending",
      notes: "",
    },

    {
      id: 3,
      reference: "EXP-003",
      date: "2026-08-19",
      category: "supplies",
      description: "Office stationery",
      payee: "Office Mart",
      amount: 35000,
      paymentMethod: "card",
      status: "Approved",
      notes: "",
    },
  ]);

  // =========================
  // UI STATES
  // =========================

  const [showForm, setShowForm] = useState(false);

  const [editingExpense, setEditingExpense] = useState(null);

  const [viewingExpense, setViewingExpense] = useState(null);

  const [search, setSearch] = useState("");

  // =========================
  // SEARCH
  // =========================

  const filteredExpenses = useMemo(() => {

    const query = search.toLowerCase().trim();

    if (!query) {
      return expenses;
    }

    return expenses.filter((expense) => {

      return (
        expense.reference
          ?.toLowerCase()
          .includes(query) ||

        expense.description
          ?.toLowerCase()
          .includes(query) ||

        expense.payee
          ?.toLowerCase()
          .includes(query) ||

        expense.category
          ?.toLowerCase()
          .includes(query)
      );

    });

  }, [expenses, search]);

  // =========================
  // STATISTICS
  // =========================

  const totalExpenses = expenses.reduce(
    (total, expense) =>
      total + Number(expense.amount || 0),
    0
  );

  const approvedExpenses = expenses.filter(
    (expense) => expense.status === "Approved"
  );

  const pendingExpenses = expenses.filter(
    (expense) => expense.status === "Pending"
  );

  const approvedAmount = approvedExpenses.reduce(
    (total, expense) =>
      total + Number(expense.amount || 0),
    0
  );

  const pendingAmount = pendingExpenses.reduce(
    (total, expense) =>
      total + Number(expense.amount || 0),
    0
  );

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
  // OPEN CREATE FORM
  // =========================

  const handleAddExpense = () => {

    setEditingExpense(null);

    setShowForm(true);

  };

  // =========================
  // EDIT
  // =========================

  const handleEditExpense = (expense) => {

    setEditingExpense(expense);

    setShowForm(true);

  };

  // =========================
  // SAVE / UPDATE
  // =========================

  const handleSaveExpense = (formData) => {

    if (editingExpense) {

      // UPDATE EXISTING EXPENSE

      setExpenses((prev) =>
        prev.map((expense) =>
          expense.id === editingExpense.id
            ? {
                ...expense,
                ...formData,
              }
            : expense
        )
      );

    } else {

      // CREATE NEW EXPENSE

      const newExpense = {
        id: Date.now(),

        reference:
          formData.reference ||
          `EXP-${String(expenses.length + 1).padStart(
            3,
            "0"
          )}`,

        ...formData,
      };

      setExpenses((prev) => [
        newExpense,
        ...prev,
      ]);

    }

    setShowForm(false);

    setEditingExpense(null);

  };

  // =========================
  // DELETE
  // =========================

  const handleDeleteExpense = (expense) => {

    const confirmed = window.confirm(
      `Are you sure you want to delete ${expense.reference}?`
    );

    if (!confirmed) {
      return;
    }

    setExpenses((prev) =>
      prev.filter(
        (item) => item.id !== expense.id
      )
    );

  };

  // =========================
  // VIEW
  // =========================

  const handleViewExpense = (expense) => {

    setViewingExpense(expense);

  };

  return (

    <div className="space-y-6">

      {/* =========================
          HEADER
      ========================== */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        <div className="flex items-center gap-3">

          <div className="p-3 bg-gray-100 rounded-xl">
            <Wallet className="w-6 h-6 text-gray-700" />
          </div>

          <div>

            <h1 className="text-2xl font-bold text-gray-900">
              Expenses
            </h1>

            <p className="text-sm text-gray-500 mt-1">
              Record, monitor and manage business expenses.
            </p>

          </div>

        </div>

        <button
          type="button"
          onClick={handleAddExpense}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gray-900 text-white hover:bg-gray-800 transition"
        >
          <Plus className="w-4 h-4" />
          Record Expense
        </button>

      </div>

      {/* =========================
          STATISTICS
      ========================== */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">

        {/* TOTAL */}

        <div className="bg-white border border-gray-200 rounded-2xl p-5">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-gray-500">
                Total Expenses
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-2">
                {formatCurrency(totalExpenses)}
              </h2>

            </div>

            <div className="p-3 bg-gray-100 rounded-xl">
              <CircleDollarSign className="w-5 h-5 text-gray-700" />
            </div>

          </div>

        </div>

        {/* APPROVED */}

        <div className="bg-white border border-gray-200 rounded-2xl p-5">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-gray-500">
                Approved
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-2">
                {formatCurrency(approvedAmount)}
              </h2>

              <p className="text-xs text-gray-500 mt-1">
                {approvedExpenses.length} records
              </p>

            </div>

            <div className="p-3 bg-gray-100 rounded-xl">
              <CheckCircle2 className="w-5 h-5 text-gray-700" />
            </div>

          </div>

        </div>

        {/* PENDING */}

        <div className="bg-white border border-gray-200 rounded-2xl p-5">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-gray-500">
                Pending
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-2">
                {formatCurrency(pendingAmount)}
              </h2>

              <p className="text-xs text-gray-500 mt-1">
                {pendingExpenses.length} records
              </p>

            </div>

            <div className="p-3 bg-gray-100 rounded-xl">
              <Clock3 className="w-5 h-5 text-gray-700" />
            </div>

          </div>

        </div>

        {/* RECORD COUNT */}

        <div className="bg-white border border-gray-200 rounded-2xl p-5">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-gray-500">
                Expense Records
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-2">
                {expenses.length}
              </h2>

            </div>

            <div className="p-3 bg-gray-100 rounded-xl">
              <Wallet className="w-5 h-5 text-gray-700" />
            </div>

          </div>

        </div>

      </div>

      {/* =========================
          SEARCH
      ========================== */}

      <div className="bg-white border border-gray-200 rounded-2xl p-5">

        <div className="relative">

          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

          <input
            type="text"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search expenses, reference, payee or category..."
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-gray-200"
          />

        </div>

      </div>

      {/* =========================
          TABLE
      ========================== */}

      <ExpenseTable
        expenses={filteredExpenses}
        onView={handleViewExpense}
        onEdit={handleEditExpense}
        onDelete={handleDeleteExpense}
      />

      {/* =========================
          EXPENSE FORM
      ========================== */}

      {showForm && (

        <ExpenseForm
          onClose={() => {
            setShowForm(false);
            setEditingExpense(null);
          }}
          onSave={handleSaveExpense}
          initialData={editingExpense}
        />

      )}

      {/* =========================
          VIEW EXPENSE
      ========================== */}

      {viewingExpense && (

        <div className="fixed inset-0 z-[100] bg-black/40 flex items-center justify-center p-4">

          <div className="bg-white w-full max-w-xl rounded-2xl shadow-xl">

            {/* HEADER */}

            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">

              <div>

                <h2 className="text-xl font-semibold text-gray-900">
                  Expense Details
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  {viewingExpense.reference}
                </p>

              </div>

              <button
                type="button"
                onClick={() =>
                  setViewingExpense(null)
                }
                className="p-2 rounded-lg hover:bg-gray-100 text-gray-500"
              >
                <X className="w-5 h-5" />
              </button>

            </div>

            {/* DETAILS */}

            <div className="p-6 space-y-4">

              <div className="grid grid-cols-2 gap-4">

                <div>
                  <p className="text-xs text-gray-500">
                    Date
                  </p>

                  <p className="font-medium text-gray-900 mt-1">
                    {viewingExpense.date}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">
                    Category
                  </p>

                  <p className="font-medium text-gray-900 mt-1 capitalize">
                    {viewingExpense.category?.replaceAll(
                      "_",
                      " "
                    )}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">
                    Payee
                  </p>

                  <p className="font-medium text-gray-900 mt-1">
                    {viewingExpense.payee || "—"}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">
                    Payment Method
                  </p>

                  <p className="font-medium text-gray-900 mt-1 capitalize">
                    {viewingExpense.paymentMethod?.replaceAll(
                      "_",
                      " "
                    )}
                  </p>
                </div>

              </div>

              <div className="border-t border-gray-200 pt-4">

                <p className="text-xs text-gray-500">
                  Description
                </p>

                <p className="font-medium text-gray-900 mt-1">
                  {viewingExpense.description}
                </p>

              </div>

              <div className="bg-gray-50 rounded-xl p-4">

                <p className="text-sm text-gray-500">
                  Amount
                </p>

                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {formatCurrency(
                    viewingExpense.amount
                  )}
                </p>

              </div>

              <div>

                <p className="text-xs text-gray-500">
                  Status
                </p>

                <p className="font-medium text-gray-900 mt-1">
                  {viewingExpense.status}
                </p>

              </div>

              {viewingExpense.notes && (

                <div>

                  <p className="text-xs text-gray-500">
                    Notes
                  </p>

                  <p className="text-sm text-gray-700 mt-1">
                    {viewingExpense.notes}
                  </p>

                </div>

              )}

            </div>

            {/* FOOTER */}

            <div className="px-6 py-4 border-t border-gray-200 flex justify-end">

              <button
                type="button"
                onClick={() =>
                  setViewingExpense(null)
                }
                className="px-5 py-3 rounded-xl bg-gray-900 text-white hover:bg-gray-800"
              >
                Close
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
};

export default ExpensesMaster;