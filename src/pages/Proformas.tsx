
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { 
  Plus, 
  Search, 
  Filter, 
  Calendar as CalendarIcon,
  Edit,
  Eye,
  Clock,
  CheckCircle,
  AlertCircle
} from "lucide-react";

export const Proformas = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const proformas = [
    {
      id: "WQ-001",
      title: "Water Quality Assessment - Manufacturing",
      department: "Manufacturing",
      assignedTo: "John Smith",
      createdBy: "Sarah Johnson (SSE)",
      status: "in_progress",
      deadline: "2024-07-15",
      progress: 65,
      lastUpdated: "2024-06-30"
    },
    {
      id: "AQ-045",
      title: "Air Quality Monitoring - Electrical",
      department: "Electrical",
      assignedTo: "Mike Davis",
      createdBy: "Robert Brown (BO)",
      status: "pending_review",
      deadline: "2024-07-20",
      progress: 100,
      lastUpdated: "2024-06-29"
    },
    {
      id: "WM-023",
      title: "Waste Management Report - Store",
      department: "Store",
      assignedTo: "Emily Wilson",
      createdBy: "Sarah Johnson (SSE)",
      status: "completed",
      deadline: "2024-06-25",
      progress: 100,
      lastUpdated: "2024-06-24"
    },
    {
      id: "EN-089",
      title: "Energy Consumption Analysis",
      department: "Manufacturing",
      assignedTo: "David Lee",
      createdBy: "Robert Brown (BO)",
      status: "overdue",
      deadline: "2024-06-28",
      progress: 40,
      lastUpdated: "2024-06-27"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "in_progress": return <Clock className="h-4 w-4 text-blue-500" />;
      case "pending_review": return <Eye className="h-4 w-4 text-yellow-500" />;
      case "overdue": return <AlertCircle className="h-4 w-4 text-red-500" />;
      default: return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-100 text-green-800";
      case "in_progress": return "bg-blue-100 text-blue-800";
      case "pending_review": return "bg-yellow-100 text-yellow-800";
      case "overdue": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed": return "Completed";
      case "in_progress": return "In Progress";
      case "pending_review": return "Pending Review";
      case "overdue": return "Overdue";
      default: return "Unknown";
    }
  };

  const filteredProformas = proformas.filter(proforma =>
    proforma.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    proforma.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    proforma.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Proformas Management</h1>
          <p className="text-gray-600">Create, assign, and track environmental assessment forms</p>
        </div>
        
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Create Proforma
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Proforma</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Proforma Title</Label>
                  <Input id="title" placeholder="Enter proforma title" />
                </div>
                <div>
                  <Label htmlFor="department">Department</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="manufacturing">Manufacturing</SelectItem>
                      <SelectItem value="electrical">Electrical</SelectItem>
                      <SelectItem value="store">Store</SelectItem>
                      <SelectItem value="iso">ISO</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Enter proforma description" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="assignTo">Assign To</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select concern staff" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="john">John Smith</SelectItem>
                      <SelectItem value="mike">Mike Davis</SelectItem>
                      <SelectItem value="emily">Emily Wilson</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Deadline</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsCreateDialogOpen(false)}>
                  Create Proforma
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search proformas by title, ID, or department..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Select>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="pending_review">Pending Review</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="manufacturing">Manufacturing</SelectItem>
                  <SelectItem value="electrical">Electrical</SelectItem>
                  <SelectItem value="store">Store</SelectItem>
                  <SelectItem value="iso">ISO</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Proformas Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Proformas ({filteredProformas.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Deadline</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProformas.map((proforma) => (
                <TableRow key={proforma.id} className="hover:bg-gray-50">
                  <TableCell className="font-mono text-sm">{proforma.id}</TableCell>
                  <TableCell className="font-medium">{proforma.title}</TableCell>
                  <TableCell>{proforma.department}</TableCell>
                  <TableCell>{proforma.assignedTo}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(proforma.status)}
                      <Badge className={getStatusColor(proforma.status)}>
                        {getStatusText(proforma.status)}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${proforma.progress}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-600">{proforma.progress}%</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">
                    {format(new Date(proforma.deadline), "MMM dd, yyyy")}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
