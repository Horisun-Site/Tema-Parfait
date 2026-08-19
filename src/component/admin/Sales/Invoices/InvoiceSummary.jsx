import React from "react";

const InvoiceSummary = ({
  subtotal = 0,
  discount = 0,
  vat = 0,
  vatRate = 7.5,
  total = 0,
  formatCurrency,
}) => {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5">
      <h3 className="font-semibold text-gray-900">
        Invoice Summary
      </h3>

      <div className="mt-4 space-y-2">
        <p>Subtotal: {formatCurrency(subtotal)}</p>
        <p>Discount: {formatCurrency(discount)}</p>
        <p>VAT ({vatRate}%): {formatCurrency(vat)}</p>
        <p className="font-bold">
          Total: {formatCurrency(total)}
        </p>
      </div>
    </div>
  );
};

export default InvoiceSummary;