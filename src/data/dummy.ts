import { User, Hub, Product, Category, Order, StockTransfer, Notification, Batch, ProcurementOrder } from '@/types';

export const dummyUsers: User[] = [
  { id: 'u1', name: 'Rajesh Kumar', email: 'rajesh@thatha.com', phone: '+91 98765 43210', role: 'CENTRALHUB_ADMIN', hubId: '', accessKey: 'ADM-9X2K-4M7P', status: true, lastLogin: '2024-03-31T08:30:00Z', avatar: '' },
  { id: 'u2', name: 'Priya Sharma', email: 'priya@thatha.com', phone: '+91 98765 43211', role: 'KITCHEN_MANAGER', hubId: 'h1', accessKey: 'KTN-3F8A-2N5R', status: true, lastLogin: '2024-03-31T07:15:00Z' },
  { id: 'u3', name: 'Vikram Patel', email: 'vikram@thatha.com', phone: '+91 98765 43212', role: 'WAREHOUSE_MANAGER', hubId: 'h3', accessKey: 'WH-7G4B-1K9S', status: true, lastLogin: '2024-03-31T06:45:00Z' },
  { id: 'u4', name: 'Anitha Rajan', email: 'anitha@thatha.com', phone: '+91 98765 43213', role: 'KITCHEN_STAFF', hubId: 'h1', accessKey: 'KTN-5H2C-8L3T', status: true, lastLogin: '2024-03-30T14:20:00Z' },
  { id: 'u5', name: 'Suresh Menon', email: 'suresh@thatha.com', phone: '+91 98765 43214', role: 'WAREHOUSE_STAFF', hubId: 'h3', accessKey: 'WH-1J6D-4M7U', status: false, lastLogin: '2024-03-28T11:00:00Z' },
  { id: 'u6', name: 'Deepa Nair', email: 'deepa@thatha.com', phone: '+91 98765 43215', role: 'KITCHEN_MANAGER', hubId: 'h2', accessKey: 'KTN-8K3E-6N1V', status: true, lastLogin: '2024-03-31T09:00:00Z' },
];

export const dummyHubs: Hub[] = [
  { id: 'h1', code: 'KTN-CH-01', name: 'North Chennai Kitchen', type: 'Kitchen', address: '42 Anna Nagar Main Road', city: 'Chennai', pinCode: '600040', capacity: 500, operatingHours: '05:00 - 22:00', status: 'Operational', managerId: 'u2', utilisation: 78, teamCount: 12, contact: '+91 44 2345 6789' },
  { id: 'h2', code: 'KTN-CH-02', name: 'South Chennai Kitchen', type: 'Kitchen', address: '18 Adyar Bridge Road', city: 'Chennai', pinCode: '600020', capacity: 350, operatingHours: '06:00 - 21:00', status: 'Operational', managerId: 'u6', utilisation: 65, teamCount: 8, contact: '+91 44 2345 6790' },
  { id: 'h3', code: 'WH-CH-01', name: 'Central Warehouse', type: 'Warehouse', address: '7 Industrial Estate, Ambattur', city: 'Chennai', pinCode: '600058', capacity: 2000, operatingHours: '06:00 - 23:00', status: 'Operational', managerId: 'u3', utilisation: 82, teamCount: 15, contact: '+91 44 2345 6791' },
  { id: 'h4', code: 'WH-BLR-01', name: 'Bangalore Warehouse', type: 'Warehouse', address: '23 Peenya Industrial Area', city: 'Bangalore', pinCode: '560058', capacity: 1500, operatingHours: '07:00 - 22:00', status: 'Under Maintenance', managerId: 'u3', utilisation: 45, teamCount: 10, contact: '+91 80 2345 6792' },
  { id: 'h5', code: 'KTN-BLR-01', name: 'Bangalore Kitchen', type: 'Kitchen', address: '56 Koramangala 5th Block', city: 'Bangalore', pinCode: '560095', capacity: 400, operatingHours: '05:30 - 21:30', status: 'Closed', managerId: '', utilisation: 0, teamCount: 0, contact: '+91 80 2345 6793' },
];

