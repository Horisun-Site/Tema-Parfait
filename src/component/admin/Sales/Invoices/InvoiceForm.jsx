import React, { useEffect, useMemo, useState } from "react";
import {
  X,
  Receipt,
  User,
  CalendarDays,
  CreditCard,
  Truck,
  Save,
} from "lucide-react";

import InvoiceItems from "./InvoiceItems";
import InvoiceSummary from "./InvoiceSummary";

const InvoiceForm = ({ invoice = null, onClose, onSave }) => {
  // ==========================================
  // TEMPORARY DATA
  // ==========================================
  // These will eventually come from FastAPI.

  const customers = [
    {
      id: "CUS-001",
      name: "ABC Supermarket",
      branch: "Main Branch",
      telephone: "08000000001",
      creditLimit: 500000,
      balance: 120000,
    },
    {
      id: "CUS-002",
      name: "Fresh Mart",
      branch: "Lagos Branch",
      telephone: "08000000002",
      creditLimit: 750000,
      balance: 250000,
    },
    {
      id: "CUS-003",
      name: "Mega Foods",
      branch: "Ikeja Branch",
      telephone: "08000000003",
      creditLimit: 1000000,
      balance: 180000,
    },
  ];

  // ==========================================
  // FORM STATE
  // ==========================================

  const [customerId, setCustomerId] = useState(invoice?.customerId || "");

  const [invoiceDate, setInvoiceDate] = useState(
    invoice?.date || new Date().toISOString().slice(0, 10)
  );

  const [paymentStatus, setPaymentStatus] = useState(
    invoice?.paymentStatus || "Pending"
  );

  const [deliveryStatus, setDeliveryStatus] = useState(
    invoice?.deliveryStatus || "Pending"
  );

  const [notes, setNotes] = useState(invoice?.notes || "");

  const [items, setItems] = useState(invoice?.items ?? []);

  const [isSaving, setIsSaving] = useState(false);

  // ==========================================
  // SELECTED CUSTOMER
  // ==========================================

  const selectedCustomer = useMemo(() => {
    return customers.find((customer) => customer.id === customerId);
  }, [customerId]);

  // ==========================================
  // INVOICE CALCULATIONS
  // ==========================================

  const subtotal = useMemo(() => {
    return items.reduce(
      (total, item) =>
        total + Number(item.quantity || 0) * Number(item.price || 0),
      0
    );
  }, [items]);

  const discount = useMemo(() => {
    return items.reduce((total, item) => total + Number(item.discount || 0), 0);
  }, [items]);

  const taxableAmount = Math.max(0, subtotal - discount);

  // Temporary VAT rate.
  // We will make this configurable later.
  const vatRate = 7.5;

  const vat = useMemo(() => {
    return taxableAmount * (vatRate / 100);
  }, [taxableAmount]);

  const grandTotal = taxableAmount + vat;

  // ==========================================
  // UPDATE ITEMS
  // ==========================================

  const handleItemsChange = (updatedItems) => {
    setItems(updatedItems);
  };

  // ==========================================
  // SAVE
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!customerId) {
      alert("Please select a customer.");
      return;
    }

    if (items.length === 0) {
      alert("Please add at least one product.");
      return;
    }

    const invalidItem = items.some(
      (item) => !item.productId || Number(item.quantity || 0) <= 0
    );

    if (invalidItem) {
      alert("Please complete all product lines.");
      return;
    }

    setIsSaving(true);

    const invoiceData = {
      customerId,
      customer: selectedCustomer?.name || "",
      date: invoiceDate,

      // This will eventually be generated
      // by FastAPI/database.
      time:
        invoice?.time ||
        new Date().toLocaleTimeString("en-NG", {
          hour: "2-digit",
          minute: "2-digit",
        }),

      items,

      subtotal,
      discount,
      vat,
      vatRate,
      total: grandTotal,

      paymentStatus,
      deliveryStatus,

      notes,
    };

    try {
      await new Promise((resolve) => setTimeout(resolve, 300));

      onSave?.(invoiceData);
    } finally {
      setIsSaving(false);
    }
  };

  // ==========================================
  // CURRENCY
  // ==========================================

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 2,
    }).format(amount || 0);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
      <div className="w-full max-w-7xl max-h-[95vh] bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col">
        {/* ======================================
            HEADER
        ======================================= */}

        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gray-100 rounded-xl">
              <Receipt size={22} className="text-gray-700" />
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900">
                {invoice ? "Edit Invoice" : "Create New Invoice"}
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Create and manage a customer sales invoice.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition"
          >
            <X size={21} />
          </button>
        </div>

        {/* ======================================
            FORM BODY
        ======================================= */}

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-6">
            {/* ==================================
                CUSTOMER & INVOICE INFORMATION
            =================================== */}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Customer */}

              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-4">
                  <User size={18} />

                  <h3 className="font-semibold text-gray-900">
                    Customer Information
                  </h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Customer *
                    </label>

                    <select
                      value={customerId}
                      onChange={(e) => setCustomerId(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white outline-none focus:ring-2 focus:ring-gray-200"
                      required
                    >
                      <option value="">Select customer</option>

                      {customers.map((customer) => (
                        <option key={customer.id} value={customer.id}>
                          {customer.name} — {customer.branch}
                        </option>
                      ))}
                    </select>
                  </div>

                  {selectedCustomer && (
                    <div className="grid grid-cols-2 gap-3">
                      <InfoBox
                        label="Customer ID"
                        value={selectedCustomer.id}
                      />

                      <InfoBox
                        label="Telephone"
                        value={selectedCustomer.telephone}
                      />

                      <InfoBox
                        label="Credit Limit"
                        value={formatCurrency(selectedCustomer.creditLimit)}
                      />

                      <InfoBox
                        label="Current Balance"
                        value={formatCurrency(selectedCustomer.balance)}
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Invoice Details */}

              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-4">
                  <CalendarDays size={18} />

                  <h3 className="font-semibold text-gray-900">
                    Invoice Information
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Invoice Date *
                    </label>

                    <input
                      type="date"
                      value={invoiceDate}
                      onChange={(e) => setInvoiceDate(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Payment Status
                    </label>

                    <select
                      value={paymentStatus}
                      onChange={(e) => setPaymentStatus(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white outline-none"
                    >
                      <option value="Pending">Pending</option>

                      <option value="Paid">Paid</option>

                      <option value="Partially Paid">Partially Paid</option>

                      <option value="Overdue">Overdue</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Delivery Status
                    </label>

                    <select
                      value={deliveryStatus}
                      onChange={(e) => setDeliveryStatus(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white outline-none"
                    >
                      <option value="Pending">Pending</option>

                      <option value="Processing">Processing</option>

                      <option value="Delivered">Delivered</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Invoice Number
                    </label>

                    <input
                      type="text"
                      value={invoice?.invoiceNumber || "Auto-generated"}
                      disabled
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-100 text-gray-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* ==================================
                PRODUCTS
            =================================== */}

            <InvoiceItems items={items} onChange={handleItemsChange} />

            {/* ==================================
                SUMMARY
            =================================== */}

            <InvoiceSummary
              subtotal={subtotal}
              discount={discount}
              vat={vat}
              vatRate={vatRate}
              total={grandTotal}
              formatCurrency={formatCurrency}
            />

            {/* ==================================
                NOTES
            =================================== */}

            <div className="bg-white border border-gray-200 rounded-2xl p-5">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notes
              </label>

              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                placeholder="Add any notes for this invoice..."
                className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none resize-none"
              />
            </div>
          </div>

          {/* ====================================
              FOOTER
          ===================================== */}

          <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <CreditCard size={17} />

              <span>Payment: {paymentStatus}</span>

              <span className="text-gray-300">|</span>

              <Truck size={17} />

              <span>Delivery: {deliveryStatus}</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-3 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 transition"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isSaving}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gray-900 text-white hover:bg-gray-800 disabled:opacity-50 transition"
              >
                <Save size={17} />

                {isSaving
                  ? "Saving..."
                  : invoice
                  ? "Update Invoice"
                  : "Save Invoice"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

// ==========================================
// INFO BOX
// ==========================================

const InfoBox = ({ label, value }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-3">
      <p className="text-xs text-gray-500">{label}</p>

      <p className="text-sm font-medium text-gray-900 mt-1 truncate">{value}</p>
    </div>
  );
};

export default InvoiceForm;
