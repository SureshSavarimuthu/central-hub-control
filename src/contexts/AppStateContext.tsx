import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Batch, StockTransfer, Notification, ProcurementOrder, TransferStatus } from '@/types';
import { dummyBatches, dummyTransfers, dummyNotifications, dummyProcurements, dummyOrders, dummyProducts } from '@/data/dummy';
import { toast } from 'sonner';

interface RawMaterial {
  id: string;
  name: string;
  current: number;
  min: number;
  unit: string;
  consumption: number;
}

interface RestockRequest {
  id: string;
  materialName: string;
  quantity: number;
  unit: string;
  status: 'Pending' | 'Approved' | 'Delivered' | 'Rejected';
  requestedAt: string;
  notes: string;
}

interface Shipment {
  id: string;
  destination: string;
  vehicle: string;
  driver: string;
  departure: string;
  status: 'Loading' | 'In Transit' | 'Delivered';
  items: string[];
}

interface AlertConfig {
  productId: string;
  inApp: boolean;
  email: boolean;
  sms: boolean;
  snoozedUntil: string | null;
}

interface InventoryProduct {
  id: string;
  name: string;
  sku: string;
  rack: string;
  stock: number;
  unit: string;
  expiry: string;
  lowStockThreshold: number;
  locationId: string;
  category: string;
  price: number;
  supplierId?: string;
}

export interface Supplier {
  id: string;
  name: string;
  contact: string;
  email: string;
  itemsSupplied: string[];
  notes: string;
}

export interface ProductMapping {
  id: string;
  productId: string;
  productName: string;
  ingredients: { inventoryId: string; inventoryName: string; quantity: number; unit: string }[];
}

export interface StockMovement {
  id: string;
  inventoryId: string;
  inventoryName: string;
  type: 'in' | 'out' | 'adjust';
  quantity: number;
  reason: string;
  supplierId?: string;
  supplierName?: string;
  date: string;
  user: string;
}

interface SubOrderState {
  id: string;
  parentOrderId: string;
  hubId: string;
  hubCode: string;
  hubName: string;
  status: string;
  items: { productId: string; productName: string; quantity: number; unit: string; unitPrice: number; gst: number }[];
  assignedAt: string;
  updatedAt: string;
  deliveryDeadline: string;
}

interface AppStateContextType {
  // Batches
  batches: Batch[];
  updateBatchStatus: (id: string, status: Batch['status'], actualYield?: number) => void;
  addBatch: (batch: Omit<Batch, 'id'>) => void;

  // Sub-orders (kitchen/warehouse)
  subOrders: SubOrderState[];
  updateSubOrderStatus: (id: string, status: string) => void;

  // Transfers
  transfers: StockTransfer[];
  addTransfer: (transfer: Omit<StockTransfer, 'id'>) => void;
  updateTransferStatus: (id: string, status: TransferStatus) => void;

  // Notifications
  notifications: Notification[];
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  toggleNotificationRead: (id: string) => void;
  unreadCount: number;

  // Raw Materials
  rawMaterials: RawMaterial[];
  updateRawMaterial: (id: string, updates: Partial<RawMaterial>) => void;
  addRawMaterial: (m: Omit<RawMaterial, 'id'>) => void;
  deleteRawMaterial: (id: string) => void;
  restockRequests: RestockRequest[];
  addRestockRequest: (req: Omit<RestockRequest, 'id' | 'requestedAt' | 'status'>) => void;
  updateRestockStatus: (id: string, status: RestockRequest['status']) => void;

  // Procurement
  procurements: ProcurementOrder[];
  addProcurement: (po: Omit<ProcurementOrder, 'id'>) => void;
  updateProcurementStatus: (id: string, status: ProcurementOrder['status']) => void;
  deleteProcurement: (id: string) => void;

  // Inventory
  inventory: InventoryProduct[];
  adjustStock: (id: string, delta: number) => void;
  importInventoryCSV: (data: InventoryProduct[]) => void;
  addInventoryItem: (item: Omit<InventoryProduct, 'id'>) => void;
  updateInventoryItem: (id: string, updates: Partial<InventoryProduct>) => void;
  deleteInventoryItem: (id: string) => void;

