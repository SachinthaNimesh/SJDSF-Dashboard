import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Users,
  Clock,
  Building2,
  LogIn,
  Globe,
  Facebook,
} from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 flex flex-col">
      {/* Header with Sign In */}
      <header className="w-full py-4 px-6">
        <div className="max-w-7xl mx-auto flex justify-end">
          <Link
            to="/dashboard"
            className="inline-flex items-center px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium hover:from-blue-700 hover:to-indigo-700 transition-all shadow-sm hover:shadow-md"
          >
            <LogIn className="mr-2 w-4 h-4" />
            Sign In
          </Link>
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
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Streamline your employee management with our comprehensive
              dashboard solution.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="bg-gradient-to-br from-white to-blue-50 p-6 rounded-xl shadow-sm border border-blue-100/50 hover:shadow-md transition-shadow">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg w-fit mx-auto mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Employee Tracking
              </h3>
              <p className="text-gray-600">
                Monitor employee attendance and working hours in real-time.
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
