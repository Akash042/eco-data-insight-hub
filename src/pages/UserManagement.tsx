
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Plus, 
  Search, 
  Edit,
  Trash2,
  Shield,
  Users,
  Mail,
  Phone,
  MapPin
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { User, UserRole, UserPermissions } from "@/types/proforma";

export const UserManagement = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [newUserPermissions, setNewUserPermissions] = useState<UserPermissions>({
    fillProforma: false,
    reviewEditComment: false,
    submitFinalProforma: false,
    reopenProforma: false,
    generateSegmentReport: false,
    generateDeptReport: false,
    generateEnvConsolidated: false,
    viewAllDashboards: false,
    uploadISOCertificate: false,
    receiveISORenewalAlert: false,
  });
  const [selectedRole, setSelectedRole] = useState<UserRole | "">("");
  const { toast } = useToast();

  const users: User[] = [
    {
      id: "USR-001",
      name: "John Smith",
      email: "john.smith@company.com",
      role: "Concern Staff",
      department: "Manufacturing",
      permissions: {
        fillProforma: true,
        reviewEditComment: false,
        submitFinalProforma: false,
        reopenProforma: false,
        generateSegmentReport: false,
        generateDeptReport: false,
        generateEnvConsolidated: false,
        viewAllDashboards: false,
        uploadISOCertificate: false,
        receiveISORenewalAlert: false,
      }
    },
    {
      id: "USR-002", 
      name: "Sarah Johnson",
      email: "sarah.johnson@company.com",
      role: "SSE",
      department: "Manufacturing",
      permissions: {
        fillProforma: false,
        reviewEditComment: true,
        submitFinalProforma: true,
        reopenProforma: false,
        generateSegmentReport: true,
        generateDeptReport: true,
        generateEnvConsolidated: false,
        viewAllDashboards: 'dept',
        uploadISOCertificate: true,
        receiveISORenewalAlert: true,
      }
    },
    {
      id: "USR-003",
      name: "Mike Davis",
      email: "mike.davis@company.com", 
      role: "Concern Staff",
      department: "Electrical",
      permissions: {
        fillProforma: true,
        reviewEditComment: false,
        submitFinalProforma: false,
        reopenProforma: false,
        generateSegmentReport: false,
        generateDeptReport: false,
        generateEnvConsolidated: false,
        viewAllDashboards: false,
        uploadISOCertificate: false,
        receiveISORenewalAlert: false,
      }
    },
    {
      id: "USR-004",
      name: "Robert Brown",
      email: "robert.brown@company.com",
      role: "BO",
      department: "All",
      permissions: {
        fillProforma: false,
        reviewEditComment: true,
        submitFinalProforma: true,
        reopenProforma: false,
        generateSegmentReport: true,
        generateDeptReport: true,
        generateEnvConsolidated: false,
        viewAllDashboards: 'dept',
        uploadISOCertificate: true,
        receiveISORenewalAlert: true,
      }
    },
    {
      id: "USR-005",
      name: "Emma Wilson",
      email: "emma.wilson@company.com",
      role: "WPO",
      department: "All",
      permissions: {
        fillProforma: false,
        reviewEditComment: false,
        submitFinalProforma: false,
        reopenProforma: true,
        generateSegmentReport: false,
        generateDeptReport: false,
        generateEnvConsolidated: true,
        viewAllDashboards: true,
        uploadISOCertificate: true,
        receiveISORenewalAlert: true,
      }
    }
  ];

  const departments = ["Manufacturing", "Electrical", "Store", "ISO", "All"];
  const roles: UserRole[] = ["Concern Staff", "SSE", "BO", "WPO"];

  const getDefaultPermissions = (role: UserRole): UserPermissions => {
    switch (role) {
      case "Concern Staff":
        return {
          fillProforma: true,
          reviewEditComment: false,
          submitFinalProforma: false,
          reopenProforma: false,
          generateSegmentReport: false,
          generateDeptReport: false,
          generateEnvConsolidated: false,
          viewAllDashboards: false,
          uploadISOCertificate: false,
          receiveISORenewalAlert: false,
        };
      case "SSE":
        return {
          fillProforma: false,
          reviewEditComment: true,
          submitFinalProforma: true,
          reopenProforma: false,
          generateSegmentReport: true,
          generateDeptReport: true,
          generateEnvConsolidated: false,
          viewAllDashboards: 'dept',
          uploadISOCertificate: true,
          receiveISORenewalAlert: true,
        };
      case "BO":
        return {
          fillProforma: false,
          reviewEditComment: true,
          submitFinalProforma: true,
          reopenProforma: false,
          generateSegmentReport: true,
          generateDeptReport: true,
          generateEnvConsolidated: false,
          viewAllDashboards: 'dept',
          uploadISOCertificate: true,
          receiveISORenewalAlert: true,
        };
      case "WPO":
        return {
          fillProforma: false,
          reviewEditComment: false,
          submitFinalProforma: false,
          reopenProforma: true,
          generateSegmentReport: false,
          generateDeptReport: false,
          generateEnvConsolidated: true,
          viewAllDashboards: true,
          uploadISOCertificate: true,
          receiveISORenewalAlert: true,
        };
      default:
        return {
          fillProforma: false,
          reviewEditComment: false,
          submitFinalProforma: false,
          reopenProforma: false,
          generateSegmentReport: false,
          generateDeptReport: false,
          generateEnvConsolidated: false,
          viewAllDashboards: false,
          uploadISOCertificate: false,
          receiveISORenewalAlert: false,
        };
    }
  };

  const handleRoleChange = (role: UserRole) => {
    setSelectedRole(role);
    setNewUserPermissions(getDefaultPermissions(role));
  };

  const handlePermissionChange = (permission: keyof UserPermissions, value: boolean | string) => {
    setNewUserPermissions(prev => ({
      ...prev,
      [permission]: value
    }));
  };

  const handleCreateUser = () => {
    toast({
      title: "User Created",
      description: "New user has been successfully created with assigned permissions and invitation sent.",
    });
    setIsCreateDialogOpen(false);
    setSelectedRole("");
    setNewUserPermissions(getDefaultPermissions("Concern Staff"));
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "WPO": return "bg-purple-100 text-purple-800";
      case "BO": return "bg-blue-100 text-blue-800";
      case "SSE": return "bg-green-100 text-green-800";
      case "Concern Staff": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const permissionLabels = {
    fillProforma: "Fill Proforma",
    reviewEditComment: "Review/Edit/Comment",
    submitFinalProforma: "Submit Final Proforma",
    reopenProforma: "Reopen Proforma",
    generateSegmentReport: "Generate Segment Report",
    generateDeptReport: "Generate Dept. Report",
    generateEnvConsolidated: "Generate Env. Consolidated",
    viewAllDashboards: "View All Dashboards",
    uploadISOCertificate: "Upload ISO Certificate",
    receiveISORenewalAlert: "Receive ISO Renewal Alert",
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-600">Manage users, roles, and department-wise permissions</p>
        </div>
        
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Create User
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New User</DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="userName">Full Name</Label>
                  <Input id="userName" placeholder="Enter full name" />
                </div>
                <div>
                  <Label htmlFor="userEmail">Email (Auto-generated)</Label>
                  <Input id="userEmail" placeholder="firstname.lastname@company.com" disabled />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="userRole">Role</Label>
                  <Select onValueChange={handleRoleChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      {roles.map(role => (
                        <SelectItem key={role} value={role}>{role}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="userDepartment">Department</Label>
                  <Select>
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

              {selectedRole && (
                <div>
                  <Label className="text-base font-semibold">Permissions</Label>
                  <div className="mt-3 p-4 border rounded-lg bg-gray-50">
                    <div className="grid grid-cols-1 gap-4">
                      {Object.entries(permissionLabels).map(([key, label]) => (
                        <div key={key} className="flex items-center justify-between">
                          <Label htmlFor={key} className="text-sm font-medium">
                            {label}
                          </Label>
                          {key === 'viewAllDashboards' ? (
                            <Select 
                              value={String(newUserPermissions[key as keyof UserPermissions])}
                              onValueChange={(value) => handlePermissionChange(key as keyof UserPermissions, value === 'true' ? true : value === 'dept' ? 'dept' : false)}
                            >
                              <SelectTrigger className="w-32">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="false">No</SelectItem>
                                <SelectItem value="dept">Dept.</SelectItem>
                                <SelectItem value="true">Yes</SelectItem>
                              </SelectContent>
                            </Select>
                          ) : (
                            <Switch
                              id={key}
                              checked={Boolean(newUserPermissions[key as keyof UserPermissions])}
                              onCheckedChange={(checked) => handlePermissionChange(key as keyof UserPermissions, checked)}
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateUser} disabled={!selectedRole}>
                  Create User & Send Invitation
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-full">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{users.length}</p>
                <p className="text-sm text-gray-600">Total Users</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-full">
                <Shield className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{users.length}</p>
                <p className="text-sm text-gray-600">Active Users</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-full">
                <Mail className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">5</p>
                <p className="text-sm text-gray-600">Departments</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-100 rounded-full">
                <Users className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">4</p>
                <p className="text-sm text-gray-600">User Roles</p>
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
                placeholder="Search users by name, email, or department..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Users ({filteredUsers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Key Permissions</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id} className="hover:bg-gray-50">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getRoleColor(user.role)}>
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>{user.department}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {Object.entries(user.permissions).filter(([_, value]) => value === true || value === 'dept').slice(0, 3).map(([key, value]) => (
                        <Badge key={key} variant="outline" className="text-xs">
                          {permissionLabels[key as keyof UserPermissions]}
                        </Badge>
                      ))}
                      {Object.entries(user.permissions).filter(([_, value]) => value === true || value === 'dept').length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{Object.entries(user.permissions).filter(([_, value]) => value === true || value === 'dept').length - 3} more
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                        <Trash2 className="h-4 w-4" />
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