  // Suppliers
  suppliers: Supplier[];
  addSupplier: (s: Omit<Supplier, 'id'>) => void;
  updateSupplier: (id: string, updates: Partial<Supplier>) => void;
  deleteSupplier: (id: string) => void;

  // Product mappings
  productMappings: ProductMapping[];
  saveProductMapping: (productId: string, productName: string, ingredients: ProductMapping['ingredients']) => void;
  deleteProductMapping: (id: string) => void;

  // Stock movements
  stockMovements: StockMovement[];
  recordStockMovement: (m: Omit<StockMovement, 'id' | 'date'>) => void;

  // Shipments
  shipments: Shipment[];
  updateShipmentStatus: (id: string, status: Shipment['status']) => void;
  addShipment: (s: Omit<Shipment, 'id'>) => void;

  // Alert configs
  alertConfigs: AlertConfig[];
  updateAlertConfig: (productId: string, updates: Partial<AlertConfig>) => void;
  snoozeAlert: (productId: string, hours: number) => void;
  lowStockAlertCount: number;

  // Profile
  userProfile: { name: string; email: string; phone: string; password: string };
  updateProfile: (updates: Partial<{ name: string; email: string; phone: string }>) => void;
  updatePassword: (current: string, newPw: string) => boolean;

  // Settings
  settings: Record<string, any>;
  updateSettings: (updates: Record<string, any>) => void;
}

const AppStateContext = createContext<AppStateContextType | null>(null);

export const useAppState = () => {
  const ctx = useContext(AppStateContext);
  if (!ctx) throw new Error('useAppState must be inside AppStateProvider');
  return ctx;
};

function loadState<T>(key: string, fallback: T): T {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch { return fallback; }
}

function saveState(key: string, value: any) {
  localStorage.setItem(key, JSON.stringify(value));
}

const initialRawMaterials: RawMaterial[] = [
  { id: 'rm1', name: 'All-purpose Flour', current: 45, min: 30, unit: 'kg', consumption: 12 },
  { id: 'rm2', name: 'Butter', current: 8, min: 15, unit: 'kg', consumption: 6 },
  { id: 'rm3', name: 'Sugar', current: 22, min: 10, unit: 'kg', consumption: 4 },
  { id: 'rm4', name: 'Milk', current: 15, min: 20, unit: 'litres', consumption: 8 },
  { id: 'rm5', name: 'Yeast', current: 3, min: 2, unit: 'kg', consumption: 0.5 },
  { id: 'rm6', name: 'Eggs', current: 120, min: 60, unit: 'pieces', consumption: 30 },
];

const initialShipments: Shipment[] = [
  { id: 'SHP-001', destination: 'Thatha Anna Nagar', vehicle: 'TN 01 AB 1234', driver: 'Ravi Kumar', departure: '10:30 AM', status: 'In Transit', items: ['Butter Croissant ×20', 'Almond Danish ×10'] },
  { id: 'SHP-002', destination: 'Thatha Adyar', vehicle: 'TN 01 CD 5678', driver: 'Ganesh M', departure: '11:00 AM', status: 'Loading', items: ['Whole Wheat Flour ×5 kg', 'Milk Packs ×12'] },
  { id: 'SHP-003', destination: 'North Chennai Kitchen', vehicle: 'TN 01 EF 9012', driver: 'Suresh P', departure: '09:00 AM', status: 'Delivered', items: ['Sugar ×20 kg'] },
];

const initialInventory: InventoryProduct[] = dummyProducts.filter(p => p.locationId === 'h3').map(p => ({
  id: p.id, name: p.name, sku: p.sku, rack: 'A1-R03', stock: p.stock, unit: p.unit,
  expiry: '2024-04-15', lowStockThreshold: p.lowStockThreshold, locationId: p.locationId,
  category: p.category, price: p.price
}));

