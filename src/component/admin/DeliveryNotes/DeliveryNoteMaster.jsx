import React, { useMemo, useState } from "react";
import {
  Search,
  Truck,
  Plus,
  PackageCheck,
  Clock,
  CheckCircle2,
  XCircle,
  SlidersHorizontal,
} from "lucide-react";

import DeliveryNoteTable from "./DeliveryNoteTable";
import DeliveryNoteForm from "./DeliveryNoteForm";

const DeliveryNoteMaster = () => {
  // ==========================================
  // STATE
  // ==========================================

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [showForm, setShowForm] = useState(false);
  const [selectedDeliveryNote, setSelectedDeliveryNote] =
    useState(null);

  // ==========================================
  // TEMPORARY FRONTEND DATA
  // ==========================================

  const [deliveryNotes, setDeliveryNotes] = useState([
    {
      id: 1,
      deliveryNoteNumber: "DN-20260819-0001",
      invoiceNumber: "TF-20260819-0001",
      customerId: "CUS-001",
      customer: "ABC Supermarket",
      deliveryAddress: "Main Branch, Lagos",
      telephone: "08000000001",
      deliveryDate: "2026-08-19",
      deliveryTime: "11:30 AM",
      driver: "John Delivery",
      vehicle: "VAN-001",
      status: "Delivered",
      items: [
        {
          productId: "PRD-001",
          product: "Parfait 500ml",
          quantity: 50,
        },
        {
          productId: "PRD-002",
          product: "Parfait 1L",
          quantity: 20,
        },
      ],
      notes: "Delivered successfully.",
    },

    {
      id: 2,
      deliveryNoteNumber: "DN-20260820-0001",
      invoiceNumber: "TF-20260819-0002",
      customerId: "CUS-002",
      customer: "Fresh Mart",
      deliveryAddress: "Lagos Branch",
      telephone: "08000000002",
      deliveryDate: "2026-08-20",
      deliveryTime: "02:00 PM",
      driver: "Michael Transport",
      vehicle: "VAN-002",
      status: "Processing",
      items: [
        {
          productId: "PRD-003",
          product: "Chocolate Parfait",
          quantity: 30,
        },
      ],
      notes: "",
    },

    {
      id: 3,
      deliveryNoteNumber: "DN-20260821-0001",
      invoiceNumber: "TF-20260820-0001",
      customerId: "CUS-003",
      customer: "Mega Foods",
      deliveryAddress: "Ikeja Branch",
      telephone: "08000000003",
      deliveryDate: "2026-08-21",
      deliveryTime: "09:00 AM",
      driver: "David Logistics",
      vehicle: "VAN-003",
      status: "Pending",
      items: [
        {
          productId: "PRD-004",
          product: "Strawberry Parfait",
          quantity: 40,
        },
      ],
      notes: "Awaiting dispatch.",
    },
  ]);

  // ==========================================
  // FILTER DELIVERY NOTES
  // ==========================================

  const filteredDeliveryNotes = useMemo(() => {
    const query = search.toLowerCase().trim();

    return deliveryNotes.filter((note) => {
      const matchesSearch =
        note.deliveryNoteNumber
          ?.toLowerCase()
          .includes(query) ||
        note.invoiceNumber
          ?.toLowerCase()
          .includes(query) ||
        note.customer
          ?.toLowerCase()
          .includes(query) ||
        note.customerId
          ?.toLowerCase()
          .includes(query) ||
        note.driver
          ?.toLowerCase()
          .includes(query);

      const matchesStatus =
        statusFilter === "all" ||
        note.status?.toLowerCase() ===
          statusFilter.toLowerCase();

      return matchesSearch && matchesStatus;
    });
  }, [deliveryNotes, search, statusFilter]);

  // ==========================================
  // STATISTICS
  // ==========================================

  const totalDeliveryNotes = deliveryNotes.length;

  const pendingDeliveries = deliveryNotes.filter(
    (note) => note.status === "Pending"
  ).length;

  const processingDeliveries = deliveryNotes.filter(
    (note) => note.status === "Processing"
  ).length;

  const deliveredNotes = deliveryNotes.filter(
    (note) => note.status === "Delivered"
  ).length;

  const cancelledDeliveries = deliveryNotes.filter(
    (note) => note.status === "Cancelled"
  ).length;

  // ==========================================
  // CREATE DELIVERY NOTE
  // ==========================================

  const handleCreateDeliveryNote = () => {
    setSelectedDeliveryNote(null);
    setShowForm(true);
  };

  // ==========================================
  // EDIT DELIVERY NOTE
  // ==========================================

  const handleEditDeliveryNote = (deliveryNote) => {
    setSelectedDeliveryNote(deliveryNote);
    setShowForm(true);
  };

  // ==========================================
  // VIEW DELIVERY NOTE
  // ==========================================

  const handleViewDeliveryNote = (deliveryNote) => {
    console.log(
      "View delivery note:",
      deliveryNote
    );

    // Later:
    // Open DeliveryNotePreview
  };

  // ==========================================
  // SAVE DELIVERY NOTE
  // ==========================================

  const handleSaveDeliveryNote = (
    deliveryNoteData
  ) => {
    if (selectedDeliveryNote) {
      setDeliveryNotes((currentNotes) =>
        currentNotes.map((note) =>
          note.id === selectedDeliveryNote.id
            ? {
                ...note,
                ...deliveryNoteData,
              }
            : note
        )
      );
    } else {
      const newDeliveryNote = {
        id: Date.now(),

        deliveryNoteNumber: `DN-${new Date()
          .toISOString()
          .slice(0, 10)
          .replaceAll("-", "")}-${String(
          deliveryNotes.length + 1
        ).padStart(4, "0")}`,

        ...deliveryNoteData,
      };

      setDeliveryNotes((currentNotes) => [
        ...currentNotes,
        newDeliveryNote,
      ]);
    }

    setShowForm(false);
    setSelectedDeliveryNote(null);
  };

  // ==========================================
  // CLOSE FORM
  // ==========================================

  const handleCloseForm = () => {
    setShowForm(false);
    setSelectedDeliveryNote(null);
  };

  return (
    <div className="space-y-6">

      {/* ======================================
          HEADER
      ======================================= */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        <div className="flex items-center gap-3">

          <div className="p-3 bg-gray-100 rounded-xl">
            <Truck
              size={23}
              className="text-gray-700"
            />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Delivery Notes
            </h1>

            <p className="text-sm text-gray-500 mt-1">
              Create, manage and track customer deliveries.
            </p>
          </div>

        </div>

        <button
          type="button"
          onClick={handleCreateDeliveryNote}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gray-900 text-white hover:bg-gray-800 transition"
        >
          <Plus size={18} />

          New Delivery Note
        </button>

      </div>

      {/* ======================================
          STATISTICS
      ======================================= */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">

        <StatCard
          title="Total Delivery Notes"
          value={totalDeliveryNotes}
          icon={Truck}
        />

        <StatCard
          title="Pending Deliveries"
          value={pendingDeliveries}
          icon={Clock}
        />

        <StatCard
          title="Processing"
          value={processingDeliveries}
          icon={PackageCheck}
        />

        <StatCard
          title="Delivered"
          value={deliveredNotes}
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
              placeholder="Search delivery note, invoice, customer, driver..."
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
                All Deliveries
              </option>

              <option value="pending">
                Pending
              </option>

              <option value="processing">
                Processing
              </option>

              <option value="delivered">
                Delivered
              </option>

              <option value="cancelled">
                Cancelled
              </option>
            </select>

          </div>

        </div>

      </div>

      {/* ======================================
          TABLE
      ======================================= */}

      <DeliveryNoteTable
        deliveryNotes={filteredDeliveryNotes}
        onView={handleViewDeliveryNote}
        onEdit={handleEditDeliveryNote}
      />

      {/* ======================================
          FORM
      ======================================= */}

      {showForm && (
        <DeliveryNoteForm
          deliveryNote={selectedDeliveryNote}
          onClose={handleCloseForm}
          onSave={handleSaveDeliveryNote}
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

export default DeliveryNoteMaster;