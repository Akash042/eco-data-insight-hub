import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Plus, 
  Download, 
  BarChart3,
  FileText,
  Calculator,
  Eye,
  Edit
} from "lucide-react";

export const Reports = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);

  const reports = [
    {
      id: "RPT-001",
      title: "Manufacturing Department - Water Quality Q2 2024",
      type: "Department-wise",
      department: "Manufacturing",
      createdBy: "Sarah Johnson (SSE)",
      createdDate: "2024-06-30",
      status: "completed",
      dataPoints: 45,
      calculations: ["Sum", "Average", "Max"]
    },
    {
      id: "RPT-002",
      title: "Segment-wise Air Quality Analysis",
      type: "Segment-wise",
      department: "All",
      createdBy: "Robert Brown (BO)",
      createdDate: "2024-06-29",
      status: "draft",
      dataPoints: 32,
      calculations: ["Average", "Trend"]
    },
    {
      id: "RPT-003",
      title: "Consolidated Environment Report - H1 2024",
      type: "Consolidated",
      department: "All",
      createdBy: "Lisa Anderson (WPO)",
      createdDate: "2024-06-28",
      status: "completed",
      dataPoints: 128,
      calculations: ["Sum", "Average", "Variance", "Growth Rate"]
    }
  ];

  const sampleData = [
    { segment: "Manufacturing A", parameter: "pH Level", q1: 7.2, q2: 7.1, q3: 7.3, q4: 7.0 },
    { segment: "Manufacturing B", parameter: "pH Level", q1: 7.4, q2: 7.2, q3: 7.1, q4: 7.3 },
    { segment: "Electrical", parameter: "pH Level", q1: 7.1, q2: 7.3, q3: 7.2, q4: 7.4 },
    { segment: "Store", parameter: "pH Level", q1: 7.3, q2: 7.0, q3: 7.2, q4: 7.1 }
  ];

  const calculations = [
    { id: "sum", label: "Sum", formula: "SUM(selected_cells)" },
    { id: "avg", label: "Average", formula: "AVERAGE(selected_cells)" },
    { id: "max", label: "Maximum", formula: "MAX(selected_cells)" },
    { id: "min", label: "Minimum", formula: "MIN(selected_cells)" },
    { id: "count", label: "Count", formula: "COUNT(selected_cells)" },
    { id: "variance", label: "Variance", formula: "VAR(selected_cells)" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-100 text-green-800";
      case "draft": return "bg-yellow-100 text-yellow-800";
      case "in_progress": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const handleCellSelect = (rowIndex: number, column: string) => {
    const cellId = `${rowIndex}-${column}`;
    setSelectedColumns(prev => 
      prev.includes(cellId) 
        ? prev.filter(id => id !== cellId)
        : [...prev, cellId]
    );
  };

  const calculateResult = (operation: string) => {
    if (selectedColumns.length === 0) return "Select cells first";
    
    const values = selectedColumns.map(cellId => {
      const [rowIndex, column] = cellId.split('-');
      const row = sampleData[parseInt(rowIndex)];
      return row[column as keyof typeof row] as number;
    }).filter(val => typeof val === 'number');

    switch (operation) {
      case "sum": return values.reduce((a, b) => a + b, 0).toFixed(2);
      case "avg": return (values.reduce((a, b) => a + b, 0) / values.length).toFixed(2);
      case "max": return Math.max(...values).toFixed(2);
      case "min": return Math.min(...values).toFixed(2);
      case "count": return values.length.toString();
      default: return "0";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600">Create and manage consolidated reports with advanced calculations</p>
        </div>
        
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Create Report
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Report</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="reportTitle">Report Title</Label>
                  <Input id="reportTitle" placeholder="Enter report title" />
                </div>
                <div>
                  <Label htmlFor="reportType">Report Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select report type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="segment">Segment-wise Consolidated</SelectItem>
                      <SelectItem value="department">Department-wise Consolidated</SelectItem>
                      <SelectItem value="environment">Environment Consolidated (WPO only)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="department">Department</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Departments</SelectItem>
                      <SelectItem value="manufacturing">Manufacturing</SelectItem>
                      <SelectItem value="electrical">Electrical</SelectItem>
                      <SelectItem value="store">Store</SelectItem>
                      <SelectItem value="iso">ISO</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="timeframe">Time Frame</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select time frame" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                      <SelectItem value="half-yearly">Half-yearly</SelectItem>
                      <SelectItem value="yearly">Yearly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsCreateDialogOpen(false)}>
                  Create Report
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Reports List */}
      <Card>
        <CardHeader>
          <CardTitle>All Reports ({reports.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Created By</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Data Points</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reports.map((report) => (
                <TableRow key={report.id} className="hover:bg-gray-50">
                  <TableCell className="font-mono text-sm">{report.id}</TableCell>
                  <TableCell className="font-medium">{report.title}</TableCell>
                  <TableCell>{report.type}</TableCell>
                  <TableCell>{report.department}</TableCell>
                  <TableCell>{report.createdBy}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(report.status)}>
                      {report.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{report.dataPoints}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Interactive Data Table */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Interactive Data Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Segment</th>
                    <th className="text-left p-2">Parameter</th>
                    <th className="text-left p-2 cursor-pointer hover:bg-blue-50">Q1</th>
                    <th className="text-left p-2 cursor-pointer hover:bg-blue-50">Q2</th>
                    <th className="text-left p-2 cursor-pointer hover:bg-blue-50">Q3</th>
                    <th className="text-left p-2 cursor-pointer hover:bg-blue-50">Q4</th>
                  </tr>
                </thead>
                <tbody>
                  {sampleData.map((row, rowIndex) => (
                    <tr key={rowIndex} className="border-b hover:bg-gray-50">
                      <td className="p-2">{row.segment}</td>
                      <td className="p-2">{row.parameter}</td>
                      {['q1', 'q2', 'q3', 'q4'].map(quarter => (
                        <td
                          key={`${rowIndex}-${quarter}`}
                          className={`p-2 cursor-pointer border ${
                            selectedColumns.includes(`${rowIndex}-${quarter}`)
                              ? 'bg-blue-100 border-blue-300'
                              : 'hover:bg-gray-100'
                          }`}
                          onClick={() => handleCellSelect(rowIndex, quarter)}
                        >
                          {row[quarter as keyof typeof row]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 text-sm text-gray-600">
              Click cells to select them for calculations. Selected: {selectedColumns.length} cells
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              Calculations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {calculations.map((calc) => (
              <div key={calc.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">{calc.label}</p>
                  <p className="text-xs text-gray-500">{calc.formula}</p>
                </div>
                <div className="text-right">
                  <p className="font-mono text-lg">{calculateResult(calc.id)}</p>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => console.log(`Applied ${calc.label}: ${calculateResult(calc.id)}`)}
                  >
                    Apply
                  </Button>
                </div>
              </div>
            ))}
            
            <div className="pt-4 border-t">
              <Button className="w-full" variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export Results
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