const initialAlertConfigs: AlertConfig[] = dummyProducts.filter(p => p.locationId === 'h3').map(p => ({
  productId: p.id, inApp: true, email: true, sms: false, snoozedUntil: null
}));

const initialSuppliers: Supplier[] = [
  { id: 's1', name: 'Sri Lakshmi Flour Mills', contact: '+91 98400 11122', email: 'orders@srilakshmiflour.in', itemsSupplied: ['Whole Wheat Flour', 'Maida Flour'], notes: 'Preferred vendor for flour' },
  { id: 's2', name: 'Aavin Dairy', contact: '+91 98400 22334', email: 'b2b@aavin.tn.gov.in', itemsSupplied: ['Milk Packs', 'Butter'], notes: 'Daily morning delivery' },
  { id: 's3', name: 'Sweet Gold Sugar Co', contact: '+91 98400 33445', email: 'sales@sweetgold.in', itemsSupplied: ['Sugar (Refined)'], notes: '' },
  { id: 's4', name: 'Spice Garden Traders', contact: '+91 98400 44556', email: 'hello@spicegarden.in', itemsSupplied: ['Tea Powder', 'Cardamom'], notes: 'Bulk monthly orders' },
];

const initialProductMappings: ProductMapping[] = [];
const initialStockMovements: StockMovement[] = [];