export const dummyCategories: Category[] = [
  { id: 'c1', name: 'Breads & Buns', slug: 'breads-buns', image: '🍞', displayOrder: 1, productCount: 12, visible: true },
  { id: 'c2', name: 'Pastries & Cakes', slug: 'pastries-cakes', image: '🎂', displayOrder: 2, productCount: 18, visible: true },
  { id: 'c3', name: 'Cookies & Biscuits', slug: 'cookies-biscuits', image: '🍪', displayOrder: 3, productCount: 8, visible: true },
  { id: 'c4', name: 'Raw Materials', slug: 'raw-materials', image: '🌾', displayOrder: 4, productCount: 25, visible: true },
  { id: 'c5', name: 'Beverages', slug: 'beverages', image: '☕', displayOrder: 5, productCount: 6, visible: false },
  { id: 'c6', name: 'Snacks', slug: 'snacks', image: '🥐', displayOrder: 6, productCount: 14, visible: true },
];

export const dummyProducts: Product[] = [
  { id: 'p1', name: 'Butter Croissant', category: 'Pastries & Cakes', price: 85, description: 'Flaky French-style butter croissant', gst: 5, min: 1, max: 100, unit: 'piece', availability: 'INSTOCK', dietary: 'Veg', visibility: 'FRANCHISE', imageName: 'croissant.jpg', isNewArrival: false, stock: 150, lowStockThreshold: 20, weight: 80, locationId: 'h1', status: true, lastUpdated: '2024-03-31T06:00:00Z', sku: 'KTN-PC-001' },
  { id: 'p2', name: 'Almond Danish', category: 'Pastries & Cakes', price: 120, description: 'Danish pastry with almond filling', gst: 5, min: 1, max: 50, unit: 'piece', availability: 'INSTOCK', dietary: 'Veg', visibility: 'FRANCHISE', imageName: 'danish.jpg', isNewArrival: true, newArrivalStartDate: '2024-03-20', newArrivalEndDate: '2024-04-20', stock: 8, lowStockThreshold: 15, weight: 95, locationId: 'h1', status: true, lastUpdated: '2024-03-31T05:30:00Z', sku: 'KTN-PC-002' },
  { id: 'p3', name: 'Whole Wheat Bread', category: 'Breads & Buns', price: 55, description: '100% whole wheat loaf', gst: 0, min: 1, max: 200, unit: 'piece', availability: 'INSTOCK', dietary: 'Vegan', visibility: 'FRANCHISE', imageName: 'wheat-bread.jpg', isNewArrival: false, stock: 200, lowStockThreshold: 30, weight: 400, locationId: 'h1', status: true, lastUpdated: '2024-03-31T04:00:00Z', sku: 'KTN-BB-001' },
  { id: 'p4', name: 'Whole Wheat Flour', category: 'Raw Materials', price: 45, description: 'Premium atta flour 1kg', gst: 0, min: 5, max: 500, unit: 'kg', availability: 'INSTOCK', dietary: 'Veg', visibility: 'INTERNAL', imageName: 'flour.jpg', isNewArrival: false, stock: 350, lowStockThreshold: 50, weight: 1000, locationId: 'h3', status: true, lastUpdated: '2024-03-30T10:00:00Z', sku: 'WH-RM-001' },
  { id: 'p5', name: 'Milk Packs', category: 'Raw Materials', price: 28, description: 'Full cream milk 500ml', gst: 0, min: 12, max: 1000, unit: 'pack', availability: 'INSTOCK', dietary: 'Veg', visibility: 'INTERNAL', imageName: 'milk.jpg', isNewArrival: false, stock: 12, lowStockThreshold: 50, weight: 500, locationId: 'h3', status: true, lastUpdated: '2024-03-31T07:00:00Z', sku: 'WH-RM-002' },
  { id: 'p6', name: 'Chocolate Truffle Cake', category: 'Pastries & Cakes', price: 650, description: 'Rich Belgian chocolate truffle cake', gst: 18, min: 1, max: 10, unit: 'piece', availability: 'INSTOCK', dietary: 'Veg', visibility: 'FRANCHISE', imageName: 'truffle.jpg', isNewArrival: true, newArrivalStartDate: '2024-03-25', newArrivalEndDate: '2024-04-25', stock: 5, lowStockThreshold: 3, weight: 500, locationId: 'h2', status: true, lastUpdated: '2024-03-31T08:00:00Z', sku: 'KTN-PC-003' },
  { id: 'p7', name: 'Oat Cookies', category: 'Cookies & Biscuits', price: 180, description: 'Healthy oat and raisin cookies pack', gst: 12, min: 1, max: 50, unit: 'box', availability: 'OUTOFSTOCK', dietary: 'Vegan', visibility: 'FRANCHISE', imageName: 'oat-cookies.jpg', isNewArrival: false, stock: 0, lowStockThreshold: 10, weight: 250, locationId: 'h1', status: true, lastUpdated: '2024-03-29T12:00:00Z', sku: 'KTN-CB-001' },
  { id: 'p8', name: 'Sugar (Refined)', category: 'Raw Materials', price: 42, description: 'Fine grain white sugar 1kg', gst: 5, min: 10, max: 500, unit: 'kg', availability: 'INSTOCK', dietary: 'Veg', visibility: 'INTERNAL', imageName: 'sugar.jpg', isNewArrival: false, stock: 180, lowStockThreshold: 30, weight: 1000, locationId: 'h3', status: true, lastUpdated: '2024-03-30T14:00:00Z', sku: 'WH-RM-003' },
  { id: 'p9', name: 'Masala Chai', category: 'Beverages', price: 35, description: 'Spiced Indian chai blend', gst: 5, min: 1, max: 100, unit: 'piece', availability: 'INSTOCK', dietary: 'Veg', visibility: 'FRANCHISE', imageName: 'chai.jpg', isNewArrival: false, stock: 90, lowStockThreshold: 20, weight: 200, locationId: 'h2', status: true, lastUpdated: '2024-03-31T09:00:00Z', sku: 'KTN-BV-001' },
  { id: 'p10', name: 'Paneer Puff', category: 'Snacks', price: 40, description: 'Crispy puff pastry with spiced paneer', gst: 5, min: 1, max: 200, unit: 'piece', availability: 'INSTOCK', dietary: 'Veg', visibility: 'FRANCHISE', imageName: 'puff.jpg', isNewArrival: false, stock: 45, lowStockThreshold: 15, weight: 120, locationId: 'h1', status: true, lastUpdated: '2024-03-31T06:30:00Z', sku: 'KTN-SN-001' },
];

