import { AppLayout } from '@/components/AppLayout';
import { dummyCategories } from '@/data/dummy';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Eye, EyeOff } from 'lucide-react';

const AdminCategories = () => (
  <AppLayout>
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold">Categories</h1>
          <p className="text-muted-foreground font-body text-sm">Manage product categories</p>
        </div>
        <Button size="sm"><Plus className="h-3 w-3 mr-1" />Add Category</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {dummyCategories.map(c => (
          <div key={c.id} className="bg-card rounded-xl border p-5 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{c.image}</span>
                <div>
                  <p className="font-body font-semibold">{c.name}</p>
                  <p className="text-xs text-muted-foreground font-code">/{c.slug}</p>
                </div>
              </div>
              <div className="flex gap-1">
                <Button variant="ghost" size="icon" className="h-7 w-7"><Edit className="h-3 w-3" /></Button>
                <Button variant="ghost" size="icon" className="h-7 w-7">{c.visible ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}</Button>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between text-sm">
              <span className="text-muted-foreground font-body">{c.productCount} products</span>
              <span className="text-muted-foreground font-body">Order: #{c.displayOrder}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </AppLayout>
);

export default AdminCategories;
