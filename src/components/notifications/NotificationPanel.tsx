
import { X, Clock, AlertCircle, CheckCircle, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationPanel = ({ isOpen, onClose }: NotificationPanelProps) => {
  const notifications = [
    {
      id: 1,
      type: "deadline",
      title: "Proforma Deadline Approaching",
      message: "Water Quality Assessment (WQ-001) is due in 2 days",
      time: "2 hours ago",
      priority: "high"
    },
    {
      id: 2,
      type: "assignment",
      title: "New Proforma Assigned",
      message: "Air Quality Monitoring (AQ-045) has been assigned to you",
      time: "4 hours ago",
      priority: "medium"
    },
    {
      id: 3,
      type: "iso",
      title: "ISO Certificate Renewal",
      message: "ISO 14001:2015 certificate expires in 30 days",
      time: "1 day ago",
      priority: "high"
    },
    {
      id: 4,
      type: "completed",
      title: "Proforma Submitted",
      message: "Waste Management Report (WM-023) has been submitted for review",
      time: "2 days ago",
      priority: "low"
    }
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case "deadline": return <Clock className="h-4 w-4 text-orange-500" />;
      case "assignment": return <AlertCircle className="h-4 w-4 text-blue-500" />;
      case "iso": return <Calendar className="h-4 w-4 text-red-500" />;
      case "completed": return <CheckCircle className="h-4 w-4 text-green-500" />;
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

  if (!isOpen) return null;

  return (
    <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-2xl border-l border-gray-200 z-50">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <ScrollArea className="h-full pb-20">
        <div className="p-4 space-y-4">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <div className="flex items-start gap-3">
                {getIcon(notification.type)}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-medium text-gray-900 text-sm truncate">
                      {notification.title}
                    </h3>
                    <Badge className={getPriorityColor(notification.priority)}>
                      {notification.priority}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    {notification.message}
                  </p>
                  <p className="text-xs text-gray-400">{notification.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};
