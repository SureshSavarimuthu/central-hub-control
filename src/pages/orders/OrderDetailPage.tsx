import { useParams, Link } from 'react-router-dom';
import { AppLayout } from '@/components/AppLayout';
import { StatusChip } from '@/components/StatusChip';
import { dummyOrders } from '@/data/dummy';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Pause, X, RefreshCw } from 'lucide-react';

const OrderDetailPage = () => {
  const { id } = useParams();
  const order = dummyOrders.find(o => o.id === id);
  if (!order) return <AppLayout><p className="font-body">Order not found</p></AppLayout>;

  const steps = ['Pending', 'Confirmed', 'In Production', 'Ready for Dispatch', 'Out for Delivery', 'Delivered'];
  const currentStep = steps.indexOf(order.status);

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Link to="/orders"><Button variant="ghost" size="icon"><ArrowLeft className="h-4 w-4" /></Button></Link>
          <div>
            <h1 className="text-2xl font-display font-bold">{order.id}</h1>
            <p className="text-muted-foreground font-body text-sm">{order.franchiseName} · {order.franchiseLocation}</p>
          </div>
          <StatusChip status={order.status} className="ml-auto" />
        </div>

        {/* Timeline */}
        <div className="bg-card rounded-xl border p-5">
          <h3 className="font-display font-semibold mb-4">Order Timeline</h3>
          <div className="flex items-center">
            {steps.map((s, i) => (
              <div key={s} className="flex-1 flex flex-col items-center relative">
                <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold ${i <= currentStep ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'} transition-colors duration-300`}>
                  {i + 1}
                </div>
                <p className="text-[10px] font-body mt-1 text-center">{s}</p>
                {i < steps.length - 1 && <div className={`absolute top-4 left-[55%] w-[90%] h-0.5 ${i < currentStep ? 'bg-primary' : 'bg-muted'}`} />}
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-card rounded-xl border p-5">
            <p className="text-xs text-muted-foreground font-body">Total Value</p>
            <p className="text-xl font-display font-bold mt-1">₹{order.totalValue.toLocaleString()}</p>
          </div>
          <div className="bg-card rounded-xl border p-5">
            <p className="text-xs text-muted-foreground font-body">GST</p>
            <p className="text-xl font-display font-bold mt-1">₹{order.gstTotal.toLocaleString()}</p>
          </div>
          <div className="bg-card rounded-xl border p-5">
            <p className="text-xs text-muted-foreground font-body">Sub-orders</p>
            <p className="text-xl font-display font-bold mt-1">{order.subOrders.length}</p>
          </div>
        </div>

        {/* Sub-orders */}
        {order.subOrders.map(so => (
          <div key={so.id} className="bg-card rounded-xl border p-5">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="font-code text-sm font-semibold">{so.id}</p>
                <p className="text-xs text-muted-foreground font-body">{so.hubName} · <span className="font-code">{so.hubCode}</span></p>
              </div>
              <StatusChip status={so.status} />
            </div>
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2 text-xs font-body text-muted-foreground">Product</th>
                  <th className="text-right p-2 text-xs font-body text-muted-foreground">Qty</th>
                  <th className="text-right p-2 text-xs font-body text-muted-foreground">Unit Price</th>
                  <th className="text-right p-2 text-xs font-body text-muted-foreground">GST %</th>
                  <th className="text-right p-2 text-xs font-body text-muted-foreground">Total</th>
                </tr>
              </thead>
              <tbody>
                {so.items.map((item, i) => (
                  <tr key={i} className="border-b">
                    <td className="p-2 text-sm font-body">{item.productName}</td>
                    <td className="p-2 text-right text-sm font-body">{item.quantity} {item.unit}</td>
                    <td className="p-2 text-right text-sm font-body">₹{item.unitPrice}</td>
                    <td className="p-2 text-right text-sm font-body">{item.gst}%</td>
                    <td className="p-2 text-right text-sm font-body font-medium">₹{(item.quantity * item.unitPrice * (1 + item.gst / 100)).toFixed(0)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}

        {/* Notes */}
        {order.notes.length > 0 && (
          <div className="bg-card rounded-xl border p-5">
            <h3 className="font-display font-semibold mb-3">Notes</h3>
            {order.notes.map((n, i) => <p key={i} className="text-sm text-muted-foreground font-body mb-1">• {n}</p>)}
          </div>
        )}

        <div className="flex gap-3">
          <Button variant="outline" size="sm"><Pause className="h-3 w-3 mr-1" />Hold</Button>
          <Button variant="outline" size="sm" className="text-destructive"><X className="h-3 w-3 mr-1" />Cancel</Button>
          <Button variant="outline" size="sm"><RefreshCw className="h-3 w-3 mr-1" />Re-assign Hub</Button>
        </div>
      </div>
    </AppLayout>
  );
};

export default OrderDetailPage;
