import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Users,
  Clock,
  Building2,
  LogIn,
  Globe,
  Facebook,
  BarChart3,
  Shield,
  Mail,
  Phone,
} from "lucide-react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../authConfig"; // Adjust path if needed
import { useNavigate } from "react-router-dom";

const Index = () => {
  const { instance, accounts, inProgress } = useMsal();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (accounts.length > 0) {
      navigate("/dashboard");
    }
  }, [accounts, navigate]);

  const handleLogin = () => {
    try {
      setIsLoading(true);
      instance.loginRedirect(loginRequest);
    } catch (error) {
      console.error("Login failed:", error);
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    instance.logoutRedirect();
  };

  // Show loading state while authentication is in progress
  if (inProgress !== "none") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-blue-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Signing in...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 flex flex-col">
      {/* Header with Sign In */}
      <header className="w-full py-4 px-6">
        <div className="max-w-7xl mx-auto flex justify-end">
          {accounts.length > 0 ? (
            <div className="flex items-center gap-4">
              <span className="text-gray-700">
                Welcome {accounts[0].username}
              </span>
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 text-white font-semibold text-lg shadow-lg hover:from-blue-800 hover:to-purple-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <LogIn className="mr-2 w-5 h-5" />
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={handleLogin}
              disabled={isLoading}
              className="inline-flex items-center px-6 py-3 rounded-xl bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 text-white font-bold text-lg shadow-xl hover:from-blue-800 hover:to-purple-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <LogIn className="mr-3 w-6 h-6" />
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center p-6">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Hero Section */}
          <div className="space-y-4 flex flex-col items-center">
            <img
              src="/SJSF-LOGO.webp"
              alt="SJSF Logo"
              className="h-36 w-auto mx-auto"
            />
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Welcome
            </h1>
            {/* <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              A comprehensive platform for managing and tracking employee
              information and performance.
            </p> */}
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="bg-gradient-to-br from-white to-blue-50 p-6 rounded-xl shadow-sm border border-blue-100/50 hover:shadow-md transition-shadow">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg w-fit mx-auto mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Employee Management
              </h3>
              <p className="text-gray-600">
                Easily manage and track employee information, performance, and
                development.
              </p>
            </div>
            <div className="bg-gradient-to-br from-white to-green-50 p-6 rounded-xl shadow-sm border border-green-100/50 hover:shadow-md transition-shadow">
              <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-lg w-fit mx-auto mb-4">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Time Management
              </h3>
              <p className="text-gray-600">
                Efficient check-in/check-out system with detailed time logs.
              </p>
            </div>
            <div className="bg-gradient-to-br from-white to-yellow-50 p-6 rounded-xl shadow-sm border border-yellow-100/50 hover:shadow-md transition-shadow">
              <div className="p-3 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg w-fit mx-auto mb-4">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Mood Analytics
              </h3>
              <p className="text-gray-600">
                Track employee well-being and engagement levels.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-b from-white to-gray-50 border-t border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
                About
              </h3>
              <p className="mt-4 text-gray-600">
                The Shiranee Joseph de Saram Foundation is a New Jersey
                501(c)(3) non-profit organization established to support those
                with special needs in Sri Lanka.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
                Quick Links
              </h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link
                    to="/dashboard"
                    className="text-gray-600 hover:text-blue-600 transition-colors inline-flex items-center gap-2"
                  >
                    <Globe className="w-4 h-4" />
                    Our Website
                  </Link>
                </li>
                <li>
                  <Link
                    to="/student-management"
                    className="text-gray-600 hover:text-blue-600 transition-colors inline-flex items-center gap-2"
                  >
                    <Facebook className="w-4 h-4" />
                    Facebook
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
                Contact
              </h3>
              <ul className="mt-4 space-y-2">
                <li className="text-gray-600">Email: contact@sjdsf.org</li>
                <li className="text-gray-600">Phone: +1 6179597583</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-4 border-t border-gray-200">
            <p className="text-center text-gray-500">
              © {new Date().getFullYear()} SJDSF | The Shiranee Joseph de Saram
              Foundation
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
