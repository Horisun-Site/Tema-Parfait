import React, { useMemo, useState } from "react";
import {
  Search,
  CreditCard,
  Plus,
  CircleDollarSign,
  Clock,
  CheckCircle2,
  SlidersHorizontal,
} from "lucide-react";

import PaymentTable from "./PaymentTable";
import PaymentForm from "./PaymentForm";

const PaymentMaster = () => {
  // ==========================================
  // STATE
  // ==========================================

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [methodFilter, setMethodFilter] = useState("all");

  const [showForm, setShowForm] = useState(false);
  const [selectedPayment, setSelectedPayment] =
    useState(null);

  // ==========================================
  // TEMPORARY FRONTEND DATA
  // ==========================================

  const [payments, setPayments] = useState([
    {
      id: 1,
      paymentNumber: "PAY-20260821-0001",
      date: "2026-08-21",
      time: "09:45 AM",
      invoiceNumber: "TF-20260819-0001",
      customerId: "CUS-001",
      customer: "ABC Supermarket",
      amount: 50000,
      paymentMethod: "Bank Transfer",
      reference: "TRX-001234",
      status: "Completed",
      notes: "Part payment for invoice.",
    },
    {
      id: 2,
      paymentNumber: "PAY-20260821-0002",
      date: "2026-08-21",
      time: "11:20 AM",
      invoiceNumber: "TF-20260819-0002",
      customerId: "CUS-002",
      customer: "Fresh Mart",
      amount: 75000,
      paymentMethod: "POS",
      reference: "POS-789456",
      status: "Completed",
      notes: "",
    },
    {
      id: 3,
      paymentNumber: "PAY-20260821-0003",
      date: "2026-08-21",
      time: "01:15 PM",
      invoiceNumber: "TF-20260819-0002",
      customerId: "CUS-002",
      customer: "Fresh Mart",
      amount: 25000,
      paymentMethod: "Cash",
      reference: "",
      status: "Pending",
      notes: "Awaiting confirmation.",
    },
  ]);

  // ==========================================
  // FILTER PAYMENTS
  // ==========================================

  const filteredPayments = useMemo(() => {
    const query = search.toLowerCase().trim();

    return payments.filter((payment) => {
      const matchesSearch =
        payment.paymentNumber
          ?.toLowerCase()
          .includes(query) ||
        payment.invoiceNumber
          ?.toLowerCase()
          .includes(query) ||
        payment.customer
          ?.toLowerCase()
          .includes(query) ||
        payment.customerId
          ?.toLowerCase()
          .includes(query) ||
        payment.reference
          ?.toLowerCase()
          .includes(query);

      const matchesStatus =
        statusFilter === "all" ||
        payment.status.toLowerCase() ===
          statusFilter.toLowerCase();

      const matchesMethod =
        methodFilter === "all" ||
        payment.paymentMethod === methodFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesMethod
      );
    });
  }, [
    payments,
    search,
    statusFilter,
    methodFilter,
  ]);

  // ==========================================
  // STATISTICS
  // ==========================================

  const totalPayments = payments.length;

  const totalCollected = payments
    .filter(
      (payment) =>
        payment.status === "Completed"
    )
    .reduce(
      (total, payment) =>
        total + Number(payment.amount || 0),
      0
    );

  const completedPayments = payments.filter(
    (payment) =>
      payment.status === "Completed"
  ).length;

  const pendingPayments = payments.filter(
    (payment) =>
      payment.status === "Pending"
  ).length;

  // ==========================================
  // TODAY'S COLLECTION
  // ==========================================

  const today = new Date()
    .toISOString()
    .slice(0, 10);

  const todayCollection = payments
    .filter(
      (payment) =>
        payment.date === today &&
        payment.status === "Completed"
    )
    .reduce(
      (total, payment) =>
        total + Number(payment.amount || 0),
      0
    );

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
  // CREATE PAYMENT
  // ==========================================

  const handleCreatePayment = () => {
    setSelectedPayment(null);
    setShowForm(true);
  };

  // ==========================================
  // EDIT PAYMENT
  // ==========================================

  const handleEditPayment = (payment) => {
    setSelectedPayment(payment);
    setShowForm(true);
  };

  // ==========================================
  // VIEW PAYMENT
  // ==========================================

  const handleViewPayment = (payment) => {
    console.log("View payment:", payment);

    // Later:
    // Open payment details / receipt.
  };

  // ==========================================
  // SAVE PAYMENT
  // ==========================================

  const handleSavePayment = (paymentData) => {
    if (selectedPayment) {
      setPayments((currentPayments) =>
        currentPayments.map((payment) =>
          payment.id === selectedPayment.id
            ? {
                ...payment,
                ...paymentData,
              }
            : payment
        )
      );
    } else {
      const newPayment = {
        id: Date.now(),

        paymentNumber: `PAY-${new Date()
          .toISOString()
          .slice(0, 10)
          .replaceAll("-", "")}-${String(
          payments.length + 1
        ).padStart(4, "0")}`,

        time: new Date().toLocaleTimeString(
          "en-NG",
          {
            hour: "2-digit",
            minute: "2-digit",
          }
        ),

        ...paymentData,
      };

      setPayments((currentPayments) => [
        ...currentPayments,
        newPayment,
      ]);
    }

    setShowForm(false);
    setSelectedPayment(null);
  };

  // ==========================================
  // CLOSE FORM
  // ==========================================

  const handleCloseForm = () => {
    setShowForm(false);
    setSelectedPayment(null);
  };

  return (
    <div className="space-y-6">

      {/* ======================================
          PAGE HEADER
      ======================================= */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        <div className="flex items-center gap-3">

          <div className="p-3 bg-gray-100 rounded-xl">
            <CreditCard
              size={23}
              className="text-gray-700"
            />
          </div>

          <div>

            <h1 className="text-2xl font-bold text-gray-900">
              Payment Management
            </h1>

            <p className="text-sm text-gray-500 mt-1">
              Record, manage and track customer payments.
            </p>

          </div>

        </div>

        <button
          type="button"
          onClick={handleCreatePayment}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gray-900 text-white hover:bg-gray-800 transition"
        >
          <Plus size={18} />

          Record Payment
        </button>

      </div>

      {/* ======================================
          STATISTICS
      ======================================= */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">

        <StatCard
          title="Total Payments"
          value={totalPayments}
          icon={CreditCard}
        />

        <StatCard
          title="Amount Collected"
          value={formatCurrency(totalCollected)}
          icon={CircleDollarSign}
        />

        <StatCard
          title="Completed Payments"
          value={completedPayments}
          icon={CheckCircle2}
        />

        <StatCard
          title="Pending Payments"
          value={pendingPayments}
          icon={Clock}
        />

      </div>

      {/* ======================================
          TODAY'S COLLECTION
      ======================================= */}

      <div className="bg-white border border-gray-200 rounded-2xl p-5">

        <div className="flex items-center gap-3">

          <div className="p-3 bg-gray-100 rounded-xl">

            <CircleDollarSign
              size={20}
              className="text-gray-700"
            />

          </div>

          <div>

            <p className="text-sm text-gray-500">
              Today's Collection
            </p>

            <h3 className="text-xl font-bold text-gray-900 mt-1">
              {formatCurrency(todayCollection)}
            </h3>

          </div>

        </div>

      </div>

      {/* ======================================
          SEARCH & FILTERS
      ======================================= */}

      <div className="bg-white border border-gray-200 rounded-2xl p-5">

        <div className="flex flex-col xl:flex-row gap-4">

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
              placeholder="Search payment, invoice, customer or reference..."
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-gray-200"
            />

          </div>

          {/* Status Filter */}

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
                All Status
              </option>

              <option value="completed">
                Completed
              </option>

              <option value="pending">
                Pending
              </option>

              <option value="cancelled">
                Cancelled
              </option>

            </select>

          </div>

          {/* Payment Method */}

          <select
            value={methodFilter}
            onChange={(e) =>
              setMethodFilter(e.target.value)
            }
            className="px-4 py-3 border border-gray-200 rounded-xl bg-white outline-none"
          >

            <option value="all">
              All Methods
            </option>

            <option value="Cash">
              Cash
            </option>

            <option value="Bank Transfer">
              Bank Transfer
            </option>

            <option value="POS">
              POS
            </option>

            <option value="Cheque">
              Cheque
            </option>

            <option value="Other">
              Other
            </option>

          </select>

        </div>

      </div>

      {/* ======================================
          PAYMENT TABLE
      ======================================= */}

      <PaymentTable
        payments={filteredPayments}
        onView={handleViewPayment}
        onEdit={handleEditPayment}
        formatCurrency={formatCurrency}
      />

      {/* ======================================
          PAYMENT FORM
      ======================================= */}

      {showForm && (
        <PaymentForm
          payment={selectedPayment}
          onClose={handleCloseForm}
          onSave={handleSavePayment}
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

export default PaymentMaster;