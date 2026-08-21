import React, { useMemo, useState } from "react";
import {
  Search,
  RotateCcw,
  Plus,
  CircleDollarSign,
  Clock,
  CheckCircle2,
  XCircle,
  SlidersHorizontal,
} from "lucide-react";

import SalesReturnTable from "./SalesReturnTable";
import SalesReturnForm from "./SalesReturnForm";

const SalesReturnMaster = () => {
  // ==========================================
  // STATE
  // ==========================================

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [showForm, setShowForm] = useState(false);
  const [selectedReturn, setSelectedReturn] = useState(null);

  // ==========================================
  // TEMPORARY FRONTEND DATA
  // ==========================================

  const [salesReturns, setSalesReturns] = useState([
    {
      id: 1,

      returnNumber: "SR-20260821-0001",

      invoiceNumber: "TF-20260819-0001",

      customerId: "CUS-001",

      customer: "ABC Supermarket",

      date: "2026-08-21",

      items: [
        {
          id: 1,
          productId: "PRD-001",
          product: "Parfait 500ml",
          quantity: 5,
          price: 500,
          amount: 2500,
        },
      ],

      subtotal: 2500,

      total: 2500,

      reason: "Damaged product",

      refundMethod: "Credit Note",

      status: "Pending",

      notes: "",
    },

    {
      id: 2,

      returnNumber: "SR-20260821-0002",

      invoiceNumber: "TF-20260819-0002",

      customerId: "CUS-002",

      customer: "Fresh Mart",

      date: "2026-08-21",

      items: [
        {
          id: 1,
          productId: "PRD-003",
          product: "Chocolate Parfait",
          quantity: 3,
          price: 800,
          amount: 2400,
        },
      ],

      subtotal: 2400,

      total: 2400,

      reason: "Wrong product supplied",

      refundMethod: "Cash Refund",

      status: "Approved",

      notes: "",
    },

    {
      id: 3,

      returnNumber: "SR-20260821-0003",

      invoiceNumber: "TF-20260819-0003",

      customerId: "CUS-003",

      customer: "Mega Foods",

      date: "2026-08-21",

      items: [
        {
          id: 1,
          productId: "PRD-004",
          product: "Strawberry Parfait",
          quantity: 2,
          price: 1000,
          amount: 2000,
        },
      ],

      subtotal: 2000,

      total: 2000,

      reason: "Customer changed order",

      refundMethod: "Credit Note",

      status: "Completed",

      notes: "",
    },
  ]);

  // ==========================================
  // FILTER RETURNS
  // ==========================================

  const filteredReturns = useMemo(() => {
    const query = search.toLowerCase().trim();

    return salesReturns.filter((returnItem) => {
      const matchesSearch =
        returnItem.returnNumber
          ?.toLowerCase()
          .includes(query) ||
        returnItem.invoiceNumber
          ?.toLowerCase()
          .includes(query) ||
        returnItem.customer
          ?.toLowerCase()
          .includes(query) ||
        returnItem.customerId
          ?.toLowerCase()
          .includes(query);

      const matchesStatus =
        statusFilter === "all" ||
        returnItem.status?.toLowerCase() ===
          statusFilter.toLowerCase();

      return matchesSearch && matchesStatus;
    });
  }, [salesReturns, search, statusFilter]);

  // ==========================================
  // STATISTICS
  // ==========================================

  const totalReturns = salesReturns.length;

  const totalReturnValue = salesReturns.reduce(
    (total, returnItem) =>
      total + Number(returnItem.total || 0),
    0
  );

  const pendingReturns = salesReturns.filter(
    (returnItem) =>
      returnItem.status === "Pending"
  ).length;

  const completedReturns = salesReturns.filter(
    (returnItem) =>
      returnItem.status === "Completed"
  ).length;

  // ==========================================
  // CURRENCY
  // ==========================================

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(amount || 0);
  };

  // ==========================================
  // CREATE RETURN
  // ==========================================

  const handleCreateReturn = () => {
    setSelectedReturn(null);
    setShowForm(true);
  };

  // ==========================================
  // EDIT RETURN
  // ==========================================

  const handleEditReturn = (returnItem) => {
    setSelectedReturn(returnItem);
    setShowForm(true);
  };

  // ==========================================
  // VIEW RETURN
  // ==========================================

  const handleViewReturn = (returnItem) => {
    console.log("View sales return:", returnItem);

    // Later:
    // Open SalesReturnPreview
  };

  // ==========================================
  // SAVE RETURN
  // ==========================================

  const handleSaveReturn = (returnData) => {
    if (selectedReturn) {
      setSalesReturns((currentReturns) =>
        currentReturns.map((returnItem) =>
          returnItem.id === selectedReturn.id
            ? {
                ...returnItem,
                ...returnData,
              }
            : returnItem
        )
      );
    } else {
      const newReturn = {
        id: Date.now(),

        returnNumber: `SR-${new Date()
          .toISOString()
          .slice(0, 10)
          .replaceAll("-", "")}-${String(
          salesReturns.length + 1
        ).padStart(4, "0")}`,

        ...returnData,
      };

      setSalesReturns((currentReturns) => [
        ...currentReturns,
        newReturn,
      ]);
    }

    setShowForm(false);
    setSelectedReturn(null);
  };

  // ==========================================
  // CLOSE FORM
  // ==========================================

  const handleCloseForm = () => {
    setShowForm(false);
    setSelectedReturn(null);
  };

  return (
    <div className="space-y-6">

      {/* ======================================
          PAGE HEADER
      ======================================= */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        <div className="flex items-center gap-3">

          <div className="p-3 bg-gray-100 rounded-xl">
            <RotateCcw
              size={23}
              className="text-gray-700"
            />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Sales Returns
            </h1>

            <p className="text-sm text-gray-500 mt-1">
              Manage customer returns, refunds and returned stock.
            </p>
          </div>

        </div>

        {/* CREATE RETURN */}

        <button
          type="button"
          onClick={handleCreateReturn}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gray-900 text-white hover:bg-gray-800 transition"
        >
          <Plus size={18} />

          New Sales Return
        </button>

      </div>

      {/* ======================================
          STATISTICS
      ======================================= */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">

        {/* Total Returns */}

        <StatCard
          title="Total Returns"
          value={totalReturns}
          icon={RotateCcw}
        />

        {/* Return Value */}

        <StatCard
          title="Return Value"
          value={formatCurrency(totalReturnValue)}
          icon={CircleDollarSign}
        />

        {/* Pending */}

        <StatCard
          title="Pending Returns"
          value={pendingReturns}
          icon={Clock}
        />

        {/* Completed */}

        <StatCard
          title="Completed Returns"
          value={completedReturns}
          icon={CheckCircle2}
        />

      </div>

      {/* ======================================
          SEARCH & FILTER
      ======================================= */}

      <div className="bg-white border border-gray-200 rounded-2xl p-5">

        <div className="flex flex-col lg:flex-row gap-4">

          {/* SEARCH */}

          <div className="relative flex-1">

            <Search
              size={19}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search return number, invoice or customer..."
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-gray-200"
            />

          </div>

          {/* FILTER */}

          <div className="flex items-center gap-2">

            <SlidersHorizontal
              size={19}
              className="text-gray-500"
            />

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value)
              }
              className="px-4 py-3 border border-gray-200 rounded-xl bg-white outline-none"
            >
              <option value="all">
                All Returns
              </option>

              <option value="pending">
                Pending
              </option>

              <option value="approved">
                Approved
              </option>

              <option value="completed">
                Completed
              </option>

              <option value="rejected">
                Rejected
              </option>

            </select>

          </div>

        </div>

      </div>

      {/* ======================================
          SALES RETURN TABLE
      ======================================= */}

      <SalesReturnTable
        returns={filteredReturns}
        onView={handleViewReturn}
        onEdit={handleEditReturn}
        formatCurrency={formatCurrency}
      />

      {/* ======================================
          SALES RETURN FORM
      ======================================= */}

      {showForm && (
        <SalesReturnForm
          returnItem={selectedReturn}
          onClose={handleCloseForm}
          onSave={handleSaveReturn}
        />
      )}

    </div>
  );
};

// ==========================================
// STAT CARD
// ==========================================

const StatCard = ({
  title,
  value,
  icon: Icon,
}) => {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm text-gray-500">
            {title}
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-2">
            {value}
          </h2>

        </div>

        <div className="p-3 bg-gray-100 rounded-xl">

          <Icon
            size={20}
            className="text-gray-700"
          />

        </div>

      </div>

    </div>
  );
};

export default SalesReturnMaster;