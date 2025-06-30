
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Upload, 
  Download, 
  Search, 
  Plus,
  Calendar,
  AlertTriangle,
  CheckCircle,
  FileText,
  Bell
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { format, addMonths, isBefore, differenceInDays } from "date-fns";
import { ISOCertificate } from "@/types/reports";

export const ISOManagement = () => {
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const [certificates, setCertificates] = useState<ISOCertificate[]>([
    {
      id: "CERT-001",
      name: "ISO 14001:2015 Environmental Management System",
      uploadDate: "2024-01-15T10:00:00",
      expiryDate: "2027-01-15T23:59:59",
      department: "Manufacturing",
      uploadedBy: "Sarah Johnson (SSE)",
      fileUrl: "/certificates/iso-14001-manufacturing.pdf",
      status: "active"
    },
    {
      id: "CERT-002", 
      name: "ISO 45001:2018 Occupational Health and Safety",
      uploadDate: "2024-03-20T14:30:00",
      expiryDate: "2025-03-20T23:59:59",
      department: "All",
      uploadedBy: "David Lee (BO)",
      fileUrl: "/certificates/iso-45001-safety.pdf",
      status: "expiring"
    },
    {
      id: "CERT-003",
      name: "ISO 9001:2015 Quality Management System", 
      uploadDate: "2023-06-10T09:15:00",
      expiryDate: "2024-06-10T23:59:59",
      department: "Electrical",
      uploadedBy: "Robert Brown (BO)",
      fileUrl: "/certificates/iso-9001-quality.pdf",
      status: "expired"
    },
    {
      id: "CERT-004",
      name: "ISO 50001:2018 Energy Management System",
      uploadDate: "2024-05-25T16:45:00", 
      expiryDate: "2027-05-25T23:59:59",
      department: "Store",
      uploadedBy: "Sarah Johnson (SSE)",
      fileUrl: "/certificates/iso-50001-energy.pdf",
      status: "active"
    }
  ]);

  const departments = ["All", "Manufacturing", "Electrical", "Store"];

  const handleUploadCertificate = () => {
    const newCertificate: ISOCertificate = {
      id: `CERT-${String(certificates.length + 1).padStart(3, '0')}`,
      name: "New ISO Certificate",
      uploadDate: new Date().toISOString(),
      expiryDate: addMonths(new Date(), 36).toISOString(),
      department: "Manufacturing",
      uploadedBy: "Current User",
      fileUrl: "/certificates/new-certificate.pdf",
      status: "active"
    };

    setCertificates([...certificates, newCertificate]);
    toast({
      title: "Certificate Uploaded",
      description: "ISO certificate has been successfully uploaded and stored.",
    });
    setIsUploadDialogOpen(false);
  };

  const handleDownloadCertificate = (certificate: ISOCertificate) => {
    toast({
      title: "Download Started",
      description: `Downloading ${certificate.name}...`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "expiring": return "bg-yellow-100 text-yellow-800";
      case "expired": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getExpiryStatus = (expiryDate: string) => {
    const expiry = new Date(expiryDate);
    const today = new Date();
    const daysUntilExpiry = differenceInDays(expiry, today);

    if (isBefore(expiry, today)) {
      return { status: "expired", daysLeft: 0, text: "Expired" };
    } else if (daysUntilExpiry <= 90) {
      return { status: "expiring", daysLeft: daysUntilExpiry, text: `${daysUntilExpiry} days left` };
    } else {
      return { status: "active", daysLeft: daysUntilExpiry, text: `${daysUntilExpiry} days left` };
    }
  };

  const filteredCertificates = certificates.filter(cert =>
    cert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cert.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cert.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const expiringCertificates = certificates.filter(cert => 
    getExpiryStatus(cert.expiryDate).status === "expiring"
  );
  const expiredCertificates = certificates.filter(cert => 
    getExpiryStatus(cert.expiryDate).status === "expired"
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">ISO Certificate Management</h1>
          <p className="text-gray-600">Upload, manage, and track ISO certificates with renewal notifications</p>
        </div>
        
        <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Upload className="h-4 w-4 mr-2" />
              Upload Certificate
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Upload ISO Certificate</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="certName">Certificate Name</Label>
                <Input id="certName" placeholder="e.g., ISO 14001:2015 Environmental Management" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="department">Department</Label>
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
                <div>
                  <Label htmlFor="expiryDate">Expiry Date</Label>
                  <Input id="expiryDate" type="date" />
                </div>
              </div>
              
              <div>
                <Label htmlFor="certFile">Certificate File</Label>
                <Input id="certFile" type="file" accept=".pdf,.jpg,.jpeg,.png" />
              </div>
              
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setIsUploadDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleUploadCertificate}>
                  Upload Certificate
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Alert Cards for Expiring/Expired Certificates */}
      {(expiringCertificates.length > 0 || expiredCertificates.length > 0) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {expiringCertificates.length > 0 && (
            <Card className="border-yellow-200 bg-yellow-50">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-yellow-100 rounded-full">
                    <Bell className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-yellow-800">{expiringCertificates.length}</p>
                    <p className="text-sm text-yellow-700">Certificates Expiring Soon</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
          
          {expiredCertificates.length > 0 && (
            <Card className="border-red-200 bg-red-50">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-red-100 rounded-full">
                    <AlertTriangle className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-red-800">{expiredCertificates.length}</p>
                    <p className="text-sm text-red-700">Expired Certificates</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-full">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{certificates.length}</p>
                <p className="text-sm text-gray-600">Total Certificates</p>
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
                <p className="text-2xl font-bold">{certificates.filter(c => getExpiryStatus(c.expiryDate).status === 'active').length}</p>
                <p className="text-sm text-gray-600">Active Certificates</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-yellow-100 rounded-full">
                <Bell className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{expiringCertificates.length}</p>
                <p className="text-sm text-gray-600">Expiring Soon</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-red-100 rounded-full">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{expiredCertificates.length}</p>
                <p className="text-sm text-gray-600">Expired</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search certificates by name, department, or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Certificates Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Certificates ({filteredCertificates.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Certificate ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Upload Date</TableHead>
                <TableHead>Expiry Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCertificates.map((certificate) => {
                const expiryInfo = getExpiryStatus(certificate.expiryDate);
                return (
                  <TableRow key={certificate.id} className="hover:bg-gray-50">
                    <TableCell className="font-mono text-sm">{certificate.id}</TableCell>
                    <TableCell className="font-medium">{certificate.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700">
                        {certificate.department}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm">
                      {format(new Date(certificate.uploadDate), "MMM dd, yyyy")}
                    </TableCell>
                    <TableCell className="text-sm">
                      {format(new Date(certificate.expiryDate), "MMM dd, yyyy")}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <Badge className={getStatusColor(expiryInfo.status)}>
                          {expiryInfo.text}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleDownloadCertificate(certificate)}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
