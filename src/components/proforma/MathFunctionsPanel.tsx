
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator, Plus } from "lucide-react";
import { mathFunctions, applyMathFunction, formatCalculationResult } from "@/utils/mathFunctions";
import { ProformaField, MathCalculation } from "@/types/proforma";

interface MathFunctionsPanelProps {
  fields: ProformaField[];
  rowData: any[];
  onCalculationSave: (calculation: MathCalculation) => void;
  currentUser: string;
}

export const MathFunctionsPanel = ({ 
  fields, 
  rowData, 
  onCalculationSave, 
  currentUser 
}: MathFunctionsPanelProps) => {
  const [selectedFunction, setSelectedFunction] = useState<string>('');
  const [selectedField, setSelectedField] = useState<string>('');
  const [calculationResult, setCalculationResult] = useState<number | null>(null);
  const [description, setDescription] = useState<string>('');

  const numberFields = fields.filter(field => field.type === 'number');
  const functionOptions = [
    { value: 'sum', label: 'Sum' },
    { value: 'average', label: 'Average' },
    { value: 'min', label: 'Minimum' },
    { value: 'max', label: 'Maximum' },
    { value: 'median', label: 'Median' },
    { value: 'standardDeviation', label: 'Standard Deviation' },
    { value: 'range', label: 'Range' }
  ];

  const handleCalculate = () => {
    if (!selectedFunction || !selectedField) return;

    const fieldValues = rowData
      .map(row => parseFloat(row[selectedField]))
      .filter(val => !isNaN(val));

    if (fieldValues.length === 0) return;

    const result = applyMathFunction(
      selectedFunction as keyof typeof mathFunctions,
      fieldValues
    );

    setCalculationResult(result);
  };

  const handleSaveCalculation = () => {
    if (calculationResult === null || !selectedFunction || !selectedField) return;

    const calculation: MathCalculation = {
      id: `calc_${Date.now()}`,
      formula: `${selectedFunction}(${fields.find(f => f.id === selectedField)?.name})`,
      result: calculationResult,
      appliedBy: currentUser,
      appliedAt: new Date().toISOString(),
      description: description || `${selectedFunction} calculation on ${fields.find(f => f.id === selectedField)?.name}`
    };

    onCalculationSave(calculation);
    
    // Reset form
    setSelectedFunction('');
    setSelectedField('');
    setCalculationResult(null);
    setDescription('');
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5" />
          Mathematical Functions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Function</Label>
            <Select value={selectedFunction} onValueChange={setSelectedFunction}>
              <SelectTrigger>
                <SelectValue placeholder="Select function" />
              </SelectTrigger>
              <SelectContent>
                {functionOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label>Field</Label>
            <Select value={selectedField} onValueChange={setSelectedField}>
              <SelectTrigger>
                <SelectValue placeholder="Select field" />
              </SelectTrigger>
              <SelectContent>
                {numberFields.map(field => (
                  <SelectItem key={field.id} value={field.id}>
                    {field.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label>Description (Optional)</Label>
          <Input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter calculation description"
          />
        </div>

        <div className="flex gap-2">
          <Button onClick={handleCalculate} disabled={!selectedFunction || !selectedField}>
            Calculate
          </Button>
          
          <Button 
            onClick={handleSaveCalculation} 
            disabled={calculationResult === null}
            variant="outline"
          >
            <Plus className="h-4 w-4 mr-2" />
            Save Calculation
          </Button>
        </div>

        {calculationResult !== null && (
          <div className="p-4 bg-green-50 rounded-lg">
            <div className="font-medium">Result: {formatCalculationResult(calculationResult)}</div>
            <div className="text-sm text-gray-600">
              {selectedFunction} of {fields.find(f => f.id === selectedField)?.name}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
