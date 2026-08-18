import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Users,
  Truck,
  Receipt,
  BarChart3,
  Settings,
  ChevronDown,
  ChevronRight,
  Bell,
  Search,
  UserCircle,
  LogOut,
  Menu,
  X,
  CreditCard,
  RotateCcw,
  FileText,
  Warehouse,
  CalendarClock,
  UserCog,
  ShieldCheck,
  ClipboardList,
  Wallet,
} from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [openMenu, setOpenMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (path) => {
    return location.pathname === path;
  };

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  const handleNavigate = (path) => {
    navigate(path);
    setMobileOpen(false);
  };

  const navItems = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      path: "/admin/dashboard",
    },

    {
      title: "Sales",
      icon: ShoppingCart,
      submenu: [
        {
          title: "Invoices",
          icon: Receipt,
          path: "/admin/sales/invoices",
        },
        {
          title: "Payments",
          icon: CreditCard,
          path: "/admin/sales/payments",
        },
        {
          title: "Returns",
          icon: RotateCcw,
          path: "/admin/sales/returns",
        },
        {
          title: "Delivery Notes",
          icon: FileText,
          path: "/admin/sales/delivery-notes",
        },
      ],
    },

    {
      title: "Inventory",
      icon: Package,
      submenu: [
        {
          title: "Products",
          icon: Package,
          path: "/admin/inventory/products",
        },
        {
          title: "Stock Receiving",
          icon: Warehouse,
          path: "/admin/inventory/receiving",
        },
        {
          title: "Stock Control",
          icon: ClipboardList,
          path: "/admin/inventory/stock",
        },
        {
          title: "Batch & Expiry",
          icon: CalendarClock,
          path: "/admin/inventory/batches",
        },
      ],
    },

    {
      title: "Customers",
      icon: Users,
      submenu: [
        {
          title: "Customer Database",
          icon: Users,
          path: "/admin/customers",
        },
        {
          title: "Customer Statements",
          icon: FileText,
          path: "/admin/customers/statements",
        },
      ],
    },

    {
      title: "Suppliers",
      icon: Truck,
      path: "/admin/suppliers",
    },

    {
      title: "Expenses",
      icon: Wallet,
      path: "/admin/expenses",
    },

    {
      title: "Reports",
      icon: BarChart3,
      path: "/admin/reports",
    },

    {
      title: "Administration",
      icon: Settings,
      submenu: [
        {
          title: "Users",
          icon: UserCog,
          path: "/admin/settings/users",
        },
        {
          title: "Roles & Permissions",
          icon: ShieldCheck,
          path: "/admin/settings/roles",
        },
        {
          title: "Audit Log",
          icon: ClipboardList,
          path: "/admin/settings/audit-log",
        },
      ],
    },
  ];

  return (
    <>
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          <h1 className="font-bold text-lg">Tema Foods</h1>
        </div>

        <Bell size={21} />
      </header>

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-40 h-screen w-72 bg-white border-r border-gray-200
          transition-transform duration-300
          lg:translate-x-0
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Logo */}
        <div className="h-20 px-6 flex items-center border-b border-gray-200">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Tema Foods</h1>

            <p className="text-xs text-gray-500">Management System</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1 overflow-y-auto h-[calc(100vh-160px)]">
          {navItems.map((item) => {
            const Icon = item.icon;
            const hasSubmenu = item.submenu;

            return (
              <div key={item.title}>
                <button
                  onClick={() => {
                    if (hasSubmenu) {
                      toggleMenu(item.title);
                    } else {
                      handleNavigate(item.path);
                    }
                  }}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition ${
                    item.path && isActive(item.path)
                      ? "bg-gray-900 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={19} />

                    <span className="text-sm font-medium">{item.title}</span>
                  </div>

                  {hasSubmenu &&
                    (openMenu === item.title ? (
                      <ChevronDown size={17} />
                    ) : (
                      <ChevronRight size={17} />
                    ))}
                </button>

                {hasSubmenu && openMenu === item.title && (
                  <div className="ml-5 mt-1 space-y-1 border-l border-gray-200 pl-3">
                    {item.submenu.map((subItem) => {
                      const SubIcon = subItem.icon;

                      return (
                        <button
                          key={subItem.title}
                          onClick={() => handleNavigate(subItem.path)}
                          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition ${
                            isActive(subItem.path)
                              ? "bg-gray-900 text-white"
                              : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                          }`}
                        >
                          <SubIcon size={16} />

                          <span>{subItem.title}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* User */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <UserCircle size={38} />

            <div className="flex-1">
              <p className="text-sm font-semibold">Admin</p>

              <p className="text-xs text-gray-500">Administrator</p>
            </div>

            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </aside>

      {/* Topbar */}
      <div className="hidden lg:flex fixed top-0 left-72 right-0 h-20 bg-white border-b border-gray-200 z-30 items-center justify-between px-8">
        {/* Search */}
        <div className="relative w-96">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search invoices, customers, products..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-100 border-none outline-none text-sm"
          />
        </div>

        {/* Right side */}
        <div className="flex items-center gap-5">
          <button className="relative p-2 rounded-lg hover:bg-gray-100">
            <Bell size={21} />

            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500" />
          </button>

          <div className="h-8 w-px bg-gray-200" />

          <div className="flex items-center gap-3">
            <UserCircle size={36} />

            <div>
              <p className="text-sm font-semibold">Admin</p>

              <p className="text-xs text-gray-500">Administrator</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
