import { useNavigate } from "react-router-dom";
import {
  ChevronRight,
  Clock,
  Building2,
  Users,
  Smile,
  Frown,
  Meh,
  User,
  GraduationCap,
} from "lucide-react";
import { useState, useEffect } from "react";
import dummyData from "../data/dummyData.json";

const Dashboard = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState(dummyData.employees);
  const [loading, setLoading] = useState(false);

  // Sort employees by mood priority: sad > neutral > happy
  const sortedEmployees = [...employees].sort((a, b) => {
    const moodPriority = { sad: 1, neutral: 2, happy: 3 };
    return (moodPriority[a.emotion] || 4) - (moodPriority[b.emotion] || 4);
  });

  // Calculate statistics
  const totalEmployees = employees.length;
  const checkedInEmployees = employees.filter(
    (emp) => !emp.check_out_date_time
  ).length;
  const happyEmployees = employees.filter(
    (emp) => emp.emotion === "happy"
  ).length;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="flex">
      {/* Removed Sidebar */}
      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="space-y-6">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-white to-blue-50 rounded-xl p-6 shadow-sm border border-blue-100/50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Employees
                  </p>
                  <p className="text-2xl font-semibold text-gray-900 mt-1">
                    {totalEmployees}
                  </p>
                </div>
                <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg">
                  <Users className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-white to-green-50 rounded-xl p-6 shadow-sm border border-green-100/50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Currently Checked In
                  </p>
                  <p className="text-2xl font-semibold text-gray-900 mt-1">
                    {checkedInEmployees}
                  </p>
                </div>
                <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-lg">
                  <Clock className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-white to-yellow-50 rounded-xl p-6 shadow-sm border border-yellow-100/50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Happy Employees
                  </p>
                  <p className="text-2xl font-semibold text-gray-900 mt-1">
                    {happyEmployees}
                  </p>
                </div>
                <div className="p-3 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Employee Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedEmployees.map((employee) => (
              <EmployeeCard
                key={employee.student_id}
                employee={{
                  id: employee.student_id,
                  name: `${employee.first_name} ${employee.last_name}`,
                  employer: employee.employer_name,
                  status: employee.check_out_date_time
                    ? "Checked Out"
                    : "Checked In",
                  statusColor: employee.check_out_date_time
                    ? "bg-gradient-to-r from-red-500 to-red-600 text-white"
                    : "bg-gradient-to-r from-green-500 to-green-600 text-white",
                  workingHours: `${new Date(
                    employee.check_in_date_time
                  ).toLocaleTimeString()} - ${
                    employee.check_out_date_time
                      ? new Date(
                          employee.check_out_date_time
                        ).toLocaleTimeString()
                      : "N/A"
                  }`,
                  mood: employee.emotion,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

function EmployeeCard({ employee }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/employee/${employee.id}`);
  };

  // Returns a Lucide icon component for the mood
  const getMoodIcon = (mood) => {
    switch (mood) {
      case "happy":
        return <Smile className="w-7 h-7 text-yellow-400" />;
      case "sad":
        return <Frown className="w-7 h-7 text-red-400" />;
      case "neutral":
        return <Meh className="w-7 h-7 text-blue-400" />;
      default:
        return null;
    }
  };

  return (
    <div
      className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold text-gray-900">
            {employee.name}
          </h2>
          <p className="text-sm text-gray-500">ID: {employee.id}</p>
          <p className="text-sm text-gray-500">{employee.employer}</p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${employee.statusColor}`}
        >
          {employee.status}
        </span>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* Mood Indicator: icon and bold label, no circle */}
            <div className="flex flex-col items-center">
              <span>{getMoodIcon(employee.mood)}</span>
              <span
                className={
                  {
                    happy: "text-yellow-700",
                    sad: "text-red-700",
                    neutral: "text-blue-700",
                  }[employee.mood] + " text-xs font-bold mt-1 capitalize"
                }
              >
                {employee.mood}
              </span>
            </div>
          </div>
          <div className="text-sm text-gray-500">{employee.workingHours}</div>
        </div>
      </div>
      {/* Removed View Details button */}
    </div>
  );
}

export default Dashboard;
