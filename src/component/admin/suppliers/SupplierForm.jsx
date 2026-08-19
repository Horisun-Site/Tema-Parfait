import React from "react";
import { X, Save } from "lucide-react";

const SupplierForm = ({
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
              Add Supplier
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Register a supplier for inventory and stock receiving.
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

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-7"
        >

          {/* =========================
              SUPPLIER INFORMATION
          ========================== */}

          <section>

            <h3 className="font-semibold text-gray-900 mb-4">
              Supplier Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              {/* Supplier ID */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Supplier ID
                </label>

                <input
                  type="text"
                  name="supplierId"
                  value={formData.supplierId}
                  onChange={handleChange}
                  placeholder="e.g. SUP-0001"
                  required
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-gray-200"
                />
              </div>

              {/* Supplier Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Supplier Name
                </label>

                <input
                  type="text"
                  name="supplierName"
                  value={formData.supplierName}
                  onChange={handleChange}
                  placeholder="Enter supplier/company name"
                  required
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-gray-200"
                />
              </div>

              {/* Contact Person */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Person
                </label>

                <input
                  type="text"
                  name="contactPerson"
                  value={formData.contactPerson}
                  onChange={handleChange}
                  placeholder="Contact person's name"
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-gray-200"
                />
              </div>

              {/* Telephone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Telephone
                </label>

                <input
                  type="tel"
                  name="telephone"
                  value={formData.telephone}
                  onChange={handleChange}
                  placeholder="080..."
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-gray-200"
                />
              </div>

            </div>

          </section>

          {/* =========================
              CONTACT DETAILS
          ========================== */}

          <section>

            <h3 className="font-semibold text-gray-900 mb-4">
              Contact Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              {/* Email */}
              <div>

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="supplier@example.com"
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-gray-200"
                />

              </div>

              {/* Payment Terms */}
              <div>

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Payment Terms
                </label>

                <select
                  name="paymentTerms"
                  value={formData.paymentTerms}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-gray-200"
                >

                  <option value="">
                    Select payment terms
                  </option>

                  <option value="Cash">
                    Cash
                  </option>

                  <option value="7 Days">
                    7 Days
                  </option>

                  <option value="14 Days">
                    14 Days
                  </option>

                  <option value="30 Days">
                    30 Days
                  </option>

                  <option value="60 Days">
                    60 Days
                  </option>

                  <option value="90 Days">
                    90 Days
                  </option>

                </select>

              </div>

              {/* Address */}
              <div className="md:col-span-2">

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address
                </label>

                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Enter supplier address"
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 outline-none resize-none focus:ring-2 focus:ring-gray-200"
                />

              </div>

            </div>

          </section>

          {/* =========================
              ACCOUNT INFORMATION
          ========================== */}

          <section>

            <h3 className="font-semibold text-gray-900 mb-4">
              Account Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              {/* Balance */}
              <div>

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Opening Balance
                </label>

                <div className="relative">

                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                    ₦
                  </span>

                  <input
                    type="number"
                    name="balance"
                    value={formData.balance}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                    className="w-full border border-gray-200 rounded-lg pl-9 pr-4 py-2.5 outline-none focus:ring-2 focus:ring-gray-200"
                  />

                </div>

                <p className="text-xs text-gray-400 mt-1">
                  Amount currently owed to the supplier.
                </p>

              </div>

              {/* Status */}
              <div>

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Account Status
                </label>

                <label className="flex items-center gap-3 h-[42px] cursor-pointer">

                  <input
                    type="checkbox"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        isActive: e.target.checked,
                      }))
                    }
                    className="w-4 h-4"
                  />

                  <span className="text-sm text-gray-700">
                    Supplier account is active
                  </span>

                </label>

              </div>

            </div>

          </section>

          {/* =========================
              NOTES
          ========================== */}

          <section>

            <h3 className="font-semibold text-gray-900 mb-4">
              Notes
            </h3>

            <textarea
              name="notes"
              value={formData.notes || ""}
              onChange={handleChange}
              rows="3"
              placeholder="Additional information about this supplier..."
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 outline-none resize-none focus:ring-2 focus:ring-gray-200"
            />

          </section>

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
              Save Supplier
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default SupplierForm;