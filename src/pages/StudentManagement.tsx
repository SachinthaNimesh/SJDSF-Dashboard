import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Edit, UserCog, Upload, Plus, Key, Trash } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  getManagementTable,
  StudentEmployerSupervisor,
} from "@/api/getManagement";
import { useStudentService } from "@/api/crudEmployee";
import { useSupervisorEmployerService } from "@/api/getSupervisorEmployerId";
import { getOTP } from "@/api/getOTP";

const genders = ["Male", "Female", "Other"];

const StudentManagement = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  // Form states (updated)
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState(""); // YYYY-MM-DD
  const [gender, setGender] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [contactNumberGuardian, setContactNumberGuardian] = useState("");
  const [supervisorId, setSupervisorId] = useState<string | undefined>(
    undefined
  );
  const [remarks, setRemarks] = useState("");
  const [homeLong, setHomeLong] = useState("");
  const [homeLat, setHomeLat] = useState("");
  const [employerId, setEmployerId] = useState<string | undefined>(undefined);
  const [checkInTime, setCheckInTime] = useState(""); // HH:MM
  const [checkOutTime, setCheckOutTime] = useState(""); // HH:MM

  // State for API data
  const [managementData, setManagementData] = useState<
    StudentEmployerSupervisor[]
  >([]);
  const [loading, setLoading] = useState(true);
  const { createStudent } = useStudentService();

  // Add state for dropdown data
  const [employerOptions, setEmployerOptions] = useState<
    { id: number; name: string }[]
  >([]);
  const [supervisorOptions, setSupervisorOptions] = useState<
    { supervisor_id: number; first_name: string; last_name: string }[]
  >([]);
  const { getAllEmployerIDsAndNames, getAllSupervisorIDsAndNames } =
    useSupervisorEmployerService();

  // OTP Dialog state
  const [otpDialogOpen, setOtpDialogOpen] = useState(false);
  const [otpResult, setOtpResult] = useState<null | {
    otp?: string;
    [key: string]: any;
  }>(null);
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpError, setOtpError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    getManagementTable()
      .then((data) => setManagementData(Array.isArray(data) ? data : []))
      .catch(() => setManagementData([]))
      .finally(() => setLoading(false));

    // Fetch employer and supervisor options for dropdowns
    getAllEmployerIDsAndNames()
      .then(setEmployerOptions)
      .catch(() => setEmployerOptions([]));
    getAllSupervisorIDsAndNames()
      .then(setSupervisorOptions)
      .catch(() => setSupervisorOptions([]));
  }, []);

  const handleViewStudent = (id) => {
    navigate(`/student/${id}`);
  };

  const handleAddStudent = () => {
    setIsAddDialogOpen(true);
  };

  const handleSubmitStudent = async (e) => {
    e.preventDefault();
    const formatTime = (time) => (time ? `${time}:00` : null);
    const payload = {
      first_name: firstName,
      last_name: lastName || null,
      dob: dob ? new Date(dob).toISOString() : null, // keep as string (YYYY-MM-DD)
      gender: gender || null,
      address_line1: addressLine1 || null,
      address_line2: addressLine2 || null,
      city: city || null,
      contact_number: contactNumber || null,
      contact_number_guardian: contactNumberGuardian || null,
      supervisor_id: supervisorId ? Number(supervisorId) : null,
      remarks: remarks || null,
      home_long: homeLong ? parseFloat(homeLong) : null,
      home_lat: homeLat ? parseFloat(homeLat) : null,
      employer_id: employerId ? Number(employerId) : null,
      check_in_time: formatTime(checkInTime), // append :00 if present
      check_out_time: formatTime(checkOutTime), // append :00 if present
    };
    try {
      await createStudent(payload);

      // Refresh management table after adding a new student
      const data = await getManagementTable();
      setManagementData(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to create student", err);
    }
    setIsAddDialogOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setDob("");
    setGender("");
    setAddressLine1("");
    setAddressLine2("");
    setCity("");
    setContactNumber("");
    setContactNumberGuardian("");
    setSupervisorId(undefined);
    setRemarks("");
    setHomeLong("");
    setHomeLat("");
    setEmployerId(undefined);
    setCheckInTime("");
    setCheckOutTime("");
  };

  // Filter and sort managementData by search query and student_id
  const filteredSortedManagementData = [...managementData]
    .filter((item) => {
      const fullName =
        `${item.student_first_name} ${item.student_last_name}`.toLowerCase();
      const idStr = String(item.student_id);
      return (
        fullName.includes(searchQuery.toLowerCase()) ||
        idStr.includes(searchQuery.trim())
      );
    })
    .sort((a, b) => a.student_id - b.student_id);

  // Handler for OTP button
  const handleOtpClick = async (studentId: string | number) => {
    setOtpDialogOpen(true);
    setOtpResult(null);
    setOtpError(null);
    setOtpLoading(true);
    try {
      const result = await getOTP(studentId);
      setOtpResult(result);
    } catch (err: any) {
      setOtpError(
        err?.response?.data?.message || err?.message || "Failed to generate OTP"
      );
    } finally {
      setOtpLoading(false);
    }
  };

  // Helper to format ISO date string to readable format
  function formatDateTime(iso: string) {
    if (!iso) return "";
    const date = new Date(iso);
    return date.toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-100">
      <div className="flex flex-1">
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 gap-4">
              <div>
                <h2 className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent tracking-tight">
                  Employee Management
                </h2>
              </div>
              <Button
                onClick={handleAddStudent}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md hover:shadow-lg transition-all duration-200"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Employee
              </Button>
            </div>

            {/* Search and Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="md:col-span-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    className="pl-10 bg-white/80 backdrop-blur-sm shadow-sm border-gray-200 rounded-xl w-full focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200"
                    placeholder="Search employees by name or ID..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl p-4 text-white shadow-md">
                <p className="text-sm font-medium opacity-90">
                  Total Employees
                </p>
                <p className="text-2xl font-bold mt-1">
                  {managementData.length}
                </p>
              </div>
            </div>

            {/* Table Section */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100/50 overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gradient-to-r from-gray-50 to-gray-100/50">
                    <TableHead className="w-16 font-semibold text-gray-700">
                      ID
                    </TableHead>
                    <TableHead className="font-semibold text-gray-700">
                      NAME
                    </TableHead>
                    <TableHead className="font-semibold text-gray-700">
                      EMPLOYER
                    </TableHead>
                    <TableHead className="font-semibold text-gray-700">
                      EMPLOYER CONTACT
                    </TableHead>
                    <TableHead className="font-semibold text-gray-700">
                      SUPERVISOR
                    </TableHead>
                    <TableHead className="font-semibold text-gray-700">
                      SUPERVISOR CONTACT
                    </TableHead>
                    <TableHead className="w-24 font-semibold text-gray-700">
                      ACTION
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center">
                        Loading...
                      </TableCell>
                    </TableRow>
                  ) : filteredSortedManagementData.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center">
                        No employees found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredSortedManagementData.map((item) => (
                      <TableRow
                        key={item.student_id}
                        className="hover:bg-blue-50/50 transition-colors duration-200"
                      >
                        <TableCell className="font-medium text-gray-900">
                          {item.student_id}
                        </TableCell>
                        <TableCell className="text-gray-700">
                          {item.student_first_name} {item.student_last_name}
                        </TableCell>
                        <TableCell className="text-gray-700">
                          {item.employer_name || "-"}
                        </TableCell>
                        <TableCell className="text-gray-700">
                          {item.employer_contact_number || "-"}
                        </TableCell>
                        <TableCell className="text-gray-700">
                          {(item.supervisor_first_name || "-") +
                            " " +
                            (item.supervisor_last_name || "")}
                        </TableCell>
                        <TableCell className="text-gray-700">
                          {item.supervisor_contact_number || "-"}
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleViewStudent(item.student_id)}
                              className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                              title="Edit student"
                            >
                              <Edit className="h-5 w-5" />
                            </button>
                            {/* Delete student button */}
                            <button
                              className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors duration-200"
                              title="Delete student"
                              // onClick handler can be implemented as needed
                            >
                              <Trash className="h-5 w-5" />
                            </button>
                            {/* OTP Button with Key icon, green color */}
                            <button
                              className="p-2 text-green-600 hover:text-green-800 hover:bg-green-50 rounded-lg transition-colors duration-200"
                              title="Send OTP"
                              onClick={() => handleOtpClick(item.student_id)}
                            >
                              <Key className="h-5 w-5" />
                            </button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </main>
      </div>

      {/* Add Student Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto bg-gradient-to-br from-white to-gray-50">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Add New Employee
            </DialogTitle>
            <p className="text-gray-500 text-sm mt-1">
              Fill in the details to add a new employee to the system
            </p>
          </DialogHeader>

          <form onSubmit={handleSubmitStudent} className="mt-6">
            <div className="space-y-6">
              {/* Name */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/50 p-4 rounded-xl border border-gray-100">
                  <Label
                    htmlFor="firstName"
                    className="text-sm font-medium text-gray-700"
                  >
                    Firstname
                  </Label>
                  <Input
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="mt-1.5 bg-white/80"
                  />
                </div>
                <div className="bg-white/50 p-4 rounded-xl border border-gray-100">
                  <Label
                    htmlFor="lastName"
                    className="text-sm font-medium text-gray-700"
                  >
                    Lastname
                  </Label>
                  <Input
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="mt-1.5 bg-white/80"
                  />
                </div>
              </div>

              {/* Date of birth and gender */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/50 p-4 rounded-xl border border-gray-100">
                  <Label
                    htmlFor="dob"
                    className="text-sm font-medium text-gray-700"
                  >
                    Date of birth (YYYY-MM-DD)
                  </Label>
                  <Input
                    id="dob"
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className="mt-1.5 bg-white/80"
                  />
                </div>
                <div className="bg-white/50 p-4 rounded-xl border border-gray-100">
                  <Label
                    htmlFor="gender"
                    className="text-sm font-medium text-gray-700"
                  >
                    Gender
                  </Label>
                  <Select value={gender} onValueChange={setGender}>
                    <SelectTrigger id="gender" className="mt-1.5 bg-white/80">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      {genders.map((g) => (
                        <SelectItem key={g} value={g}>
                          {g}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Home address */}
              <div className="bg-white/50 p-4 rounded-xl border border-gray-100">
                <h3 className="text-sm font-medium text-gray-700 mb-3">
                  Home Address
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label
                      htmlFor="addressLine1"
                      className="text-xs text-gray-500"
                    >
                      Address Line 1
                    </Label>
                    <Input
                      id="addressLine1"
                      value={addressLine1}
                      onChange={(e) => setAddressLine1(e.target.value)}
                      className="mt-1.5 bg-white/80"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="addressLine2"
                      className="text-xs text-gray-500"
                    >
                      Address Line 2
                    </Label>
                    <Input
                      id="addressLine2"
                      value={addressLine2}
                      onChange={(e) => setAddressLine2(e.target.value)}
                      className="mt-1.5 bg-white/80"
                    />
                  </div>
                  <div>
                    <Label htmlFor="city" className="text-xs text-gray-500">
                      City
                    </Label>
                    <Input
                      id="city"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="mt-1.5 bg-white/80"
                    />
                  </div>
                </div>
              </div>

              {/* Home coordinates */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/50 p-4 rounded-xl border border-gray-100">
                  <Label
                    htmlFor="homeLat"
                    className="text-sm font-medium text-gray-700"
                  >
                    Home Latitude
                  </Label>
                  <Input
                    id="homeLat"
                    type="number"
                    step="any"
                    value={homeLat}
                    onChange={(e) => setHomeLat(e.target.value)}
                    className="mt-1.5 bg-white/80"
                  />
                </div>
                <div className="bg-white/50 p-4 rounded-xl border border-gray-100">
                  <Label
                    htmlFor="homeLong"
                    className="text-sm font-medium text-gray-700"
                  >
                    Home Longitude
                  </Label>
                  <Input
                    id="homeLong"
                    type="number"
                    step="any"
                    value={homeLong}
                    onChange={(e) => setHomeLong(e.target.value)}
                    className="mt-1.5 bg-white/80"
                  />
                </div>
              </div>

              {/* Contact numbers */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/50 p-4 rounded-xl border border-gray-100">
                  <Label
                    htmlFor="contactNumber"
                    className="text-sm font-medium text-gray-700"
                  >
                    Contact Number
                  </Label>
                  <Input
                    id="contactNumber"
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                    className="mt-1.5 bg-white/80"
                  />
                </div>
                <div className="bg-white/50 p-4 rounded-xl border border-gray-100">
                  <Label
                    htmlFor="contactNumberGuardian"
                    className="text-sm font-medium text-gray-700"
                  >
                    Guardian Contact Number
                  </Label>
                  <Input
                    id="contactNumberGuardian"
                    value={contactNumberGuardian}
                    onChange={(e) => setContactNumberGuardian(e.target.value)}
                    className="mt-1.5 bg-white/80"
                  />
                </div>
              </div>

              {/* Employer and supervisor */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/50 p-4 rounded-xl border border-gray-100">
                  <Label
                    htmlFor="employerId"
                    className="text-sm font-medium text-gray-700"
                  >
                    Employer
                  </Label>
                  <Select value={employerId} onValueChange={setEmployerId}>
                    <SelectTrigger
                      id="employerId"
                      className="mt-1.5 bg-white/80"
                    >
                      <SelectValue placeholder="Select employer" />
                    </SelectTrigger>
                    <SelectContent>
                      {employerOptions.map((emp) => (
                        <SelectItem key={emp.id} value={String(emp.id)}>
                          {emp.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="bg-white/50 p-4 rounded-xl border border-gray-100">
                  <Label
                    htmlFor="supervisorId"
                    className="text-sm font-medium text-gray-700"
                  >
                    Supervisor
                  </Label>
                  <Select value={supervisorId} onValueChange={setSupervisorId}>
                    <SelectTrigger
                      id="supervisorId"
                      className="mt-1.5 bg-white/80"
                    >
                      <SelectValue placeholder="Select supervisor" />
                    </SelectTrigger>
                    <SelectContent>
                      {supervisorOptions.map((sup) => (
                        <SelectItem
                          key={sup.supervisor_id}
                          value={String(sup.supervisor_id)}
                        >
                          {sup.first_name} {sup.last_name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Check-in and check-out times */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/50 p-4 rounded-xl border border-gray-100">
                  <Label
                    htmlFor="checkInTime"
                    className="text-sm font-medium text-gray-700"
                  >
                    Check-in Time
                  </Label>
                  <Input
                    id="checkInTime"
                    type="time"
                    value={checkInTime}
                    onChange={(e) => setCheckInTime(e.target.value)}
                    className="mt-1.5 bg-white/80"
                  />
                </div>
                <div className="bg-white/50 p-4 rounded-xl border border-gray-100">
                  <Label
                    htmlFor="checkOutTime"
                    className="text-sm font-medium text-gray-700"
                  >
                    Check-out Time
                  </Label>
                  <Input
                    id="checkOutTime"
                    type="time"
                    value={checkOutTime}
                    onChange={(e) => setCheckOutTime(e.target.value)}
                    className="mt-1.5 bg-white/80"
                  />
                </div>
              </div>

              {/* Remarks */}
              <div className="bg-white/50 p-4 rounded-xl border border-gray-100">
                <Label
                  htmlFor="remarks"
                  className="text-sm font-medium text-gray-700"
                >
                  Remarks
                </Label>
                <Textarea
                  id="remarks"
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  className="mt-1.5 bg-white/80 h-40"
                />
              </div>

              {/* Submit button */}
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md hover:shadow-lg transition-all duration-200 py-6 text-lg font-medium"
              >
                Add Employee
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* OTP Result Dialog */}
      <Dialog open={otpDialogOpen} onOpenChange={setOtpDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              <span className="flex items-center gap-2">
                <Key className="h-6 w-6 text-green-600" />
                OTP Details
              </span>
            </DialogTitle>
          </DialogHeader>
          {otpLoading ? (
            <div className="text-center py-8">Generating OTP...</div>
          ) : otpError ? (
            <div className="text-red-600 py-4">{otpError}</div>
          ) : otpResult && (otpResult.otp_code || otpResult.otp) ? (
            <div className="py-4 flex justify-center">
              <div className="w-full max-w-xs bg-gradient-to-br from-green-50 to-white border border-green-200 rounded-xl shadow p-5 flex flex-col items-center space-y-4">
                <div className="flex flex-col items-center">
                  <span className="uppercase text-xs tracking-widest text-green-700 font-semibold mb-1">
                    One Time Password
                  </span>
                  <span className="text-4xl font-mono font-bold text-green-700 tracking-widest bg-green-100 px-6 py-2 rounded-lg shadow-inner">
                    {otpResult.otp_code || otpResult.otp}
                  </span>
                </div>
                <div className="w-full flex flex-col gap-2 mt-2">
                  {otpResult.student_id && (
                    <div className="flex justify-between text-gray-700 text-sm">
                      <span className="font-medium">Student ID:</span>
                      <span>{otpResult.student_id}</span>
                    </div>
                  )}
                  {otpResult.expires_at && (
                    <div className="flex justify-between text-gray-700 text-sm">
                      <span className="font-medium">Expires At:</span>
                      <span>{formatDateTime(otpResult.expires_at)}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : otpResult ? (
            <div className="py-4">
              <div className="text-gray-700 text-sm">
                {JSON.stringify(otpResult)}
              </div>
            </div>
          ) : (
            <div className="text-gray-500 py-4">No OTP data.</div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StudentManagement;
