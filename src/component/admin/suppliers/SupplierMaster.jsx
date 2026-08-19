import React, { useMemo, useState } from "react";
import {
  Plus,
  Search,
  Truck,
  UserCheck,
  CreditCard,
  Wallet,
} from "lucide-react";

import SupplierForm from "./SupplierForm";
import SupplierTable from "./SupplierTable";

const emptySupplier = {
  supplierId: "",
  supplierName: "",
  contactPerson: "",
  telephone: "",
  email: "",
  address: "",
  paymentTerms: "",
  balance: 0,
  isActive: true,
  notes: "",
};

const SupplierMaster = () => {
  const [suppliers, setSuppliers] = useState([]);

  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState(emptySupplier);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState("all");

  // =========================
  // SUPPLIER STATISTICS
  // =========================

  const stats = useMemo(() => {
    const total = suppliers.length;

    const active = suppliers.filter(
      (supplier) => supplier.isActive
    ).length;

    const outstanding = suppliers.filter(
      (supplier) => Number(supplier.balance) > 0
    ).length;

    const totalBalance = suppliers.reduce(
      (sum, supplier) =>
        sum + Number(supplier.balance || 0),
      0
    );

    return {
      total,
      active,
      outstanding,
      totalBalance,
    };
  }, [suppliers]);

  // =========================
  // SEARCH + FILTER
  // =========================

  const filteredSuppliers = useMemo(() => {
    return suppliers.filter((supplier) => {
      const searchValue = search.toLowerCase();

      const matchesSearch =
        supplier.supplierName
          .toLowerCase()
          .includes(searchValue) ||
        supplier.supplierId
          .toLowerCase()
          .includes(searchValue) ||
        supplier.contactPerson
          .toLowerCase()
          .includes(searchValue);

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "active" &&
          supplier.isActive) ||
        (statusFilter === "inactive" &&
          !supplier.isActive) ||
        (statusFilter === "outstanding" &&
          Number(supplier.balance) > 0);

      return matchesSearch && matchesStatus;
    });
  }, [suppliers, search, statusFilter]);

  // =========================
  // OPEN ADD SUPPLIER
  // =========================

  const openAddSupplier = () => {
    setFormData({
      ...emptySupplier,
      supplierId: `SUP-${String(
        suppliers.length + 1
      ).padStart(4, "0")}`,
    });

    setShowForm(true);
  };

  // =========================
  // SAVE SUPPLIER
  // =========================

  const handleSave = (supplier) => {
    setSuppliers((prev) => [
      ...prev,
      {
        ...supplier,
        balance: Number(supplier.balance || 0),
      },
    ]);

    setShowForm(false);

    setFormData(emptySupplier);
  };

  return (
    <div className="space-y-6">

      {/* =========================
          HEADER
      ========================== */}

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Supplier Management
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Manage suppliers, supplier accounts and outstanding balances.
          </p>
        </div>

        <button
          onClick={openAddSupplier}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition"
        >
          <Plus size={18} />
          Add Supplier
        </button>

      </div>

      {/* =========================
          STATISTICS
      ========================== */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

        <StatCard
          title="Total Suppliers"
          value={stats.total}
          icon={Truck}
        />

        <StatCard
          title="Active Suppliers"
          value={stats.active}
          icon={UserCheck}
        />

        <StatCard
          title="Outstanding Accounts"
          value={stats.outstanding}
          icon={CreditCard}
        />

        <StatCard
          title="Total Outstanding"
          value={`₦${stats.totalBalance.toLocaleString()}`}
          icon={Wallet}
        />

      </div>

      {/* =========================
          SEARCH + FILTER
      ========================== */}

      <div className="bg-white border border-gray-200 rounded-2xl p-4">

        <div className="flex flex-col md:flex-row gap-3">

          <div className="relative flex-1">

            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search supplier, ID or contact person..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg outline-none text-sm"
            />

          </div>

          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value)
            }
            className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none"
          >

            <option value="all">
              All Suppliers
            </option>

            <option value="active">
              Active
            </option>

            <option value="inactive">
              Inactive
            </option>

            <option value="outstanding">
              Outstanding Balance
            </option>

          </select>

        </div>

      </div>

      {/* =========================
          SUPPLIER TABLE
      ========================== */}

      <SupplierTable
        suppliers={filteredSuppliers}
        onView={(supplier) =>
          console.log("View supplier:", supplier)
        }
        onEdit={(supplier) =>
          console.log("Edit supplier:", supplier)
        }
      />

      {/* =========================
          SUPPLIER FORM
      ========================== */}

      {showForm && (
        <SupplierForm
          onClose={() => setShowForm(false)}
          onSave={handleSave}
          formData={formData}
          setFormData={setFormData}
        />
      )}

    </div>
  );
};


// =========================
// STAT CARD
// =========================

const StatCard = ({
  title,
  value,
  icon: Icon,
}) => {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5">

      <div className="flex items-start justify-between">

        <div>

          <p className="text-sm text-gray-500">
            {title}
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-2">
            {value}
          </h2>

        </div>

        <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
          <Icon size={20} />
        </div>

      </div>

    </div>
  );
};

export default SupplierMaster;