export const dummyOrders: Order[] = [
  {
    id: 'ORD-2024-0871', franchiseName: 'Thatha Anna Nagar', franchiseLocation: 'Anna Nagar, Chennai', totalValue: 4890, gstTotal: 244.5, status: 'In Production', placedAt: '2024-03-31T08:15:00Z',
    subOrders: [
      { id: 'SO-0871-A', parentOrderId: 'ORD-2024-0871', hubId: 'h1', hubCode: 'KTN-CH-01', hubName: 'North Chennai Kitchen', status: 'In Production', items: [{ productId: 'p1', productName: 'Butter Croissant', quantity: 20, unit: 'piece', unitPrice: 85, gst: 5 }, { productId: 'p2', productName: 'Almond Danish', quantity: 10, unit: 'piece', unitPrice: 120, gst: 5 }], assignedAt: '2024-03-31T08:16:00Z', updatedAt: '2024-03-31T09:00:00Z', deliveryDeadline: '2024-03-31T14:00:00Z' },
      { id: 'SO-0871-B', parentOrderId: 'ORD-2024-0871', hubId: 'h3', hubCode: 'WH-CH-01', hubName: 'Central Warehouse', status: 'Confirmed', items: [{ productId: 'p4', productName: 'Whole Wheat Flour', quantity: 5, unit: 'kg', unitPrice: 45, gst: 0 }, { productId: 'p5', productName: 'Milk Packs', quantity: 12, unit: 'pack', unitPrice: 28, gst: 0 }], assignedAt: '2024-03-31T08:16:00Z', updatedAt: '2024-03-31T08:30:00Z', deliveryDeadline: '2024-03-31T12:00:00Z' },
    ],
    notes: ['Split into 2 sub-orders', 'Kitchen confirmed production start at 09:00'],
  },
  {
    id: 'ORD-2024-0872', franchiseName: 'Thatha T. Nagar', franchiseLocation: 'T. Nagar, Chennai', totalValue: 3250, gstTotal: 162.5, status: 'Pending', placedAt: '2024-03-31T09:30:00Z',
    subOrders: [
      { id: 'SO-0872-A', parentOrderId: 'ORD-2024-0872', hubId: 'h2', hubCode: 'KTN-CH-02', hubName: 'South Chennai Kitchen', status: 'Pending', items: [{ productId: 'p6', productName: 'Chocolate Truffle Cake', quantity: 5, unit: 'piece', unitPrice: 650, gst: 18 }], assignedAt: '2024-03-31T09:31:00Z', updatedAt: '2024-03-31T09:31:00Z', deliveryDeadline: '2024-03-31T16:00:00Z' },
    ],
    notes: [],
  },
  {
    id: 'ORD-2024-0870', franchiseName: 'Thatha Adyar', franchiseLocation: 'Adyar, Chennai', totalValue: 2150, gstTotal: 107.5, status: 'Delivered', placedAt: '2024-03-30T07:00:00Z',
    subOrders: [
      { id: 'SO-0870-A', parentOrderId: 'ORD-2024-0870', hubId: 'h1', hubCode: 'KTN-CH-01', hubName: 'North Chennai Kitchen', status: 'Delivered', items: [{ productId: 'p3', productName: 'Whole Wheat Bread', quantity: 30, unit: 'piece', unitPrice: 55, gst: 0 }, { productId: 'p10', productName: 'Paneer Puff', quantity: 10, unit: 'piece', unitPrice: 40, gst: 5 }], assignedAt: '2024-03-30T07:01:00Z', updatedAt: '2024-03-30T13:00:00Z', deliveryDeadline: '2024-03-30T14:00:00Z' },
    ],
    notes: ['Delivered on time'],
  },
  {
    id: 'ORD-2024-0869', franchiseName: 'Thatha Velachery', franchiseLocation: 'Velachery, Chennai', totalValue: 5600, gstTotal: 340, status: 'Out for Delivery', placedAt: '2024-03-31T06:00:00Z',
    subOrders: [
      { id: 'SO-0869-A', parentOrderId: 'ORD-2024-0869', hubId: 'h1', hubCode: 'KTN-CH-01', hubName: 'North Chennai Kitchen', status: 'Out for Delivery', items: [{ productId: 'p1', productName: 'Butter Croissant', quantity: 40, unit: 'piece', unitPrice: 85, gst: 5 }, { productId: 'p3', productName: 'Whole Wheat Bread', quantity: 20, unit: 'piece', unitPrice: 55, gst: 0 }], assignedAt: '2024-03-31T06:01:00Z', updatedAt: '2024-03-31T10:30:00Z', deliveryDeadline: '2024-03-31T12:00:00Z' },
      { id: 'SO-0869-B', parentOrderId: 'ORD-2024-0869', hubId: 'h3', hubCode: 'WH-CH-01', hubName: 'Central Warehouse', status: 'Out for Delivery', items: [{ productId: 'p8', productName: 'Sugar (Refined)', quantity: 20, unit: 'kg', unitPrice: 42, gst: 5 }], assignedAt: '2024-03-31T06:01:00Z', updatedAt: '2024-03-31T09:45:00Z', deliveryDeadline: '2024-03-31T11:00:00Z' },
    ],
    notes: ['Priority delivery'],
  },
  {
    id: 'ORD-2024-0868', franchiseName: 'Thatha OMR', franchiseLocation: 'OMR, Chennai', totalValue: 1800, gstTotal: 90, status: 'Cancelled', placedAt: '2024-03-29T15:00:00Z',
    subOrders: [
      { id: 'SO-0868-A', parentOrderId: 'ORD-2024-0868', hubId: 'h2', hubCode: 'KTN-CH-02', hubName: 'South Chennai Kitchen', status: 'Cancelled', items: [{ productId: 'p9', productName: 'Masala Chai', quantity: 50, unit: 'piece', unitPrice: 35, gst: 5 }], assignedAt: '2024-03-29T15:01:00Z', updatedAt: '2024-03-29T16:00:00Z', deliveryDeadline: '2024-03-30T10:00:00Z' },
    ],
    notes: ['Franchise cancelled due to event postponement'],
  },
];

