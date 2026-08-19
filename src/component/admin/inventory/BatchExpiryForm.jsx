import React, { useEffect, useState } from "react";
import {
  X,
  Save,
  Package,
  CalendarDays,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";

const BatchExpiryForm = ({
  batch = null,
  products = [],
  suppliers = [],
  onClose,
  onSave,
}) => {
  const isEditing = Boolean(batch);

  // ==========================================
  // FORM STATE
  // ==========================================

  const [formData, setFormData] = useState({
    productId: batch?.productId || "",
    batchNumber: batch?.batchNumber || "",
    supplierId: batch?.supplierId || "",
    manufacturingDate: batch?.manufacturingDate || "",
    expiryDate: batch?.expiryDate || "",
    quantityReceived: batch?.quantityReceived || "",
    quantityRemaining:
      batch?.quantityRemaining ??
      batch?.quantityReceived ??
      "",
    costPrice: batch?.costPrice || "",
  });

  const [errors, setErrors] = useState({});

  // ==========================================
  // UPDATE FORM
  // ==========================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    setErrors((current) => ({
      ...current,
      [name]: "",
    }));
  };

  // ==========================================
  // AUTOMATIC REMAINING QUANTITY
  // ==========================================

  useEffect(() => {
    if (!isEditing && formData.quantityReceived !== "") {
      setFormData((current) => ({
        ...current,
        quantityRemaining: current.quantityReceived,
      }));
    }
  }, [formData.quantityReceived, isEditing]);

  // ==========================================
  // EXPIRY CALCULATION
  // ==========================================

  const getDaysUntilExpiry = () => {
    if (!formData.expiryDate) return null;

    const today = new Date();
    const expiry = new Date(formData.expiryDate);

    today.setHours(0, 0, 0, 0);
    expiry.setHours(0, 0, 0, 0);

    const difference =
      expiry.getTime() - today.getTime();

    return Math.ceil(
      difference / (1000 * 60 * 60 * 24)
    );
  };

  const daysUntilExpiry = getDaysUntilExpiry();

  // ==========================================
  // EXPIRY STATUS
  // ==========================================

  const getExpiryStatus = () => {
    if (daysUntilExpiry === null) {
      return null;
    }

    if (daysUntilExpiry < 0) {
      return {
        label: "Expired",
        className:
          "bg-red-50 text-red-700 border-red-200",
        icon: AlertTriangle,
      };
    }

    if (daysUntilExpiry <= 7) {
      return {
        label: "Expiring Soon",
        className:
          "bg-orange-50 text-orange-700 border-orange-200",
        icon: AlertTriangle,
      };
    }

    if (daysUntilExpiry <= 30) {
      return {
        label: "Expires Within 30 Days",
        className:
          "bg-yellow-50 text-yellow-700 border-yellow-200",
        icon: AlertTriangle,
      };
    }

    return {
      label: "Active",
      className:
        "bg-green-50 text-green-700 border-green-200",
      icon: CheckCircle2,
    };
  };

  const expiryStatus = getExpiryStatus();

  // ==========================================
  // CURRENCY
  // ==========================================

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(Number(amount || 0));
  };

  // ==========================================
  // STOCK VALUE
  // ==========================================

  const stockValue =
    Number(formData.quantityRemaining || 0) *
    Number(formData.costPrice || 0);

  // ==========================================
  // VALIDATION
  // ==========================================

  const validateForm = () => {
    const newErrors = {};

    if (!formData.productId) {
      newErrors.productId = "Product is required.";
    }

    if (!formData.batchNumber.trim()) {
      newErrors.batchNumber =
        "Batch number is required.";
    }

    if (!formData.supplierId) {
      newErrors.supplierId =
        "Supplier is required.";
    }

    if (!formData.manufacturingDate) {
      newErrors.manufacturingDate =
        "Manufacturing date is required.";
    }

    if (!formData.expiryDate) {
      newErrors.expiryDate =
        "Expiry date is required.";
    }

    if (
      formData.manufacturingDate &&
      formData.expiryDate &&
      new Date(formData.expiryDate) <=
        new Date(formData.manufacturingDate)
    ) {
      newErrors.expiryDate =
        "Expiry date must be after manufacturing date.";
    }

    if (
      !formData.quantityReceived ||
      Number(formData.quantityReceived) <= 0
    ) {
      newErrors.quantityReceived =
        "Quantity received must be greater than 0.";
    }

    if (
      formData.quantityRemaining === "" ||
      Number(formData.quantityRemaining) < 0
    ) {
      newErrors.quantityRemaining =
        "Remaining quantity cannot be negative.";
    }

    if (
      Number(formData.quantityRemaining) >
      Number(formData.quantityReceived)
    ) {
      newErrors.quantityRemaining =
        "Remaining quantity cannot exceed quantity received.";
    }

    if (
      formData.costPrice === "" ||
      Number(formData.costPrice) < 0
    ) {
      newErrors.costPrice =
        "Enter a valid cost price.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // ==========================================
  // SUBMIT
  // ==========================================

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const payload = {
      ...formData,

      quantityReceived: Number(
        formData.quantityReceived
      ),

      quantityRemaining: Number(
        formData.quantityRemaining
      ),

      costPrice: Number(
        formData.costPrice
      ),
    };

    onSave?.(payload);
  };

  // ==========================================
  // INPUT COMPONENT
  // ==========================================

  const inputClass = (field) =>
    `w-full px-4 py-3 rounded-xl border outline-none transition ${
      errors[field]
        ? "border-red-300 focus:ring-2 focus:ring-red-100"
        : "border-gray-200 focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
    }`;

    const ExpiryIcon = expiryStatus?.icon;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4">

      <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-xl">

        {/* ======================================
            HEADER
        ======================================= */}

        <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-6 py-5 flex items-center justify-between">

          <div className="flex items-center gap-3">

            <div className="p-3 bg-gray-100 rounded-xl">
              <Package
                size={21}
                className="text-gray-700"
              />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                {isEditing
                  ? "Edit Batch"
                  : "Add New Batch"}
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Record batch and expiry information.
              </p>
            </div>

          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition"
          >
            <X size={20} />
          </button>

        </div>

        {/* ======================================
            FORM
        ======================================= */}

        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-7"
        >

          {/* ====================================
              PRODUCT INFORMATION
          ===================================== */}

          <section>

            <h3 className="text-sm font-semibold text-gray-900 mb-4">
              Product Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              {/* Product */}

              <div className="md:col-span-2">

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product *
                </label>

                <select
                  name="productId"
                  value={formData.productId}
                  onChange={handleChange}
                  className={inputClass(
                    "productId"
                  )}
                >
                  <option value="">
                    Select product
                  </option>

                  {products.map((product) => (
                    <option
                      key={product.id}
                      value={product.id}
                    >
                      {product.productCode
                        ? `${product.productCode} — `
                        : ""}
                      {product.productName ||
                        product.name}
                    </option>
                  ))}
                </select>

                {errors.productId && (
                  <p className="text-xs text-red-600 mt-1">
                    {errors.productId}
                  </p>
                )}

              </div>

              {/* Batch Number */}

              <div>

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Batch Number *
                </label>

                <input
                  type="text"
                  name="batchNumber"
                  value={formData.batchNumber}
                  onChange={handleChange}
                  placeholder="e.g. PF-2026-001"
                  className={inputClass(
                    "batchNumber"
                  )}
                />

                {errors.batchNumber && (
                  <p className="text-xs text-red-600 mt-1">
                    {errors.batchNumber}
                  </p>
                )}

              </div>

              {/* Supplier */}

              <div>

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Supplier *
                </label>

                <select
                  name="supplierId"
                  value={formData.supplierId}
                  onChange={handleChange}
                  className={inputClass(
                    "supplierId"
                  )}
                >
                  <option value="">
                    Select supplier
                  </option>

                  {suppliers.map((supplier) => (
                    <option
                      key={supplier.id}
                      value={supplier.id}
                    >
                      {supplier.supplierName ||
                        supplier.name}
                    </option>
                  ))}
                </select>

                {errors.supplierId && (
                  <p className="text-xs text-red-600 mt-1">
                    {errors.supplierId}
                  </p>
                )}

              </div>

            </div>

          </section>

          {/* ====================================
              DATES
          ===================================== */}

          <section>

            <h3 className="text-sm font-semibold text-gray-900 mb-4">
              Batch Dates
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              {/* Manufacturing Date */}

              <div>

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Manufacturing Date *
                </label>

                <div className="relative">

                  <CalendarDays
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="date"
                    name="manufacturingDate"
                    value={
                      formData.manufacturingDate
                    }
                    onChange={handleChange}
                    className={`${inputClass(
                      "manufacturingDate"
                    )} pl-10`}
                  />

                </div>

                {errors.manufacturingDate && (
                  <p className="text-xs text-red-600 mt-1">
                    {errors.manufacturingDate}
                  </p>
                )}

              </div>

              {/* Expiry Date */}

              <div>

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expiry Date *
                </label>

                <div className="relative">

                  <CalendarDays
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="date"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleChange}
                    className={`${inputClass(
                      "expiryDate"
                    )} pl-10`}
                  />

                </div>

                {errors.expiryDate && (
                  <p className="text-xs text-red-600 mt-1">
                    {errors.expiryDate}
                  </p>
                )}

              </div>

            </div>

            {/* Expiry Preview */}

            {expiryStatus && (
              <div
                className={`mt-4 border rounded-xl p-4 ${expiryStatus.className}`}
              >

                <div className="flex items-center gap-3">

                  {ExpiryIcon && <ExpiryIcon size={19} />}

                  <div>

                    <p className="text-sm font-semibold">
                      {expiryStatus.label}
                    </p>

                    <p className="text-xs mt-1">
                      {daysUntilExpiry < 0
                        ? `${Math.abs(
                            daysUntilExpiry
                          )} day(s) past expiry`
                        : daysUntilExpiry === 0
                        ? "This batch expires today."
                        : `${daysUntilExpiry} day(s) remaining`}
                    </p>

                  </div>

                </div>

              </div>
            )}

          </section>

          {/* ====================================
              STOCK INFORMATION
          ===================================== */}

          <section>

            <h3 className="text-sm font-semibold text-gray-900 mb-4">
              Stock Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

              {/* Quantity Received */}

              <div>

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity Received *
                </label>

                <input
                  type="number"
                  min="0"
                  name="quantityReceived"
                  value={
                    formData.quantityReceived
                  }
                  onChange={handleChange}
                  placeholder="0"
                  className={inputClass(
                    "quantityReceived"
                  )}
                />

                {errors.quantityReceived && (
                  <p className="text-xs text-red-600 mt-1">
                    {errors.quantityReceived}
                  </p>
                )}

              </div>

              {/* Remaining Quantity */}

              <div>

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Remaining Quantity
                </label>

                <input
                  type="number"
                  min="0"
                  name="quantityRemaining"
                  value={
                    formData.quantityRemaining
                  }
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`${inputClass(
                    "quantityRemaining"
                  )} ${
                    !isEditing
                      ? "bg-gray-100 cursor-not-allowed"
                      : ""
                  }`}
                />

                <p className="text-xs text-gray-400 mt-1">
                  Updated automatically by sales,
                  returns and stock adjustments.
                </p>

                {errors.quantityRemaining && (
                  <p className="text-xs text-red-600 mt-1">
                    {errors.quantityRemaining}
                  </p>
                )}

              </div>

              {/* Cost Price */}

              <div>

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cost Price *
                </label>

                <div className="relative">

                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">
                    ₦
                  </span>

                  <input
                    type="number"
                    min="0"
                    name="costPrice"
                    value={
                      formData.costPrice
                    }
                    onChange={handleChange}
                    placeholder="0"
                    className={`${inputClass(
                      "costPrice"
                    )} pl-8`}
                  />

                </div>

                {errors.costPrice && (
                  <p className="text-xs text-red-600 mt-1">
                    {errors.costPrice}
                  </p>
                )}

              </div>

            </div>

          </section>

          {/* ====================================
              STOCK VALUE SUMMARY
          ===================================== */}

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-gray-500">
                  Current Batch Stock Value
                </p>

                <p className="text-xl font-bold text-gray-900 mt-1">
                  {formatCurrency(stockValue)}
                </p>

              </div>

              <div className="p-3 bg-white rounded-xl border border-gray-200">
                <Package
                  size={20}
                  className="text-gray-600"
                />
              </div>

            </div>

          </div>

          {/* ====================================
              ACTIONS
          ===================================== */}

          <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-2">

            <button
              type="button"
              onClick={onClose}
              className="px-5 py-3 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition"
            >
              <Save size={17} />

              {isEditing
                ? "Save Changes"
                : "Add Batch"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default BatchExpiryForm;