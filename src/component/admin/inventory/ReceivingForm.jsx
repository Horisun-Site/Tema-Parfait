import React, { useEffect } from "react";
import {
  X,
  Save,
  Calculator,
} from "lucide-react";

const ReceivingForm = ({
  onClose,
  onSave,
  formData,
  setFormData,
}) => {
  // =========================
  // AUTOMATIC TOTAL
  // =========================

  useEffect(() => {
    const quantity = Number(formData.quantity || 0);
    const cost = Number(formData.cost || 0);

    setFormData((prev) => ({
      ...prev,
      total: quantity * cost,
    }));
  }, [formData.quantity, formData.cost, setFormData]);

  // =========================
  // HANDLE CHANGE
  // =========================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================
  // SUBMIT
  // =========================

  const handleSubmit = (e) => {
    e.preventDefault();

    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/40 flex items-center justify-center p-4">

      <div className="bg-white w-full max-w-5xl rounded-2xl shadow-xl max-h-[92vh] overflow-y-auto">

        {/* =========================
            HEADER
        ========================== */}

        <div className="sticky top-0 bg-white z-10 flex items-center justify-between px-6 py-5 border-b border-gray-200">

          <div>
            <h2 className="text-xl font-bold text-gray-900">
              New Goods Received Note
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Record stock received from a supplier.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition"
          >
            <X size={20} />
          </button>

        </div>

        {/* =========================
            FORM
        ========================== */}

        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-8"
        >

          {/* =========================
              GRN INFORMATION
          ========================== */}

          <section>

            <h3 className="font-semibold text-gray-900 mb-4">
              GRN Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

              {/* GRN Number */}
              <div>

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  GRN Number
                </label>

                <input
                  type="text"
                  name="grnNumber"
                  value={formData.grnNumber}
                  onChange={handleChange}
                  required
                  readOnly
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 outline-none text-sm"
                />

                <p className="text-xs text-gray-400 mt-1">
                  Automatically generated.
                </p>

              </div>

              {/* Supplier */}
              <div>

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Supplier
                </label>

                <input
                  type="text"
                  name="supplier"
                  value={formData.supplier}
                  onChange={handleChange}
                  placeholder="Enter supplier"
                  required
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 outline-none text-sm focus:ring-2 focus:ring-gray-200"
                />

              </div>

              {/* Date */}
              <div>

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Receiving Date
                </label>

                <input
                  type="date"
                  name="receivingDate"
                  value={formData.receivingDate}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 outline-none text-sm focus:ring-2 focus:ring-gray-200"
                />

              </div>

            </div>

          </section>

          {/* =========================
              PRODUCT INFORMATION
          ========================== */}

          <section>

            <h3 className="font-semibold text-gray-900 mb-4">
              Product Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              {/* Product */}
              <div>

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product
                </label>

                <input
                  type="text"
                  name="product"
                  value={formData.product}
                  onChange={handleChange}
                  placeholder="Enter product name"
                  required
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 outline-none text-sm focus:ring-2 focus:ring-gray-200"
                />

              </div>

              {/* Batch */}
              <div>

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Batch Number
                </label>

                <input
                  type="text"
                  name="batchNumber"
                  value={formData.batchNumber}
                  onChange={handleChange}
                  placeholder="Enter batch number"
                  required
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 outline-none text-sm focus:ring-2 focus:ring-gray-200"
                />

              </div>

            </div>

          </section>

          {/* =========================
              BATCH & EXPIRY
          ========================== */}

          <section>

            <h3 className="font-semibold text-gray-900 mb-4">
              Batch & Expiry Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              {/* Manufacturing Date */}
              <div>

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Manufacturing Date
                </label>

                <input
                  type="date"
                  name="manufacturingDate"
                  value={formData.manufacturingDate}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 outline-none text-sm focus:ring-2 focus:ring-gray-200"
                />

              </div>

              {/* Expiry Date */}
              <div>

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expiry Date
                </label>

                <input
                  type="date"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 outline-none text-sm focus:ring-2 focus:ring-gray-200"
                />

              </div>

            </div>

          </section>

          {/* =========================
              QUANTITY & COST
          ========================== */}

          <section>

            <h3 className="font-semibold text-gray-900 mb-4">
              Stock & Cost
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

              {/* Quantity */}
              <div>

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity
                </label>

                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  min="1"
                  step="1"
                  placeholder="0"
                  required
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 outline-none text-sm focus:ring-2 focus:ring-gray-200"
                />

              </div>

              {/* Cost */}
              <div>

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Unit Cost
                </label>

                <div className="relative">

                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                    ₦
                  </span>

                  <input
                    type="number"
                    name="cost"
                    value={formData.cost}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                    required
                    className="w-full border border-gray-200 rounded-lg pl-9 pr-4 py-2.5 outline-none text-sm focus:ring-2 focus:ring-gray-200"
                  />

                </div>

              </div>

              {/* Total */}
              <div>

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Total Cost
                </label>

                <div className="relative">

                  <Calculator
                    size={17}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="text"
                    value={`₦${Number(
                      formData.total || 0
                    ).toLocaleString()}`}
                    readOnly
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-9 pr-4 py-2.5 outline-none text-sm font-semibold"
                  />

                </div>

                <p className="text-xs text-gray-400 mt-1">
                  Quantity × Unit Cost
                </p>

              </div>

            </div>

          </section>

          {/* =========================
              SUMMARY
          ========================== */}

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm text-gray-500">
                  Stock Receiving Value
                </p>

                <p className="text-xs text-gray-400 mt-1">
                  This amount will eventually update inventory valuation.
                </p>
              </div>

              <p className="text-2xl font-bold text-gray-900">
                ₦
                {Number(
                  formData.total || 0
                ).toLocaleString()}
              </p>

            </div>

          </div>

          {/* =========================
              ACTIONS
          ========================== */}

          <div className="flex justify-end gap-3 pt-5 border-t border-gray-200">

            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition"
            >
              <Save size={17} />
              Save GRN
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default ReceivingForm;