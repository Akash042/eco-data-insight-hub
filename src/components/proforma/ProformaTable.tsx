
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Edit, MessageCircle, Save, X, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Proforma, ProformaRow, ProformaComment, UserRole } from "@/types/proforma";

interface ProformaTableProps {
  proforma: Proforma;
  userRole: UserRole;
  onUpdateRow: (rowId: string, data: any) => void;
  onAddComment: (rowId: string, fieldId: string, comment: string) => void;
  onAddRow: () => void;
}

export const ProformaTable = ({ proforma, userRole, onUpdateRow, onAddComment, onAddRow }: ProformaTableProps) => {
  const [editingRow, setEditingRow] = useState<string | null>(null);
  const [editData, setEditData] = useState<any>({});
  const [commentDialog, setCommentDialog] = useState<{ open: boolean; rowId: string; fieldId: string }>({
    open: false,
    rowId: '',
    fieldId: ''
  });
  const [newComment, setNewComment] = useState('');
  const { toast } = useToast();

  const canEdit = userRole === 'SSE' || userRole === 'BO' || (userRole === 'Concern Staff' && proforma.status !== 'submitted');
  const canAddRows = userRole === 'Concern Staff' || userRole === 'SSE' || userRole === 'BO';

  const handleEditRow = (row: ProformaRow) => {
    setEditingRow(row.id);
    setEditData(row.data);
  };

  const handleSaveRow = (rowId: string) => {
    onUpdateRow(rowId, editData);
    setEditingRow(null);
    setEditData({});
    toast({
      title: "Row Updated",
      description: "Row data has been successfully updated.",
    });
  };

  const handleCancelEdit = () => {
    setEditingRow(null);
    setEditData({});
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      onAddComment(commentDialog.rowId, commentDialog.fieldId, newComment);
      setNewComment('');
      setCommentDialog({ open: false, rowId: '', fieldId: '' });
      toast({
        title: "Comment Added",
        description: "Your comment has been added successfully.",
      });
    }
  };

  const getRowStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'submitted': return 'bg-blue-100 text-blue-800';
      case 'reviewed': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getFieldComments = (rowId: string, fieldId: string) => {
    const row = proforma.rows.find(r => r.id === rowId);
    return row?.comments.filter(c => c.fieldId === fieldId) || [];
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Proforma Data</h3>
        {canAddRows && (
          <Button onClick={onAddRow} size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Row
          </Button>
        )}
      </div>

      <div className="border rounded-lg overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">#</TableHead>
              {proforma.fields.map((field) => (
                <TableHead key={field.id}>{field.name}</TableHead>
              ))}
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {proforma.rows.map((row, index) => (
              <TableRow key={row.id}>
                <TableCell>{index + 1}</TableCell>
                {proforma.fields.map((field) => {
                  const comments = getFieldComments(row.id, field.id);
                  const isEditing = editingRow === row.id;
                  
                  return (
                    <TableCell key={field.id} className="relative">
                      <div className="flex items-center gap-2">
                        {isEditing ? (
                          <Input
                            value={editData[field.id] || ''}
                            onChange={(e) => setEditData({...editData, [field.id]: e.target.value})}
                            className="w-full"
                          />
                        ) : (
                          <span>{row.data[field.id] || '-'}</span>
                        )}
                        
                        {comments.length > 0 && (
                          <div className="flex items-center gap-1">
                            <MessageCircle className="h-4 w-4 text-blue-500" />
                            <span className="text-xs text-blue-500">{comments.length}</span>
                          </div>
                        )}
                        
                        {(userRole === 'SSE' || userRole === 'BO') && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setCommentDialog({ open: true, rowId: row.id, fieldId: field.id })}
                          >
                            <MessageCircle className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                      
                      {comments.length > 0 && (
                        <div className="mt-1 space-y-1">
                          {comments.map((comment) => (
                            <div key={comment.id} className="text-xs bg-yellow-50 p-2 rounded border-l-2 border-yellow-400">
                              <div className="font-medium">{comment.author}</div>
                              <div>{comment.comment}</div>
                              <div className="text-gray-500">{comment.createdAt}</div>
                            </div>
                          ))}
                        </div>
                      )}
                    </TableCell>
                  );
                })}
                <TableCell>
                  <Badge className={getRowStatusColor(row.status)}>
                    {row.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    {isEditing ? (
                      <>
                        <Button size="sm" onClick={() => handleSaveRow(row.id)}>
                          <Save className="h-3 w-3" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={handleCancelEdit}>
                          <X className="h-3 w-3" />
                        </Button>
                      </>
                    ) : (
                      canEdit && (
                        <Button variant="ghost" size="sm" onClick={() => handleEditRow(row)}>
                          <Edit className="h-3 w-3" />
                        </Button>
                      )
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={commentDialog.open} onOpenChange={(open) => setCommentDialog({...commentDialog, open})}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Comment</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Comment</Label>
              <Textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Enter your comment..."
                rows={4}
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setCommentDialog({ open: false, rowId: '', fieldId: '' })}>
                Cancel
              </Button>
              <Button onClick={handleAddComment}>
                Add Comment
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
