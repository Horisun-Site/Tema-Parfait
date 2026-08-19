import React, { useEffect, useState } from "react";
import {
  X,
  Save,
  Plus,
  Minus,
  Calculator,
} from "lucide-react";

const StockAdjustmentForm = ({
  onClose,
  onSave,
  stockItems = [],
  selectedItem = null,
}) => {
  const [formData, setFormData] = useState({
    productId: "",
    adjustmentType: "increase",
    quantity: "",
    reason: "",
    notes: "",
  });

  const [newBalance, setNewBalance] = useState(0);

  // =========================
  // PRESELECT PRODUCT
  // =========================

  useEffect(() => {
    if (selectedItem) {
      setFormData((prev) => ({
        ...prev,
        productId: selectedItem.id,
      }));
    }
  }, [selectedItem]);

  // =========================
  // SELECTED PRODUCT
  // =========================

  const selectedProduct = stockItems.find(
    (item) => String(item.id) === String(formData.productId)
  );

  // =========================
  // CALCULATE NEW BALANCE
  // =========================

  useEffect(() => {
    const currentStock = Number(
      selectedProduct?.currentStock || 0
    );

    const quantity = Number(formData.quantity || 0);

    if (formData.adjustmentType === "increase") {
      setNewBalance(currentStock + quantity);
    } else {
      setNewBalance(Math.max(0, currentStock - quantity));
    }
  }, [
    selectedProduct,
    formData.quantity,
    formData.adjustmentType,
  ]);

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

    if (!formData.productId) {
      alert("Please select a product.");
      return;
    }

    if (!formData.quantity || Number(formData.quantity) <= 0) {
      alert("Please enter a valid adjustment quantity.");
      return;
    }

    if (!formData.reason) {
      alert("Please select an adjustment reason.");
      return;
    }

    onSave?.({
      ...formData,
      quantity: Number(formData.quantity),
      currentStock: selectedProduct?.currentStock || 0,
      newBalance,
    });
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/40 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl max-h-[92vh] overflow-y-auto">
        {/* =========================
            HEADER
        ========================== */}

        <div className="sticky top-0 bg-white z-10 flex items-center justify-between px-6 py-5 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Stock Adjustment
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Make a controlled adjustment to inventory stock.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 text-gray-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* =========================
            FORM
        ========================== */}

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* PRODUCT */}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product
            </label>

            <select
              name="productId"
              value={formData.productId}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-gray-200 bg-white"
            >
              <option value="">Select product</option>

              {stockItems.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.product} ({item.productCode})
                </option>
              ))}
            </select>
          </div>

          {/* CURRENT STOCK */}

          {selectedProduct && (
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
              <p className="text-sm text-gray-500">
                Current Stock
              </p>

              <p className="text-2xl font-bold text-gray-900 mt-1">
                {Number(
                  selectedProduct.currentStock || 0
                ).toLocaleString()}{" "}
                units
              </p>
            </div>
          )}

          {/* ADJUSTMENT TYPE */}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Adjustment Type
            </label>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    adjustmentType: "increase",
                  }))
                }
                className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl border transition ${
                  formData.adjustmentType === "increase"
                    ? "border-gray-900 bg-gray-900 text-white"
                    : "border-gray-200 text-gray-700 hover:bg-gray-50"
                }`}
              >
                <Plus className="w-4 h-4" />
                Increase
              </button>

              <button
                type="button"
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    adjustmentType: "decrease",
                  }))
                }
                className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl border transition ${
                  formData.adjustmentType === "decrease"
                    ? "border-gray-900 bg-gray-900 text-white"
                    : "border-gray-200 text-gray-700 hover:bg-gray-50"
                }`}
              >
                <Minus className="w-4 h-4" />
                Decrease
              </button>
            </div>
          </div>

          {/* QUANTITY */}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Adjustment Quantity
            </label>

            <input
              type="number"
              min="1"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              placeholder="Enter quantity"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-gray-200"
            />
          </div>

          {/* NEW BALANCE */}

          {selectedProduct && (
            <div className="border border-gray-200 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gray-100 rounded-xl">
                  <Calculator className="w-5 h-5 text-gray-700" />
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    New Stock Balance
                  </p>

                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {newBalance.toLocaleString()} units
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* REASON */}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Adjustment Reason
            </label>

            <select
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-gray-200 bg-white"
            >
              <option value="">Select reason</option>
              <option value="stock_count">Stock Count Correction</option>
              <option value="damaged">Damaged Stock</option>
              <option value="expired">Expired Stock</option>
              <option value="lost">Lost Stock</option>
              <option value="found">Found Stock</option>
              <option value="system_error">System Error Correction</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* NOTES */}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notes
            </label>

            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows="4"
              placeholder="Provide additional details about this adjustment..."
              className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-gray-200 resize-none"
            />
          </div>

          {/* =========================
              ACTIONS
          ========================== */}

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-3 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gray-900 text-white hover:bg-gray-800"
            >
              <Save className="w-4 h-4" />
              Save Adjustment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StockAdjustmentForm;