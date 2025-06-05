import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Edit, UserCog, Upload, Plus } from "lucide-react";
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
import { NotificationsPopover } from "@/components/NotificationsPopover";

const StudentManagement = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  // Form states
  const [studentId, setStudentId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [homeAddressLine1, setHomeAddressLine1] = useState("");
  const [homeAddressLine2, setHomeAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [workplaceAddressLine1, setWorkplaceAddressLine1] = useState("");
  const [workplaceAddressLine2, setWorkplaceAddressLine2] = useState("");
  const [workplaceCity, setWorkplaceCity] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [guardianContactNumber, setGuardianContactNumber] = useState("");
  const [employer, setEmployer] = useState("");
  const [trainer, setTrainer] = useState("");
  const [remarks, setRemarks] = useState("");

  // Sample student data
  const students = [
    {
      id: 1,
      name: "Sampath Perera",
      employer: "ABC Textiles Ltd",
      trainer: "Dayan De Silva",
    },
    {
      id: 2,
      name: "Malini Silva",
      employer: "XYZ Foods",
      trainer: "Mohammed Aslam",
    },
    {
      id: 3,
      name: "Rajiv Kumar",
      employer: "Cafe Ceylon Ltd",
      trainer: "Ruwan Fernando",
    },
    {
      id: 4,
      name: "Asanka Bandara",
      employer: "Yuki Ice Cream",
      trainer: "Nalaka Rathnayaka",
    },
    {
      id: 5,
      name: "John Doe",
      employer: "Green Gardens",
      trainer: "Nimali Sirisena",
    },
  ];

  // Sample data for dropdowns
  const employers = [
    "ABC Textiles Ltd",
    "XYZ Foods",
    "Cafe Ceylon Ltd",
    "Yuki Ice Cream",
    "Green Gardens",
  ];
  const trainers = [
    "Dayan De Silva",
    "Mohammed Aslam",
    "Ruwan Fernando",
    "Nalaka Rathnayaka",
    "Nimali Sirisena",
  ];
  const genders = ["Male", "Female", "Other"];

  const handleViewStudent = (id) => {
    navigate(`/student/${id}`);
  };

  const handleAddStudent = () => {
    setIsAddDialogOpen(true);
  };

  const handleSubmitStudent = (e) => {
    e.preventDefault();
    // Here you would typically submit the form data to your backend
    console.log("Submitting student data:", {
      studentId,
      firstName,
      lastName,
      dateOfBirth,
      gender,
      homeAddressLine1,
      homeAddressLine2,
      city,
      workplaceAddressLine1,
      workplaceAddressLine2,
      workplaceCity,
      contactNumber,
      guardianContactNumber,
      employer,
      trainer,
      remarks,
    });

    // Close the dialog
    setIsAddDialogOpen(false);

    // Reset form
    resetForm();
  };

  const resetForm = () => {
    setStudentId("");
    setFirstName("");
    setLastName("");
    setDateOfBirth("");
    setGender("");
    setHomeAddressLine1("");
    setHomeAddressLine2("");
    setCity("");
    setWorkplaceAddressLine1("");
    setWorkplaceAddressLine2("");
    setWorkplaceCity("");
    setContactNumber("");
    setGuardianContactNumber("");
    setEmployer("");
    setTrainer("");
    setRemarks("");
  };

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
                <p className="text-gray-600 mt-1">
                  Manage and track employee information
                </p>
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
                <p className="text-2xl font-bold mt-1">{students.length}</p>
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
                      TRAINER
                    </TableHead>
                    <TableHead className="w-24 font-semibold text-gray-700">
                      ACTION
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {students.map((student) => (
                    <TableRow
                      key={student.id}
                      className="hover:bg-blue-50/50 transition-colors duration-200"
                    >
                      <TableCell className="font-medium text-gray-900">
                        {student.id}
                      </TableCell>
                      <TableCell className="text-gray-700">
                        {student.name}
                      </TableCell>
                      <TableCell className="text-gray-700">
                        {student.employer}
                      </TableCell>
                      <TableCell className="text-gray-700">
                        {student.trainer}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleViewStudent(student.id)}
                            className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                            title="Edit student"
                          >
                            <Edit className="h-5 w-5" />
                          </button>
                          <button
                            className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                            title="Manage student"
                          >
                            <UserCog className="h-5 w-5" />
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
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
              {/* ID */}
              <div className="bg-white/50 p-4 rounded-xl border border-gray-100">
                <Label
                  htmlFor="studentId"
                  className="text-sm font-medium text-gray-700"
                >
                  ID
                </Label>
                <Input
                  id="studentId"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  className="mt-1.5 bg-white/80"
                />
              </div>

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
                    htmlFor="dateOfBirth"
                    className="text-sm font-medium text-gray-700"
                  >
                    Date of birth (YYYY/MM/DD)
                  </Label>
                  <Input
                    id="dateOfBirth"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    placeholder="YYYY/MM/DD"
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
                      htmlFor="homeAddressLine1"
                      className="text-xs text-gray-500"
                    >
                      Address Line 1
                    </Label>
                    <Input
                      id="homeAddressLine1"
                      value={homeAddressLine1}
                      onChange={(e) => setHomeAddressLine1(e.target.value)}
                      className="mt-1.5 bg-white/80"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="homeAddressLine2"
                      className="text-xs text-gray-500"
                    >
                      Address Line 2
                    </Label>
                    <Input
                      id="homeAddressLine2"
                      value={homeAddressLine2}
                      onChange={(e) => setHomeAddressLine2(e.target.value)}
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

              {/* Workplace address */}
              <div className="bg-white/50 p-4 rounded-xl border border-gray-100">
                <h3 className="text-sm font-medium text-gray-700 mb-3">
                  Workplace Address
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label
                      htmlFor="workplaceAddressLine1"
                      className="text-xs text-gray-500"
                    >
                      Address Line 1
                    </Label>
                    <Input
                      id="workplaceAddressLine1"
                      value={workplaceAddressLine1}
                      onChange={(e) => setWorkplaceAddressLine1(e.target.value)}
                      className="mt-1.5 bg-white/80"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="workplaceAddressLine2"
                      className="text-xs text-gray-500"
                    >
                      Address Line 2
                    </Label>
                    <Input
                      id="workplaceAddressLine2"
                      value={workplaceAddressLine2}
                      onChange={(e) => setWorkplaceAddressLine2(e.target.value)}
                      className="mt-1.5 bg-white/80"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="workplaceCity"
                      className="text-xs text-gray-500"
                    >
                      City
                    </Label>
                    <Input
                      id="workplaceCity"
                      value={workplaceCity}
                      onChange={(e) => setWorkplaceCity(e.target.value)}
                      className="mt-1.5 bg-white/80"
                    />
                  </div>
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
                    htmlFor="guardianContactNumber"
                    className="text-sm font-medium text-gray-700"
                  >
                    Guardian Contact Number
                  </Label>
                  <Input
                    id="guardianContactNumber"
                    value={guardianContactNumber}
                    onChange={(e) => setGuardianContactNumber(e.target.value)}
                    className="mt-1.5 bg-white/80"
                  />
                </div>
              </div>

              {/* Employer and trainer */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/50 p-4 rounded-xl border border-gray-100">
                  <Label
                    htmlFor="employer"
                    className="text-sm font-medium text-gray-700"
                  >
                    Employer
                  </Label>
                  <Select value={employer} onValueChange={setEmployer}>
                    <SelectTrigger id="employer" className="mt-1.5 bg-white/80">
                      <SelectValue placeholder="Select employer" />
                    </SelectTrigger>
                    <SelectContent>
                      {employers.map((emp) => (
                        <SelectItem key={emp} value={emp}>
                          {emp}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="bg-white/50 p-4 rounded-xl border border-gray-100">
                  <Label
                    htmlFor="trainer"
                    className="text-sm font-medium text-gray-700"
                  >
                    Trainer
                  </Label>
                  <Select value={trainer} onValueChange={setTrainer}>
                    <SelectTrigger id="trainer" className="mt-1.5 bg-white/80">
                      <SelectValue placeholder="Select trainer" />
                    </SelectTrigger>
                    <SelectContent>
                      {trainers.map((tr) => (
                        <SelectItem key={tr} value={tr}>
                          {tr}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Remarks and image upload */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                <div className="bg-white/50 p-4 rounded-xl border border-gray-100">
                  <Label className="text-sm font-medium text-gray-700 mb-3 block">
                    Profile Image
                  </Label>
                  <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer hover:bg-white/50 transition-colors duration-200">
                    <Upload className="h-10 w-10 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-500">
                      Click to upload image
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      PNG, JPG up to 5MB
                    </p>
                  </div>
                </div>
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
    </div>
  );
};

export default StudentManagement;
