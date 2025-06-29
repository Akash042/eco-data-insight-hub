
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart3, 
  FileText, 
  Users, 
  AlertTriangle,
  TrendingUp,
  Calendar,
  CheckCircle
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";

export const Dashboard = () => {
  const stats = [
    {
      title: "Active Proformas",
      value: "24",
      change: "+12%",
      icon: FileText,
      color: "text-blue-600"
    },
    {
      title: "Pending Reviews",
      value: "8",
      change: "-5%",
      icon: AlertTriangle,
      color: "text-orange-600"
    },
    {
      title: "Completed This Month",
      value: "156",
      change: "+23%",
      icon: CheckCircle,
      color: "text-green-600"
    },
    {
      title: "Department Coverage",
      value: "94%",
      change: "+2%",
      icon: TrendingUp,
      color: "text-purple-600"
    }
  ];

  const chartData = [
    { name: "Manufacturing", proformas: 45, completed: 38 },
    { name: "Electrical", proformas: 32, completed: 28 },
    { name: "Store", proformas: 28, completed: 25 },
    { name: "ISO", proformas: 15, completed: 12 }
  ];

  const trendData = [
    { month: "Jan", submissions: 120 },
    { month: "Feb", submissions: 135 },
    { month: "Mar", submissions: 148 },
    { month: "Apr", submissions: 162 },
    { month: "May", submissions: 158 },
    { month: "Jun", submissions: 171 }
  ];

  const departmentData = [
    { name: "Manufacturing", value: 45, color: "#3B82F6" },
    { name: "Electrical", value: 32, color: "#10B981" },
    { name: "Store", value: 28, color: "#F59E0B" },
    { name: "ISO", value: 15, color: "#8B5CF6" }
  ];

  const recentActivities = [
    {
      id: 1,
      action: "Proforma submitted",
      proforma: "Water Quality Assessment WQ-045",
      user: "John Smith",
      time: "2 hours ago",
      status: "completed"
    },
    {
      id: 2,
      action: "Review completed",
      proforma: "Air Quality Monitoring AQ-023",
      user: "Sarah Johnson",
      time: "4 hours ago",
      status: "approved"
    },
    {
      id: 3,
      action: "Deadline approaching",
      proforma: "Waste Management Report WM-012",
      user: "Mike Davis",
      time: "6 hours ago",
      status: "warning"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-100 text-green-800";
      case "approved": return "bg-blue-100 text-blue-800";
      case "warning": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Environment monitoring system overview</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Calendar className="h-4 w-4" />
          Last updated: {new Date().toLocaleString()}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className={`text-sm ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change} from last month
                  </p>
                </div>
                <div className={`p-3 rounded-full bg-gray-50 ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Department-wise Proforma Status</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="proformas" fill="#3B82F6" name="Total" />
                <Bar dataKey="completed" fill="#10B981" name="Completed" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Submission Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="submissions" stroke="#3B82F6" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{activity.action}</p>
                    <p className="text-sm text-gray-600">{activity.proforma}</p>
                    <p className="text-xs text-gray-500">by {activity.user} • {activity.time}</p>
                  </div>
                  <Badge className={getStatusColor(activity.status)}>
                    {activity.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Department Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={departmentData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {departmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {departmentData.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-sm text-gray-600">{item.name}</span>
                  </div>
                  <span className="text-sm font-medium">{item.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
