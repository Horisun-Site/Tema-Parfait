import React from "react";
import {
  Eye,
  Pencil,
  Truck,
  Package,
} from "lucide-react";

const DeliveryNoteTable = ({
  deliveryNotes = [],
  onView,
  onEdit,
}) => {
  const getStatusClass = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-gray-100 text-gray-800";

      case "Processing":
      case "Out for Delivery":
        return "bg-gray-100 text-gray-700";

      case "Cancelled":
        return "bg-gray-200 text-gray-600";

      default:
        return "bg-gray-50 text-gray-600";
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">

      {/* HEADER */}

      <div className="px-5 py-4 border-b border-gray-200 flex items-center gap-2">

        <Truck
          size={18}
          className="text-gray-600"
        />

        <h2 className="font-semibold text-gray-900">
          Delivery Notes
        </h2>

      </div>

      {/* DESKTOP TABLE */}

      <div className="hidden lg:block overflow-x-auto">

        <table className="w-full">

          <thead className="bg-gray-50 border-b border-gray-200">

            <tr>

              <th className="text-left px-5 py-4 text-xs font-semibold text-gray-500 uppercase">
                Delivery No.
              </th>

              <th className="text-left px-5 py-4 text-xs font-semibold text-gray-500 uppercase">
                Invoice
              </th>

              <th className="text-left px-5 py-4 text-xs font-semibold text-gray-500 uppercase">
                Customer
              </th>

              <th className="text-left px-5 py-4 text-xs font-semibold text-gray-500 uppercase">
                Date
              </th>

              <th className="text-left px-5 py-4 text-xs font-semibold text-gray-500 uppercase">
                Products
              </th>

              <th className="text-left px-5 py-4 text-xs font-semibold text-gray-500 uppercase">
                Status
              </th>

              <th className="text-right px-5 py-4 text-xs font-semibold text-gray-500 uppercase">
                Actions
              </th>

            </tr>

          </thead>

          <tbody className="divide-y divide-gray-100">

            {deliveryNotes.length === 0 ? (
              <tr>

                <td
                  colSpan="7"
                  className="px-5 py-12 text-center"
                >

                  <Truck
                    size={32}
                    className="mx-auto text-gray-300"
                  />

                  <p className="text-sm text-gray-500 mt-3">
                    No delivery notes found.
                  </p>

                </td>

              </tr>
            ) : (
              deliveryNotes.map((note) => (

                <tr
                  key={note.id}
                  className="hover:bg-gray-50 transition"
                >

                  <td className="px-5 py-4">

                    <p className="font-medium text-gray-900">
                      {note.deliveryNumber}
                    </p>

                  </td>

                  <td className="px-5 py-4 text-sm text-gray-600">
                    {note.invoiceNumber}
                  </td>

                  <td className="px-5 py-4">

                    <p className="font-medium text-gray-900">
                      {note.customer}
                    </p>

                    <p className="text-xs text-gray-500 mt-1">
                      {note.customerId}
                    </p>

                  </td>

                  <td className="px-5 py-4 text-sm text-gray-600">
                    {note.date || note.deliveryDate}
                  </td>

                  <td className="px-5 py-4">

                    <div className="flex items-center gap-2">

                      <Package
                        size={16}
                        className="text-gray-500"
                      />

                      <span className="text-sm text-gray-700">
                        {note.items?.length || 0} item(s)
                      </span>

                    </div>

                  </td>

                  <td className="px-5 py-4">

                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getStatusClass(
                        note.deliveryStatus
                      )}`}
                    >
                      {note.deliveryStatus}
                    </span>

                  </td>

                  <td className="px-5 py-4">

                    <div className="flex items-center justify-end gap-2">

                      <button
                        type="button"
                        onClick={() =>
                          onView?.(note)
                        }
                        className="p-2 rounded-lg hover:bg-gray-100 text-gray-600"
                        title="View"
                      >
                        <Eye size={17} />
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          onEdit?.(note)
                        }
                        className="p-2 rounded-lg hover:bg-gray-100 text-gray-600"
                        title="Edit"
                      >
                        <Pencil size={17} />
                      </button>

                    </div>

                  </td>

                </tr>

              ))
            )}

          </tbody>

        </table>

      </div>

      {/* MOBILE */}

      <div className="lg:hidden divide-y divide-gray-100">

        {deliveryNotes.length === 0 ? (
          <div className="p-10 text-center">

            <Truck
              size={32}
              className="mx-auto text-gray-300"
            />

            <p className="text-sm text-gray-500 mt-3">
              No delivery notes found.
            </p>

          </div>
        ) : (
          deliveryNotes.map((note) => (

            <div
              key={note.id}
              className="p-5 space-y-4"
            >

              <div className="flex items-start justify-between gap-3">

                <div>

                  <p className="font-semibold text-gray-900">
                    {note.deliveryNumber}
                  </p>

                  <p className="text-xs text-gray-500 mt-1">
                    Invoice: {note.invoiceNumber}
                  </p>

                </div>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusClass(
                    note.deliveryStatus
                  )}`}
                >
                  {note.deliveryStatus}
                </span>

              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">

                <div>
                  <p className="text-xs text-gray-500">
                    Customer
                  </p>

                  <p className="font-medium text-gray-900 mt-1">
                    {note.customer}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">
                    Date
                  </p>

                  <p className="font-medium text-gray-900 mt-1">
                    {note.date || note.deliveryDate}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">
                    Products
                  </p>

                  <p className="font-medium text-gray-900 mt-1">
                    {note.items?.length || 0} item(s)
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">
                    Driver
                  </p>

                  <p className="font-medium text-gray-900 mt-1">
                    {note.driverName || "Not assigned"}
                  </p>
                </div>

              </div>

              <div className="flex justify-end gap-2 pt-2">

                <button
                  type="button"
                  onClick={() =>
                    onView?.(note)
                  }
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 text-sm hover:bg-gray-50"
                >
                  <Eye size={15} />
                  View
                </button>

                <button
                  type="button"
                  onClick={() =>
                    onEdit?.(note)
                  }
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-900 text-white text-sm hover:bg-gray-800"
                >
                  <Pencil size={15} />
                  Edit
                </button>

              </div>

            </div>

          ))
        )}

      </div>

    </div>
  );
};

export default DeliveryNoteTable;