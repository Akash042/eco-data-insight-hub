
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Plus, Minus, X, Divide, Calculator, BarChart3 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface MathAction {
  id: string;
  type: 'sum' | 'average' | 'multiply' | 'divide' | 'minimum' | 'maximum' | 'std-deviation';
  label: string;
  icon: any;
  selected: boolean;
}

export const ReportBuilder = () => {
  const [activeTab, setActiveTab] = useState("segment");
  const [formId, setFormId] = useState("");
  const [formName, setFormName] = useState("");
  const [reportTitle, setReportTitle] = useState("");
  const [reportDescription, setReportDescription] = useState("");
  const [columnNumbers, setColumnNumbers] = useState("");
  const [rowNumbers, setRowNumbers] = useState("");
  
  const [mathActions, setMathActions] = useState<MathAction[]>([
    { id: "sum", type: "sum", label: "Sum", icon: Plus, selected: false },
    { id: "average", type: "average", label: "Average", icon: Minus, selected: false },
    { id: "multiply", type: "multiply", label: "Multiply", icon: X, selected: false },
    { id: "divide", type: "divide", label: "Divide", icon: Divide, selected: false },
    { id: "minimum", type: "minimum", label: "Minimum", icon: Calculator, selected: false },
    { id: "maximum", type: "maximum", label: "Maximum", icon: Calculator, selected: false },
    { id: "std-deviation", type: "std-deviation", label: "Std Deviation", icon: BarChart3, selected: false }
  ]);

  const { toast } = useToast();

  const handleMathActionToggle = (actionId: string) => {
    setMathActions(prev => 
      prev.map(action => 
        action.id === actionId 
          ? { ...action, selected: !action.selected }
          : action
      )
    );
  };

  const getSelectedActions = () => {
    return mathActions.filter(action => action.selected);
  };

  const handlePreviewReport = () => {
    if (!formId || !reportTitle) {
      toast({
        title: "Validation Error",
        description: "Please fill in Form ID and Report Title to preview the report.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Report Preview",
      description: "Report preview functionality would be implemented here.",
    });
  };

  const handleGenerateReport = () => {
    if (!formId || !reportTitle) {
      toast({
        title: "Validation Error", 
        description: "Please fill in all required fields before generating the report.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Report Generated",
      description: `Report "${reportTitle}" has been generated successfully.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Report Builder</h1>
          <p className="text-gray-600">Create and configure environmental monitoring reports</p>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Main Content */}
        <div className="col-span-12 lg:col-span-8">
          <Card>
            <CardHeader>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="segment">Segment Wise</TabsTrigger>
                  <TabsTrigger value="department">Department Wise</TabsTrigger>
                  <TabsTrigger value="consolidated">Consolidated</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Report Configuration */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <BarChart3 className="h-5 w-5" />
                  <h3 className="text-lg font-semibold">Report Configuration</h3>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="formId">Form ID *</Label>
                    <Input
                      id="formId"
                      value={formId}
                      onChange={(e) => setFormId(e.target.value)}
                      placeholder="Enter or select Form ID"
                    />
                  </div>
                  <div>
                    <Label htmlFor="formName">Form Name</Label>
                    <Input
                      id="formName"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder="Auto-populated based on Form ID"
                      disabled
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="reportTitle">Report Title (Manual Entry) *</Label>
                    <Input
                      id="reportTitle"
                      value={reportTitle}
                      onChange={(e) => setReportTitle(e.target.value)}
                      placeholder="Enter report title"
                    />
                  </div>
                  <div>
                    <Label htmlFor="reportDescription">Report Description *</Label>
                    <Textarea
                      id="reportDescription"
                      value={reportDescription}
                      onChange={(e) => setReportDescription(e.target.value)}
                      placeholder="Enter report description"
                      className="min-h-[80px]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="columnNumbers">Column Numbers</Label>
                    <Select value={columnNumbers} onValueChange={setColumnNumbers}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select columns" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-5">Columns 1-5</SelectItem>
                        <SelectItem value="6-10">Columns 6-10</SelectItem>
                        <SelectItem value="all">All Columns</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="rowNumbers">Row Numbers</Label>
                    <Select value={rowNumbers} onValueChange={setRowNumbers}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select rows" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-10">Rows 1-10</SelectItem>
                        <SelectItem value="11-20">Rows 11-20</SelectItem>
                        <SelectItem value="all">All Rows</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Mathematical Actions */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <Calculator className="h-5 w-5" />
                  <h3 className="text-lg font-semibold">Mathematical Actions</h3>
                </div>

                <div className="grid grid-cols-4 gap-4">
                  {mathActions.map((action) => (
                    <div
                      key={action.id}
                      className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                        action.selected
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => handleMathActionToggle(action.id)}
                    >
                      <div className="flex flex-col items-center text-center">
                        <action.icon className="h-8 w-8 mb-2 text-gray-600" />
                        <span className="text-sm font-medium">{action.label}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {getSelectedActions().length > 0 && (
                  <div className="mt-4">
                    <Label>Selected Actions:</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {getSelectedActions().map((action) => (
                        <Badge key={action.id} variant="secondary">
                          {action.label}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Report Preview Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Report Preview</h3>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <p className="text-gray-500 mb-4">Configure the report settings above to see a preview</p>
                  <Button onClick={handlePreviewReport} className="bg-green-600 hover:bg-green-700">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Preview Report
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="col-span-12 lg:col-span-4">
          <Card>
            <CardHeader>
              <CardTitle>Report Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button onClick={handleGenerateReport} className="w-full bg-blue-600 hover:bg-blue-700">
                Generate Report
              </Button>
              
              <div className="space-y-2">
                <h4 className="font-medium">Report Summary</h4>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>Active Tab: <span className="font-medium">{activeTab}</span></p>
                  <p>Form ID: <span className="font-medium">{formId || "Not set"}</span></p>
                  <p>Selected Actions: <span className="font-medium">{getSelectedActions().length}</span></p>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Quick Actions</h4>
                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full">
                    Save Configuration
                  </Button>
                  <Button variant="outline" size="sm" className="w-full">
                    Load Template
                  </Button>
                  <Button variant="outline" size="sm" className="w-full">
                    Export Settings
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
