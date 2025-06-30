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
  FileText
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { CreateProformaDialog } from "@/components/proforma/CreateProformaDialog";
import { ProformaTable } from "@/components/proforma/ProformaTable";
import { Proforma, ProformaRow, UserRole } from "@/types/proforma";

export const Proformas = () => {
  const [searchTerm, setSearchTerm] = useState("");
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
      title: "Water Quality Assessment - Manufacturing",
      description: "Monthly water quality monitoring for manufacturing department",
      department: "Manufacturing",
      segment: "Environmental",
      fields: [
        { id: "temp", name: "Temperature (°C)", type: "number", required: true },
        { id: "ph", name: "pH Level", type: "number", required: true },
        { id: "turbidity", name: "Turbidity (NTU)", type: "number", required: true },
        { id: "location", name: "Sample Location", type: "text", required: true }
      ],
      rows: [
        {
          id: "row1",
          data: { 
            id: "data1",
            temp: "25.5", 
            ph: "7.2", 
            turbidity: "0.8", 
            location: "Main Tank" 
          },
          comments: [],
          status: "submitted",
          submittedBy: "John Smith",
          submittedAt: "2024-06-30"
        }
      ],
      assignedTo: ["John Smith"],
      createdBy: "Sarah Johnson (SSE)",
      createdAt: "2024-06-25",
      deadline: "2024-07-15",
      status: "active"
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
        return {
          ...p,
          rows: p.rows.map(r => r.id === rowId ? { ...r, data: { ...data, id: r.data.id } } : r)
        };
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
      description: "Proforma has been submitted for final review.",
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "submitted": return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "active": return <Clock className="h-4 w-4 text-blue-500" />;
      case "reopened": return <RotateCcw className="h-4 w-4 text-orange-500" />;
      case "closed": return <FileText className="h-4 w-4 text-gray-500" />;
      default: return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "submitted": return "bg-green-100 text-green-800";
      case "active": return "bg-blue-100 text-blue-800";
      case "reopened": return "bg-orange-100 text-orange-800";
      case "closed": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "submitted": return "Submitted";
      case "active": return "Active";
      case "reopened": return "Reopened";
      case "closed": return "Closed";
      default: return "Unknown";
    }
  };

  const filteredProformas = proformas.filter(proforma =>
    proforma.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    proforma.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    proforma.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    proforma.segment.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Proforma Management</h1>
          <p className="text-gray-600">Create, assign, and manage department-wise proformas</p>
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

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-full">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{proformas.length}</p>
                <p className="text-sm text-gray-600">Total Proformas</p>
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
              <div className="p-3 bg-orange-100 rounded-full">
                <Clock className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{proformas.filter(p => p.status === 'active').length}</p>
                <p className="text-sm text-gray-600">Active</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-full">
                <RotateCcw className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{proformas.filter(p => p.status === 'reopened').length}</p>
                <p className="text-sm text-gray-600">Reopened</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
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
              <Select>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="submitted">Submitted</SelectItem>
                  <SelectItem value="reopened">Reopened</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
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
                  <TableCell>{proforma.department}</TableCell>
                  <TableCell>{proforma.segment}</TableCell>
                  <TableCell>{proforma.assignedTo.join(", ")}</TableCell>
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
                      {(currentUser.role === 'SSE' || currentUser.role === 'BO') && proforma.status !== 'submitted' && (
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleSubmitProforma(proforma.id)}
                        >
                          <Send className="h-4 w-4" />
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
              <DialogTitle>
                {selectedProforma.title} ({selectedProforma.id})
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-6">
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="font-medium">Department:</span> {selectedProforma.department}
                </div>
                <div>
                  <span className="font-medium">Segment:</span> {selectedProforma.segment}
                </div>
                <div>
                  <span className="font-medium">Status:</span>{" "}
                  <Badge className={getStatusColor(selectedProforma.status)}>
                    {getStatusText(selectedProforma.status)}
                  </Badge>
                </div>
              </div>

              <ProformaTable
                proforma={selectedProforma}
                userRole={currentUser.role}
                onUpdateRow={(rowId, data) => handleUpdateRow(selectedProforma.id, rowId, data)}
                onAddComment={(rowId, fieldId, comment) => handleAddComment(selectedProforma.id, rowId, fieldId, comment)}
                onAddRow={() => handleAddRow(selectedProforma.id)}
              />

              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
                  Close
                </Button>
                {(currentUser.role === 'SSE' || currentUser.role === 'BO') && selectedProforma.status !== 'submitted' && (
                  <Button onClick={() => handleSubmitProforma(selectedProforma.id)}>
                    <Send className="h-4 w-4 mr-2" />
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
