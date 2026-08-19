import React from "react";

const InvoiceItems = ({ items = [], onChange }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5">
      <h3 className="font-semibold text-gray-900">
        Invoice Products
      </h3>

      <p className="text-sm text-gray-500 mt-1">
        Product lines will be added here.
      </p>
    </div>
  );
};

export default InvoiceItems;