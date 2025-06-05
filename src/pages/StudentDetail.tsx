import { useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Mock data for the attendance log
const attendanceData = [
  { date: "2025-02-20", checkIn: "8:00 AM", checkOut: "5:00 PM" },
  { date: "2025-02-21", checkIn: "8:15 AM", checkOut: "5:15 PM" },
  { date: "2025-02-22", checkIn: "8:05 AM", checkOut: "5:20 PM" },
  { date: "2025-02-23", checkIn: "7:50 AM", checkOut: "5:00 PM" },
  { date: "2025-02-24", checkIn: "8:10 AM", checkOut: "5:15 PM" },
];

// Mock data for emotional trend
const emotionalData = [
  { date: "2025-02-20", value: 0 },
  { date: "2025-02-21", value: 1 },
  { date: "2025-02-22", value: 2 },
  { date: "2025-02-23", value: 2 },
  { date: "2025-02-24", value: 1 },
];

// Mock data for incident reports
const incidentReports = [
  {
    date: "2025-03-06",
    time: "2:40 PM",
    type: "Minor Incident",
    issue: "Had difficulty understanding new task instructions",
    resolution:
      "Support staff provided additional guidance and simplified instructions",
  },
  {
    date: "2025-02-22",
    time: "10:45 AM",
    type: "Minor Incident",
    issue: "Had difficulty understanding new task instructions",
    resolution:
      "Support staff provided additional guidance and simplified instructions",
  },
  {
    date: "2025-02-22",
    time: "10:45 AM",
    type: "Minor Incident",
    issue: "Had difficulty understanding new task instructions",
    resolution:
      "Support staff provided additional guidance and simplified instructions",
  },
];

// Mock data for feedbacks
const feedbacks = [
  {
    date: "2025-02-22",
    time: "10:45 AM",
    type: "Feedback",
    content:
      "Successfully arranged a shelf without support of other employees.",
  },
];

const StudentDetail = () => {
  const { id } = useParams(); // Get the id from the URL

  // Mock employee data (would normally come from an API)
  const employee = {
    id, // Use the id from the URL
    name: "Sampath Perera",
    employer: "ABC Textiles Ltd",
    photoUrl: "/user.jpg",
    guardian_contact_no: "0771234567",
    employer_contact_no: "0777654321",
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-100">
      <div className="flex flex-1">
        <main className="flex-1 p-4">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 gap-4">
              <h2 className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent tracking-tight">
                Trainer Dashboard
              </h2>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Search trainee..."
                  className="px-4 py-2 rounded-full border border-gray-200 shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition text-sm bg-white placeholder-gray-400"
                />
                <select className="px-4 py-2 rounded-full border border-gray-200 shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition text-sm bg-white">
                  <option>Week</option>
                  <option>Month</option>
                  <option>Year</option>
                </select>
              </div>
            </div>

            {/* Employee Profile */}
            <div className="flex flex-col md:flex-row items-center bg-gradient-to-r from-white via-blue-50 to-blue-100 rounded-2xl shadow-lg p-6 mb-8 gap-6">
              {/* Removed image, replaced with smooth profile info layout */}
              <div className="flex-1 flex flex-col justify-center items-center md:items-start">
                <h3 className="text-2xl font-bold text-gray-800 mb-1">
                  {employee.name}
                </h3>
                <p className="text-gray-500 text-sm mb-1">
                  ID: <span className="font-medium">{employee.id}</span>
                </p>
                <p className="text-gray-500 text-sm mb-1">
                  Employer:{" "}
                  <span className="font-medium">{employee.employer}</span>
                </p>
                <div className="flex gap-4 mt-2">
                  <span className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 text-xs font-semibold shadow">
                    Guardian: {employee.guardian_contact_no}
                  </span>
                  <span className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-indigo-100 to-indigo-200 text-indigo-700 text-xs font-semibold shadow">
                    Employer: {employee.employer_contact_no}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Attendance Log */}
              <Card className="bg-gradient-to-br from-white to-blue-50 p-6 rounded-2xl shadow-md border border-blue-100/60 transition-transform hover:scale-[1.02]">
                <h3 className="text-lg font-bold mb-4 text-blue-700">
                  Attendance Log
                </h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-xs text-gray-500">
                        DATE
                      </TableHead>
                      <TableHead className="text-xs text-gray-500">
                        CHECK IN
                      </TableHead>
                      <TableHead className="text-xs text-gray-500">
                        CHECK OUT
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {attendanceData.map((record, index) => (
                      <TableRow
                        key={index}
                        className="hover:bg-blue-50/60 transition"
                      >
                        <TableCell>{record.date.slice(5)}</TableCell>
                        <TableCell>{record.checkIn}</TableCell>
                        <TableCell>{record.checkOut}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>

              {/* Incident Reports */}
              <Card className="bg-gradient-to-br from-white to-red-50 p-6 rounded-2xl shadow-md border border-red-100/60 transition-transform hover:scale-[1.02]">
                <h3 className="text-lg font-bold mb-4 text-red-700">
                  Incident Reports
                </h3>
                <div className="space-y-4">
                  {incidentReports.map((incident, index) => (
                    <div
                      key={index}
                      className="p-3 bg-red-50/60 rounded-lg shadow-sm border border-red-100"
                    >
                      <p className="text-xs text-gray-500 mb-1">
                        {incident.date} | {incident.time} | {incident.type}
                      </p>
                      <p className="text-sm font-semibold text-red-800">
                        Issue: {incident.issue}
                      </p>
                      <p className="text-sm text-gray-700">
                        Resolution: {incident.resolution}
                      </p>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Emotional Trend */}
              <Card className="bg-gradient-to-br from-white to-yellow-50 p-6 rounded-2xl shadow-md border border-yellow-100/60 transition-transform hover:scale-[1.02]">
                <h3 className="text-lg font-bold mb-4 text-yellow-700">
                  Emotional Trend
                </h3>
                <div className="h-60">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={emotionalData}
                      margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="date"
                        tickFormatter={(value) => value.slice(5)}
                        className="text-xs text-gray-400"
                      />
                      <YAxis
                        domain={[0, 2]}
                        ticks={[0, 1, 2]}
                        tickFormatter={(value) => {
                          switch (value) {
                            case 0:
                              return "Sad";
                            case 1:
                              return "Neutral";
                            case 2:
                              return "Happy";
                            default:
                              return "";
                          }
                        }}
                        className="text-xs text-gray-400"
                      />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#eab308"
                        activeDot={{ r: 8 }}
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              {/* Feedbacks */}
              <Card className="bg-gradient-to-br from-white to-green-50 p-6 rounded-2xl shadow-md border border-green-100/60 transition-transform hover:scale-[1.02]">
                <h3 className="text-lg font-bold mb-4 text-green-700">
                  Feedbacks
                </h3>
                <div className="space-y-4">
                  {feedbacks.map((feedback, index) => (
                    <div
                      key={index}
                      className="p-3 bg-green-50/60 rounded-lg shadow-sm border border-green-100"
                    >
                      <p className="text-xs text-gray-500 mb-1">
                        {feedback.date} | {feedback.time} | {feedback.type}
                      </p>
                      <p className="text-sm text-green-800">
                        {feedback.content}
                      </p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default StudentDetail;
