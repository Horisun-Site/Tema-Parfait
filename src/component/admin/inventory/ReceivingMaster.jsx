import React, { useMemo, useState } from "react";
import {
  Plus,
  Search,
  Warehouse,
  PackageCheck,
  ClipboardList,
  CircleDollarSign,
} from "lucide-react";

import ReceivingForm from "./ReceivingForm";
import ReceivingTable from "./ReceivingTable";

const emptyReceiving = {
  grnNumber: "",
  supplier: "",
  receivingDate: "",
  product: "",
  batchNumber: "",
  manufacturingDate: "",
  expiryDate: "",
  quantity: "",
  cost: "",
  total: 0,
};

const ReceivingMaster = () => {
  const [receivings, setReceivings] = useState([]);

  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState(emptyReceiving);

  const [search, setSearch] = useState("");

  // =========================
  // STATISTICS
  // =========================

  const stats = useMemo(() => {
    const totalGRNs = receivings.length;

    const totalQuantity = receivings.reduce(
      (sum, receiving) =>
        sum + Number(receiving.quantity || 0),
      0
    );

    const totalValue = receivings.reduce(
      (sum, receiving) =>
        sum + Number(receiving.total || 0),
      0
    );

    const suppliers = new Set(
      receivings.map((receiving) => receiving.supplier)
    ).size;

    return {
      totalGRNs,
      totalQuantity,
      totalValue,
      suppliers,
    };
  }, [receivings]);

  // =========================
  // SEARCH
  // =========================

  const filteredReceivings = useMemo(() => {
    const searchValue = search.toLowerCase();

    return receivings.filter((receiving) => {
      return (
        receiving.grnNumber
          .toLowerCase()
          .includes(searchValue) ||
        receiving.supplier
          .toLowerCase()
          .includes(searchValue) ||
        receiving.product
          .toLowerCase()
          .includes(searchValue) ||
        receiving.batchNumber
          .toLowerCase()
          .includes(searchValue)
      );
    });
  }, [receivings, search]);

  // =========================
  // OPEN NEW GRN
  // =========================

  const openNewReceiving = () => {
    const today = new Date()
      .toISOString()
      .split("T")[0];

    setFormData({
      ...emptyReceiving,

      grnNumber: `GRN-${String(
        receivings.length + 1
      ).padStart(4, "0")}`,

      receivingDate: today,
    });

    setShowForm(true);
  };

  // =========================
  // SAVE RECEIVING
  // =========================

  const handleSave = (receiving) => {
    const quantity = Number(receiving.quantity || 0);
    const cost = Number(receiving.cost || 0);

    const total = quantity * cost;

    const newReceiving = {
      ...receiving,
      quantity,
      cost,
      total,
    };

    setReceivings((prev) => [
      ...prev,
      newReceiving,
    ]);

    setShowForm(false);

    setFormData(emptyReceiving);
  };

  return (
    <div className="space-y-6">

      {/* =========================
          HEADER
      ========================== */}

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Stock Receiving
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Receive stock from suppliers and manage goods received notes.
          </p>
        </div>

        <button
          onClick={openNewReceiving}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition"
        >
          <Plus size={18} />
          New GRN
        </button>

      </div>

      {/* =========================
          STATISTICS
      ========================== */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

        <StatCard
          title="Total GRNs"
          value={stats.totalGRNs}
          icon={ClipboardList}
        />

        <StatCard
          title="Units Received"
          value={stats.totalQuantity.toLocaleString()}
          icon={PackageCheck}
        />

        <StatCard
          title="Stock Value Received"
          value={`₦${stats.totalValue.toLocaleString()}`}
          icon={CircleDollarSign}
        />

        <StatCard
          title="Suppliers"
          value={stats.suppliers}
          icon={Warehouse}
        />

      </div>

      {/* =========================
          SEARCH
      ========================== */}

      <div className="bg-white border border-gray-200 rounded-2xl p-4">

        <div className="relative">

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
            placeholder="Search GRN, supplier, product or batch number..."
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg outline-none text-sm"
          />

        </div>

      </div>

      {/* =========================
          RECEIVING TABLE
      ========================== */}

      <ReceivingTable
        receivings={filteredReceivings}
        onView={(receiving) =>
          console.log(
            "View GRN:",
            receiving
          )
        }
        onEdit={(receiving) =>
          console.log(
            "Edit GRN:",
            receiving
          )
        }
      />

      {/* =========================
          RECEIVING FORM
      ========================== */}

      {showForm && (
        <ReceivingForm
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

export default ReceivingMaster;