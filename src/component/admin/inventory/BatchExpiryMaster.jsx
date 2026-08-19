import React, { useMemo, useState } from "react";
import {
  Search,
  Package,
  AlertTriangle,
  CalendarClock,
  CheckCircle2,
  XCircle,
  Plus,
  SlidersHorizontal,
} from "lucide-react";

import BatchExpiryTable from "./BatchExpiryTable";
import BatchExpiryForm from "./BatchExpiryForm";

const BatchExpiryMaster = () => {
  const [search, setSearch] = useState("");
  const [expiryFilter, setExpiryFilter] = useState("all");

  const [showForm, setShowForm] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState(null);

  // ==========================================
  // TEMPORARY FRONTEND DATA
  // ==========================================

  const [batches, setBatches] = useState([
    {
      id: 1,
      batchNumber: "PF-2026-001",
      productCode: "PRD-001",
      product: "Parfait 500ml",
      supplier: "Fresh Foods Ltd",
      manufacturingDate: "2026-08-01",
      expiryDate: "2026-08-25",
      quantityReceived: 100,
      quantityRemaining: 65,
      costPrice: 1500,
      status: "Expiring Soon",
    },
    {
      id: 2,
      batchNumber: "PF-2026-002",
      productCode: "PRD-002",
      product: "Parfait 1L",
      supplier: "Premium Suppliers",
      manufacturingDate: "2026-08-10",
      expiryDate: "2026-09-15",
      quantityReceived: 80,
      quantityRemaining: 80,
      costPrice: 2800,
      status: "Active",
    },
    {
      id: 3,
      batchNumber: "PF-2026-003",
      productCode: "PRD-003",
      product: "Chocolate Parfait",
      supplier: "Fresh Foods Ltd",
      manufacturingDate: "2026-07-20",
      expiryDate: "2026-08-15",
      quantityReceived: 50,
      quantityRemaining: 12,
      costPrice: 1800,
      status: "Expired",
    },
    {
      id: 4,
      batchNumber: "PF-2026-004",
      productCode: "PRD-004",
      product: "Strawberry Parfait",
      supplier: "Premium Suppliers",
      manufacturingDate: "2026-08-12",
      expiryDate: "2026-08-28",
      quantityReceived: 60,
      quantityRemaining: 42,
      costPrice: 1700,
      status: "Expiring Soon",
    },
  ]);

  // ==========================================
  // DATE HELPERS
  // ==========================================

  const getDaysUntilExpiry = (expiryDate) => {
    const today = new Date();
    const expiry = new Date(expiryDate);

    today.setHours(0, 0, 0, 0);
    expiry.setHours(0, 0, 0, 0);

    const difference =
      expiry.getTime() - today.getTime();

    return Math.ceil(
      difference / (1000 * 60 * 60 * 24)
    );
  };

  // ==========================================
  // AUTOMATIC STATUS
  // ==========================================

  const getExpiryStatus = (expiryDate) => {
    const days = getDaysUntilExpiry(expiryDate);

    if (days < 0) {
      return "Expired";
    }

    if (days <= 7) {
      return "Expiring Soon";
    }

    if (days <= 30) {
      return "Expiring Within 30 Days";
    }

    return "Active";
  };

  // ==========================================
  // FILTER
  // ==========================================

  const filteredBatches = useMemo(() => {
    const query = search.toLowerCase().trim();

    return batches.filter((batch) => {
      const status = getExpiryStatus(
        batch.expiryDate
      );

      const matchesSearch =
        batch.product
          .toLowerCase()
          .includes(query) ||
        batch.productCode
          .toLowerCase()
          .includes(query) ||
        batch.batchNumber
          .toLowerCase()
          .includes(query) ||
        batch.supplier
          .toLowerCase()
          .includes(query);

      const matchesFilter =
        expiryFilter === "all" ||
        (expiryFilter === "expired" &&
          status === "Expired") ||
        (expiryFilter === "7-days" &&
          status === "Expiring Soon") ||
        (expiryFilter === "30-days" &&
          (status === "Expiring Soon" ||
            status === "Expiring Within 30 Days")) ||
        (expiryFilter === "active" &&
          status === "Active");

      return matchesSearch && matchesFilter;
    });
  }, [batches, search, expiryFilter]);

  // ==========================================
  // STATISTICS
  // ==========================================

  const totalBatches = batches.length;

  const totalQuantity = batches.reduce(
    (total, batch) =>
      total + Number(batch.quantityRemaining || 0),
    0
  );

  const expiredBatches = batches.filter(
    (batch) =>
      getExpiryStatus(batch.expiryDate) === "Expired"
  ).length;

  const expiringIn7Days = batches.filter(
    (batch) => {
      const days = getDaysUntilExpiry(
        batch.expiryDate
      );

      return days >= 0 && days <= 7;
    }
  ).length;

  const expiringIn30Days = batches.filter(
    (batch) => {
      const days = getDaysUntilExpiry(
        batch.expiryDate
      );

      return days >= 0 && days <= 30;
    }
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
  // OPEN FORM
  // ==========================================

  const handleOpenForm = (batch = null) => {
    setSelectedBatch(batch);
    setShowForm(true);
  };

  // ==========================================
  // CLOSE FORM
  // ==========================================

  const handleCloseForm = () => {
    setShowForm(false);
    setSelectedBatch(null);
  };

  // ==========================================
  // SAVE BATCH
  // ==========================================

  const handleSaveBatch = (batchData) => {
    if (batchData.id) {
      setBatches((current) =>
        current.map((batch) =>
          batch.id === batchData.id
            ? {
                ...batch,
                ...batchData,
              }
            : batch
        )
      );
    } else {
      setBatches((current) => [
        ...current,
        {
          ...batchData,
          id: Date.now(),
        },
      ]);
    }

    handleCloseForm();
  };

  // ==========================================
  // VIEW BATCH
  // ==========================================

  const handleViewBatch = (batch) => {
    console.log("View batch:", batch);

    // Later:
    // Open batch movement/history/details.
  };

  return (
    <div className="space-y-6">

      {/* =====================================
          HEADER
      ====================================== */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        <div className="flex items-center gap-3">

          <div className="p-3 bg-gray-100 rounded-xl">
            <CalendarClock
              className="w-6 h-6 text-gray-700"
            />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Batch & Expiry Tracking
            </h1>

            <p className="text-sm text-gray-500 mt-1">
              Monitor product batches, expiry dates and
              remaining quantities.
            </p>
          </div>

        </div>

        <button
          type="button"
          onClick={() => handleOpenForm()}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gray-900 text-white hover:bg-gray-800 transition"
        >
          <Plus className="w-4 h-4" />

          Add Batch
        </button>

      </div>

      {/* =====================================
          STATISTICS
      ====================================== */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">

        {/* Total Batches */}

        <div className="bg-white border border-gray-200 rounded-2xl p-5">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-gray-500">
                Total Batches
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-2">
                {totalBatches}
              </h2>
            </div>

            <div className="p-3 bg-gray-100 rounded-xl">
              <Package className="w-5 h-5" />
            </div>

          </div>

        </div>

        {/* Expired */}

        <div className="bg-white border border-gray-200 rounded-2xl p-5">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-gray-500">
                Expired Batches
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-2">
                {expiredBatches}
              </h2>
            </div>

            <div className="p-3 bg-gray-100 rounded-xl">
              <XCircle className="w-5 h-5" />
            </div>

          </div>

        </div>

        {/* 7 Days */}

        <div className="bg-white border border-gray-200 rounded-2xl p-5">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-gray-500">
                Expiring in 7 Days
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-2">
                {expiringIn7Days}
              </h2>
            </div>

            <div className="p-3 bg-gray-100 rounded-xl">
              <AlertTriangle className="w-5 h-5" />
            </div>

          </div>

        </div>

        {/* 30 Days */}

        <div className="bg-white border border-gray-200 rounded-2xl p-5">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-gray-500">
                Expiring in 30 Days
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-2">
                {expiringIn30Days}
              </h2>
            </div>

            <div className="p-3 bg-gray-100 rounded-xl">
              <CalendarClock className="w-5 h-5" />
            </div>

          </div>

        </div>

      </div>

      {/* =====================================
          CURRENT STOCK
      ====================================== */}

      <div className="bg-white border border-gray-200 rounded-2xl p-5">

        <div className="flex items-center gap-3">

          <div className="p-3 bg-gray-100 rounded-xl">
            <CheckCircle2 className="w-5 h-5" />
          </div>

          <div>

            <p className="text-sm text-gray-500">
              Remaining Units Across Batches
            </p>

            <h3 className="text-xl font-bold text-gray-900 mt-1">
              {totalQuantity.toLocaleString()} units
            </h3>

          </div>

        </div>

      </div>

      {/* =====================================
          SEARCH & FILTER
      ====================================== */}

      <div className="bg-white border border-gray-200 rounded-2xl p-5">

        <div className="flex flex-col lg:flex-row gap-4">

          {/* Search */}

          <div className="relative flex-1">

            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={19}
            />

            <input
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search product, batch or supplier..."
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
              value={expiryFilter}
              onChange={(e) =>
                setExpiryFilter(e.target.value)
              }
              className="px-4 py-3 border border-gray-200 rounded-xl bg-white outline-none"
            >
              <option value="all">
                All Batches
              </option>

              <option value="expired">
                Expired
              </option>

              <option value="7-days">
                Expiring in 7 Days
              </option>

              <option value="30-days">
                Expiring in 30 Days
              </option>

              <option value="active">
                Active
              </option>
            </select>

          </div>

        </div>

      </div>

      {/* =====================================
          TABLE
      ====================================== */}

      <BatchExpiryTable
        batches={filteredBatches}
        onView={handleViewBatch}
        onEdit={handleOpenForm}
        formatCurrency={formatCurrency}
        getDaysUntilExpiry={getDaysUntilExpiry}
        getExpiryStatus={getExpiryStatus}
      />

      {/* =====================================
          FORM
      ====================================== */}

      {showForm && (
        <BatchExpiryForm
          selectedBatch={selectedBatch}
          onClose={handleCloseForm}
          onSave={handleSaveBatch}
        />
      )}

    </div>
  );
};

export default BatchExpiryMaster;