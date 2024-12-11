import React from 'react';
import { BasketItem } from '../types';
import { Plus, Trash2 } from 'lucide-react';

interface Props {
  items: BasketItem[];
  onChange: (items: BasketItem[]) => void;
}

export function BasketItemsForm({ items, onChange }: Props) {
  const addItem = () => {
    onChange([...items, { name: '', quantity: 1, price: 0 }]);
  };

  const updateItem = (index: number, updates: Partial<BasketItem>) => {
    const newItems = items.map((item, i) => 
      i === index ? { ...item, ...updates } : item
    );
    onChange(newItems);
  };

  const removeItem = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
  };

  return (
    <div className="card mb-6">
      <h2 className="text-2xl font-semibold mb-6 text-primary">Additional Items</h2>
      {items.map((item, index) => (
        <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div>
            <label className="form-label">Item Name</label>
            <input
              type="text"
              value={item.name}
              onChange={(e) => updateItem(index, { name: e.target.value })}
              className="input-field"
              required
            />
          </div>
          <div>
            <label className="form-label">Quantity</label>
            <input
              type="number"
              value={item.quantity}
              min="1"
              onChange={(e) => updateItem(index, { quantity: Math.max(1, parseInt(e.target.value)) })}
              className="input-field"
              required
            />
          </div>
          <div>
            <label className="form-label">Price</label>
            <input
              type="number"
              value={item.price}
              min="0"
              onChange={(e) => updateItem(index, { price: Math.max(0, parseFloat(e.target.value)) })}
              className="input-field"
              required
            />
          </div>
          <div className="flex items-end">
            <button
              onClick={() => removeItem(index)}
              className="text-red-600 hover:text-red-800 mb-2"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      ))}
      <button
        onClick={addItem}
        className="flex items-center text-accent-blue hover:text-blue-700"
      >
        <Plus className="w-5 h-5 mr-2" />
        Add Item
      </button>
    </div>
  );
}