export const dummyBatches: Batch[] = [
  { id: 'B-001', productName: 'Butter Croissant', batchSize: 100, startTime: '2024-03-31T05:00:00Z', expectedCompletion: '2024-03-31T08:00:00Z', progress: 85, status: 'In Progress', plannedYield: 100, actualYield: 0 },
  { id: 'B-002', productName: 'Whole Wheat Bread', batchSize: 80, startTime: '2024-03-31T04:30:00Z', expectedCompletion: '2024-03-31T07:30:00Z', progress: 100, status: 'Ready', plannedYield: 80, actualYield: 78 },
  { id: 'B-003', productName: 'Paneer Puff', batchSize: 60, startTime: '2024-03-31T06:00:00Z', expectedCompletion: '2024-03-31T09:00:00Z', progress: 45, status: 'In Progress', plannedYield: 60, actualYield: 0 },
  { id: 'B-004', productName: 'Almond Danish', batchSize: 40, startTime: '2024-03-31T07:00:00Z', expectedCompletion: '2024-03-31T10:00:00Z', progress: 20, status: 'In Progress', plannedYield: 40, actualYield: 0 },
  { id: 'B-005', productName: 'Oat Cookies', batchSize: 50, startTime: '2024-03-31T05:30:00Z', expectedCompletion: '2024-03-31T07:00:00Z', progress: 60, status: 'Paused', plannedYield: 50, actualYield: 0 },
];

