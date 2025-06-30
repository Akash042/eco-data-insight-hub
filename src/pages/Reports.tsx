
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Plus, FileText, Calendar, User, Clock, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Report, ReportField } from "@/types/reports";
import { format } from "date-fns";

export const Reports = () => {
  const [reports, setReports] = useState<Report[]>([
    {
      id: "RPT-001",
      title: "Air Quality Environmental Report - Electrical Department",
      description: "Comprehensive air quality monitoring report for electrical department facilities",
      department: "Electrical",
      segment: "Environmental",
      proformaId: "PF-001",
      fields: [
        { id: "location", name: "Monitoring Location", type: "text", required: true },
        { id: "co2_level", name: "CO2 Level (ppm)", type: "number", required: true },
        { id: "pm25", name: "PM2.5 (μg/m³)", type: "number", required: true },
        { id: "air_quality_index", name: "Air Quality Index", type: "number", required: true },
        { id: "reading_time", name: "Reading Time", type: "date", required: true }
      ],
      data: [
        {
          id: "data1",
          location: "Block A - Main Floor",
          co2_level: 450,
          pm25: 65,
          air_quality_index: 85,
          reading_time: "2024-06-30T10:30:00"
        },
        {
          id: "data2",
          location: "Block B - Production Area",
          co2_level: 520,
          pm25: 78,
          air_quality_index: 92,
          reading_time: "2024-06-30T11:15:00"
        }
      ],
      createdBy: "Sarah Johnson (SSE)",
      createdAt: "2024-06-25T09:00:00",
      updatedAt: "2024-06-30T14:30:00",
      updatedBy: "Mike Davis (BO)"
    }
  ]);

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newReport, setNewReport] = useState({
    title: '',
    description: '',
    department: '',
    segment: '',
    proformaId: ''
  });
  const [fields, setFields] = useState<ReportField[]>([]);
  const [newField, setNewField] = useState({
    name: '',
    type: 'text' as const,
    required: false
  });

  const { toast } = useToast();

  const departments = ["Manufacturing", "Electrical", "Store", "ISO"];
  const segments = ["Production", "Quality", "Safety", "Environmental", "Maintenance"];

  const handleAddField = () => {
    if (newField.name.trim()) {
      const field: ReportField = {
        id: `field_${Date.now()}`,
        name: newField.name,
        type: newField.type,
        required: newField.required
      };
      setFields([...fields, field]);
      setNewField({ name: '', type: 'text', required: false });
    }
  };

  const handleRemoveField = (fieldId: string) => {
    setFields(fields.filter(f => f.id !== fieldId));
  };

  const handleCreateReport = () => {
    if (!newReport.title || !newReport.department || !newReport.segment || fields.length === 0) {
      toast({
        title: "Validation Error",
        description: "Please fill all required fields and add at least one data field.",
        variant: "destructive"
      });
      return;
    }

    const report: Report = {
      id: `RPT-${Date.now().toString().slice(-6)}`,
      title: newReport.title,
      description: newReport.description,
      department: newReport.department,
      segment: newReport.segment,
      proformaId: newReport.proformaId || `PF-${Date.now().toString().slice(-6)}`,
      fields: fields,
      data: [],
      createdBy: "Current User",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      updatedBy: "Current User"
    };

    setReports([...reports, report]);
    
    // Reset form
    setNewReport({
      title: '',
      description: '',
      department: '',
      segment: '',
      proformaId: ''
    });
    setFields([]);
    setIsCreateDialogOpen(false);
    
    toast({
      title: "Report Created",
      description: `Report ${report.id} has been created successfully.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Environmental Reports</h1>
          <p className="text-gray-600">Manage and generate environmental monitoring reports with automatic timestamping</p>
        </div>
        
        <Button 
          className="bg-green-600 hover:bg-green-700"
          onClick={() => setIsCreateDialogOpen(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Create New Report
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-full">
                <FileText className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{reports.length}</p>
                <p className="text-sm text-gray-600">Total Reports</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-full">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">5</p>
                <p className="text-sm text-gray-600">This Month</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-full">
                <User className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">12</p>
                <p className="text-sm text-gray-600">Contributors</p>
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
                <p className="text-2xl font-bold">3</p>
                <p className="text-sm text-gray-600">Updated Today</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Reports Table */}
      <Card>
        <CardHeader>
          <CardTitle>Environmental Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Report ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Segment</TableHead>
                <TableHead>Created By</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead>Updated By</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell className="font-mono text-sm">{report.id}</TableCell>
                  <TableCell className="font-medium">{report.title}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700">
                      {report.department}
                    </Badge>
                  </TableCell>
                  <TableCell>{report.segment}</TableCell>
                  <TableCell>{report.createdBy}</TableCell>
                  <TableCell>{format(new Date(report.updatedAt), "MMM dd, yyyy HH:mm")}</TableCell>
                  <TableCell>{report.updatedBy}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Create Report Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New Environmental Report</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Report Title *</Label>
                <Input
                  id="title"
                  value={newReport.title}
                  onChange={(e) => setNewReport({...newReport, title: e.target.value})}
                  placeholder="Enter report title"
                />
              </div>
              <div>
                <Label htmlFor="department">Department *</Label>
                <Select value={newReport.department} onValueChange={(value) => setNewReport({...newReport, department: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map(dept => (
                      <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="segment">Segment *</Label>
                <Select value={newReport.segment} onValueChange={(value) => setNewReport({...newReport, segment: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select segment" />
                  </SelectTrigger>
                  <SelectContent>
                    {segments.map(segment => (
                      <SelectItem key={segment} value={segment}>{segment}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="proformaId">Proforma ID</Label>
                <Input
                  id="proformaId"
                  value={newReport.proformaId}
                  onChange={(e) => setNewReport({...newReport, proformaId: e.target.value})}
                  placeholder="Enter proforma ID (optional)"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={newReport.description}
                onChange={(e) => setNewReport({...newReport, description: e.target.value})}
                placeholder="Enter report description"
              />
            </div>

            {/* Configure Data Fields */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-lg font-semibold">Configure Data Fields *</Label>
              </div>
              
              <div className="border rounded-lg p-4 space-y-4">
                <div className="grid grid-cols-4 gap-4 items-end">
                  <div>
                    <Label>Field Name</Label>
                    <Input
                      value={newField.name}
                      onChange={(e) => setNewField({...newField, name: e.target.value})}
                      placeholder="e.g., Air Quality Index"
                    />
                  </div>
                  <div>
                    <Label>Field Type</Label>
                    <Select value={newField.type} onValueChange={(value: any) => setNewField({...newField, type: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="text">Text</SelectItem>
                        <SelectItem value="number">Number</SelectItem>
                        <SelectItem value="date">Date</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={newField.required}
                      onChange={(e) => setNewField({...newField, required: e.target.checked})}
                    />
                    <Label>Required</Label>
                  </div>
                  <Button onClick={handleAddField}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Field
                  </Button>
                </div>

                {fields.length > 0 && (
                  <div className="space-y-2">
                    <Label>Added Fields:</Label>
                    {fields.map((field) => (
                      <div key={field.id} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                        <span>{field.name} ({field.type}) {field.required && '- Required'}</span>
                        <Button variant="ghost" size="sm" onClick={() => handleRemoveField(field.id)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateReport}>
                Create Report
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
