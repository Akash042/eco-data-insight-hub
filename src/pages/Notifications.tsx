
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Bell, 
  Clock, 
  AlertCircle, 
  CheckCircle, 
  Calendar,
  Settings,
  Users,
  FileText,
  Award,
  Search,
  Filter
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const Notifications = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const { toast } = useToast();

  const notifications = [
    {
      id: 1,
      type: "deadline",
      title: "Proforma Deadline Approaching",
      message: "Water Quality Assessment (WQ-001) is due in 2 days",
      recipient: "John Smith",
      department: "Manufacturing",
      time: "2 hours ago",
      priority: "high",
      read: false
    },
    {
      id: 2,
      type: "assignment",
      title: "New Proforma Assigned",
      message: "Air Quality Monitoring (AQ-045) has been assigned to you",
      recipient: "Mike Davis",
      department: "Electrical", 
      time: "4 hours ago",
      priority: "medium",
      read: false
    },
    {
      id: 3,
      type: "iso",
      title: "ISO Certificate Renewal",
      message: "ISO 14001:2015 certificate expires in 30 days",
      recipient: "All Users",
      department: "ISO",
      time: "1 day ago",
      priority: "high",
      read: true
    },
    {
      id: 4,
      type: "completed",
      title: "Proforma Submitted",
      message: "Waste Management Report (WM-023) has been submitted for review",
      recipient: "Sarah Johnson",
      department: "Manufacturing",
      time: "2 days ago",
      priority: "low",
      read: true
    },
    {
      id: 5,
      type: "user",
      title: "New User Created",
      message: "New concern staff member added to Electrical department",
      recipient: "Robert Brown",
      department: "All",
      time: "3 days ago",
      priority: "medium",
      read: true
    }
  ];

  const notificationSettings = [
    { id: "proforma_deadline", label: "Proforma Deadline Reminders", enabled: true },
    { id: "proforma_assignment", label: "New Proforma Assignments", enabled: true },
    { id: "proforma_submission", label: "Proforma Submissions", enabled: true },
    { id: "iso_renewal", label: "ISO Certificate Renewals", enabled: true },
    { id: "user_management", label: "User Management Updates", enabled: false },
    { id: "system_updates", label: "System Updates", enabled: true }
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case "deadline": return <Clock className="h-4 w-4 text-orange-500" />;
      case "assignment": return <FileText className="h-4 w-4 text-blue-500" />;
      case "iso": return <Award className="h-4 w-4 text-red-500" />;
      case "completed": return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "user": return <Users className="h-4 w-4 text-purple-500" />;
      default: return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const handleMarkAsRead = (id: number) => {
    toast({
      title: "Notification Updated",
      description: "Notification marked as read.",
    });
  };

  const handleSettingToggle = (settingId: string) => {
    toast({
      title: "Settings Updated",
      description: "Notification preferences have been updated.",
    });
  };

  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notification.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === "all" || 
                         (selectedFilter === "unread" && !notification.read) ||
                         (selectedFilter === "read" && notification.read) ||
                         notification.type === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
          <p className="text-gray-600">Manage notifications and preferences</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
          <Button>
            Mark All as Read
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-full">
                <Bell className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{notifications.length}</p>
                <p className="text-sm text-gray-600">Total Notifications</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-100 rounded-full">
                <AlertCircle className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{notifications.filter(n => !n.read).length}</p>
                <p className="text-sm text-gray-600">Unread</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-red-100 rounded-full">
                <Clock className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{notifications.filter(n => n.priority === 'high').length}</p>
                <p className="text-sm text-gray-600">High Priority</p>
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
                <p className="text-2xl font-bold">{notifications.filter(n => n.read).length}</p>
                <p className="text-sm text-gray-600">Read</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search notifications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="unread">Unread</SelectItem>
                  <SelectItem value="read">Read</SelectItem>
                  <SelectItem value="deadline">Deadlines</SelectItem>
                  <SelectItem value="assignment">Assignments</SelectItem>
                  <SelectItem value="iso">ISO</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Notifications List */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Notifications ({filteredNotifications.length})</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 border rounded-lg transition-colors cursor-pointer ${
                  notification.read ? 'bg-gray-50' : 'bg-white border-blue-200'
                }`}
                onClick={() => handleMarkAsRead(notification.id)}
              >
                <div className="flex items-start gap-3">
                  {getIcon(notification.type)}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className={`font-medium text-sm truncate ${!notification.read ? 'text-blue-900' : 'text-gray-900'}`}>
                        {notification.title}
                      </h3>
                      <div className="flex items-center gap-2">
                        <Badge className={getPriorityColor(notification.priority)}>
                          {notification.priority}
                        </Badge>
                        {!notification.read && <div className="w-2 h-2 bg-blue-500 rounded-full" />}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      {notification.message}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span>To: {notification.recipient} • {notification.department}</span>
                      <span>{notification.time}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Notification Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {notificationSettings.map((setting) => (
              <div key={setting.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <Label htmlFor={setting.id} className="text-sm font-medium">
                    {setting.label}
                  </Label>
                </div>
                <Switch
                  id={setting.id}
                  checked={setting.enabled}
                  onCheckedChange={() => handleSettingToggle(setting.id)}
                />
              </div>
            ))}
            
            <div className="pt-4 border-t">
              <Button className="w-full" variant="outline">
                <Bell className="h-4 w-4 mr-2" />
                Configure Email Notifications
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
