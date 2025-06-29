
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area
} from "recharts";
import { 
  TrendingUp, 
  BarChart3, 
  PieChart as PieChartIcon,
  Download,
  Filter,
  Calendar
} from "lucide-react";

export const Analytics = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState("quarterly");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [selectedChart, setSelectedChart] = useState("bar");

  const departmentData = [
    { name: "Manufacturing", submissions: 45, completed: 42, compliance: 93 },
    { name: "Electrical", submissions: 32, completed: 30, compliance: 94 },
    { name: "Store", submissions: 28, completed: 26, compliance: 93 },
    { name: "ISO", submissions: 15, completed: 15, compliance: 100 }
  ];

  const trendData = [
    { month: "Jan", manufacturing: 38, electrical: 28, store: 22, iso: 12 },
    { month: "Feb", manufacturing: 41, electrical: 30, store: 24, iso: 13 },
    { month: "Mar", manufacturing: 43, electrical: 31, store: 26, iso: 14 },
    { month: "Apr", manufacturing: 45, electrical: 32, store: 28, iso: 15 },
    { month: "May", manufacturing: 42, electrical: 31, store: 27, iso: 15 },
    { month: "Jun", manufacturing: 45, electrical: 32, store: 28, iso: 15 }
  ];

  const complianceData = [
    { name: "Compliant", value: 142, color: "#10B981" },
    { name: "Pending", value: 18, color: "#F59E0B" },
    { name: "Non-compliant", value: 5, color: "#EF4444" }
  ];

  const parameterData = [
    { parameter: "Water Quality", jan: 7.2, feb: 7.1, mar: 7.3, apr: 7.0, may: 7.2, jun: 7.1 },
    { parameter: "Air Quality Index", jan: 45, feb: 42, mar: 48, apr: 44, may: 46, jun: 43 },
    { parameter: "Noise Level", jan: 65, feb: 63, mar: 67, apr: 64, may: 66, jun: 62 },
    { parameter: "Waste Generation", jan: 125, feb: 130, mar: 120, apr: 135, may: 128, jun: 132 }
  ];

  const kpiData = [
    { title: "Compliance Rate", value: "94.2%", change: "+2.1%", trend: "up" },
    { title: "Avg Response Time", value: "2.3 days", change: "-0.5 days", trend: "down" },
    { title: "Data Quality Score", value: "96.8%", change: "+1.2%", trend: "up" },
    { title: "Overdue Items", value: "8", change: "-3", trend: "down" }
  ];

  const chartColors = ["#3B82F6", "#10B981", "#F59E0B", "#8B5CF6", "#EF4444"];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-600">Comprehensive environmental data analysis and insights</p>
        </div>
        
        <div className="flex gap-3">
          <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="quarterly">Quarterly</SelectItem>
              <SelectItem value="half-yearly">Half-yearly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
            <SelectTrigger className="w-40">
              <SelectValue />
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
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{kpi.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{kpi.value}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingUp className={`h-4 w-4 ${kpi.trend === 'up' ? 'text-green-500' : 'text-red-500 rotate-180'}`} />
                    <span className={`text-sm ${kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      {kpi.change}
                    </span>
                  </div>
                </div>
                <div className="p-3 bg-blue-50 rounded-full">
                  <BarChart3 className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Chart Tabs */}
      <Tabs defaultValue="department" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="department">Department Analysis</TabsTrigger>
          <TabsTrigger value="trends">Trends & Patterns</TabsTrigger>
          <TabsTrigger value="compliance">Compliance Overview</TabsTrigger>
          <TabsTrigger value="parameters">Parameter Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="department" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Department Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={departmentData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="submissions" fill="#3B82F6" name="Total Submissions" />
                    <Bar dataKey="completed" fill="#10B981" name="Completed" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Compliance Rates by Department</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={departmentData} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" domain={[0, 100]} />
                    <YAxis type="category" dataKey="name" />
                    <Tooltip formatter={(value) => [`${value}%`, 'Compliance Rate']} />
                    <Bar dataKey="compliance" fill="#10B981" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Submission Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="manufacturing" 
                    stackId="1" 
                    stroke="#3B82F6" 
                    fill="#3B82F6" 
                    fillOpacity={0.6}
                    name="Manufacturing"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="electrical" 
                    stackId="1" 
                    stroke="#10B981" 
                    fill="#10B981" 
                    fillOpacity={0.6}
                    name="Electrical"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="store" 
                    stackId="1" 
                    stroke="#F59E0B" 
                    fill="#F59E0B" 
                    fillOpacity={0.6}
                    name="Store"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="iso" 
                    stackId="1" 
                    stroke="#8B5CF6" 
                    fill="#8B5CF6" 
                    fillOpacity={0.6}
                    name="ISO"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Overall Compliance Status</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={complianceData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {complianceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Compliance Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {complianceData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="font-medium">{item.name}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-bold">{item.value}</span>
                      <p className="text-sm text-gray-500">
                        {((item.value / complianceData.reduce((a, b) => a + b.value, 0)) * 100).toFixed(1)}%
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="parameters" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Environmental Parameter Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="manufacturing" 
                    stroke="#3B82F6" 
                    strokeWidth={3}
                    name="Manufacturing"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="electrical" 
                    stroke="#10B981" 
                    strokeWidth={3}
                    name="Electrical"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="store" 
                    stroke="#F59E0B" 
                    strokeWidth={3}
                    name="Store"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="iso" 
                    stroke="#8B5CF6" 
                    strokeWidth={3}
                    name="ISO"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
