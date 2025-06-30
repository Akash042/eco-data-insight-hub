
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  BarChart3, 
  FileText, 
  Users, 
  Settings, 
  Award,
  Bell,
  ChevronLeft,
  Home,
  PieChart,
  Calendar,
  Download
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const Sidebar = ({ isOpen, onToggle }: SidebarProps) => {
  const [userRole] = useState<string>("SSE"); // This would come from auth context

  const menuItems = [
    { icon: Home, label: "Dashboard", path: "/", roles: ["SSE", "BO", "WPO", "Concern Staff"] },
    { icon: FileText, label: "Proformas", path: "/proformas", roles: ["SSE", "BO", "Concern Staff"] },
    { icon: BarChart3, label: "Reports", path: "/reports", roles: ["SSE", "BO", "WPO"] },
    { icon: PieChart, label: "Analytics", path: "/analytics", roles: ["SSE", "BO", "WPO"] },
    { icon: Award, label: "ISO Management", path: "/iso", roles: ["SSE", "BO", "WPO"] },
    { icon: Users, label: "User Management", path: "/users", roles: ["SSE", "BO"] },
    { icon: Bell, label: "Notifications", path: "/notifications", roles: ["SSE", "BO", "WPO", "Concern Staff"] },
    { icon: Download, label: "Exports", path: "/exports", roles: ["SSE", "BO", "WPO"] },
    { icon: Settings, label: "Settings", path: "/settings", roles: ["SSE", "BO", "WPO"] },
  ];

  const filteredMenuItems = menuItems.filter(item => item.roles.includes(userRole));

  return (
    <div className={cn(
      "bg-white shadow-xl border-r border-gray-200 transition-all duration-300 flex flex-col",
      isOpen ? "w-64" : "w-16"
    )}>
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {isOpen && (
            <div>
              <h1 className="text-xl font-bold text-gray-900">EcoMonitor</h1>
              <p className="text-sm text-gray-500">Environment System</p>
            </div>
          )}
          <button
            onClick={onToggle}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <ChevronLeft className={cn("h-5 w-5 transition-transform", !isOpen && "rotate-180")} />
          </button>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {filteredMenuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 group",
                isActive
                  ? "bg-blue-50 text-blue-600 shadow-sm"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              )
            }
          >
            <item.icon className="h-5 w-5" />
            {isOpen && (
              <span className="font-medium">{item.label}</span>
            )}
          </NavLink>
        ))}
      </nav>

      {isOpen && (
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">JD</span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">John Doe</p>
              <p className="text-xs text-gray-500">{userRole}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
