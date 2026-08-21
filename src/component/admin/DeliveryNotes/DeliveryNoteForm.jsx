import React, { useEffect, useState } from "react";
import {
  X,
  Truck,
  CalendarDays,
  User,
  MapPin,
  Package,
  Save,
  Plus,
  Trash2,
} from "lucide-react";

const DeliveryNoteForm = ({
  deliveryNote = null,
  onClose,
  onSave,
}) => {
  // ==========================================
  // TEMPORARY DATA
  // ==========================================

  const customers = [
    {
      id: "CUS-001",
      name: "ABC Supermarket",
      branch: "Main Branch",
      telephone: "08000000001",
      address: "Lagos, Nigeria",
    },
    {
      id: "CUS-002",
      name: "Fresh Mart",
      branch: "Lagos Branch",
      telephone: "08000000002",
      address: "Ikeja, Lagos",
    },
    {
      id: "CUS-003",
      name: "Mega Foods",
      branch: "Ikeja Branch",
      telephone: "08000000003",
      address: "Ikeja, Lagos",
    },
  ];

  const products = [
    {
      id: "PRD-001",
      code: "PRD-001",
      name: "Parfait 500ml",
      stock: 170,
    },
    {
      id: "PRD-002",
      code: "PRD-002",
      name: "Parfait 1L",
      stock: 85,
    },
    {
      id: "PRD-003",
      code: "PRD-003",
      name: "Chocolate Parfait",
      stock: 20,
    },
    {
      id: "PRD-004",
      code: "PRD-004",
      name: "Strawberry Parfait",
      stock: 320,
    },
  ];

  // ==========================================
  // FORM STATE
  // ==========================================

  const [customerId, setCustomerId] = useState(
    deliveryNote?.customerId || ""
  );

  const [deliveryDate, setDeliveryDate] = useState(
    deliveryNote?.deliveryDate ||
      new Date().toISOString().slice(0, 10)
  );

  const [invoiceNumber, setInvoiceNumber] = useState(
    deliveryNote?.invoiceNumber || ""
  );

  const [deliveryStatus, setDeliveryStatus] = useState(
    deliveryNote?.deliveryStatus || "Pending"
  );

  const [driverName, setDriverName] = useState(
    deliveryNote?.driverName || ""
  );

  const [vehicleNumber, setVehicleNumber] = useState(
    deliveryNote?.vehicleNumber || ""
  );

  const [deliveryAddress, setDeliveryAddress] = useState(
    deliveryNote?.deliveryAddress || ""
  );

  const [notes, setNotes] = useState(
    deliveryNote?.notes || ""
  );

  const [items, setItems] = useState(
    deliveryNote?.items || []
  );

  const [isSaving, setIsSaving] = useState(false);

  // ==========================================
  // SELECTED CUSTOMER
  // ==========================================

  const selectedCustomer = customers.find(
    (customer) => customer.id === customerId
  );

  // ==========================================
  // UPDATE ADDRESS WHEN CUSTOMER CHANGES
  // ==========================================

  useEffect(() => {
    if (!deliveryNote && selectedCustomer) {
      setDeliveryAddress(selectedCustomer.address);
    }
  }, [customerId]);

  // ==========================================
  // ADD PRODUCT
  // ==========================================

  const handleAddItem = () => {
    setItems((currentItems) => [
      ...currentItems,
      {
        id: Date.now(),
        productId: "",
        productCode: "",
        productName: "",
        quantity: 1,
        deliveredQuantity: 0,
      },
    ]);
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

        if (field === "productId") {
          const product = products.find(
            (product) => product.id === value
          );

          return {
            ...item,
            productId: value,
            productCode:
              product?.code || "",
            productName:
              product?.name || "",
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
  // SAVE
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!customerId) {
      alert("Please select a customer.");
      return;
    }

    if (!invoiceNumber.trim()) {
      alert("Please enter the invoice number.");
      return;
    }

    if (items.length === 0) {
      alert("Please add at least one product.");
      return;
    }

    const invalidItem = items.some(
      (item) =>
        !item.productId ||
        Number(item.quantity || 0) <= 0
    );

    if (invalidItem) {
      alert(
        "Please complete all delivery product lines."
      );
      return;
    }

    setIsSaving(true);

    const deliveryData = {
      customerId,
      customer:
        selectedCustomer?.name || "",

      invoiceNumber,
      deliveryDate,

      deliveryStatus,

      driverName,
      vehicleNumber,
      deliveryAddress,

      items,

      notes,
    };

    try {
      await new Promise((resolve) =>
        setTimeout(resolve, 300)
      );

      onSave?.(deliveryData);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">

      <div className="w-full max-w-6xl max-h-[95vh] bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col">

        {/* ======================================
            HEADER
        ======================================= */}

        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">

          <div className="flex items-center gap-3">

            <div className="p-3 bg-gray-100 rounded-xl">
              <Truck
                size={22}
                className="text-gray-700"
              />
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900">
                {deliveryNote
                  ? "Edit Delivery Note"
                  : "Create Delivery Note"}
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Prepare and manage customer deliveries.
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
                CUSTOMER INFORMATION
            =================================== */}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

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
                      onChange={(e) =>
                        setCustomerId(
                          e.target.value
                        )
                      }
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white outline-none"
                      required
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

              {/* DELIVERY INFORMATION */}

              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5">

                <div className="flex items-center gap-2 mb-4">

                  <CalendarDays size={18} />

                  <h3 className="font-semibold text-gray-900">
                    Delivery Information
                  </h3>

                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                  <div>

                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Delivery Date *
                    </label>

                    <input
                      type="date"
                      value={deliveryDate}
                      onChange={(e) =>
                        setDeliveryDate(
                          e.target.value
                        )
                      }
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white outline-none"
                      required
                    />

                  </div>

                  <div>

                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Invoice Number *
                    </label>

                    <input
                      type="text"
                      value={invoiceNumber}
                      onChange={(e) =>
                        setInvoiceNumber(
                          e.target.value
                        )
                      }
                      placeholder="e.g. TF-20260821-0001"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white outline-none"
                      required
                    />

                  </div>

                  <div>

                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Delivery Status
                    </label>

                    <select
                      value={deliveryStatus}
                      onChange={(e) =>
                        setDeliveryStatus(
                          e.target.value
                        )
                      }
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white outline-none"
                    >
                      <option value="Pending">
                        Pending
                      </option>

                      <option value="Processing">
                        Processing
                      </option>

                      <option value="Out for Delivery">
                        Out for Delivery
                      </option>

                      <option value="Delivered">
                        Delivered
                      </option>

                      <option value="Cancelled">
                        Cancelled
                      </option>
                    </select>

                  </div>

                </div>

              </div>

            </div>

            {/* ==================================
                DELIVERY ADDRESS
            =================================== */}

            <div className="bg-white border border-gray-200 rounded-2xl p-5">

              <div className="flex items-center gap-2 mb-4">

                <MapPin size={18} />

                <h3 className="font-semibold text-gray-900">
                  Delivery Address
                </h3>

              </div>

              <textarea
                value={deliveryAddress}
                onChange={(e) =>
                  setDeliveryAddress(
                    e.target.value
                  )
                }
                rows={3}
                placeholder="Enter delivery address..."
                className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none resize-none"
              />

            </div>

            {/* ==================================
                PRODUCTS
            =================================== */}

            <div className="bg-white border border-gray-200 rounded-2xl p-5">

              <div className="flex items-center justify-between mb-4">

                <div className="flex items-center gap-2">

                  <Package size={18} />

                  <h3 className="font-semibold text-gray-900">
                    Products to Deliver
                  </h3>

                </div>

                <button
                  type="button"
                  onClick={handleAddItem}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-900 text-white hover:bg-gray-800 transition"
                >
                  <Plus size={16} />

                  Add Product
                </button>

              </div>

              {items.length === 0 ? (
                <div className="border border-dashed border-gray-300 rounded-xl p-8 text-center">

                  <Package
                    size={28}
                    className="mx-auto text-gray-400"
                  />

                  <p className="text-sm text-gray-500 mt-3">
                    No products added yet.
                  </p>

                  <button
                    type="button"
                    onClick={handleAddItem}
                    className="mt-3 text-sm font-medium text-gray-900 hover:underline"
                  >
                    Add your first product
                  </button>

                </div>
              ) : (
                <div className="space-y-3">

                  {items.map((item, index) => {

                    const selectedProduct =
                      products.find(
                        (product) =>
                          product.id ===
                          item.productId
                      );

                    return (
                      <div
                        key={item.id}
                        className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end border border-gray-200 rounded-xl p-4"
                      >

                        <div className="md:col-span-5">

                          <label className="block text-xs font-medium text-gray-500 mb-2">
                            Product
                          </label>

                          <select
                            value={
                              item.productId
                            }
                            onChange={(e) =>
                              handleItemChange(
                                item.id,
                                "productId",
                                e.target.value
                              )
                            }
                            className="w-full px-3 py-3 border border-gray-200 rounded-xl bg-white outline-none"
                          >
                            <option value="">
                              Select product
                            </option>

                            {products.map(
                              (product) => (
                                <option
                                  key={
                                    product.id
                                  }
                                  value={
                                    product.id
                                  }
                                >
                                  {product.name} (
                                  {product.code})
                                </option>
                              )
                            )}

                          </select>

                        </div>

                        <div className="md:col-span-2">

                          <label className="block text-xs font-medium text-gray-500 mb-2">
                            Available
                          </label>

                          <div className="px-3 py-3 border border-gray-200 rounded-xl bg-gray-50 text-sm">
                            {selectedProduct
                              ?.stock ??
                              0}
                          </div>

                        </div>

                        <div className="md:col-span-2">

                          <label className="block text-xs font-medium text-gray-500 mb-2">
                            Quantity
                          </label>

                          <input
                            type="number"
                            min="1"
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
                            className="w-full px-3 py-3 border border-gray-200 rounded-xl outline-none"
                          />

                        </div>

                        <div className="md:col-span-2">

                          <label className="block text-xs font-medium text-gray-500 mb-2">
                            Delivered
                          </label>

                          <input
                            type="number"
                            min="0"
                            value={
                              item.deliveredQuantity
                            }
                            onChange={(e) =>
                              handleItemChange(
                                item.id,
                                "deliveredQuantity",
                                e.target.value
                              )
                            }
                            className="w-full px-3 py-3 border border-gray-200 rounded-xl outline-none"
                          />

                        </div>

                        <div className="md:col-span-1">

                          <button
                            type="button"
                            onClick={() =>
                              handleRemoveItem(
                                item.id
                              )
                            }
                            className="w-full flex items-center justify-center p-3 rounded-xl border border-gray-200 text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition"
                            title="Remove product"
                          >
                            <Trash2 size={17} />
                          </button>

                        </div>

                      </div>
                    );
                  })}

                </div>
              )}

            </div>

            {/* ==================================
                DRIVER INFORMATION
            =================================== */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <div>

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Driver Name
                </label>

                <input
                  type="text"
                  value={driverName}
                  onChange={(e) =>
                    setDriverName(e.target.value)
                  }
                  placeholder="Enter driver name"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none"
                />

              </div>

              <div>

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Vehicle Number
                </label>

                <input
                  type="text"
                  value={vehicleNumber}
                  onChange={(e) =>
                    setVehicleNumber(
                      e.target.value
                    )
                  }
                  placeholder="e.g. ABC-123-XY"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none"
                />

              </div>

            </div>

            {/* ==================================
                NOTES
            =================================== */}

            <div>

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notes
              </label>

              <textarea
                value={notes}
                onChange={(e) =>
                  setNotes(e.target.value)
                }
                rows={3}
                placeholder="Add delivery notes..."
                className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none resize-none"
              />

            </div>

          </div>

          {/* ====================================
              FOOTER
          ===================================== */}

          <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">

            <div className="text-sm text-gray-500">
              Delivery Status:{" "}
              <span className="font-medium text-gray-900">
                {deliveryStatus}
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
                  : deliveryNote
                  ? "Update Delivery Note"
                  : "Save Delivery Note"}
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

export default DeliveryNoteForm;