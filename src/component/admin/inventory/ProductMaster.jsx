import React, { useState } from "react";
import ProductForm from "./ProductForm";
import { Plus, Search, Package, Edit, Eye, MoreVertical } from "lucide-react";

const emptyProduct = {
  productCode: "",
  productName: "",
  category: "",
  unit: "",
  costPrice: "",
  sellingPrice: "",
  supermarketPrice: "",
  distributorPrice: "",
  vat: "",
  reorderLevel: "",
};

const ProductMaster = () => {
  const [search, setSearch] = useState("");

  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState(emptyProduct);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Product Master</h1>

          <p className="text-sm text-gray-500 mt-1">
            Manage products, pricing, batches and inventory information.
          </p>
        </div>

        <button
          onClick={() => {
            setFormData(emptyProduct);
            setShowForm(true);
          }}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition"
        >
          <Plus size={18} />
          Add Product
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white border border-gray-200 rounded-2xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Products</p>

              <h2 className="text-2xl font-bold mt-2">0</h2>
            </div>

            <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
              <Package size={20} />
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-5">
          <p className="text-sm text-gray-500">Active Products</p>

          <h2 className="text-2xl font-bold mt-2">0</h2>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-5">
          <p className="text-sm text-gray-500">Low Stock</p>

          <h2 className="text-2xl font-bold mt-2">0</h2>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-5">
          <p className="text-sm text-gray-500">Expiring Soon</p>

          <h2 className="text-2xl font-bold mt-2">0</h2>
        </div>
      </div>

      {/* Product Table */}
      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
        {/* Table Header */}
        <div className="p-5 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="font-semibold text-gray-900">Products</h2>

              <p className="text-sm text-gray-500 mt-1">
                All products registered in the system.
              </p>
            </div>

            {/* Search */}
            <div className="relative w-full md:w-80">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-100 rounded-lg outline-none text-sm"
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-4 font-semibold text-gray-600">
                  Product Code
                </th>

                <th className="text-left px-6 py-4 font-semibold text-gray-600">
                  Product
                </th>

                <th className="text-left px-6 py-4 font-semibold text-gray-600">
                  Category
                </th>

                <th className="text-left px-6 py-4 font-semibold text-gray-600">
                  Cost Price
                </th>

                <th className="text-left px-6 py-4 font-semibold text-gray-600">
                  Selling Price
                </th>

                <th className="text-left px-6 py-4 font-semibold text-gray-600">
                  Stock
                </th>

                <th className="text-right px-6 py-4 font-semibold text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td
                  colSpan="7"
                  className="px-6 py-16 text-center text-gray-400"
                >
                  No products have been added yet.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {showForm && (
        <ProductForm
          onClose={() => setShowForm(false)}
          onSave={(product) => {
            console.log("Product to save:", product);
            setShowForm(false);
          }}
          formData={formData}
          setFormData={setFormData}
        />
      )}
    </div>
  );
};

export default ProductMaster;
