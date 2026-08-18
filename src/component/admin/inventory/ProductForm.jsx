import React from "react";
import {
  X,
  Save,
} from "lucide-react";

const ProductForm = ({
  onClose,
  onSave,
  formData,
  setFormData,
}) => {

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/40 flex items-center justify-center p-4">

      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-xl max-h-[90vh] overflow-y-auto">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">

          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Add Product
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Create a new product in the product master.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <X size={20} />
          </button>

        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-6"
        >

          {/* Basic Information */}
          <div>

            <h3 className="font-semibold text-gray-900 mb-4">
              Basic Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Code
                </label>

                <input
                  type="text"
                  name="productCode"
                  value={formData.productCode}
                  onChange={handleChange}
                  placeholder="e.g. PF-001"
                  required
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-gray-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Name
                </label>

                <input
                  type="text"
                  name="productName"
                  value={formData.productName}
                  onChange={handleChange}
                  placeholder="Enter product name"
                  required
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-gray-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>

                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 outline-none"
                >
                  <option value="">
                    Select category
                  </option>

                  <option value="Parfait">
                    Parfait
                  </option>

                  <option value="Yoghurt">
                    Yoghurt
                  </option>

                  <option value="Drinks">
                    Drinks
                  </option>

                  <option value="Other">
                    Other
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Unit
                </label>

                <select
                  name="unit"
                  value={formData.unit}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 outline-none"
                >
                  <option value="">
                    Select unit
                  </option>

                  <option value="Piece">
                    Piece
                  </option>

                  <option value="Cup">
                    Cup
                  </option>

                  <option value="Pack">
                    Pack
                  </option>

                  <option value="Carton">
                    Carton
                  </option>
                </select>
              </div>

            </div>

          </div>

          {/* Pricing */}
          <div>

            <h3 className="font-semibold text-gray-900 mb-4">
              Pricing
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cost Price
                </label>

                <input
                  type="number"
                  name="costPrice"
                  value={formData.costPrice}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Selling Price
                </label>

                <input
                  type="number"
                  name="sellingPrice"
                  value={formData.sellingPrice}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Supermarket Price
                </label>

                <input
                  type="number"
                  name="supermarketPrice"
                  value={formData.supermarketPrice}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Distributor Price
                </label>

                <input
                  type="number"
                  name="distributorPrice"
                  value={formData.distributorPrice}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 outline-none"
                />
              </div>

            </div>

          </div>

          {/* Tax & Stock */}
          <div>

            <h3 className="font-semibold text-gray-900 mb-4">
              Tax & Inventory
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  VAT (%)
                </label>

                <input
                  type="number"
                  name="vat"
                  value={formData.vat}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  placeholder="0"
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reorder Level
                </label>

                <input
                  type="number"
                  name="reorderLevel"
                  value={formData.reorderLevel}
                  onChange={handleChange}
                  min="0"
                  placeholder="0"
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 outline-none"
                />
              </div>

            </div>

          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">

            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800"
            >
              <Save size={17} />
              Save Product
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default ProductForm;