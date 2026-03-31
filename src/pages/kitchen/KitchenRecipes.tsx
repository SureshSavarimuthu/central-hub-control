import { AppLayout } from '@/components/AppLayout';
import { Button } from '@/components/ui/button';
import { Printer } from 'lucide-react';

const recipes = [
  { id: 'r1', product: 'Butter Croissant', ingredients: [{ name: 'All-purpose flour', qty: '500g' }, { name: 'Butter', qty: '250g' }, { name: 'Yeast', qty: '7g' }, { name: 'Sugar', qty: '50g' }, { name: 'Salt', qty: '10g' }, { name: 'Milk', qty: '125ml' }], prepTime: '3 hrs', cookTime: '18 min', yield: 20, waste: 5, cost: 680 },
  { id: 'r2', product: 'Whole Wheat Bread', ingredients: [{ name: 'Whole wheat flour', qty: '700g' }, { name: 'Yeast', qty: '10g' }, { name: 'Salt', qty: '12g' }, { name: 'Water', qty: '450ml' }, { name: 'Oil', qty: '30ml' }], prepTime: '2 hrs', cookTime: '35 min', yield: 10, waste: 3, cost: 220 },
  { id: 'r3', product: 'Paneer Puff', ingredients: [{ name: 'Puff pastry', qty: '500g' }, { name: 'Paneer', qty: '300g' }, { name: 'Onion', qty: '100g' }, { name: 'Spice mix', qty: '20g' }], prepTime: '45 min', cookTime: '25 min', yield: 15, waste: 2, cost: 450 },
];

const KitchenRecipes = () => (
  <AppLayout>
    <div className="space-y-6">
      <h1 className="text-2xl font-display font-bold">Recipes</h1>
      <div className="space-y-4">
        {recipes.map(r => (
          <div key={r.id} className="bg-card rounded-xl border p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-display font-semibold text-lg">{r.product}</h3>
              <Button variant="outline" size="sm"><Printer className="h-3 w-3 mr-1" />Print</Button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div><p className="text-xs text-muted-foreground font-body">Prep Time</p><p className="font-body font-medium text-sm">{r.prepTime}</p></div>
              <div><p className="text-xs text-muted-foreground font-body">Cook Time</p><p className="font-body font-medium text-sm">{r.cookTime}</p></div>
              <div><p className="text-xs text-muted-foreground font-body">Yield</p><p className="font-body font-medium text-sm">{r.yield} units</p></div>
              <div><p className="text-xs text-muted-foreground font-body">Est. Cost</p><p className="font-body font-medium text-sm">₹{r.cost}</p></div>
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-body mb-2">Ingredients</p>
              <div className="flex flex-wrap gap-2">
                {r.ingredients.map((ing, i) => <span key={i} className="text-xs font-body bg-muted/50 px-2 py-1 rounded">{ing.name}: {ing.qty}</span>)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </AppLayout>
);

export default KitchenRecipes;
