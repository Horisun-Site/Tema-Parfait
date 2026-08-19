import React, { useMemo, useState } from "react";
import {
  Search,
  Package,
  ArrowDownToLine,
  ArrowUpFromLine,
  CircleDollarSign,
  AlertTriangle,
  SlidersHorizontal,
  Plus,
} from "lucide-react";

import StockTable from "./StockTable";
import StockAdjustmentForm from "./StockAdjustmentForm";

const StockMaster = () => {
  const [search, setSearch] = useState("");
  const [stockFilter, setStockFilter] = useState("all");

  // =========================
  // ADJUSTMENT STATE
  // =========================

  const [showAdjustmentForm, setShowAdjustmentForm] = useState(false);
  const [selectedStockItem, setSelectedStockItem] = useState(null);

  // =========================
  // TEMPORARY FRONTEND DATA
  // =========================

  // This will later come from the FastAPI backend.
  const [stockItems, setStockItems] = useState([
    {
      id: 1,
      productCode: "PRD-001",
      product: "Parfait 500ml",
      category: "Parfait Beverages",
      openingStock: 100,
      stockIn: 150,
      stockOut: 80,
      adjustment: 0,
      currentStock: 170,
      costPrice: 500,
      stockValue: 85000,
      reorderLevel: 50,
      status: "In Stock",
    },
    {
      id: 2,
      productCode: "PRD-002",
      product: "Parfait 1L",
      category: "Parfait Beverages",
      openingStock: 60,
      stockIn: 100,
      stockOut: 75,
      adjustment: 0,
      currentStock: 85,
      costPrice: 1200,
      stockValue: 102000,
      reorderLevel: 30,
      status: "In Stock",
    },
    {
      id: 3,
      productCode: "PRD-003",
      product: "Chocolate Parfait",
      category: "Parfait Desserts",
      openingStock: 40,
      stockIn: 50,
      stockOut: 70,
      adjustment: 0,
      currentStock: 20,
      costPrice: 800,
      stockValue: 16000,
      reorderLevel: 30,
      status: "Low Stock",
    },
    {
      id: 4,
      productCode: "PRD-004",
      product: "Strawberry Parfait",
      category: "Parfait Desserts",
      openingStock: 200,
      stockIn: 300,
      stockOut: 180,
      adjustment: 0,
      currentStock: 320,
      costPrice: 250,
      stockValue: 80000,
      reorderLevel: 100,
      status: "In Stock",
    },
  ]);

  // =========================
  // FILTER STOCK
  // =========================

  const filteredStock = useMemo(() => {
    const query = search.toLowerCase().trim();

    return stockItems.filter((item) => {
      const matchesSearch =
        item.product.toLowerCase().includes(query) ||
        item.productCode.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query);

      const matchesFilter =
        stockFilter === "all" ||
        (stockFilter === "low" &&
          item.currentStock <= item.reorderLevel) ||
        (stockFilter === "in-stock" &&
          item.currentStock > item.reorderLevel);

      return matchesSearch && matchesFilter;
    });
  }, [stockItems, search, stockFilter]);

  // =========================
  // DASHBOARD STATISTICS
  // =========================

  const totalProducts = stockItems.length;

  const totalStockUnits = stockItems.reduce(
    (total, item) => total + item.currentStock,
    0
  );

  const totalStockIn = stockItems.reduce(
    (total, item) => total + item.stockIn,
    0
  );

  const totalStockOut = stockItems.reduce(
    (total, item) => total + item.stockOut,
    0
  );

  const totalStockValue = stockItems.reduce(
    (total, item) => total + item.stockValue,
    0
  );

  const lowStockItems = stockItems.filter(
    (item) => item.currentStock <= item.reorderLevel
  ).length;

  // =========================
  // CURRENCY
  // =========================

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(amount || 0);
  };

  // =========================
  // VIEW STOCK
  // =========================

  const handleViewStock = (item) => {
    console.log("View stock:", item);

    // Later this will open the stock movement/details view.
  };

  // =========================
  // OPEN ADJUSTMENT FORM
  // =========================

  const handleOpenAdjustment = (item = null) => {
    setSelectedStockItem(item);
    setShowAdjustmentForm(true);
  };

  // =========================
  // CLOSE ADJUSTMENT FORM
  // =========================

  const handleCloseAdjustment = () => {
    setShowAdjustmentForm(false);
    setSelectedStockItem(null);
  };

  // =========================
  // SAVE STOCK ADJUSTMENT
  // =========================

  const handleSaveAdjustment = (adjustment) => {
    setStockItems((currentItems) =>
      currentItems.map((item) => {
        if (
          String(item.id) !== String(adjustment.productId)
        ) {
          return item;
        }

        const quantity = Number(adjustment.quantity || 0);

        const oldStock = Number(item.currentStock || 0);

        let newStock = oldStock;

        let adjustmentAmount = 0;

        if (adjustment.adjustmentType === "increase") {
          newStock = oldStock + quantity;
          adjustmentAmount = quantity;
        } else {
          newStock = Math.max(0, oldStock - quantity);
          adjustmentAmount = -quantity;
        }

        const newStockValue =
          newStock * Number(item.costPrice || 0);

        const newStatus =
          newStock <= item.reorderLevel
            ? "Low Stock"
            : "In Stock";

        return {
          ...item,
          currentStock: newStock,
          adjustment:
            Number(item.adjustment || 0) + adjustmentAmount,
          stockValue: newStockValue,
          status: newStatus,
        };
      })
    );

    console.log("Stock adjustment saved:", adjustment);

    handleCloseAdjustment();
  };

  return (
    <div className="space-y-6">

      {/* =========================
          PAGE HEADER
      ========================== */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gray-100 rounded-xl">
              <Package className="w-6 h-6 text-gray-700" />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Stock Control
              </h1>

              <p className="text-sm text-gray-500 mt-1">
                Monitor inventory levels, stock movement and stock value.
              </p>
            </div>
          </div>
        </div>

        {/* ADJUST STOCK BUTTON */}

        <button
          type="button"
          onClick={() => handleOpenAdjustment()}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gray-900 text-white hover:bg-gray-800 transition"
        >
          <Plus className="w-4 h-4" />

          Adjust Stock
        </button>
      </div>

      {/* =========================
          STATISTICS
      ========================== */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">

        {/* Total Products */}

        <div className="bg-white border border-gray-200 rounded-2xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">
                Total Products
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-2">
                {totalProducts}
              </h2>
            </div>

            <div className="p-3 bg-gray-100 rounded-xl">
              <Package className="w-5 h-5 text-gray-700" />
            </div>
          </div>
        </div>

        {/* Current Stock */}

        <div className="bg-white border border-gray-200 rounded-2xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">
                Current Stock
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-2">
                {totalStockUnits.toLocaleString()}
              </h2>
            </div>

            <div className="p-3 bg-gray-100 rounded-xl">
              <ArrowDownToLine className="w-5 h-5 text-gray-700" />
            </div>
          </div>
        </div>

        {/* Stock Value */}

        <div className="bg-white border border-gray-200 rounded-2xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">
                Stock Value
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-2">
                {formatCurrency(totalStockValue)}
              </h2>
            </div>

            <div className="p-3 bg-gray-100 rounded-xl">
              <CircleDollarSign className="w-5 h-5 text-gray-700" />
            </div>
          </div>
        </div>

        {/* Low Stock */}

        <div className="bg-white border border-gray-200 rounded-2xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">
                Low Stock Items
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-2">
                {lowStockItems}
              </h2>
            </div>

            <div className="p-3 bg-gray-100 rounded-xl">
              <AlertTriangle className="w-5 h-5 text-gray-700" />
            </div>
          </div>
        </div>
      </div>

      {/* =========================
          STOCK MOVEMENT SUMMARY
      ========================== */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* Stock In */}

        <div className="bg-white border border-gray-200 rounded-2xl p-5">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gray-100 rounded-xl">
              <ArrowDownToLine className="w-5 h-5 text-gray-700" />
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Total Stock In
              </p>

              <h3 className="text-xl font-bold text-gray-900 mt-1">
                {totalStockIn.toLocaleString()} units
              </h3>
            </div>
          </div>
        </div>

        {/* Stock Out */}

        <div className="bg-white border border-gray-200 rounded-2xl p-5">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gray-100 rounded-xl">
              <ArrowUpFromLine className="w-5 h-5 text-gray-700" />
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Total Stock Out
              </p>

              <h3 className="text-xl font-bold text-gray-900 mt-1">
                {totalStockOut.toLocaleString()} units
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* =========================
          SEARCH & FILTERS
      ========================== */}

      <div className="bg-white border border-gray-200 rounded-2xl p-5">
        <div className="flex flex-col lg:flex-row gap-4">

          {/* Search */}

          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

            <input
              type="text"
              placeholder="Search product, code or category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-gray-200"
            />
          </div>

          {/* Filter */}

          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5 text-gray-500" />

            <select
              value={stockFilter}
              onChange={(e) => setStockFilter(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-xl outline-none bg-white"
            >
              <option value="all">All Stock</option>
              <option value="in-stock">In Stock</option>
              <option value="low">Low Stock</option>
            </select>
          </div>
        </div>
      </div>

      {/* =========================
          STOCK TABLE
      ========================== */}

      <StockTable
        stockItems={filteredStock}
        onView={handleViewStock}
        onEdit={handleOpenAdjustment}
      />

      {/* =========================
          STOCK ADJUSTMENT FORM
      ========================== */}

      {showAdjustmentForm && (
        <StockAdjustmentForm
          stockItems={stockItems}
          selectedItem={selectedStockItem}
          onClose={handleCloseAdjustment}
          onSave={handleSaveAdjustment}
        />
      )}
    </div>
  );
};

export default StockMaster;