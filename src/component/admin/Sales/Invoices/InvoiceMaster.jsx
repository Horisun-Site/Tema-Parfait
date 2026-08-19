import React, { useMemo, useState } from "react";
import {
  Search,
  Receipt,
  Plus,
  CircleDollarSign,
  Clock,
  CheckCircle2,
  XCircle,
  SlidersHorizontal,
} from "lucide-react";

import InvoiceTable from "./InvoiceTable";
import InvoiceForm from "./InvoiceForm";

const InvoiceMaster = () => {
  // ==========================================
  // STATE
  // ==========================================

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [showForm, setShowForm] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  // ==========================================
  // TEMPORARY FRONTEND DATA
  // ==========================================
  // This will later come from FastAPI.

  const [invoices, setInvoices] = useState([
    {
      id: 1,
      invoiceNumber: "TF-20260819-0001",
      date: "2026-08-19",
      time: "09:30 AM",
      customer: "ABC Supermarket",
      customerId: "CUS-001",
      subtotal: 85000,
      discount: 5000,
      vat: 6000,
      total: 86000,
      paymentStatus: "Paid",
      deliveryStatus: "Delivered",
    },
    {
      id: 2,
      invoiceNumber: "TF-20260819-0002",
      date: "2026-08-19",
      time: "11:15 AM",
      customer: "Fresh Mart",
      customerId: "CUS-002",
      subtotal: 120000,
      discount: 10000,
      vat: 8250,
      total: 118250,
      paymentStatus: "Pending",
      deliveryStatus: "Pending",
    },
  ]);

  // ==========================================
  // FILTER INVOICES
  // ==========================================

  const filteredInvoices = useMemo(() => {
    const query = search.toLowerCase().trim();

    return invoices.filter((invoice) => {
      const matchesSearch =
        invoice.invoiceNumber
          ?.toLowerCase()
          .includes(query) ||
        invoice.customer
          ?.toLowerCase()
          .includes(query) ||
        invoice.customerId
          ?.toLowerCase()
          .includes(query);

      const matchesStatus =
        statusFilter === "all" ||
        invoice.paymentStatus.toLowerCase() ===
          statusFilter.toLowerCase();

      return matchesSearch && matchesStatus;
    });
  }, [invoices, search, statusFilter]);

  // ==========================================
  // STATISTICS
  // ==========================================

  const totalInvoices = invoices.length;

  const totalRevenue = invoices.reduce(
    (total, invoice) =>
      total + Number(invoice.total || 0),
    0
  );

  const paidInvoices = invoices.filter(
    (invoice) =>
      invoice.paymentStatus === "Paid"
  ).length;

  const pendingInvoices = invoices.filter(
    (invoice) =>
      invoice.paymentStatus === "Pending"
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
  // CREATE INVOICE
  // ==========================================

  const handleCreateInvoice = () => {
    setSelectedInvoice(null);
    setShowForm(true);
  };

  // ==========================================
  // EDIT INVOICE
  // ==========================================

  const handleEditInvoice = (invoice) => {
    setSelectedInvoice(invoice);
    setShowForm(true);
  };

  // ==========================================
  // VIEW INVOICE
  // ==========================================

  const handleViewInvoice = (invoice) => {
    console.log("View invoice:", invoice);

    // Later:
    // Open InvoicePreview
  };

  // ==========================================
  // SAVE INVOICE
  // ==========================================

  const handleSaveInvoice = (invoiceData) => {
    if (selectedInvoice) {
      setInvoices((currentInvoices) =>
        currentInvoices.map((invoice) =>
          invoice.id === selectedInvoice.id
            ? {
                ...invoice,
                ...invoiceData,
              }
            : invoice
        )
      );
    } else {
      const newInvoice = {
        id: Date.now(),
        invoiceNumber: `TF-${new Date()
          .toISOString()
          .slice(0, 10)
          .replaceAll("-", "")}-${String(
          invoices.length + 1
        ).padStart(4, "0")}`,
        ...invoiceData,
      };

      setInvoices((currentInvoices) => [
        ...currentInvoices,
        newInvoice,
      ]);
    }

    setShowForm(false);
    setSelectedInvoice(null);
  };

  // ==========================================
  // CLOSE FORM
  // ==========================================

  const handleCloseForm = () => {
    setShowForm(false);
    setSelectedInvoice(null);
  };

  return (
    <div className="space-y-6">

      {/* ======================================
          PAGE HEADER
      ======================================= */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        <div className="flex items-center gap-3">

          <div className="p-3 bg-gray-100 rounded-xl">
            <Receipt
              size={23}
              className="text-gray-700"
            />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Sales Invoices
            </h1>

            <p className="text-sm text-gray-500 mt-1">
              Create, manage and track customer invoices.
            </p>
          </div>

        </div>

        <button
          type="button"
          onClick={handleCreateInvoice}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gray-900 text-white hover:bg-gray-800 transition"
        >
          <Plus size={18} />

          New Invoice
        </button>

      </div>

      {/* ======================================
          STATISTICS
      ======================================= */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">

        {/* Total Invoices */}

        <StatCard
          title="Total Invoices"
          value={totalInvoices}
          icon={Receipt}
        />

        {/* Revenue */}

        <StatCard
          title="Invoice Revenue"
          value={formatCurrency(totalRevenue)}
          icon={CircleDollarSign}
        />

        {/* Paid */}

        <StatCard
          title="Paid Invoices"
          value={paidInvoices}
          icon={CheckCircle2}
        />

        {/* Pending */}

        <StatCard
          title="Pending Payments"
          value={pendingInvoices}
          icon={Clock}
        />

      </div>

      {/* ======================================
          SEARCH & FILTER
      ======================================= */}

      <div className="bg-white border border-gray-200 rounded-2xl p-5">

        <div className="flex flex-col lg:flex-row gap-4">

          {/* Search */}

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
              placeholder="Search invoice number, customer..."
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-gray-200"
            />

          </div>

          {/* Filter */}

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
                All Payments
              </option>

              <option value="paid">
                Paid
              </option>

              <option value="pending">
                Pending
              </option>
            </select>

          </div>

        </div>

      </div>

      {/* ======================================
          INVOICE TABLE
      ======================================= */}

      <InvoiceTable
        invoices={filteredInvoices}
        onView={handleViewInvoice}
        onEdit={handleEditInvoice}
        formatCurrency={formatCurrency}
      />

      {/* ======================================
          INVOICE FORM
      ======================================= */}

      {showForm && (
        <InvoiceForm
          invoice={selectedInvoice}
          onClose={handleCloseForm}
          onSave={handleSaveInvoice}
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

export default InvoiceMaster;