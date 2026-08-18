import React from "react";
import { X, Save } from "lucide-react";

const CustomerForm = ({
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
              Add Customer
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Add a supermarket or business customer.
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

        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-7"
        >

          {/* Customer Information */}
          <section>

            <h3 className="font-semibold text-gray-900 mb-4">
              Customer Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Customer ID
                </label>

                <input
                  type="text"
                  name="customerId"
                  value={formData.customerId}
                  onChange={handleChange}
                  placeholder="e.g. CUS-0001"
                  required
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-gray-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Supermarket Name
                </label>

                <input
                  type="text"
                  name="supermarketName"
                  value={formData.supermarketName}
                  onChange={handleChange}
                  placeholder="Enter supermarket name"
                  required
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-gray-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Branch
                </label>

                <input
                  type="text"
                  name="branch"
                  value={formData.branch}
                  onChange={handleChange}
                  placeholder="e.g. Ikeja Branch"
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 outline-none"
                />
              </div>

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
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 outline-none"
                />
              </div>

            </div>

          </section>

          {/* Contact Details */}
          <section>

            <h3 className="font-semibold text-gray-900 mb-4">
              Contact Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

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
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="customer@example.com"
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 outline-none"
                />
              </div>

              <div className="md:col-span-2">

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address
                </label>

                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Customer address"
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 outline-none resize-none"
                />

              </div>

            </div>

          </section>

          {/* Financial Information */}
          <section>

            <h3 className="font-semibold text-gray-900 mb-4">
              Financial Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              <div>

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Credit Limit
                </label>

                <input
                  type="number"
                  name="creditLimit"
                  value={formData.creditLimit}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 outline-none"
                />

              </div>

              <div>

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Payment Terms
                </label>

                <select
                  name="paymentTerms"
                  value={formData.paymentTerms}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 outline-none"
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

                </select>

              </div>

            </div>

          </section>

          {/* Status */}
          <section>

            <h3 className="font-semibold text-gray-900 mb-4">
              Account Status
            </h3>

            <label className="flex items-center gap-3 cursor-pointer">

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
                Customer account is active
              </span>

            </label>

          </section>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-5 border-t border-gray-200">

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
              Save Customer
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default CustomerForm;