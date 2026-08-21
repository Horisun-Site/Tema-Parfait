import React, { useMemo, useState } from "react";
import {
  X,
  RotateCcw,
  FileText,
  User,
  CalendarDays,
  CreditCard,
  Package,
  Save,
  Trash2,
  Plus,
} from "lucide-react";

const SalesReturnForm = ({
  returnItem = null,
  onClose,
  onSave,
}) => {
  // ==========================================
  // TEMPORARY INVOICE DATA
  // ==========================================

  const invoices = [
    {
      invoiceNumber: "TF-20260819-0001",
      customerId: "CUS-001",
      customer: "ABC Supermarket",
      date: "2026-08-19",

      items: [
        {
          productId: "PRD-001",
          product: "Parfait 500ml",
          quantity: 100,
          price: 500,
        },
        {
          productId: "PRD-002",
          product: "Parfait 1L",
          quantity: 50,
          price: 1200,
        },
      ],
    },

    {
      invoiceNumber: "TF-20260819-0002",
      customerId: "CUS-002",
      customer: "Fresh Mart",
      date: "2026-08-19",

      items: [
        {
          productId: "PRD-003",
          product: "Chocolate Parfait",
          quantity: 100,
          price: 800,
        },
        {
          productId: "PRD-004",
          product: "Strawberry Parfait",
          quantity: 50,
          price: 1000,
        },
      ],
    },

    {
      invoiceNumber: "TF-20260819-0003",
      customerId: "CUS-003",
      customer: "Mega Foods",
      date: "2026-08-20",

      items: [
        {
          productId: "PRD-004",
          product: "Strawberry Parfait",
          quantity: 80,
          price: 1000,
        },
      ],
    },
  ];

  // ==========================================
  // FORM STATE
  // ==========================================

  const [invoiceNumber, setInvoiceNumber] = useState(
    returnItem?.invoiceNumber || ""
  );

  const [returnDate, setReturnDate] = useState(
    returnItem?.date ||
      new Date().toISOString().slice(0, 10)
  );

  const [reason, setReason] = useState(
    returnItem?.reason || ""
  );

  const [refundMethod, setRefundMethod] =
    useState(
      returnItem?.refundMethod || "Credit Note"
    );

  const [status, setStatus] = useState(
    returnItem?.status || "Pending"
  );

  const [notes, setNotes] = useState(
    returnItem?.notes || ""
  );

  const [items, setItems] = useState(
    returnItem?.items || []
  );

  const [isSaving, setIsSaving] = useState(false);

  // ==========================================
  // SELECTED INVOICE
  // ==========================================

  const selectedInvoice = useMemo(() => {
    return invoices.find(
      (invoice) =>
        invoice.invoiceNumber === invoiceNumber
    );
  }, [invoiceNumber]);

  // ==========================================
  // CUSTOMER
  // ==========================================

  const customer = useMemo(() => {
    if (!selectedInvoice) {
      return null;
    }

    return {
      id: selectedInvoice.customerId,
      name: selectedInvoice.customer,
    };
  }, [selectedInvoice]);

  // ==========================================
  // SELECT INVOICE
  // ==========================================

  const handleInvoiceChange = (value) => {
    setInvoiceNumber(value);

    const invoice = invoices.find(
      (item) =>
        item.invoiceNumber === value
    );

    if (!invoice) {
      setItems([]);
      return;
    }

    setItems([]);
  };

  // ==========================================
  // ADD PRODUCT
  // ==========================================

  const handleAddProduct = () => {
    if (!selectedInvoice) {
      alert("Please select an invoice first.");
      return;
    }

    const availableProduct =
      selectedInvoice.items.find(
        (invoiceItem) =>
          !items.some(
            (item) =>
              item.productId ===
              invoiceItem.productId
          )
      );

    if (!availableProduct) {
      alert(
        "All products from this invoice have already been added."
      );
      return;
    }

    setItems((currentItems) => [
      ...currentItems,
      {
        id: Date.now(),
        productId:
          availableProduct.productId,
        product: availableProduct.product,
        quantity: 1,
        maxQuantity:
          availableProduct.quantity,
        price: availableProduct.price,
        amount: availableProduct.price,
      },
    ]);
  };

  // ==========================================
  // UPDATE PRODUCT
  // ==========================================

  const handleItemChange = (
    itemId,
    field,
    value
  ) => {
    setItems((currentItems) =>
      currentItems.map((item) => {
        if (item.id !== itemId) {
          return item;
        }

        if (field === "quantity") {
          let quantity = Number(value || 0);

          if (quantity < 1) {
            quantity = 1;
          }

          if (
            quantity >
            Number(item.maxQuantity || 0)
          ) {
            quantity = Number(
              item.maxQuantity
            );
          }

          return {
            ...item,
            quantity,
            amount:
              quantity *
              Number(item.price || 0),
          };
        }

        return {
          ...item,
          [field]: value,
        };
      })
    );
  };

  // ==========================================
  // REMOVE PRODUCT
  // ==========================================

  const handleRemoveItem = (itemId) => {
    setItems((currentItems) =>
      currentItems.filter(
        (item) => item.id !== itemId
      )
    );
  };

  // ==========================================
  // TOTALS
  // ==========================================

  const subtotal = useMemo(() => {
    return items.reduce(
      (total, item) =>
        total +
        Number(item.amount || 0),
      0
    );
  }, [items]);

  const totalQuantity = useMemo(() => {
    return items.reduce(
      (total, item) =>
        total +
        Number(item.quantity || 0),
      0
    );
  }, [items]);

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

  // ==========================================
  // SAVE
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!invoiceNumber) {
      alert("Please select an invoice.");
      return;
    }

    if (items.length === 0) {
      alert(
        "Please add at least one returned product."
      );
      return;
    }

    const invalidItem = items.some(
      (item) =>
        !item.productId ||
        Number(item.quantity || 0) <= 0
    );

    if (invalidItem) {
      alert(
        "Please complete all returned product lines."
      );
      return;
    }

    if (!reason.trim()) {
      alert("Please select a return reason.");
      return;
    }

    setIsSaving(true);

    const returnData = {
      invoiceNumber,

      customerId:
        selectedInvoice?.customerId ||
        returnItem?.customerId ||
        "",

      customer:
        selectedInvoice?.customer ||
        returnItem?.customer ||
        "",

      date: returnDate,

      items,

      subtotal,

      total: subtotal,

      reason,

      refundMethod,

      status,

      notes,
    };

    try {
      await new Promise((resolve) =>
        setTimeout(resolve, 300)
      );

      onSave?.(returnData);
    } finally {
      setIsSaving(false);
    }
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

              <RotateCcw
                size={22}
                className="text-gray-700"
              />

            </div>

            <div>

              <h2 className="text-xl font-bold text-gray-900">

                {returnItem
                  ? "Edit Sales Return"
                  : "Create Sales Return"}

              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Record products returned by a customer.
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
            FORM
        ======================================= */}

        <form
          onSubmit={handleSubmit}
          className="flex-1 overflow-y-auto"
        >

          <div className="p-6 space-y-6">

            {/* ==================================
                RETURN INFORMATION
            =================================== */}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

              {/* Invoice */}

              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5">

                <div className="flex items-center gap-2 mb-4">

                  <FileText size={18} />

                  <h3 className="font-semibold text-gray-900">
                    Original Invoice
                  </h3>

                </div>

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
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white outline-none focus:ring-2 focus:ring-gray-200"
                    required
                    disabled={!!returnItem}
                  >

                    <option value="">
                      Select original invoice
                    </option>

                    {invoices.map(
                      (invoice) => (
                        <option
                          key={
                            invoice.invoiceNumber
                          }
                          value={
                            invoice.invoiceNumber
                          }
                        >
                          {
                            invoice.invoiceNumber
                          }{" "}
                          —{" "}
                          {invoice.customer}
                        </option>
                      )
                    )}

                  </select>

                </div>

                {selectedInvoice && (
                  <div className="grid grid-cols-2 gap-3 mt-4">

                    <InfoBox
                      label="Invoice Number"
                      value={
                        selectedInvoice.invoiceNumber
                      }
                    />

                    <InfoBox
                      label="Invoice Date"
                      value={
                        selectedInvoice.date
                      }
                    />

                  </div>
                )}

              </div>

              {/* Customer */}

              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5">

                <div className="flex items-center gap-2 mb-4">

                  <User size={18} />

                  <h3 className="font-semibold text-gray-900">
                    Customer Information
                  </h3>

                </div>

                {customer ? (

                  <div className="grid grid-cols-2 gap-3">

                    <InfoBox
                      label="Customer ID"
                      value={customer.id}
                    />

                    <InfoBox
                      label="Customer"
                      value={customer.name}
                    />

                  </div>

                ) : (

                  <div className="text-sm text-gray-500">
                    Select an invoice to load customer information.
                  </div>

                )}

              </div>

            </div>

            {/* ==================================
                RETURN DATE / STATUS
            =================================== */}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

              <div>

                <label className="block text-sm font-medium text-gray-700 mb-2">

                  <span className="inline-flex items-center gap-2">
                    <CalendarDays size={16} />
                    Return Date *
                  </span>

                </label>

                <input
                  type="date"
                  value={returnDate}
                  onChange={(e) =>
                    setReturnDate(
                      e.target.value
                    )
                  }
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none"
                  required
                />

              </div>

              <div>

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Return Status
                </label>

                <select
                  value={status}
                  onChange={(e) =>
                    setStatus(e.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white outline-none"
                >

                  <option value="Pending">
                    Pending
                  </option>

                  <option value="Approved">
                    Approved
                  </option>

                  <option value="Completed">
                    Completed
                  </option>

                  <option value="Rejected">
                    Rejected
                  </option>

                </select>

              </div>

              <div>

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Refund Method
                </label>

                <select
                  value={refundMethod}
                  onChange={(e) =>
                    setRefundMethod(
                      e.target.value
                    )
                  }
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white outline-none"
                >

                  <option value="Credit Note">
                    Credit Note
                  </option>

                  <option value="Cash Refund">
                    Cash Refund
                  </option>

                  <option value="Bank Transfer">
                    Bank Transfer
                  </option>

                  <option value="Replacement">
                    Product Replacement
                  </option>

                </select>

              </div>

            </div>

            {/* ==================================
                RETURN PRODUCTS
            =================================== */}

            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-5 py-4 border-b border-gray-200">

                <div className="flex items-center gap-2">

                  <Package size={18} />

                  <h3 className="font-semibold text-gray-900">
                    Returned Products
                  </h3>

                </div>

                <button
                  type="button"
                  onClick={handleAddProduct}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gray-900 text-white hover:bg-gray-800 transition"
                >

                  <Plus size={16} />

                  Add Product

                </button>

              </div>

              {items.length === 0 ? (

                <div className="px-5 py-12 text-center text-gray-500">

                  <Package
                    size={32}
                    className="mx-auto mb-3 text-gray-400"
                  />

                  <p className="font-medium">
                    No returned products
                  </p>

                  <p className="text-sm mt-1">
                    Select an invoice and add the products being returned.
                  </p>

                </div>

              ) : (

                <div className="overflow-x-auto">

                  <table className="w-full">

                    <thead className="bg-gray-50 border-b border-gray-200">

                      <tr>

                        <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">
                          Product
                        </th>

                        <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">
                          Original Qty
                        </th>

                        <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">
                          Return Qty
                        </th>

                        <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">
                          Unit Price
                        </th>

                        <th className="text-right px-5 py-3 text-xs font-semibold text-gray-500 uppercase">
                          Amount
                        </th>

                        <th className="w-12 px-3 py-3"></th>

                      </tr>

                    </thead>

                    <tbody className="divide-y divide-gray-100">

                      {items.map((item) => (

                        <tr key={item.id}>

                          <td className="px-5 py-4">

                            <p className="font-medium text-gray-900">
                              {item.product}
                            </p>

                            <p className="text-xs text-gray-500 mt-1">
                              {item.productId}
                            </p>

                          </td>

                          <td className="px-5 py-4 text-sm text-gray-600">
                            {item.maxQuantity}
                          </td>

                          <td className="px-5 py-4">

                            <input
                              type="number"
                              min="1"
                              max={
                                item.maxQuantity
                              }
                              value={
                                item.quantity
                              }
                              onChange={(e) =>
                                handleItemChange(
                                  item.id,
                                  "quantity",
                                  e.target.value
                                )
                              }
                              className="w-24 px-3 py-2 border border-gray-200 rounded-lg outline-none"
                            />

                          </td>

                          <td className="px-5 py-4 text-sm">
                            {formatCurrency(
                              item.price
                            )}
                          </td>

                          <td className="px-5 py-4 text-right font-medium">
                            {formatCurrency(
                              item.amount
                            )}
                          </td>

                          <td className="px-3 py-4">

                            <button
                              type="button"
                              onClick={() =>
                                handleRemoveItem(
                                  item.id
                                )
                              }
                              className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition"
                            >

                              <Trash2
                                size={17}
                              />

                            </button>

                          </td>

                        </tr>

                      ))}

                    </tbody>

                  </table>

                </div>

              )}

            </div>

            {/* ==================================
                REASON
            =================================== */}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

              <div>

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Return Reason *
                </label>

                <select
                  value={reason}
                  onChange={(e) =>
                    setReason(e.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white outline-none"
                  required
                >

                  <option value="">
                    Select reason
                  </option>

                  <option value="Damaged product">
                    Damaged product
                  </option>

                  <option value="Wrong product supplied">
                    Wrong product supplied
                  </option>

                  <option value="Expired product">
                    Expired product
                  </option>

                  <option value="Customer changed order">
                    Customer changed order
                  </option>

                  <option value="Quality issue">
                    Quality issue
                  </option>

                  <option value="Other">
                    Other
                  </option>

                </select>

              </div>

              <div>

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notes
                </label>

                <input
                  type="text"
                  value={notes}
                  onChange={(e) =>
                    setNotes(e.target.value)
                  }
                  placeholder="Additional notes..."
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none"
                />

              </div>

            </div>

            {/* ==================================
                SUMMARY
            =================================== */}

            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5">

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                <div>

                  <p className="text-sm text-gray-500">
                    Returned Quantity
                  </p>

                  <p className="text-xl font-bold text-gray-900 mt-1">
                    {totalQuantity.toLocaleString()} units
                  </p>

                </div>

                <div className="text-left sm:text-right">

                  <p className="text-sm text-gray-500">
                    Return Value
                  </p>

                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {formatCurrency(subtotal)}
                  </p>

                </div>

              </div>

            </div>

          </div>

          {/* ====================================
              FOOTER
          ===================================== */}

          <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">

            <div className="flex items-center gap-2 text-sm text-gray-500">

              <CreditCard size={17} />

              <span>
                Refund: {refundMethod}
              </span>

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
                  : returnItem
                  ? "Update Return"
                  : "Save Return"}

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

export default SalesReturnForm;