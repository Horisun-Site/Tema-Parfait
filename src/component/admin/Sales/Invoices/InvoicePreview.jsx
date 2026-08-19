import React from "react";
import {
  X,
  Printer,
  Download,
  Receipt,
} from "lucide-react";

const InvoicePreview = ({
  invoice,
  onClose,
}) => {
  // ==========================================
  // CURRENCY
  // ==========================================

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 2,
    }).format(Number(amount || 0));
  };

  // ==========================================
  // PRINT
  // ==========================================

  const handlePrint = () => {
    window.print();
  };

  // ==========================================
  // DOWNLOAD
  // ==========================================

  const handleDownload = () => {
    // PDF export will be connected later.
    console.log("PDF export requested");
  };

  // ==========================================
  // EMPTY STATE
  // ==========================================

  if (!invoice) {
    return (
      <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">

        <div className="bg-white rounded-2xl p-8 text-center">

          <Receipt className="mx-auto w-10 h-10 text-gray-400" />

          <h2 className="mt-4 text-lg font-semibold">
            No Invoice Selected
          </h2>

          <p className="text-sm text-gray-500 mt-2">
            Select an invoice to preview it.
          </p>

          <button
            onClick={onClose}
            className="mt-5 px-5 py-2.5 bg-gray-900 text-white rounded-xl"
          >
            Close
          </button>

        </div>

      </div>
    );
  }

  const items = invoice.items || [];

  return (
    <div className="fixed inset-0 z-50 bg-black/50 overflow-y-auto">

      {/* ======================================
          ACTION BAR
      ======================================= */}

      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-4 md:px-8 py-4">

        <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">

          <div>
            <h2 className="text-lg font-bold text-gray-900">
              Invoice Preview
            </h2>

            <p className="text-sm text-gray-500">
              {invoice.invoiceNumber ||
                "Invoice"}
            </p>
          </div>

          <div className="flex items-center gap-2">

            <button
              type="button"
              onClick={handleDownload}
              className="inline-flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-medium hover:bg-gray-50 transition"
            >
              <Download size={17} />

              <span className="hidden sm:inline">
                PDF
              </span>
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-gray-900 text-white rounded-xl text-sm font-medium hover:bg-gray-800 transition"
            >
              <Printer size={17} />

              Print
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-2.5 rounded-xl hover:bg-gray-100 transition"
            >
              <X size={20} />
            </button>

          </div>

        </div>

      </div>

      {/* ======================================
          INVOICE DOCUMENT
      ======================================= */}

      <div className="py-8 px-4">

        <div
          id="invoice-print"
          className="max-w-5xl mx-auto bg-white shadow-lg"
        >

          {/* ==================================
              COMPANY HEADER
          =================================== */}

          <div className="p-8 md:p-10 border-b border-gray-200">

            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">

              {/* Company */}

              <div>

                {/* Replace with actual logo later */}

                <div className="flex items-center gap-3">

                  <div className="w-12 h-12 bg-gray-900 text-white rounded-xl flex items-center justify-center">
                    <Receipt size={24} />
                  </div>

                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                      Tema Foods
                    </h1>

                    <p className="text-sm text-gray-500">
                      Food & Beverage Management
                    </p>
                  </div>

                </div>

                <div className="mt-5 text-sm text-gray-600 space-y-1">
                  <p>
                    Company Address
                  </p>

                  <p>
                    Phone: +234 XXX XXX XXXX
                  </p>

                  <p>
                    Email: info@temafoods.com
                  </p>
                </div>

              </div>

              {/* Invoice Information */}

              <div className="md:text-right">

                <p className="text-sm uppercase tracking-wider text-gray-500">
                  Sales Invoice
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mt-1">
                  {invoice.invoiceNumber ||
                    "INV-000001"}
                </h2>

                <div className="mt-4 text-sm text-gray-600 space-y-1">

                  <p>
                    Date:{" "}
                    <span className="font-medium text-gray-900">
                      {invoice.date || "-"}
                    </span>
                  </p>

                  <p>
                    Time:{" "}
                    <span className="font-medium text-gray-900">
                      {invoice.time || "-"}
                    </span>
                  </p>

                </div>

              </div>

            </div>

          </div>

          {/* ==================================
              CUSTOMER INFORMATION
          =================================== */}

          <div className="p-8 md:p-10">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Bill To */}

              <div className="border border-gray-200 rounded-xl p-5">

                <p className="text-xs uppercase tracking-wider text-gray-500">
                  Bill To
                </p>

                <h3 className="text-lg font-bold text-gray-900 mt-2">
                  {invoice.customer ||
                    "Customer"}
                </h3>

                <div className="mt-3 text-sm text-gray-600 space-y-1">

                  <p>
                    Customer ID:{" "}
                    {invoice.customerId || "-"}
                  </p>

                  <p>
                    Branch:{" "}
                    {invoice.branch || "-"}
                  </p>

                  <p>
                    Telephone:{" "}
                    {invoice.telephone || "-"}
                  </p>

                  <p>
                    Address:{" "}
                    {invoice.address || "-"}
                  </p>

                </div>

              </div>

              {/* Status */}

              <div className="border border-gray-200 rounded-xl p-5">

                <p className="text-xs uppercase tracking-wider text-gray-500">
                  Invoice Status
                </p>

                <div className="mt-4 space-y-3">

                  <StatusRow
                    label="Payment"
                    value={
                      invoice.paymentStatus ||
                      "Pending"
                    }
                  />

                  <StatusRow
                    label="Delivery"
                    value={
                      invoice.deliveryStatus ||
                      "Pending"
                    }
                  />

                </div>

              </div>

            </div>

            {/* ==================================
                PRODUCT TABLE
            =================================== */}

            <div className="mt-8 overflow-x-auto">

              <table className="w-full border-collapse">

                <thead>

                  <tr className="bg-gray-100 border-y border-gray-200">

                    <th className="text-left px-4 py-3 text-xs font-semibold uppercase text-gray-600">
                      #
                    </th>

                    <th className="text-left px-4 py-3 text-xs font-semibold uppercase text-gray-600">
                      Product
                    </th>

                    <th className="text-center px-4 py-3 text-xs font-semibold uppercase text-gray-600">
                      Qty
                    </th>

                    <th className="text-right px-4 py-3 text-xs font-semibold uppercase text-gray-600">
                      Unit Price
                    </th>

                    <th className="text-right px-4 py-3 text-xs font-semibold uppercase text-gray-600">
                      Discount
                    </th>

                    <th className="text-right px-4 py-3 text-xs font-semibold uppercase text-gray-600">
                      Total
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {items.length > 0 ? (
                    items.map((item, index) => {

                      const quantity =
                        Number(
                          item.quantity || 0
                        );

                      const price =
                        Number(
                          item.price || 0
                        );

                      const discount =
                        Number(
                          item.discount || 0
                        );

                      const total =
                        quantity * price -
                        discount;

                      return (
                        <tr
                          key={
                            item.id ||
                            item.productId ||
                            index
                          }
                          className="border-b border-gray-200"
                        >

                          <td className="px-4 py-4 text-sm text-gray-600">
                            {index + 1}
                          </td>

                          <td className="px-4 py-4">

                            <p className="text-sm font-medium text-gray-900">
                              {item.product ||
                                item.productName ||
                                "-"}
                            </p>

                            <p className="text-xs text-gray-500 mt-1">
                              {item.productCode ||
                                ""}
                            </p>

                          </td>

                          <td className="px-4 py-4 text-sm text-center text-gray-700">
                            {quantity}
                          </td>

                          <td className="px-4 py-4 text-sm text-right text-gray-700">
                            {formatCurrency(price)}
                          </td>

                          <td className="px-4 py-4 text-sm text-right text-gray-700">
                            {formatCurrency(
                              discount
                            )}
                          </td>

                          <td className="px-4 py-4 text-sm font-semibold text-right text-gray-900">
                            {formatCurrency(
                              total
                            )}
                          </td>

                        </tr>
                      );
                    })
                  ) : (
                    <tr>

                      <td
                        colSpan="6"
                        className="px-4 py-10 text-center text-sm text-gray-500"
                      >
                        No products have been added
                        to this invoice.
                      </td>

                    </tr>
                  )}

                </tbody>

              </table>

            </div>

            {/* ==================================
                TOTALS
            =================================== */}

            <div className="mt-8 flex justify-end">

              <div className="w-full md:w-96 space-y-3">

                <SummaryRow
                  label="Subtotal"
                  value={formatCurrency(
                    invoice.subtotal
                  )}
                />

                <SummaryRow
                  label="Discount"
                  value={formatCurrency(
                    invoice.discount
                  )}
                />

                <SummaryRow
                  label={`VAT (${invoice.vatRate || 7.5}%)`}
                  value={formatCurrency(
                    invoice.vat
                  )}
                />

                <div className="border-t border-gray-300 pt-4 flex items-center justify-between">

                  <span className="text-lg font-bold text-gray-900">
                    Grand Total
                  </span>

                  <span className="text-xl font-bold text-gray-900">
                    {formatCurrency(
                      invoice.total
                    )}
                  </span>

                </div>

              </div>

            </div>

            {/* ==================================
                PAYMENT INSTRUCTIONS
            =================================== */}

            <div className="mt-10 border border-gray-200 rounded-xl p-5">

              <h3 className="font-semibold text-gray-900">
                Payment Instructions
              </h3>

              <p className="text-sm text-gray-600 mt-2">
                Please make payment using the approved
                company payment channels and reference
                the invoice number when making payment.
              </p>

              <div className="mt-4 text-sm text-gray-600 space-y-1">

                <p>
                  Bank: Company Bank
                </p>

                <p>
                  Account Name: Tema Foods
                </p>

                <p>
                  Account Number: XXXX XXXX XXXX
                </p>

              </div>

            </div>

            {/* ==================================
                NOTES
            =================================== */}

            {invoice.notes && (
              <div className="mt-6">

                <h3 className="font-semibold text-gray-900">
                  Notes
                </h3>

                <p className="text-sm text-gray-600 mt-2 whitespace-pre-wrap">
                  {invoice.notes}
                </p>

              </div>
            )}

            {/* ==================================
                SIGNATURE
            =================================== */}

            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12">

              <Signature
                label="Prepared By"
              />

              <Signature
                label="Customer Signature"
              />

            </div>

          </div>

          {/* ==================================
              FOOTER
          =================================== */}

          <div className="border-t border-gray-200 px-8 md:px-10 py-5 text-center">

            <p className="text-xs text-gray-500">
              Thank you for doing business with Tema Foods.
            </p>

            <p className="text-xs text-gray-400 mt-1">
              This invoice was generated by the Tema Foods
              Management System.
            </p>

          </div>

        </div>

      </div>

      {/* ======================================
          PRINT STYLES
      ======================================= */}

      <style>
        {`
          @media print {

            body * {
              visibility: hidden;
            }

            #invoice-print,
            #invoice-print * {
              visibility: visible;
            }

            #invoice-print {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              box-shadow: none;
            }

            @page {
              size: A4;
              margin: 10mm;
            }
          }
        `}
      </style>

    </div>
  );
};

// ==========================================
// STATUS ROW
// ==========================================

const StatusRow = ({
  label,
  value,
}) => {
  return (
    <div className="flex items-center justify-between gap-4">

      <span className="text-sm text-gray-500">
        {label}
      </span>

      <span className="px-3 py-1 rounded-full bg-gray-100 text-xs font-medium text-gray-700">
        {value}
      </span>

    </div>
  );
};

// ==========================================
// SUMMARY ROW
// ==========================================

const SummaryRow = ({
  label,
  value,
}) => {
  return (
    <div className="flex items-center justify-between">

      <span className="text-sm text-gray-500">
        {label}
      </span>

      <span className="text-sm font-medium text-gray-900">
        {value}
      </span>

    </div>
  );
};

// ==========================================
// SIGNATURE
// ==========================================

const Signature = ({
  label,
}) => {
  return (
    <div>

      <div className="h-12 border-b border-gray-400" />

      <p className="text-sm text-gray-500 mt-2">
        {label}
      </p>

    </div>
  );
};

export default InvoicePreview;