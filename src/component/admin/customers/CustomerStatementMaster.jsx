import React, { useMemo, useState } from "react";
import {
  Search,
  FileText,
  Users,
  CircleDollarSign,
  Wallet,
  Eye,
  Download,
  SlidersHorizontal,
} from "lucide-react";

import CustomerStatementForm from "./CustomerStatementForm";
import CustomerStatementTable from "./CustomerStatementTable";

const CustomerStatementMaster = () => {
  const [search, setSearch] = useState("");
  const [statementFilter, setStatementFilter] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  // =====================================================
  // TEMPORARY FRONTEND DATA
  // =====================================================
  // This will later come from the FastAPI backend.

  const [customers] = useState([
    {
      id: 1,
      customerCode: "CUS-001",
      customer: "John Enterprises",
      phone: "08012345678",
      email: "john@example.com",
      openingBalance: 50000,
      invoices: 250000,
      payments: 180000,
      returns: 20000,
      closingBalance: 100000,
      status: "Outstanding",
    },
    {
      id: 2,
      customerCode: "CUS-002",
      customer: "Blessing Pharmacy",
      phone: "08023456789",
      email: "blessing@example.com",
      openingBalance: 0,
      invoices: 180000,
      payments: 180000,
      returns: 10000,
      closingBalance: -10000,
      status: "Credit",
    },
    {
      id: 3,
      customerCode: "CUS-003",
      customer: "Ogun Medical Stores",
      phone: "08034567890",
      email: "ogun@example.com",
      openingBalance: 120000,
      invoices: 300000,
      payments: 200000,
      returns: 20000,
      closingBalance: 200000,
      status: "Outstanding",
    },
    {
      id: 4,
      customerCode: "CUS-004",
      customer: "Health Plus Ventures",
      phone: "08045678901",
      email: "healthplus@example.com",
      openingBalance: 0,
      invoices: 150000,
      payments: 150000,
      returns: 0,
      closingBalance: 0,
      status: "Cleared",
    },
  ]);

  // =====================================================
  // CURRENCY
  // =====================================================

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(amount || 0);
  };

  // =====================================================
  // FILTER CUSTOMERS
  // =====================================================

  const filteredCustomers = useMemo(() => {
    const query = search.toLowerCase().trim();

    return customers.filter((customer) => {
      const matchesSearch =
        customer.customer.toLowerCase().includes(query) ||
        customer.customerCode.toLowerCase().includes(query) ||
        customer.phone.toLowerCase().includes(query) ||
        customer.email.toLowerCase().includes(query);

      const matchesFilter =
        statementFilter === "all" ||
        (statementFilter === "outstanding" &&
          customer.closingBalance > 0) ||
        (statementFilter === "credit" &&
          customer.closingBalance < 0) ||
        (statementFilter === "cleared" &&
          customer.closingBalance === 0);

      return matchesSearch && matchesFilter;
    });
  }, [customers, search, statementFilter]);

  // =====================================================
  // DASHBOARD STATISTICS
  // =====================================================

  const totalCustomers = customers.length;

  const totalOutstanding = customers.reduce(
    (total, customer) =>
      total + Math.max(Number(customer.closingBalance || 0), 0),
    0
  );

  const totalCredit = customers.reduce(
    (total, customer) =>
      total + Math.abs(Math.min(Number(customer.closingBalance || 0), 0)),
    0
  );

  const customersWithBalance = customers.filter(
    (customer) => Number(customer.closingBalance || 0) !== 0
  ).length;

  // =====================================================
  // VIEW STATEMENT
  // =====================================================

  const handleViewStatement = (customer) => {
    setSelectedCustomer(customer);
    setShowForm(true);
  };

  // =====================================================
  // DOWNLOAD STATEMENT
  // =====================================================

  const handleDownloadStatement = (customer) => {
    console.log("Download statement:", customer);

    // Later:
    // FastAPI will generate the official statement PDF.
  };

  return (
    <div className="space-y-6">

      {/* =================================================
          PAGE HEADER
      ================================================== */}

      <div>
        <div className="flex items-center gap-3">

          <div className="p-3 bg-gray-100 rounded-xl">
            <FileText className="w-6 h-6 text-gray-700" />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Customer Statements
            </h1>

            <p className="text-sm text-gray-500 mt-1">
              View customer balances, transactions and account statements.
            </p>
          </div>

        </div>
      </div>

      {/* =================================================
          STATISTICS
      ================================================== */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">

        {/* Total Customers */}

        <div className="bg-white border border-gray-200 rounded-2xl p-5">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-gray-500">
                Total Customers
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-2">
                {totalCustomers}
              </h2>
            </div>

            <div className="p-3 bg-gray-100 rounded-xl">
              <Users className="w-5 h-5 text-gray-700" />
            </div>

          </div>

        </div>

        {/* Outstanding */}

        <div className="bg-white border border-gray-200 rounded-2xl p-5">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-gray-500">
                Total Outstanding
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-2">
                {formatCurrency(totalOutstanding)}
              </h2>
            </div>

            <div className="p-3 bg-gray-100 rounded-xl">
              <CircleDollarSign className="w-5 h-5 text-gray-700" />
            </div>

          </div>

        </div>

        {/* Customer Credit */}

        <div className="bg-white border border-gray-200 rounded-2xl p-5">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-gray-500">
                Customer Credit
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-2">
                {formatCurrency(totalCredit)}
              </h2>
            </div>

            <div className="p-3 bg-gray-100 rounded-xl">
              <Wallet className="w-5 h-5 text-gray-700" />
            </div>

          </div>

        </div>

        {/* Customers With Balance */}

        <div className="bg-white border border-gray-200 rounded-2xl p-5">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-gray-500">
                Customers With Balance
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-2">
                {customersWithBalance}
              </h2>
            </div>

            <div className="p-3 bg-gray-100 rounded-xl">
              <FileText className="w-5 h-5 text-gray-700" />
            </div>

          </div>

        </div>

      </div>

      {/* =================================================
          SEARCH & FILTERS
      ================================================== */}

      <div className="bg-white border border-gray-200 rounded-2xl p-5">

        <div className="flex flex-col lg:flex-row gap-4">

          {/* Search */}

          <div className="relative flex-1">

            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />

            <input
              type="text"
              placeholder="Search customer, code, phone or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-gray-200"
            />

          </div>

          {/* Filter */}

          <div className="flex items-center gap-2">

            <SlidersHorizontal
              size={20}
              className="text-gray-500"
            />

            <select
              value={statementFilter}
              onChange={(e) =>
                setStatementFilter(e.target.value)
              }
              className="px-4 py-3 border border-gray-200 rounded-xl outline-none bg-white"
            >
              <option value="all">
                All Customers
              </option>

              <option value="outstanding">
                Outstanding
              </option>

              <option value="credit">
                Customer Credit
              </option>

              <option value="cleared">
                Cleared
              </option>
            </select>

          </div>

        </div>

      </div>

      {/* =================================================
          CUSTOMER STATEMENT TABLE
      ================================================== */}

      <CustomerStatementTable
        customers={filteredCustomers}
        onView={handleViewStatement}
        onDownload={handleDownloadStatement}
      />

      {/* =================================================
          STATEMENT FORM / VIEW
      ================================================== */}

      {showForm && (
        <CustomerStatementForm
          customer={selectedCustomer}
          onClose={() => {
            setShowForm(false);
            setSelectedCustomer(null);
          }}
        />
      )}

    </div>
  );
};

export default CustomerStatementMaster;