import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "@/components/Logo";
import {
  User,
  GraduationCap,
  LogOut,
  BriefcaseBusiness,
  LayoutDashboard,
  Contact,
  Factory,
} from "lucide-react";
import { useMsal } from "@azure/msal-react";

interface MainLayoutProps {
  children: ReactNode;
}

// Sidebar with icons and active state
function Sidebar({ active = "dashboard" }) {
  const location = useLocation();
  return (
    <nav className="flex flex-col gap-2 py-8 px-4">
      <Link
        to="/dashboard"
        className={`flex items-center gap-3 px-5 py-3 rounded-xl font-medium text-sm ${
          location.pathname === "/dashboard"
            ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white"
            : "text-gray-600 hover:bg-gray-100"
        }`}
      >
        <LayoutDashboard className="w-5 h-5" />
        Dashboard
      </Link>
      <Link
        to="/student-management"
        className={`flex items-center gap-3 px-5 py-3 rounded-xl font-medium text-sm ${
          location.pathname === "/student-management"
            ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white"
            : "text-gray-600 hover:bg-gray-100"
        }`}
      >
        <Contact className="w-5 h-5" />
        Employee Management
      </Link>
      <Link
        to="#"
        className={`flex items-center gap-3 px-5 py-3 rounded-xl font-medium text-sm ${
          location.pathname === "#"
            ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white"
            : "text-gray-600 hover:bg-gray-100"
        }`}
      >
        <Factory className="w-5 h-5" />
        Employer Management
      </Link>
      <Link
        to="#"
        className={`flex items-center gap-3 px-5 py-3 rounded-xl font-medium text-sm ${
          location.pathname === "#"
            ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white"
            : "text-gray-600 hover:bg-gray-100"
        }`}
      >
        <BriefcaseBusiness className="w-5 h-5" />
        Supervisor Management
      </Link>
    </nav>
  );
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const location = useLocation();
  const { accounts, instance } = useMsal();
  const user = accounts[0];

  const handleLogout = () => {
    instance.logoutPopup();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-white to-gray-50 border-r border-gray-200 transform transition-transform duration-200 ease-in-out">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-center h-16 px-4 border-b border-gray-200">
            <Link to="/" className="flex items-center justify-center w-full">
              <Logo className="h-8 w-auto" />
            </Link>
          </div>
          {/* Sidebar Navigation */}
          <Sidebar />
          {/* User Profile at the bottom */}
          <div className="mt-auto p-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                  <span className="text-sm font-medium text-white">
                    {user?.name?.[0]?.toUpperCase() || "U"}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {user?.name || "User"}
                  </p>
                  <p className="text-xs text-gray-500">
                    {user?.username || "user@example.com"}
                  </p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pl-64">
        <main className="p-8">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