export const dummyTransfers: StockTransfer[] = [
  { id: 'ST-001', sourceHubId: 'h3', sourceHubName: 'Central Warehouse', destHubId: 'h1', destHubName: 'North Chennai Kitchen', items: [{ productName: 'Whole Wheat Flour', quantity: 50, unit: 'kg' }, { productName: 'Sugar (Refined)', quantity: 20, unit: 'kg' }], reason: 'Production Need', status: 'In Transit', requestedBy: 'Priya Sharma', requestedAt: '2024-03-31T06:00:00Z', notes: 'Urgent for morning batch' },
  { id: 'ST-002', sourceHubId: 'h1', sourceHubName: 'North Chennai Kitchen', destHubId: 'h3', destHubName: 'Central Warehouse', items: [{ productName: 'Butter Croissant', quantity: 30, unit: 'piece' }], reason: 'Surplus', status: 'Requested', requestedBy: 'Priya Sharma', requestedAt: '2024-03-31T09:00:00Z', notes: 'Excess from morning batch' },
  { id: 'ST-003', sourceHubId: 'h3', sourceHubName: 'Central Warehouse', destHubId: 'h2', destHubName: 'South Chennai Kitchen', items: [{ productName: 'Milk Packs', quantity: 24, unit: 'pack' }], reason: 'Production Need', status: 'Approved', requestedBy: 'Deepa Nair', requestedAt: '2024-03-30T18:00:00Z', notes: '' },
  { id: 'ST-004', sourceHubId: 'h3', sourceHubName: 'Central Warehouse', destHubId: 'h1', destHubName: 'North Chennai Kitchen', items: [{ productName: 'Milk Packs', quantity: 50, unit: 'pack' }], reason: 'Production Need', status: 'Received', requestedBy: 'Priya Sharma', requestedAt: '2024-03-29T07:00:00Z', notes: 'Received in full' },
];

