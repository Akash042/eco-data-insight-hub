
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DashboardLayout } from "./components/layout/DashboardLayout";
import { Dashboard } from "./pages/Dashboard";
import { Proformas } from "./pages/Proformas";
import { Reports } from "./pages/Reports";
import { Analytics } from "./pages/Analytics";
import { UserManagement } from "./pages/UserManagement";
import { ISOManagement } from "./pages/ISOManagement";
import { Notifications } from "./pages/Notifications";
import { Exports } from "./pages/Exports";
import { SettingsPage } from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <DashboardLayout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/proformas" element={<Proformas />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/users" element={<UserManagement />} />
            <Route path="/iso" element={<ISOManagement />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/exports" element={<Exports />} />
            <Route path="/settings" element={<SettingsPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </DashboardLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
