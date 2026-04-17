import { useState, useEffect } from 'react';
import { AppLayout } from '@/components/AppLayout';
import { useAppState } from '@/contexts/AppStateContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Trash2, Save, Cookie } from 'lucide-react';
import { dummyProducts } from '@/data/dummy';
import { toast } from 'sonner';

const ProductMapping = () => {
  const { inventory, productMappings, saveProductMapping, deleteProductMapping } = useAppState();
  const products = dummyProducts.filter(p => p.locationId !== 'h3');

  const [productId, setProductId] = useState(products[0]?.id || '');
  const [ingredients, setIngredients] = useState<{ inventoryId: string; inventoryName: string; quantity: number; unit: string }[]>([]);

  useEffect(() => {
    const existing = productMappings.find(m => m.productId === productId);
    setIngredients(existing ? existing.ingredients : []);
  }, [productId, productMappings]);

  const addIngredient = () => {
    if (inventory.length === 0) return toast.error('No inventory items available');
    const first = inventory[0];
    setIngredients([...ingredients, { inventoryId: first.id, inventoryName: first.name, quantity: 1, unit: first.unit }]);
  };

  const updateIngredient = (idx: number, updates: Partial<typeof ingredients[0]>) => {
    setIngredients(ingredients.map((ing, i) => {
      if (i !== idx) return ing;
      const merged = { ...ing, ...updates };
      if (updates.inventoryId) {
        const inv = inventory.find(x => x.id === updates.inventoryId);
        if (inv) { merged.inventoryName = inv.name; merged.unit = inv.unit; }
      }
      return merged;
    }));
  };

  const removeIngredient = (idx: number) => {
    setIngredients(ingredients.filter((_, i) => i !== idx));
  };

  const handleSave = () => {
    const product = products.find(p => p.id === productId);
    if (!product) return toast.error('Select a product');
    if (ingredients.some(i => i.quantity <= 0)) return toast.error('Quantities must be greater than 0');
    saveProductMapping(productId, product.name, ingredients);
  };

  const selectedProduct = products.find(p => p.id === productId);
  const existingMapping = productMappings.find(m => m.productId === productId);

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-display font-bold flex items-center gap-2">
            Product Mapping <Cookie className="h-7 w-7 text-primary" />
          </h1>
          <p className="text-sm text-muted-foreground font-body mt-1">Link products with inventory items — auto-deducts stock on order</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Select Product</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2 max-w-md">
              <Label>Product *</Label>
              <Select value={productId} onValueChange={setProductId}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {products.map(p => (
                    <SelectItem key={p.id} value={p.id}>
                      {p.name} <span className="text-muted-foreground">({p.category})</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedProduct && (
              <div className="border-t border-border/50 pt-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold font-display">Ingredients</h3>
                  <Button variant="outline" size="sm" onClick={addIngredient}>
                    <Plus className="h-3 w-3 mr-1" /> Add Ingredient
                  </Button>
                </div>

                {ingredients.length === 0 ? (
                  <p className="text-sm text-muted-foreground font-body text-center py-6 border border-dashed border-border/50 rounded-xl">
                    No ingredients mapped. Click "Add Ingredient" to start.
                  </p>
                ) : (
                  <div className="space-y-2">
                    {ingredients.map((ing, idx) => (
                      <div key={idx} className="grid grid-cols-12 gap-2 items-end p-3 rounded-xl bg-muted/30 border border-border/50">
                        <div className="col-span-6">
                          <Label className="text-xs">Inventory Item</Label>
                          <Select value={ing.inventoryId} onValueChange={v => updateIngredient(idx, { inventoryId: v })}>
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>
                              {inventory.map(i => <SelectItem key={i.id} value={i.id}>{i.name}</SelectItem>)}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="col-span-3">
                          <Label className="text-xs">Quantity</Label>
                          <Input type="number" min={0} step="0.01" value={ing.quantity} onChange={e => updateIngredient(idx, { quantity: parseFloat(e.target.value) || 0 })} />
                        </div>
                        <div className="col-span-2">
                          <Label className="text-xs">Unit</Label>
                          <Input value={ing.unit} disabled className="bg-muted" />
                        </div>
                        <div className="col-span-1">
                          <Button variant="ghost" size="icon" onClick={() => removeIngredient(idx)} className="text-destructive hover:bg-destructive/10">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex gap-2 mt-4 pt-4 border-t border-border/50">
                  {existingMapping && (
                    <Button variant="outline" onClick={() => { deleteProductMapping(existingMapping.id); setIngredients([]); }} className="text-destructive">
                      Remove Mapping
                    </Button>
                  )}
                  <Button onClick={handleSave} className="ml-auto">
                    <Save className="h-4 w-4 mr-1" /> Save Mapping
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {productMappings.length > 0 && (
          <Card>
            <CardHeader><CardTitle className="text-lg">All Mappings ({productMappings.length})</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-2">
                {productMappings.map(m => (
                  <div key={m.id} className="flex items-center justify-between p-3 rounded-xl bg-muted/30 border border-border/50">
                    <div>
                      <p className="text-sm font-semibold">{m.productName}</p>
                      <p className="text-xs text-muted-foreground font-body">
                        {m.ingredients.map(i => `${i.inventoryName} (${i.quantity}${i.unit})`).join(', ')}
                      </p>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => setProductId(m.productId)}>Edit</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </AppLayout>
  );
};

export default ProductMapping;
