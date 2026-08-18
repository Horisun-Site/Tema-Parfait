import React, { useMemo, useState } from "react";
import {
  Plus,
  Search,
  Users,
  UserCheck,
  CreditCard,
  Wallet,
} from "lucide-react";

import CustomerForm from "./CustomerForm";
import CustomerTable from "./CustomerTable";

const emptyCustomer = {
  customerId: "",
  supermarketName: "",
  branch: "",
  contactPerson: "",
  telephone: "",
  email: "",
  address: "",
  creditLimit: "",
  paymentTerms: "",
  balance: 0,
  isActive: true,
};

const CustomerMaster = () => {

  const [customers, setCustomers] = useState([]);

  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState(emptyCustomer);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState("all");

  const stats = useMemo(() => {

    const total = customers.length;

    const active = customers.filter(
      (customer) => customer.isActive
    ).length;

    const outstanding = customers.filter(
      (customer) => Number(customer.balance) > 0
    ).length;

    const totalBalance = customers.reduce(
      (sum, customer) =>
        sum + Number(customer.balance || 0),
      0
    );

    return {
      total,
      active,
      outstanding,
      totalBalance,
    };

  }, [customers]);

  const filteredCustomers = useMemo(() => {

    return customers.filter((customer) => {

      const searchValue = search.toLowerCase();

      const matchesSearch =
        customer.supermarketName
          .toLowerCase()
          .includes(searchValue) ||
        customer.customerId
          .toLowerCase()
          .includes(searchValue) ||
        customer.contactPerson
          .toLowerCase()
          .includes(searchValue);

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "active" &&
          customer.isActive) ||
        (statusFilter === "inactive" &&
          !customer.isActive) ||
        (statusFilter === "outstanding" &&
          Number(customer.balance) > 0);

      return matchesSearch && matchesStatus;

    });

  }, [customers, search, statusFilter]);

  const handleSave = (customer) => {

    setCustomers((prev) => [
      ...prev,
      {
        ...customer,
        balance: Number(customer.balance || 0),
      },
    ]);

    setShowForm(false);

    setFormData(emptyCustomer);
  };

  const openAddCustomer = () => {

    setFormData({
      ...emptyCustomer,
      customerId: `CUS-${String(
        customers.length + 1
      ).padStart(4, "0")}`,
    });

    setShowForm(true);
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

        <div>

          <h1 className="text-2xl font-bold text-gray-900">
            Customer Management
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Manage supermarkets, branches, customer accounts and balances.
          </p>

        </div>

        <button
          onClick={openAddCustomer}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition"
        >
          <Plus size={18} />
          Add Customer
        </button>

      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

        <StatCard
          title="Total Customers"
          value={stats.total}
          icon={Users}
        />

        <StatCard
          title="Active Customers"
          value={stats.active}
          icon={UserCheck}
        />

        <StatCard
          title="Outstanding Accounts"
          value={stats.outstanding}
          icon={CreditCard}
        />

        <StatCard
          title="Total Outstanding"
          value={`₦${stats.totalBalance.toLocaleString()}`}
          icon={Wallet}
        />

      </div>

      {/* Search and Filters */}
      <div className="bg-white border border-gray-200 rounded-2xl p-4">

        <div className="flex flex-col md:flex-row gap-3">

          <div className="relative flex-1">

            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search customer, ID or contact person..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg outline-none text-sm"
            />

          </div>

          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value)
            }
            className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none"
          >

            <option value="all">
              All Customers
            </option>

            <option value="active">
              Active
            </option>

            <option value="inactive">
              Inactive
            </option>

            <option value="outstanding">
              Outstanding Balance
            </option>

          </select>

        </div>

      </div>

      {/* Table */}
      <CustomerTable
        customers={filteredCustomers}
        onView={(customer) =>
          console.log("View customer:", customer)
        }
        onEdit={(customer) =>
          console.log("Edit customer:", customer)
        }
      />

      {/* Form */}
      {showForm && (
        <CustomerForm
          onClose={() => setShowForm(false)}
          onSave={handleSave}
          formData={formData}
          setFormData={setFormData}
        />
      )}

    </div>
  );
};

const StatCard = ({
  title,
  value,
  icon: Icon,
}) => {

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5">

      <div className="flex items-start justify-between">

        <div>

          <p className="text-sm text-gray-500">
            {title}
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-2">
            {value}
          </h2>

        </div>

        <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">

          <Icon size={20} />

        </div>

      </div>

    </div>
  );
};

export default CustomerMaster;