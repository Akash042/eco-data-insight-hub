
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Plus, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ProformaField } from "@/types/proforma";

interface CreateProformaDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateProforma: (proforma: any) => void;
}

export const CreateProformaDialog = ({ open, onOpenChange, onCreateProforma }: CreateProformaDialogProps) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    department: '',
    segment: '',
    assignedTo: [] as string[]
  });
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [fields, setFields] = useState<ProformaField[]>([]);
  const [newField, setNewField] = useState({
    name: '',
    type: 'text' as const,
    required: false
  });
  const { toast } = useToast();

  const departments = ["Manufacturing", "Electrical", "Store", "ISO"];
  const segments = ["Production", "Quality", "Safety", "Environmental", "Maintenance"];
  const concernStaff = ["John Smith", "Mike Davis", "Emily Wilson", "David Lee"];

  const handleAddField = () => {
    if (newField.name.trim()) {
      const field: ProformaField = {
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

  const handleCreateProforma = () => {
    if (!formData.title || !formData.department || !formData.segment || fields.length === 0) {
      toast({
        title: "Validation Error",
        description: "Please fill all required fields and add at least one data field.",
        variant: "destructive"
      });
      return;
    }

    const proforma = {
      id: `PF-${Date.now().toString().slice(-6)}`,
      title: formData.title,
      description: formData.description,
      department: formData.department,
      segment: formData.segment,
      fields: fields,
      rows: [],
      assignedTo: formData.assignedTo,
      createdBy: "Current User",
      createdAt: new Date().toISOString(),
      deadline: selectedDate?.toISOString() || '',
      status: 'not_assigned' as const // Updated to use the new status
    };

    onCreateProforma(proforma);
    
    // Reset form
    setFormData({
      title: '',
      description: '',
      department: '',
      segment: '',
      assignedTo: []
    });
    setFields([]);
    setSelectedDate(undefined);
    
    onOpenChange(false);
    
    toast({
      title: "Proforma Created",
      description: `Proforma ${proforma.id} has been created successfully.`,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Proforma</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Proforma Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                placeholder="Enter proforma title"
              />
            </div>
            <div>
              <Label htmlFor="department">Department *</Label>
              <Select value={formData.department} onValueChange={(value) => setFormData({...formData, department: value})}>
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
              <Select value={formData.segment} onValueChange={(value) => setFormData({...formData, segment: value})}>
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
              <Label>Deadline</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Enter proforma description"
            />
          </div>

          {/* Data Fields Configuration */}
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
                    placeholder="e.g., Temperature"
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

          {/* Assignment */}
          <div>
            <Label>Assign to Concern Staff</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select concern staff" />
              </SelectTrigger>
              <SelectContent>
                {concernStaff.map(staff => (
                  <SelectItem key={staff} value={staff}>{staff}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateProforma}>
              Create Proforma
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
