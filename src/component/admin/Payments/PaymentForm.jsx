import React, { useEffect, useMemo, useState } from "react";
import {
  X,
  CreditCard,
  User,
  Receipt,
  CalendarDays,
  Save,
  Banknote,
  Landmark,
  Smartphone,
  FileText,
} from "lucide-react";

const PaymentForm = ({
  payment = null,
  onClose,
  onSave,
}) => {
  // ==========================================
  // TEMPORARY FRONTEND DATA
  // Will later come from the database
  // ==========================================

  const customers = [
    {
      id: "CUS-001",
      name: "ABC Supermarket",
      branch: "Main Branch",
      telephone: "08000000001",
    },
    {
      id: "CUS-002",
      name: "Fresh Mart",
      branch: "Lagos Branch",
      telephone: "08000000002",
    },
    {
      id: "CUS-003",
      name: "Mega Foods",
      branch: "Ikeja Branch",
      telephone: "08000000003",
    },
  ];

  const invoices = [
    {
      id: 1,
      invoiceNumber: "TF-20260819-0001",
      customerId: "CUS-001",
      customer: "ABC Supermarket",
      total: 86000,
      amountPaid: 86000,
      balance: 0,
    },
    {
      id: 2,
      invoiceNumber: "TF-20260819-0002",
      customerId: "CUS-002",
      customer: "Fresh Mart",
      total: 118250,
      amountPaid: 50000,
      balance: 68250,
    },
    {
      id: 3,
      invoiceNumber: "TF-20260820-0001",
      customerId: "CUS-003",
      customer: "Mega Foods",
      total: 250000,
      amountPaid: 0,
      balance: 250000,
    },
  ];

  // ==========================================
  // FORM STATE
  // ==========================================

  const [customerId, setCustomerId] = useState(
    payment?.customerId || ""
  );

  const [invoiceNumber, setInvoiceNumber] =
    useState(
      payment?.invoiceNumber || ""
    );

  const [amount, setAmount] = useState(
    payment?.amount || ""
  );

  const [method, setMethod] = useState(
    payment?.method || "Bank Transfer"
  );

  const [paymentDate, setPaymentDate] =
    useState(
      payment?.date ||
        new Date().toISOString().slice(0, 10)
    );

  const [status, setStatus] = useState(
    payment?.status || "Paid"
  );

  const [reference, setReference] = useState(
    payment?.reference || ""
  );

  const [notes, setNotes] = useState(
    payment?.notes || ""
  );

  const [isSaving, setIsSaving] =
    useState(false);

  // ==========================================
  // UPDATE FORM WHEN EDITING
  // ==========================================

  useEffect(() => {
    if (payment) {
      setCustomerId(
        payment.customerId || ""
      );

      setInvoiceNumber(
        payment.invoiceNumber || ""
      );

      setAmount(payment.amount || "");

      setMethod(
        payment.method || "Bank Transfer"
      );

      setPaymentDate(
        payment.date ||
          new Date()
            .toISOString()
            .slice(0, 10)
      );

      setStatus(
        payment.status || "Paid"
      );

      setReference(
        payment.reference || ""
      );

      setNotes(
        payment.notes || ""
      );
    }
  }, [payment]);

  // ==========================================
  // SELECTED CUSTOMER
  // ==========================================

  const selectedCustomer = useMemo(() => {
    return customers.find(
      (customer) =>
        customer.id === customerId
    );
  }, [customerId]);

  // ==========================================
  // AVAILABLE INVOICES
  // ==========================================

  const customerInvoices = useMemo(() => {
    if (!customerId) return [];

    return invoices.filter(
      (invoice) =>
        invoice.customerId === customerId
    );
  }, [customerId]);

  // ==========================================
  // SELECTED INVOICE
  // ==========================================

  const selectedInvoice = useMemo(() => {
    return invoices.find(
      (invoice) =>
        invoice.invoiceNumber ===
        invoiceNumber
    );
  }, [invoiceNumber]);

  // ==========================================
  // CUSTOMER CHANGE
  // ==========================================

  const handleCustomerChange = (value) => {
    setCustomerId(value);

    // Reset invoice when customer changes
    setInvoiceNumber("");
    setAmount("");
  };

  // ==========================================
  // INVOICE CHANGE
  // ==========================================

  const handleInvoiceChange = (value) => {
    setInvoiceNumber(value);

    const invoice = invoices.find(
      (item) =>
        item.invoiceNumber === value
    );

    // Automatically suggest outstanding balance
    if (invoice) {
      setAmount(invoice.balance);
    }
  };

  // ==========================================
  // CURRENCY
  // ==========================================

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(Number(value || 0));
  };

  // ==========================================
  // PAYMENT METHOD ICON
  // ==========================================

  const getMethodIcon = () => {
    switch (method) {
      case "Cash":
        return Banknote;

      case "Bank Transfer":
        return Landmark;

      case "POS":
        return CreditCard;

      case "Mobile Payment":
        return Smartphone;

      default:
        return CreditCard;
    }
  };

  const MethodIcon = getMethodIcon();

  // ==========================================
  // SAVE PAYMENT
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Customer validation
    if (!customerId) {
      alert("Please select a customer.");
      return;
    }

    // Invoice validation
    if (!invoiceNumber) {
      alert("Please select an invoice.");
      return;
    }

    // Amount validation
    if (
      !amount ||
      Number(amount) <= 0
    ) {
      alert(
        "Please enter a valid payment amount."
      );
      return;
    }

    // Prevent overpayment
    if (
      selectedInvoice &&
      Number(amount) >
        Number(selectedInvoice.balance)
    ) {
      alert(
        `Payment amount cannot exceed the outstanding balance of ${formatCurrency(
          selectedInvoice.balance
        )}.`
      );

      return;
    }

    setIsSaving(true);

    const paymentData = {
      customerId,

      customer:
        selectedCustomer?.name || "",

      invoiceNumber,

      amount: Number(amount),

      method,

      date: paymentDate,

      status,

      reference,

      notes,

      time:
        payment?.time ||
        new Date().toLocaleTimeString(
          "en-NG",
          {
            hour: "2-digit",
            minute: "2-digit",
          }
        ),
    };

    try {
      // Temporary frontend delay
      await new Promise((resolve) =>
        setTimeout(resolve, 300)
      );

      onSave?.(paymentData);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">

      <div className="w-full max-w-5xl max-h-[95vh] bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col">

        {/* ====================================
            HEADER
        ===================================== */}

        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">

          <div className="flex items-center gap-3">

            <div className="p-3 bg-gray-100 rounded-xl">
              <CreditCard
                size={22}
                className="text-gray-700"
              />
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900">
                {payment
                  ? "Edit Payment"
                  : "Record New Payment"}
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Record and manage customer payments.
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

        {/* ====================================
            FORM
        ===================================== */}

        <form
          onSubmit={handleSubmit}
          className="flex-1 overflow-y-auto"
        >

          <div className="p-6 space-y-6">

            {/* ================================
                CUSTOMER & INVOICE
            ================================= */}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

              {/* CUSTOMER */}

              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5">

                <div className="flex items-center gap-2 mb-5">

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
                      onChange={(e) =>
                        handleCustomerChange(
                          e.target.value
                        )
                      }
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white outline-none focus:ring-2 focus:ring-gray-200"
                    >
                      <option value="">
                        Select customer
                      </option>

                      {customers.map(
                        (customer) => (
                          <option
                            key={customer.id}
                            value={customer.id}
                          >
                            {customer.name} —{" "}
                            {customer.branch}
                          </option>
                        )
                      )}
                    </select>

                  </div>

                  {selectedCustomer && (

                    <div className="grid grid-cols-2 gap-3">

                      <InfoBox
                        label="Customer ID"
                        value={
                          selectedCustomer.id
                        }
                      />

                      <InfoBox
                        label="Telephone"
                        value={
                          selectedCustomer.telephone
                        }
                      />

                    </div>

                  )}

                </div>

              </div>

              {/* INVOICE */}

              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5">

                <div className="flex items-center gap-2 mb-5">

                  <Receipt size={18} />

                  <h3 className="font-semibold text-gray-900">
                    Invoice Information
                  </h3>

                </div>

                <div className="space-y-4">

                  <div>

                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Invoice *
                    </label>

                    <select
                      value={invoiceNumber}
                      onChange={(e) =>
                        handleInvoiceChange(
                          e.target.value
                        )
                      }
                      disabled={!customerId}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white outline-none disabled:bg-gray-100"
                    >
                      <option value="">
                        Select invoice
                      </option>

                      {customerInvoices.map(
                        (invoice) => (
                          <option
                            key={invoice.id}
                            value={
                              invoice.invoiceNumber
                            }
                          >
                            {
                              invoice.invoiceNumber
                            }
                          </option>
                        )
                      )}

                    </select>

                  </div>

                  {selectedInvoice && (

                    <div className="grid grid-cols-3 gap-3">

                      <InfoBox
                        label="Invoice Total"
                        value={formatCurrency(
                          selectedInvoice.total
                        )}
                      />

                      <InfoBox
                        label="Paid"
                        value={formatCurrency(
                          selectedInvoice.amountPaid
                        )}
                      />

                      <InfoBox
                        label="Balance"
                        value={formatCurrency(
                          selectedInvoice.balance
                        )}
                      />

                    </div>

                  )}

                </div>

              </div>

            </div>

            {/* ================================
                PAYMENT DETAILS
            ================================= */}

            <div className="bg-white border border-gray-200 rounded-2xl p-5">

              <div className="flex items-center gap-2 mb-5">

                <MethodIcon size={18} />

                <h3 className="font-semibold text-gray-900">
                  Payment Details
                </h3>

              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

                {/* Amount */}

                <div>

                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Payment Amount *
                  </label>

                  <input
                    type="number"
                    min="1"
                    value={amount}
                    onChange={(e) =>
                      setAmount(
                        e.target.value
                      )
                    }
                    placeholder="Enter amount"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-gray-200"
                  />

                </div>

                {/* Method */}

                <div>

                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Payment Method *
                  </label>

                  <select
                    value={method}
                    onChange={(e) =>
                      setMethod(
                        e.target.value
                      )
                    }
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white outline-none"
                  >
                    <option value="Cash">
                      Cash
                    </option>

                    <option value="Bank Transfer">
                      Bank Transfer
                    </option>

                    <option value="POS">
                      POS
                    </option>

                    <option value="Mobile Payment">
                      Mobile Payment
                    </option>
                  </select>

                </div>

                {/* Date */}

                <div>

                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Payment Date *
                  </label>

                  <input
                    type="date"
                    value={paymentDate}
                    onChange={(e) =>
                      setPaymentDate(
                        e.target.value
                      )
                    }
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none"
                  />

                </div>

                {/* Status */}

                <div>

                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Payment Status
                  </label>

                  <select
                    value={status}
                    onChange={(e) =>
                      setStatus(
                        e.target.value
                      )
                    }
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white outline-none"
                  >
                    <option value="Paid">
                      Paid
                    </option>

                    <option value="Pending">
                      Pending
                    </option>

                    <option value="Failed">
                      Failed
                    </option>
                  </select>

                </div>

                {/* Reference */}

                <div className="md:col-span-2">

                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Payment Reference
                  </label>

                  <input
                    type="text"
                    value={reference}
                    onChange={(e) =>
                      setReference(
                        e.target.value
                      )
                    }
                    placeholder="Bank reference, transaction ID..."
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none"
                  />

                </div>

              </div>

            </div>

            {/* ================================
                NOTES
            ================================= */}

            <div className="bg-white border border-gray-200 rounded-2xl p-5">

              <div className="flex items-center gap-2 mb-3">

                <FileText size={18} />

                <label className="font-semibold text-gray-900">
                  Notes
                </label>

              </div>

              <textarea
                value={notes}
                onChange={(e) =>
                  setNotes(e.target.value)
                }
                rows={4}
                placeholder="Add additional notes about this payment..."
                className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none resize-none"
              />

            </div>

          </div>

          {/* ==================================
              FOOTER
          =================================== */}

          <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">

            <p className="text-sm text-gray-500">
              {selectedInvoice
                ? `Outstanding Balance: ${formatCurrency(
                    selectedInvoice.balance
                  )}`
                : "Select a customer and invoice to record payment."}
            </p>

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
                  : payment
                  ? "Update Payment"
                  : "Save Payment"}
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

const InfoBox = ({
  label,
  value,
}) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-3">

      <p className="text-xs text-gray-500">
        {label}
      </p>

      <p className="text-sm font-medium text-gray-900 mt-1 truncate">
        {value}
      </p>

    </div>
  );
};

export default PaymentForm;