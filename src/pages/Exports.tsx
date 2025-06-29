
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { 
  Download, 
  FileText, 
  BarChart3,
  Calendar,
  Filter,
  Clock,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const Exports = () => {
  const [selectedReports, setSelectedReports] = useState<string[]>([]);
  const [exportFormat, setExportFormat] = useState("pdf");
  const [dateRange, setDateRange] = useState("monthly");
  const { toast } = useToast();

  const exportHistory = [
    {
      id: "EXP-001",
      name: "Manufacturing Water Quality Report Q2 2024",
      type: "Report",
      format: "PDF",
      size: "2.4 MB",
      createdBy: "Sarah Johnson",
      createdAt: "2024-06-30 14:30",
      status: "completed",
      downloadCount: 5
    },
    {
      id: "EXP-002", 
      name: "Consolidated Environment Analytics H1 2024",
      type: "Analytics",
      format: "Excel",
      size: "5.8 MB",
      createdBy: "Robert Brown",
      createdAt: "2024-06-29 09:15",
      status: "processing",
      downloadCount: 0
    },
    {
      id: "EXP-003",
      name: "All Departments Proforma Summary",
      type: "Report",
      format: "PDF",
      size: "1.2 MB", 
      createdBy: "Lisa Anderson",
      createdAt: "2024-06-28 16:45",
      status: "completed",
      downloadCount: 12
    },
    {
      id: "EXP-004",
      name: "ISO Certificates Export",
      type: "Certificates",
      format: "ZIP",
      size: "8.3 MB",
      createdBy: "Mike Davis",
      createdAt: "2024-06-27 11:20",
      status: "failed",
      downloadCount: 0
    }
  ];

  const availableReports = [
    { id: "proformas", name: "All Proformas", description: "Complete proforma data with submissions" },
    { id: "reports", name: "Generated Reports", description: "All created reports and analytics" },
    { id: "analytics", name: "Analytics Data", description: "Chart data and visualizations" },
    { id: "users", name: "User Management", description: "User data and role assignments" },
    { id: "certificates", name: "ISO Certificates", description: "Certificate files and metadata" },
    { id: "notifications", name: "Notification History", description: "All system notifications" }
  ];

  const handleExportCreate = () => {
    if (selectedReports.length === 0) {
      toast({
        title: "Selection Required",
        description: "Please select at least one report type to export.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Export Started",
      description: "Your export has been queued and will be ready shortly.",
    });
  };

  const handleDownload = (exportId: string) => {
    toast({
      title: "Download Started",
      description: "Your file is being downloaded.",
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "processing": return <Clock className="h-4 w-4 text-blue-500" />;
      case "failed": return <AlertCircle className="h-4 w-4 text-red-500" />;
      default: return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-100 text-green-800";
      case "processing": return "bg-blue-100 text-blue-800";
      case "failed": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Export Center</h1>
          <p className="text-gray-600">Export reports, analytics, and data in various formats</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Export Creation Panel */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="h-5 w-5" />
              Create New Export
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Report Selection */}
            <div>
              <Label className="text-base font-medium mb-3 block">Select Data to Export</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {availableReports.map((report) => (
                  <div key={report.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                    <Checkbox
                      id={report.id}
                      checked={selectedReports.includes(report.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedReports([...selectedReports, report.id]);
                        } else {
                          setSelectedReports(selectedReports.filter(id => id !== report.id));
                        }
                      }}
                    />
                    <div className="flex-1">
                      <Label htmlFor={report.id} className="font-medium cursor-pointer">
                        {report.name}
                      </Label>
                      <p className="text-sm text-gray-500 mt-1">{report.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Export Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="format">Export Format</Label>
                <Select value={exportFormat} onValueChange={setExportFormat}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf">PDF Document</SelectItem>
                    <SelectItem value="excel">Excel Spreadsheet</SelectItem>
                    <SelectItem value="csv">CSV File</SelectItem>
                    <SelectItem value="json">JSON Data</SelectItem>
                    <SelectItem value="zip">ZIP Archive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="dateRange">Date Range</Label>
                <Select value={dateRange} onValueChange={setDateRange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monthly">Last Month</SelectItem>
                    <SelectItem value="quarterly">Last Quarter</SelectItem>
                    <SelectItem value="half-yearly">Last 6 Months</SelectItem>
                    <SelectItem value="yearly">Last Year</SelectItem>
                    <SelectItem value="all">All Time</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Advanced Options */}
            <div className="space-y-3">
              <Label className="text-base font-medium">Advanced Options</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="includeCharts" />
                  <Label htmlFor="includeCharts">Include charts and visualizations</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="includeComments" />
                  <Label htmlFor="includeComments">Include comments and annotations</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="compressData" />
                  <Label htmlFor="compressData">Compress export file</Label>
                </div>
              </div>
            </div>

            <Button onClick={handleExportCreate} className="w-full" size="lg">
              <Download className="h-4 w-4 mr-2" />
              Create Export ({selectedReports.length} selected)
            </Button>
          </CardContent>
        </Card>

        {/* Quick Export Options */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Exports</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <FileText className="h-4 w-4 mr-2" />
              Current Dashboard
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <BarChart3 className="h-4 w-4 mr-2" />
              Monthly Summary
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Calendar className="h-4 w-4 mr-2" />
              This Quarter
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Filter className="h-4 w-4 mr-2" />
              Custom Filter
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Export History */}
      <Card>
        <CardHeader>
          <CardTitle>Export History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {exportHistory.map((export_item) => (
              <div key={export_item.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center gap-3">
                  {getStatusIcon(export_item.status)}
                  <div>
                    <h3 className="font-medium">{export_item.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                      <span>{export_item.type}</span>
                      <span>•</span>
                      <span>{export_item.format}</span>
                      <span>•</span>
                      <span>{export_item.size}</span>
                      <span>•</span>
                      <span>by {export_item.createdBy}</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">{export_item.createdAt}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className={getStatusColor(export_item.status)}>
                    {export_item.status}
                  </Badge>
                  {export_item.status === "processing" && (
                    <Progress value={65} className="w-20" />
                  )}
                  {export_item.status === "completed" && (
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">{export_item.downloadCount} downloads</span>
                      <Button size="sm" onClick={() => handleDownload(export_item.id)}>
                        <Download className="h-3 w-3 mr-1" />
                        Download
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
