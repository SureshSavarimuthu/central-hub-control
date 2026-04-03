import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AppStateProvider } from "@/contexts/AppStateContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";

import LoginPage from "./pages/auth/LoginPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import AccessKeyPage from "./pages/auth/AccessKeyPage";
import UnauthorizedPage from "./pages/auth/UnauthorizedPage";
import KitchenDashboard from "./pages/kitchen/KitchenDashboard";
import KitchenOrders from "./pages/kitchen/KitchenOrders";
import KitchenProduction from "./pages/kitchen/KitchenProduction";
import KitchenRawMaterials from "./pages/kitchen/KitchenRawMaterials";
import WarehouseDashboard from "./pages/warehouse/WarehouseDashboard";
import WarehouseOrders from "./pages/warehouse/WarehouseOrders";
import WarehouseInventory from "./pages/warehouse/WarehouseInventory";
import WarehouseRackManagement from "./pages/warehouse/WarehouseRackManagement";
import WarehouseProcurement from "./pages/warehouse/WarehouseProcurement";
import WarehouseDistribution from "./pages/warehouse/WarehouseDistribution";
import WarehouseLowStockAlerts from "./pages/warehouse/WarehouseLowStockAlerts";
import StockTransferList from "./pages/transfers/StockTransferList";
import StockTransferDetail from "./pages/transfers/StockTransferDetail";
import NotificationsPage from "./pages/NotificationsPage";
import SettingsPage from "./pages/settings/SettingsPage";
import ProfilePage from "./pages/ProfilePage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const kitchenRoles = ['KITCHEN_MANAGER', 'KITCHEN_STAFF'] as const;
const warehouseRoles = ['WAREHOUSE_MANAGER', 'WAREHOUSE_STAFF'] as const;
const allRoles = [...kitchenRoles, ...warehouseRoles] as const;

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AuthProvider>
          <AppStateProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Navigate to="/auth/login" replace />} />
                <Route path="/auth/login" element={<LoginPage />} />
                <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="/auth/access-key" element={<AccessKeyPage />} />
                <Route path="/auth/unauthorized" element={<UnauthorizedPage />} />

                <Route path="/kitchen/dashboard" element={<ProtectedRoute allowedRoles={[...kitchenRoles]}><KitchenDashboard /></ProtectedRoute>} />
                <Route path="/kitchen/orders" element={<ProtectedRoute allowedRoles={[...kitchenRoles]}><KitchenOrders /></ProtectedRoute>} />
                <Route path="/kitchen/production" element={<ProtectedRoute allowedRoles={[...kitchenRoles]}><KitchenProduction /></ProtectedRoute>} />
                <Route path="/kitchen/raw-materials" element={<ProtectedRoute allowedRoles={[...kitchenRoles]}><KitchenRawMaterials /></ProtectedRoute>} />

                <Route path="/warehouse/dashboard" element={<ProtectedRoute allowedRoles={[...warehouseRoles]}><WarehouseDashboard /></ProtectedRoute>} />
                <Route path="/warehouse/orders" element={<ProtectedRoute allowedRoles={[...warehouseRoles]}><WarehouseOrders /></ProtectedRoute>} />
                <Route path="/warehouse/inventory" element={<ProtectedRoute allowedRoles={[...warehouseRoles]}><WarehouseInventory /></ProtectedRoute>} />
                <Route path="/warehouse/rack-management" element={<ProtectedRoute allowedRoles={[...warehouseRoles]}><WarehouseRackManagement /></ProtectedRoute>} />
                <Route path="/warehouse/procurement" element={<ProtectedRoute allowedRoles={[...warehouseRoles]}><WarehouseProcurement /></ProtectedRoute>} />
                <Route path="/warehouse/distribution" element={<ProtectedRoute allowedRoles={[...warehouseRoles]}><WarehouseDistribution /></ProtectedRoute>} />
                <Route path="/warehouse/low-stock-alerts" element={<ProtectedRoute allowedRoles={[...warehouseRoles]}><WarehouseLowStockAlerts /></ProtectedRoute>} />

                <Route path="/stock-transfer" element={<ProtectedRoute allowedRoles={[...allRoles]}><StockTransferList /></ProtectedRoute>} />
                <Route path="/stock-transfer/:id" element={<ProtectedRoute allowedRoles={[...allRoles]}><StockTransferDetail /></ProtectedRoute>} />
                <Route path="/notifications" element={<ProtectedRoute allowedRoles={[...allRoles]}><NotificationsPage /></ProtectedRoute>} />
                <Route path="/settings/general" element={<ProtectedRoute allowedRoles={[...allRoles]}><SettingsPage /></ProtectedRoute>} />
                <Route path="/profile" element={<ProtectedRoute allowedRoles={[...allRoles]}><ProfilePage /></ProtectedRoute>} />

                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </AppStateProvider>
        </AuthProvider>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
