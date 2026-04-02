import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";

import LoginPage from "./pages/auth/LoginPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import AccessKeyPage from "./pages/auth/AccessKeyPage";
import UnauthorizedPage from "./pages/auth/UnauthorizedPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminCategories from "./pages/admin/AdminCategories";
import AdminHubs from "./pages/admin/AdminHubs";
import HubDetailPage from "./pages/admin/HubDetailPage";
import AdminUsers from "./pages/admin/AdminUsers";
import UserDetailPage from "./pages/admin/UserDetailPage";
import KitchenDashboard from "./pages/kitchen/KitchenDashboard";
import KitchenOrders from "./pages/kitchen/KitchenOrders";
import KitchenProduction from "./pages/kitchen/KitchenProduction";
import KitchenRecipes from "./pages/kitchen/KitchenRecipes";
import KitchenFreshStock from "./pages/kitchen/KitchenFreshStock";
import KitchenRawMaterials from "./pages/kitchen/KitchenRawMaterials";
import WarehouseDashboard from "./pages/warehouse/WarehouseDashboard";
import WarehouseOrders from "./pages/warehouse/WarehouseOrders";
import WarehouseInventory from "./pages/warehouse/WarehouseInventory";
import WarehouseRackManagement from "./pages/warehouse/WarehouseRackManagement";
import WarehouseProcurement from "./pages/warehouse/WarehouseProcurement";
import WarehouseDistribution from "./pages/warehouse/WarehouseDistribution";
import WarehouseLowStockAlerts from "./pages/warehouse/WarehouseLowStockAlerts";
import OrdersPage from "./pages/orders/OrdersPage";
import OrderDetailPage from "./pages/orders/OrderDetailPage";
import StockTransferList from "./pages/transfers/StockTransferList";
import StockTransferDetail from "./pages/transfers/StockTransferDetail";
import NotificationsPage from "./pages/NotificationsPage";
import ReportsPage from "./pages/reports/ReportsPage";
import SettingsPage from "./pages/settings/SettingsPage";
import ProfilePage from "./pages/ProfilePage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="/auth/login" element={<LoginPage />} />
              <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/auth/access-key" element={<AccessKeyPage />} />
              <Route path="/auth/unauthorized" element={<UnauthorizedPage />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/products" element={<AdminProducts />} />
              <Route path="/admin/categories" element={<AdminCategories />} />
              <Route path="/admin/hubs" element={<AdminHubs />} />
              <Route path="/admin/hubs/:id" element={<HubDetailPage />} />
              <Route path="/admin/users" element={<AdminUsers />} />
              <Route path="/admin/users/:id" element={<UserDetailPage />} />
              <Route path="/kitchen/dashboard" element={<KitchenDashboard />} />
              <Route path="/kitchen/orders" element={<KitchenOrders />} />
              <Route path="/kitchen/production" element={<KitchenProduction />} />
              <Route path="/kitchen/recipes" element={<KitchenRecipes />} />
              <Route path="/kitchen/fresh-stock" element={<KitchenFreshStock />} />
              <Route path="/kitchen/raw-materials" element={<KitchenRawMaterials />} />
              <Route path="/warehouse/dashboard" element={<WarehouseDashboard />} />
              <Route path="/warehouse/orders" element={<WarehouseOrders />} />
              <Route path="/warehouse/inventory" element={<WarehouseInventory />} />
              <Route path="/warehouse/rack-management" element={<WarehouseRackManagement />} />
              <Route path="/warehouse/procurement" element={<WarehouseProcurement />} />
              <Route path="/warehouse/distribution" element={<WarehouseDistribution />} />
              <Route path="/warehouse/low-stock-alerts" element={<WarehouseLowStockAlerts />} />
              <Route path="/orders" element={<OrdersPage />} />
              <Route path="/orders/:id" element={<OrderDetailPage />} />
              <Route path="/stock-transfer" element={<StockTransferList />} />
              <Route path="/stock-transfer/:id" element={<StockTransferDetail />} />
              <Route path="/notifications" element={<NotificationsPage />} />
              <Route path="/reports/orders" element={<ReportsPage />} />
              <Route path="/settings/general" element={<SettingsPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
