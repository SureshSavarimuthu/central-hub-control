export type UserRole = 'CENTRALHUB_ADMIN' | 'KITCHEN_MANAGER' | 'WAREHOUSE_MANAGER' | 'KITCHEN_STAFF' | 'WAREHOUSE_STAFF';
export type HubType = 'Kitchen' | 'Warehouse';
export type HubStatus = 'Operational' | 'Under Maintenance' | 'Closed';
export type OrderStatus = 'Pending' | 'Confirmed' | 'In Production' | 'Ready for Dispatch' | 'Out for Delivery' | 'Delivered' | 'Cancelled' | 'On Hold';
export type Availability = 'INSTOCK' | 'OUTOFSTOCK' | 'PREORDER' | 'DISCONTINUED';
export type Dietary = 'Veg' | 'Non-Veg' | 'Vegan' | 'Jain';
export type Visibility = 'FRANCHISE' | 'PUBLIC' | 'INTERNAL' | 'HIDDEN';
export type TransferStatus = 'Requested' | 'Approved' | 'In Transit' | 'Received' | 'Rejected';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  hubId: string;
  accessKey: string;
  status: boolean;
  lastLogin: string;
  avatar?: string;
}

export interface Hub {
  id: string;
  code: string;
  name: string;
  type: HubType;
  address: string;
  city: string;
  pinCode: string;
  capacity: number;
  operatingHours: string;
  status: HubStatus;
  managerId: string;
  utilisation: number;
  teamCount: number;
  contact: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  gst: number;
  min: number;
  max: number;
  unit: string;
  availability: Availability;
  dietary: Dietary;
  visibility: Visibility;
  imageName: string;
  isNewArrival: boolean;
  newArrivalStartDate?: string;
  newArrivalEndDate?: string;
  stock: number;
  lowStockThreshold: number;
  weight: number;
  locationId: string;
  status: boolean;
  lastUpdated: string;
  sku: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  displayOrder: number;
  productCount: number;
  visible: boolean;
}

export interface Order {
  id: string;
  franchiseName: string;
  franchiseLocation: string;
  totalValue: number;
  gstTotal: number;
  status: OrderStatus;
  placedAt: string;
  subOrders: SubOrder[];
  notes: string[];
}

export interface SubOrder {
  id: string;
  parentOrderId: string;
  hubId: string;
  hubCode: string;
  hubName: string;
  status: OrderStatus;
  items: OrderItem[];
  assignedAt: string;
  updatedAt: string;
  deliveryDeadline: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  gst: number;
}

export interface StockTransfer {
  id: string;
  sourceHubId: string;
  sourceHubName: string;
  destHubId: string;
  destHubName: string;
  items: { productName: string; quantity: number; unit: string }[];
  reason: string;
  status: TransferStatus;
  requestedBy: string;
  requestedAt: string;
  notes: string;
}

export interface Notification {
  id: string;
  type: 'Orders' | 'Stock' | 'System' | 'Transfers';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  link: string;
}

export interface Batch {
  id: string;
  productName: string;
  batchSize: number;
  startTime: string;
  expectedCompletion: string;
  progress: number;
  status: 'In Progress' | 'Ready' | 'Paused' | 'Failed';
  plannedYield: number;
  actualYield: number;
}

export interface ProcurementOrder {
  id: string;
  poNumber: string;
  vendorName: string;
  material: string;
  quantity: number;
  unitPrice: number;
  expectedDelivery: string;
  status: 'Draft' | 'Submitted' | 'Confirmed' | 'Received' | 'Cancelled';
}