export const AppStateProvider = ({ children }: { children: ReactNode }) => {
  const [batches, setBatches] = useState<Batch[]>(() => loadState('batches', dummyBatches));
  const [subOrders, setSubOrders] = useState<SubOrderState[]>(() => loadState('subOrders', dummyOrders.flatMap(o => o.subOrders)));
  const [transfers, setTransfers] = useState<StockTransfer[]>(() => loadState('transfers', dummyTransfers));
  const [notifications, setNotifications] = useState<Notification[]>(() => loadState('notifications', dummyNotifications));
  const [rawMaterials, setRawMaterials] = useState<RawMaterial[]>(() => loadState('rawMaterials', initialRawMaterials));
  const [restockRequests, setRestockRequests] = useState<RestockRequest[]>(() => loadState('restockRequests', []));
  const [procurements, setProcurements] = useState<ProcurementOrder[]>(() => loadState('procurements', dummyProcurements));
  const [inventory, setInventory] = useState<InventoryProduct[]>(() => loadState('inventory', initialInventory));
  const [shipments, setShipments] = useState<Shipment[]>(() => loadState('shipments', initialShipments));
  const [alertConfigs, setAlertConfigs] = useState<AlertConfig[]>(() => loadState('alertConfigs', initialAlertConfigs));
  const [userProfile, setUserProfile] = useState(() => loadState('userProfile', { name: '', email: '', phone: '', password: 'password' }));
  const [settings, setSettings] = useState(() => loadState('settings', { businessName: 'Thatha CentralHub', contactEmail: 'admin@thatha.com', defaultGst: 5, orderPrefix: 'ORD-2024-', emailNotif: true, smsNotif: false, lowStockDefault: 10 }));
  const [suppliers, setSuppliers] = useState<Supplier[]>(() => loadState('suppliers', initialSuppliers));
  const [productMappings, setProductMappings] = useState<ProductMapping[]>(() => loadState('productMappings', initialProductMappings));
  const [stockMovements, setStockMovements] = useState<StockMovement[]>(() => loadState('stockMovements', initialStockMovements));

  // Persist all state
  useEffect(() => { saveState('batches', batches); }, [batches]);
  useEffect(() => { saveState('subOrders', subOrders); }, [subOrders]);
  useEffect(() => { saveState('transfers', transfers); }, [transfers]);
  useEffect(() => { saveState('notifications', notifications); }, [notifications]);
  useEffect(() => { saveState('rawMaterials', rawMaterials); }, [rawMaterials]);
  useEffect(() => { saveState('restockRequests', restockRequests); }, [restockRequests]);
  useEffect(() => { saveState('procurements', procurements); }, [procurements]);
  useEffect(() => { saveState('inventory', inventory); }, [inventory]);
  useEffect(() => { saveState('shipments', shipments); }, [shipments]);
  useEffect(() => { saveState('alertConfigs', alertConfigs); }, [alertConfigs]);
  useEffect(() => { saveState('userProfile', userProfile); }, [userProfile]);
  useEffect(() => { saveState('settings', settings); }, [settings]);
  useEffect(() => { saveState('suppliers', suppliers); }, [suppliers]);
  useEffect(() => { saveState('productMappings', productMappings); }, [productMappings]);
  useEffect(() => { saveState('stockMovements', stockMovements); }, [stockMovements]);

  // Batches
  const updateBatchStatus = (id: string, status: Batch['status'], actualYield?: number) => {
    setBatches(prev => prev.map(b => b.id === id ? { ...b, status, progress: status === 'Ready' ? 100 : status === 'Failed' ? b.progress : b.progress, actualYield: actualYield ?? b.actualYield } : b));
    toast.success(`Batch ${id} marked as ${status}`);
  };
  const addBatch = (batch: Omit<Batch, 'id'>) => {
    const id = `B-${String(batches.length + 1).padStart(3, '0')}`;
    setBatches(prev => [...prev, { ...batch, id }]);
    toast.success(`Batch ${id} created`);
  };

  // Sub-orders
  const updateSubOrderStatus = (id: string, status: string) => {
    const subOrder = subOrders.find(s => s.id === id);
    setSubOrders(prev => prev.map(s => s.id === id ? { ...s, status, updatedAt: new Date().toISOString() } : s));
    toast.success(`Order ${id} updated to ${status}`);

    // Auto-deduct inventory on dispatch (warehouse only)
    if (status === 'Out for Delivery' && subOrder && subOrder.hubId === 'h3') {
      const deductions: { name: string; qty: number; unit: string }[] = [];
      const movementsToRecord: Omit<StockMovement, 'id' | 'date'>[] = [];
      const inventoryDeltas: Record<string, number> = {};

      subOrder.items.forEach(item => {
        const mapping = productMappings.find(m => m.productId === item.productId);
        if (!mapping) return;
        mapping.ingredients.forEach(ing => {
          const totalQty = ing.quantity * item.quantity;
          inventoryDeltas[ing.inventoryId] = (inventoryDeltas[ing.inventoryId] || 0) + totalQty;
          deductions.push({ name: ing.inventoryName, qty: totalQty, unit: ing.unit });
          movementsToRecord.push({
            inventoryId: ing.inventoryId,
            inventoryName: ing.inventoryName,
            type: 'out',
            quantity: totalQty,
            reason: `Auto-deducted for order ${id}`,
            date: undefined as any,
            user: 'System',
          } as any);
        });
      });

      if (deductions.length > 0) {
        setInventory(prev => prev.map(p =>
          inventoryDeltas[p.id] !== undefined
            ? { ...p, stock: Math.max(0, p.stock - inventoryDeltas[p.id]) }
            : p
        ));
        const now = new Date().toISOString();
        setStockMovements(prev => [
          ...movementsToRecord.map((m, idx) => ({ ...m, id: `mov-${Date.now()}-${idx}`, date: now })),
          ...prev,
        ]);
        // Aggregate toast message
        const summary = deductions.map(d => `${d.name} −${d.qty}${d.unit}`).join(', ');
        toast.success(`Inventory auto-deducted: ${summary}`, { duration: 6000 });
      }
    }
  };

  // Transfers
  const addTransfer = (transfer: Omit<StockTransfer, 'id'>) => {
    const id = `ST-${String(transfers.length + 1).padStart(3, '0')}`;
    setTransfers(prev => [...prev, { ...transfer, id }]);
    toast.success(`Transfer ${id} created`);
  };
  const updateTransferStatus = (id: string, status: TransferStatus) => {
    setTransfers(prev => prev.map(t => t.id === id ? { ...t, status } : t));
    toast.success(`Transfer ${id} updated to ${status}`);
  };

  // Notifications
  const markNotificationRead = (id: string) => setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    toast.success('All notifications marked as read');
  };
  const toggleNotificationRead = (id: string) => setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: !n.read } : n));
  const unreadCount = notifications.filter(n => !n.read).length;

  // Raw Materials
  const updateRawMaterial = (id: string, updates: Partial<RawMaterial>) => {
    setRawMaterials(prev => prev.map(m => m.id === id ? { ...m, ...updates } : m));
    toast.success('Material updated');
  };
  const addRawMaterial = (m: Omit<RawMaterial, 'id'>) => {
    const id = `rm${rawMaterials.length + 1}`;
    setRawMaterials(prev => [...prev, { ...m, id }]);
    toast.success('Material added');
  };
  const deleteRawMaterial = (id: string) => {
    setRawMaterials(prev => prev.filter(m => m.id !== id));
    toast.success('Material removed');
  };
  const addRestockRequest = (req: Omit<RestockRequest, 'id' | 'requestedAt' | 'status'>) => {
    const id = `RR-${String(restockRequests.length + 1).padStart(3, '0')}`;
    setRestockRequests(prev => [...prev, { ...req, id, requestedAt: new Date().toISOString(), status: 'Pending' }]);
    toast.success(`Restock request ${id} submitted`);
  };
  const updateRestockStatus = (id: string, status: RestockRequest['status']) => {
    setRestockRequests(prev => prev.map(r => r.id === id ? { ...r, status } : r));
    toast.success(`Restock ${id} updated to ${status}`);
  };

  // Procurement
  const addProcurement = (po: Omit<ProcurementOrder, 'id'>) => {
    const id = `po${procurements.length + 1}`;
    setProcurements(prev => [...prev, { ...po, id }]);
    toast.success(`PO ${po.poNumber} created`);
  };
  const updateProcurementStatus = (id: string, status: ProcurementOrder['status']) => {
    setProcurements(prev => prev.map(p => p.id === id ? { ...p, status } : p));
    toast.success('Procurement order updated');
  };
  const deleteProcurement = (id: string) => {
    setProcurements(prev => prev.filter(p => p.id !== id));
    toast.success('Procurement order deleted');
  };

  // Inventory
  const adjustStock = (id: string, delta: number) => {
    setInventory(prev => prev.map(p => p.id === id ? { ...p, stock: Math.max(0, p.stock + delta) } : p));
    toast.success(`Stock adjusted by ${delta > 0 ? '+' : ''}${delta}`);
  };
  const importInventoryCSV = (data: InventoryProduct[]) => {
    setInventory(data);
    toast.success(`Imported ${data.length} items`);
  };
  const addInventoryItem = (item: Omit<InventoryProduct, 'id'>) => {
    const id = `inv-${Date.now()}`;
    setInventory(prev => [...prev, { ...item, id }]);
    toast.success(`${item.name} added to inventory`);
  };
  const updateInventoryItem = (id: string, updates: Partial<InventoryProduct>) => {
    setInventory(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
    toast.success('Inventory item updated');
  };
  const deleteInventoryItem = (id: string) => {
    setInventory(prev => prev.filter(p => p.id !== id));
    toast.success('Inventory item removed');
  };

  // Suppliers
  const addSupplier = (s: Omit<Supplier, 'id'>) => {
    const id = `s-${Date.now()}`;
    setSuppliers(prev => [...prev, { ...s, id }]);
    toast.success(`Supplier ${s.name} added`);
  };
  const updateSupplier = (id: string, updates: Partial<Supplier>) => {
    setSuppliers(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s));
    toast.success('Supplier updated');
  };
  const deleteSupplier = (id: string) => {
    setSuppliers(prev => prev.filter(s => s.id !== id));
    toast.success('Supplier removed');
  };

  // Product mappings
  const saveProductMapping = (productId: string, productName: string, ingredients: ProductMapping['ingredients']) => {
    setProductMappings(prev => {
      const existing = prev.find(m => m.productId === productId);
      if (existing) {
        return prev.map(m => m.productId === productId ? { ...m, productName, ingredients } : m);
      }
      return [...prev, { id: `pm-${Date.now()}`, productId, productName, ingredients }];
    });
    toast.success('Mapping saved');
  };
  const deleteProductMapping = (id: string) => {
    setProductMappings(prev => prev.filter(m => m.id !== id));
    toast.success('Mapping removed');
  };

  // Stock movements
  const recordStockMovement = (m: Omit<StockMovement, 'id' | 'date'>) => {
    const id = `mov-${Date.now()}`;
    const date = new Date().toISOString();
    setStockMovements(prev => [{ ...m, id, date }, ...prev]);
    // Apply to inventory
    const delta = m.type === 'in' ? m.quantity : m.type === 'out' ? -m.quantity : m.quantity;
    setInventory(prev => prev.map(p => p.id === m.inventoryId ? { ...p, stock: Math.max(0, p.stock + delta) } : p));
    toast.success(`${m.type === 'in' ? 'Stock in' : m.type === 'out' ? 'Stock out' : 'Adjustment'} recorded`);
  };

  // Shipments
  const updateShipmentStatus = (id: string, status: Shipment['status']) => {
    setShipments(prev => prev.map(s => s.id === id ? { ...s, status } : s));
    toast.success(`Shipment ${id} updated to ${status}`);
  };
  const addShipment = (s: Omit<Shipment, 'id'>) => {
    const id = `SHP-${String(shipments.length + 1).padStart(3, '0')}`;
    setShipments(prev => [...prev, { ...s, id }]);
    toast.success(`Shipment ${id} created`);
  };

  // Alert configs
  const updateAlertConfig = (productId: string, updates: Partial<AlertConfig>) => {
    setAlertConfigs(prev => prev.map(a => a.productId === productId ? { ...a, ...updates } : a));
  };
  const snoozeAlert = (productId: string, hours: number) => {
    const until = new Date(Date.now() + hours * 3600000).toISOString();
    setAlertConfigs(prev => prev.map(a => a.productId === productId ? { ...a, snoozedUntil: until } : a));
    toast.success(`Alert snoozed for ${hours} hours`);
  };
  const lowStockAlertCount = inventory.filter(p => {
    const config = alertConfigs.find(a => a.productId === p.id);
    if (config?.snoozedUntil && new Date(config.snoozedUntil) > new Date()) return false;
    return p.stock <= p.lowStockThreshold;
  }).length;

  // Profile
  const updateProfile = (updates: Partial<{ name: string; email: string; phone: string }>) => {
    setUserProfile(prev => ({ ...prev, ...updates }));
    toast.success('Profile updated');
  };
  const updatePassword = (current: string, newPw: string) => {
    if (current !== userProfile.password) { toast.error('Current password is incorrect'); return false; }
    setUserProfile(prev => ({ ...prev, password: newPw }));
    toast.success('Password updated');
    return true;
  };

  // Settings
  const updateSettingsFn = (updates: Record<string, any>) => {
    setSettings((prev: any) => ({ ...prev, ...updates }));
    toast.success('Settings saved');
  };

  return (
    <AppStateContext.Provider value={{
      batches, updateBatchStatus, addBatch,
      subOrders, updateSubOrderStatus,
      transfers, addTransfer, updateTransferStatus,
      notifications, markNotificationRead, markAllNotificationsRead, toggleNotificationRead, unreadCount,
      rawMaterials, updateRawMaterial, addRawMaterial, deleteRawMaterial, restockRequests, addRestockRequest, updateRestockStatus,
      procurements, addProcurement, updateProcurementStatus, deleteProcurement,
      inventory, adjustStock, importInventoryCSV, addInventoryItem, updateInventoryItem, deleteInventoryItem,
      suppliers, addSupplier, updateSupplier, deleteSupplier,
      productMappings, saveProductMapping, deleteProductMapping,
      stockMovements, recordStockMovement,
      shipments, updateShipmentStatus, addShipment,
      alertConfigs, updateAlertConfig, snoozeAlert, lowStockAlertCount,
      userProfile, updateProfile, updatePassword,
      settings, updateSettings: updateSettingsFn,
    }}>
      {children}
    </AppStateContext.Provider>
  );
};