export const dummyNotifications: Notification[] = [
  { id: 'n1', type: 'Orders', title: 'New order assigned', message: 'Sub-order SO-0871-A assigned to North Chennai Kitchen', read: false, createdAt: '2024-03-31T08:16:00Z', link: '/orders/ORD-2024-0871' },
  { id: 'n2', type: 'Stock', title: 'Low stock alert', message: 'Milk Packs at Central Warehouse is below threshold (12/50)', read: false, createdAt: '2024-03-31T07:00:00Z', link: '/warehouse/inventory' },
  { id: 'n3', type: 'Stock', title: 'Low stock alert', message: 'Almond Danish at North Chennai Kitchen is below threshold (8/15)', read: false, createdAt: '2024-03-31T05:30:00Z', link: '/hub/h1/products' },
  { id: 'n4', type: 'Transfers', title: 'Transfer approved', message: 'Transfer ST-003 approved by warehouse manager', read: true, createdAt: '2024-03-30T19:00:00Z', link: '/stock-transfer/ST-003' },
  { id: 'n5', type: 'Orders', title: 'Order delivered', message: 'Order ORD-2024-0870 delivered to Thatha Adyar', read: true, createdAt: '2024-03-30T13:00:00Z', link: '/orders/ORD-2024-0870' },
  { id: 'n6', type: 'System', title: 'Hub maintenance', message: 'Bangalore Warehouse marked Under Maintenance', read: true, createdAt: '2024-03-29T10:00:00Z', link: '/admin/hubs' },
  { id: 'n7', type: 'Orders', title: 'Order cancelled', message: 'ORD-2024-0868 cancelled by Thatha OMR franchise', read: true, createdAt: '2024-03-29T16:00:00Z', link: '/orders/ORD-2024-0868' },
  { id: 'n8', type: 'Stock', title: 'Out of stock', message: 'Oat Cookies at North Chennai Kitchen is out of stock', read: false, createdAt: '2024-03-29T12:00:00Z', link: '/hub/h1/products' },
];

export const dummyProcurements: ProcurementOrder[] = [
  { id: 'po1', poNumber: 'PO-2024-0145', vendorName: 'Sri Lakshmi Flour Mills', material: 'Whole Wheat Flour', quantity: 200, unitPrice: 38, expectedDelivery: '2024-04-02', status: 'Confirmed' },
  { id: 'po2', poNumber: 'PO-2024-0146', vendorName: 'Aavin Dairy', material: 'Full Cream Milk', quantity: 500, unitPrice: 24, expectedDelivery: '2024-04-01', status: 'Submitted' },
  { id: 'po3', poNumber: 'PO-2024-0147', vendorName: 'Sweet Gold Sugar Co', material: 'Refined Sugar', quantity: 100, unitPrice: 40, expectedDelivery: '2024-04-03', status: 'Draft' },
  { id: 'po4', poNumber: 'PO-2024-0144', vendorName: 'Sri Lakshmi Flour Mills', material: 'Maida Flour', quantity: 150, unitPrice: 35, expectedDelivery: '2024-03-30', status: 'Received' },
];

export const revenueData = [
  { date: 'Mon', ktn1: 12400, ktn2: 8200, wh1: 5600 },
  { date: 'Tue', ktn1: 15600, ktn2: 9100, wh1: 6200 },
  { date: 'Wed', ktn1: 11800, ktn2: 7800, wh1: 4800 },
  { date: 'Thu', ktn1: 16200, ktn2: 10500, wh1: 7100 },
  { date: 'Fri', ktn1: 18900, ktn2: 12000, wh1: 8500 },
  { date: 'Sat', ktn1: 22100, ktn2: 14200, wh1: 9200 },
  { date: 'Sun', ktn1: 19500, ktn2: 11800, wh1: 7800 },
];

export const topProducts = [
  { name: 'Butter Croissant', sales: 480 },
  { name: 'Whole Wheat Bread', sales: 420 },
  { name: 'Paneer Puff', sales: 380 },
  { name: 'Masala Chai', sales: 320 },
  { name: 'Chocolate Truffle', sales: 280 },
];
