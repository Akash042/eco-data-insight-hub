import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";
import { 
  Plus, 
  Search, 
  Filter, 
  Edit,
  Eye,
  Clock,
  CheckCircle,
  AlertCircle,
  Send,
  RotateCcw,
  FileText,
  Users,
  Play,
  MessageSquare
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { CreateProformaDialog } from "@/components/proforma/CreateProformaDialog";
import { ProformaTable } from "@/components/proforma/ProformaTable";
import { Proforma, ProformaRow, UserRole, MathCalculation } from "@/types/proforma";

export const Proformas = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedProforma, setSelectedProforma] = useState<Proforma | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const { toast } = useToast();

  // Mock current user role - in real app this would come from auth context
  const currentUser = {
    role: 'SSE' as UserRole,
    department: 'Manufacturing',
    name: 'Sarah Johnson'
  };

  const [proformas, setProformas] = useState<Proforma[]>([
    {
      id: "PF-001",
      title: "Monthly Air Quality Monitoring - Electrical Department",
      description: "Comprehensive monthly air quality assessment for electrical department facilities including CO2, PM2.5, and AQI measurements",
      department: "Electrical",
      segment: "Environmental",
      fields: [
        { id: "location", name: "Monitoring Location", type: "text", required: true },
        { id: "co2_level", name: "CO2 Level (ppm)", type: "number", required: true },
        { id: "pm25", name: "PM2.5 (μg/m³)", type: "number", required: true },
        { id: "air_quality_index", name: "Air Quality Index", type: "number", required: true },
        { id: "noise_level", name: "Noise Level (dB)", type: "number", required: true },
        { id: "status_reading", name: "Environmental Status", type: "select", required: true, options: ["Excellent", "Good", "Moderate", "Poor", "Hazardous"] }
      ],
      rows: [
        {
          id: "row1",
          data: { 
            id: "data1",
            location: "Block A - Main Production Floor", 
            co2_level: "450", 
            pm25: "65",
            air_quality_index: "85",
            noise_level: "78",
            status_reading: "Good",
            lastModified: "2024-06-30T14:30:00",
            modifiedBy: "John Smith (Concern Staff)"
          },
          comments: [
            {
              id: "comment1",
              rowId: "row1",
              fieldId: "co2_level",
              comment: "CO2 levels are within acceptable range but close to upper limit. Consider increasing ventilation.",
              author: "Sarah Johnson (SSE)",
              createdAt: "2024-06-30T15:00:00"
            }
          ],
          status: "submitted",
          submittedBy: "John Smith",
          submittedAt: "2024-06-30",
          calculations: [
            {
              id: "calc1",
              formula: "average(CO2 Level)",
              result: 450,
              appliedBy: "Sarah Johnson (SSE)",
              appliedAt: "2024-06-30T15:30:00",
              description: "Average CO2 level calculation"
            }
          ]
        },
        {
          id: "row2",
          data: { 
            id: "data2",
            location: "Block B - Quality Control Area", 
            co2_level: "380", 
            pm25: "45",
            air_quality_index: "72",
            noise_level: "65",
            status_reading: "Good",
            lastModified: "2024-06-30T16:15:00",
            modifiedBy: "John Smith (Concern Staff)"
          },
          comments: [],
          status: "submitted",
          submittedBy: "John Smith",
          submittedAt: "2024-06-30"
        }
      ],
      assignedTo: ["John Smith"],
      createdBy: "Sarah Johnson (SSE)",
      createdAt: "2024-06-25T09:00:00",
      deadline: "2024-07-15T23:59:59",
      status: "in_progress",
      lastModifiedAt: "2024-06-30T16:15:00",
      lastModifiedBy: "John Smith (Concern Staff)"
    },
    {
      id: "PF-002",
      title: "Water Quality Assessment - Manufacturing Unit",
      description: "Weekly water quality monitoring for manufacturing processes including pH, turbidity, and temperature measurements",
      department: "Manufacturing",
      segment: "Environmental",
      fields: [
        { id: "sample_point", name: "Sample Collection Point", type: "text", required: true },
        { id: "temperature", name: "Water Temperature (°C)", type: "number", required: true },
        { id: "ph_level", name: "pH Level", type: "number", required: true },
        { id: "turbidity", name: "Turbidity (NTU)", type: "number", required: true },
        { id: "dissolved_oxygen", name: "Dissolved Oxygen (mg/L)", type: "number", required: true },
        { id: "compliance_status", name: "Compliance Status", type: "select", required: true, options: ["Compliant", "Non-Compliant", "Requires Monitoring"] }
      ],
      rows: [],
      assignedTo: [],
      createdBy: "Sarah Johnson (SSE)",
      createdAt: "2024-06-30T10:00:00",
      deadline: "2024-07-20T23:59:59",
      status: "not_assigned"
    },
    {
      id: "PF-003",
      title: "Waste Management Tracking - Store Department",
      description: "Monthly waste segregation and disposal tracking for store department operations",
      department: "Store",
      segment: "Environmental",
      fields: [
        { id: "waste_type", name: "Waste Category", type: "select", required: true, options: ["Recyclable", "Biodegradable", "Hazardous", "Electronic", "General"] },
        { id: "quantity", name: "Quantity (kg)", type: "number", required: true },
        { id: "disposal_method", name: "Disposal Method", type: "text", required: true },
        { id: "collection_date", name: "Collection Date", type: "date", required: true },
        { id: "vendor_name", name: "Disposal Vendor", type: "text", required: true }
      ],
      rows: [],
      assignedTo: ["Mike Davis"],
      createdBy: "David Lee (BO)",
      createdAt: "2024-06-28T14:00:00",
      deadline: "2024-07-25T23:59:59",
      status: "assigned"
    }
  ]);

  const canCreateProforma = currentUser.role === 'SSE' || currentUser.role === 'BO';
  const canReopenProforma = currentUser.role === 'WPO';

  const handleCreateProforma = (newProforma: Proforma) => {
    setProformas([...proformas, newProforma]);
  };

  const handleViewProforma = (proforma: Proforma) => {
    setSelectedProforma(proforma);
    setIsViewDialogOpen(true);
  };

  const handleUpdateRow = (proformaId: string, rowId: string, data: any) => {
    setProformas(proformas.map(p => {
      if (p.id === proformaId) {
        const updatedProforma = {
          ...p,
          rows: p.rows.map(r => r.id === rowId ? { ...r, data: { ...data, id: r.data.id } } : r)
        };
        
        // Auto-update status if data is being filled
        if (updatedProforma.status === 'assigned' && updatedProforma.rows.some(r => Object.keys(r.data).length > 1)) {
          updatedProforma.status = 'in_progress';
        }
        
        return updatedProforma;
      }
      return p;
    }));
  };

  const handleAddComment = (proformaId: string, rowId: string, fieldId: string, comment: string) => {
    const newComment = {
      id: `comment_${Date.now()}`,
      rowId,
      fieldId,
      comment,
      author: currentUser.name,
      createdAt: new Date().toLocaleString()
    };

    setProformas(proformas.map(p => {
      if (p.id === proformaId) {
        return {
          ...p,
          rows: p.rows.map(r => r.id === rowId ? { 
            ...r, 
            comments: [...r.comments, newComment] 
          } : r)
        };
      }
      return p;
    }));
  };

  const handleAddRow = (proformaId: string) => {
    const newRow: ProformaRow = {
      id: `row_${Date.now()}`,
      data: {
        id: `data_${Date.now()}`
      },
      comments: [],
      status: 'draft'
    };

    setProformas(proformas.map(p => {
      if (p.id === proformaId) {
        return {
          ...p,
          rows: [...p.rows, newRow]
        };
      }
      return p;
    }));
  };

  const handleSendForReview = (proformaId: string) => {
    setProformas(proformas.map(p => {
      if (p.id === proformaId) {
        return {
          ...p,
          status: 'sent_for_review'
        };
      }
      return p;
    }));

    toast({
      title: "Sent for Review",
      description: "Proforma has been sent for review to SSE/BO.",
    });
  };

  const handleSubmitProforma = (proformaId: string) => {
    setProformas(proformas.map(p => {
      if (p.id === proformaId) {
        return {
          ...p,
          status: 'submitted',
          submittedAt: new Date().toISOString()
        };
      }
      return p;
    }));

    toast({
      title: "Proforma Submitted",
      description: "Proforma has been submitted successfully.",
    });
  };

  const handleReopenProforma = (proformaId: string) => {
    setProformas(proformas.map(p => {
      if (p.id === proformaId) {
        return {
          ...p,
          status: 'reopened',
          reopenedBy: currentUser.name,
          reopenedAt: new Date().toISOString()
        };
      }
      return p;
    }));

    toast({
      title: "Proforma Reopened",
      description: "Proforma has been reopened for further editing.",
    });
  };

  const handleAssignProforma = (proformaId: string, assignedTo: string[]) => {
    setProformas(proformas.map(p => {
      if (p.id === proformaId) {
        return {
          ...p,
          assignedTo,
          status: assignedTo.length > 0 ? 'assigned' : 'not_assigned'
        };
      }
      return p;
    }));

    toast({
      title: "Proforma Assigned",
      description: `Proforma assigned to ${assignedTo.join(', ')}.`,
    });
  };

  const handleSaveCalculation = (proformaId: string, rowId: string, calculation: MathCalculation) => {
    setProformas(proformas.map(p => {
      if (p.id === proformaId) {
        return {
          ...p,
          rows: p.rows.map(r => r.id === rowId ? { 
            ...r, 
            calculations: [...(r.calculations || []), calculation] 
          } : r),
          lastModifiedAt: new Date().toISOString(),
          lastModifiedBy: `Current User (${currentUser.role})`
        };
      }
      return p;
    }));
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "not_assigned": return <Users className="h-4 w-4 text-gray-500" />;
      case "assigned": return <Clock className="h-4 w-4 text-blue-500" />;
      case "in_progress": return <Play className="h-4 w-4 text-orange-500" />;
      case "sent_for_review": return <MessageSquare className="h-4 w-4 text-purple-500" />;
      case "submitted": return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "reopened": return <RotateCcw className="h-4 w-4 text-red-500" />;
      default: return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "not_assigned": return "bg-gray-100 text-gray-800";
      case "assigned": return "bg-blue-100 text-blue-800";
      case "in_progress": return "bg-orange-100 text-orange-800";
      case "sent_for_review": return "bg-purple-100 text-purple-800";
      case "submitted": return "bg-green-100 text-green-800";
      case "reopened": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "not_assigned": return "Not Assigned";
      case "assigned": return "Assigned";
      case "in_progress": return "In Progress";
      case "sent_for_review": return "Sent for Review";
      case "submitted": return "Submitted";
      case "reopened": return "Reopened";
      default: return "Unknown";
    }
  };

  const filteredProformas = proformas.filter(proforma => {
    const matchesSearch = proforma.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proforma.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proforma.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proforma.segment.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || proforma.status === statusFilter;
    const matchesDepartment = departmentFilter === 'all' || proforma.department.toLowerCase() === departmentFilter;
    
    return matchesSearch && matchesStatus && matchesDepartment;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Proforma Management</h1>
          <p className="text-gray-600">Create, assign, and manage department-wise proformas with complete lifecycle tracking</p>
        </div>
        
        {canCreateProforma && (
          <Button 
            className="bg-blue-600 hover:bg-blue-700"
            onClick={() => setIsCreateDialogOpen(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Proforma
          </Button>
        )}
      </div>

      {/* Enhanced Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gray-100 rounded-full">
                <Users className="h-6 w-6 text-gray-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{proformas.filter(p => p.status === 'not_assigned').length}</p>
                <p className="text-sm text-gray-600">Not Assigned</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-full">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{proformas.filter(p => p.status === 'assigned').length}</p>
                <p className="text-sm text-gray-600">Assigned</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-100 rounded-full">
                <Play className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{proformas.filter(p => p.status === 'in_progress').length}</p>
                <p className="text-sm text-gray-600">In Progress</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-full">
                <MessageSquare className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{proformas.filter(p => p.status === 'sent_for_review').length}</p>
                <p className="text-sm text-gray-600">Review</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-full">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{proformas.filter(p => p.status === 'submitted').length}</p>
                <p className="text-sm text-gray-600">Submitted</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-red-100 rounded-full">
                <RotateCcw className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{proformas.filter(p => p.status === 'reopened').length}</p>
                <p className="text-sm text-gray-600">Reopened</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Filters and Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search proformas by title, ID, department, or segment..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="not_assigned">Not Assigned</SelectItem>
                  <SelectItem value="assigned">Assigned</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="sent_for_review">Sent for Review</SelectItem>
                  <SelectItem value="submitted">Submitted</SelectItem>
                  <SelectItem value="reopened">Reopened</SelectItem>
                </SelectContent>
              </Select>
              <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
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

      {/* Enhanced Proformas Table */}
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
                <TableHead>Segment</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Deadline</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProformas.map((proforma) => (
                <TableRow key={proforma.id} className="hover:bg-gray-50">
                  <TableCell className="font-mono text-sm">{proforma.id}</TableCell>
                  <TableCell className="font-medium">{proforma.title}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700">
                      {proforma.department}
                    </Badge>
                  </TableCell>
                  <TableCell>{proforma.segment}</TableCell>
                  <TableCell>
                    {proforma.assignedTo.length > 0 ? proforma.assignedTo.join(", ") : (
                      <span className="text-gray-400 italic">Unassigned</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(proforma.status)}
                      <Badge className={getStatusColor(proforma.status)}>
                        {getStatusText(proforma.status)}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">
                    {format(new Date(proforma.deadline), "MMM dd, yyyy")}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" onClick={() => handleViewProforma(proforma)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      {(currentUser.role === 'SSE' || currentUser.role === 'BO') && proforma.status !== 'submitted' && (
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      )}
                      {currentUser.role === 'Concern Staff' && proforma.status === 'in_progress' && (
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleSendForReview(proforma.id)}
                        >
                          <Send className="h-4 w-4" />
                        </Button>
                      )}
                      {(currentUser.role === 'SSE' || currentUser.role === 'BO') && proforma.status === 'sent_for_review' && (
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleSubmitProforma(proforma.id)}
                        >
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                      )}
                      {canReopenProforma && proforma.status === 'submitted' && (
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleReopenProforma(proforma.id)}
                        >
                          <RotateCcw className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Create Proforma Dialog */}
      <CreateProformaDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onCreateProforma={handleCreateProforma}
      />

      {/* View/Edit Proforma Dialog */}
      {selectedProforma && (
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-3">
                <span>{selectedProforma.title} ({selectedProforma.id})</span>
                <div className="flex items-center gap-2">
                  {getStatusIcon(selectedProforma.status)}
                  <Badge className={getStatusColor(selectedProforma.status)}>
                    {getStatusText(selectedProforma.status)}
                  </Badge>
                </div>
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-6">
              <div className="grid grid-cols-3 gap-4 text-sm bg-gray-50 p-4 rounded-lg">
                <div>
                  <span className="font-medium">Department:</span> 
                  <Badge variant="outline" className="ml-2 bg-blue-50 text-blue-700">
                    {selectedProforma.department}
                  </Badge>
                </div>
                <div>
                  <span className="font-medium">Segment:</span> {selectedProforma.segment}
                </div>
                <div>
                  <span className="font-medium">Last Modified:</span> {selectedProforma.lastModifiedAt ? format(new Date(selectedProforma.lastModifiedAt), "MMM dd, yyyy HH:mm") : 'Never'}
                </div>
              </div>

              <ProformaTable
                proforma={selectedProforma}
                userRole={currentUser.role}
                onUpdateRow={(rowId, data) => handleUpdateRow(selectedProforma.id, rowId, data)}
                onAddComment={(rowId, fieldId, comment) => handleAddComment(selectedProforma.id, rowId, fieldId, comment)}
                onAddRow={() => handleAddRow(selectedProforma.id)}
                onSaveCalculation={(rowId, calculation) => handleSaveCalculation(selectedProforma.id, rowId, calculation)}
              />

              <div className="flex justify-end gap-3 border-t pt-4">
                <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
                  Close
                </Button>
                {currentUser.role === 'Concern Staff' && selectedProforma.status === 'in_progress' && (
                  <Button onClick={() => handleSendForReview(selectedProforma.id)}>
                    <Send className="h-4 w-4 mr-2" />
                    Send for Review
                  </Button>
                )}
                {(currentUser.role === 'SSE' || currentUser.role === 'BO') && selectedProforma.status === 'sent_for_review' && (
                  <Button onClick={() => handleSubmitProforma(selectedProforma.id)}>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Submit Proforma
                  </Button>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};
