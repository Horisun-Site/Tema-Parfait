import React from "react";
import {
  Plus,
  Trash2,
  Package,
} from "lucide-react";

const InvoiceItems = ({
  items = [],
  onChange,
}) => {
  // ==========================================
  // TEMPORARY PRODUCTS
  // ==========================================
  // Later this will come from the Products database.

  const products = [
    {
      id: "PRD-001",
      name: "Parfait 500ml",
      category: "Parfait Beverages",
      price: 1500,
      stock: 170,
    },
    {
      id: "PRD-002",
      name: "Parfait 1L",
      category: "Parfait Beverages",
      price: 2800,
      stock: 85,
    },
    {
      id: "PRD-003",
      name: "Chocolate Parfait",
      category: "Parfait Desserts",
      price: 1800,
      stock: 20,
    },
    {
      id: "PRD-004",
      name: "Strawberry Parfait",
      category: "Parfait Desserts",
      price: 1700,
      stock: 320,
    },
  ];

  // ==========================================
  // ADD PRODUCT
  // ==========================================

  const handleAddProduct = () => {
    const newItem = {
      id: Date.now(),
      productId: "",
      productName: "",
      quantity: 1,
      price: 0,
      discount: 0,
    };

    onChange?.([
      ...items,
      newItem,
    ]);
  };

  // ==========================================
  // UPDATE ITEM
  // ==========================================

  const handleItemChange = (
    itemId,
    field,
    value
  ) => {
    const updatedItems = items.map((item) => {
      if (item.id !== itemId) {
        return item;
      }

      // ----------------------------------------
      // PRODUCT SELECTION
      // ----------------------------------------

      if (field === "productId") {
        const selectedProduct =
          products.find(
            (product) =>
              product.id === value
          );

        if (!selectedProduct) {
          return {
            ...item,
            productId: "",
            productName: "",
            price: 0,
          };
        }

        return {
          ...item,
          productId: selectedProduct.id,
          productName: selectedProduct.name,
          price: selectedProduct.price,
        };
      }

      // ----------------------------------------
      // OTHER FIELDS
      // ----------------------------------------

      return {
        ...item,
        [field]: value,
      };
    });

    onChange?.(updatedItems);
  };

  // ==========================================
  // REMOVE ITEM
  // ==========================================

  const handleRemoveItem = (itemId) => {
    const updatedItems = items.filter(
      (item) => item.id !== itemId
    );

    onChange?.(updatedItems);
  };

  // ==========================================
  // CALCULATE LINE TOTAL
  // ==========================================

  const calculateLineTotal = (item) => {
    const quantity =
      Number(item.quantity || 0);

    const price =
      Number(item.price || 0);

    const discount =
      Number(item.discount || 0);

    return Math.max(
      0,
      quantity * price - discount
    );
  };

  // ==========================================
  // CURRENCY
  // ==========================================

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(amount || 0);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5">

      {/* ======================================
          HEADER
      ======================================= */}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">

        <div className="flex items-center gap-3">

          <div className="p-3 bg-gray-100 rounded-xl">
            <Package
              size={19}
              className="text-gray-700"
            />
          </div>

          <div>
            <h3 className="font-semibold text-gray-900">
              Invoice Products
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              Select the products being sold.
            </p>
          </div>

        </div>

        <button
          type="button"
          onClick={handleAddProduct}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gray-900 text-white hover:bg-gray-800 transition"
        >
          <Plus size={17} />

          Add Product
        </button>

      </div>

      {/* ======================================
          EMPTY STATE
      ======================================= */}

      {items.length === 0 ? (
        <div className="border border-dashed border-gray-300 rounded-xl p-8 text-center">

          <Package
            size={32}
            className="mx-auto text-gray-400"
          />

          <h4 className="font-medium text-gray-900 mt-3">
            No products added
          </h4>

          <p className="text-sm text-gray-500 mt-1">
            Click "Add Product" to add products
            to this invoice.
          </p>

          <button
            type="button"
            onClick={handleAddProduct}
            className="inline-flex items-center gap-2 mt-4 px-4 py-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 transition"
          >
            <Plus size={16} />

            Add First Product
          </button>

        </div>
      ) : (
        <>
          {/* ==================================
              DESKTOP TABLE
          =================================== */}

          <div className="hidden lg:block overflow-x-auto">

            <table className="w-full">

              <thead>
                <tr className="border-b border-gray-200">

                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide py-3 pr-4">
                    Product
                  </th>

                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide py-3 px-3">
                    Quantity
                  </th>

                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide py-3 px-3">
                    Price
                  </th>

                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide py-3 px-3">
                    Discount
                  </th>

                  <th className="text-right text-xs font-semibold text-gray-500 uppercase tracking-wide py-3 px-3">
                    Total
                  </th>

                  <th className="w-12"></th>

                </tr>
              </thead>

              <tbody>

                {items.map((item) => (

                  <tr
                    key={item.id}
                    className="border-b border-gray-100 last:border-0"
                  >

                    {/* PRODUCT */}

                    <td className="py-4 pr-4 min-w-[280px]">

                      <select
                        value={item.productId || ""}
                        onChange={(e) =>
                          handleItemChange(
                            item.id,
                            "productId",
                            e.target.value
                          )
                        }
                        className="w-full px-3 py-2.5 border border-gray-200 rounded-xl bg-white outline-none focus:ring-2 focus:ring-gray-200"
                      >

                        <option value="">
                          Select product
                        </option>

                        {products.map(
                          (product) => (
                            <option
                              key={product.id}
                              value={product.id}
                            >
                              {product.name} —{" "}
                              {product.id}
                            </option>
                          )
                        )}

                      </select>

                      {item.productId && (
                        <p className="text-xs text-gray-500 mt-1">
                          Available stock:{" "}
                          {
                            products.find(
                              (product) =>
                                product.id ===
                                item.productId
                            )?.stock ?? 0
                          }
                        </p>
                      )}

                    </td>

                    {/* QUANTITY */}

                    <td className="py-4 px-3">

                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) =>
                          handleItemChange(
                            item.id,
                            "quantity",
                            e.target.value
                          )
                        }
                        className="w-28 px-3 py-2.5 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-gray-200"
                      />

                    </td>

                    {/* PRICE */}

                    <td className="py-4 px-3">

                      <input
                        type="number"
                        min="0"
                        value={item.price}
                        onChange={(e) =>
                          handleItemChange(
                            item.id,
                            "price",
                            e.target.value
                          )
                        }
                        className="w-32 px-3 py-2.5 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-gray-200"
                      />

                    </td>

                    {/* DISCOUNT */}

                    <td className="py-4 px-3">

                      <input
                        type="number"
                        min="0"
                        value={item.discount}
                        onChange={(e) =>
                          handleItemChange(
                            item.id,
                            "discount",
                            e.target.value
                          )
                        }
                        className="w-32 px-3 py-2.5 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-gray-200"
                      />

                    </td>

                    {/* TOTAL */}

                    <td className="py-4 px-3 text-right whitespace-nowrap">

                      <span className="font-semibold text-gray-900">
                        {formatCurrency(
                          calculateLineTotal(
                            item
                          )
                        )}
                      </span>

                    </td>

                    {/* DELETE */}

                    <td className="py-4 pl-3">

                      <button
                        type="button"
                        onClick={() =>
                          handleRemoveItem(
                            item.id
                          )
                        }
                        className="p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition"
                        title="Remove product"
                      >
                        <Trash2 size={17} />
                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

          {/* ==================================
              MOBILE VIEW
          =================================== */}

          <div className="lg:hidden space-y-4">

            {items.map((item, index) => (

              <div
                key={item.id}
                className="border border-gray-200 rounded-xl p-4"
              >

                <div className="flex items-center justify-between mb-4">

                  <p className="font-medium text-gray-900">
                    Product {index + 1}
                  </p>

                  <button
                    type="button"
                    onClick={() =>
                      handleRemoveItem(
                        item.id
                      )
                    }
                    className="p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition"
                  >
                    <Trash2 size={17} />
                  </button>

                </div>

                <div className="space-y-4">

                  {/* PRODUCT */}

                  <div>

                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Product
                    </label>

                    <select
                      value={
                        item.productId || ""
                      }
                      onChange={(e) =>
                        handleItemChange(
                          item.id,
                          "productId",
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-xl bg-white outline-none"
                    >

                      <option value="">
                        Select product
                      </option>

                      {products.map(
                        (product) => (
                          <option
                            key={product.id}
                            value={product.id}
                          >
                            {product.name} —{" "}
                            {product.id}
                          </option>
                        )
                      )}

                    </select>

                  </div>

                  {/* QUANTITY */}

                  <div>

                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Quantity
                    </label>

                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        handleItemChange(
                          item.id,
                          "quantity",
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-xl outline-none"
                    />

                  </div>

                  <div className="grid grid-cols-2 gap-3">

                    {/* PRICE */}

                    <div>

                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Unit Price
                      </label>

                      <input
                        type="number"
                        min="0"
                        value={item.price}
                        onChange={(e) =>
                          handleItemChange(
                            item.id,
                            "price",
                            e.target.value
                          )
                        }
                        className="w-full px-3 py-2.5 border border-gray-200 rounded-xl outline-none"
                      />

                    </div>

                    {/* DISCOUNT */}

                    <div>

                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Discount
                      </label>

                      <input
                        type="number"
                        min="0"
                        value={item.discount}
                        onChange={(e) =>
                          handleItemChange(
                            item.id,
                            "discount",
                            e.target.value
                          )
                        }
                        className="w-full px-3 py-2.5 border border-gray-200 rounded-xl outline-none"
                      />

                    </div>

                  </div>

                  {/* LINE TOTAL */}

                  <div className="flex items-center justify-between bg-gray-50 rounded-xl p-3">

                    <span className="text-sm text-gray-500">
                      Line Total
                    </span>

                    <span className="font-semibold text-gray-900">
                      {formatCurrency(
                        calculateLineTotal(
                          item
                        )
                      )}
                    </span>

                  </div>

                </div>

              </div>

            ))}

          </div>

        </>
      )}

    </div>
  );
};

export default InvoiceItems;