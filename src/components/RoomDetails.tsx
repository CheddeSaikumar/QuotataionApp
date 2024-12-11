import { RoomDetails as RoomDetailsType } from '../types';
import { validateNumberInput } from '../utils/validation';
import { Trash2, Plus } from 'lucide-react';

interface Props {
  room: RoomDetailsType;
  onUpdate: (room: RoomDetailsType) => void;
  onDelete: () => void;
  boxPrice: number;
  framePrice: number;
}

export function RoomDetails({ room, onUpdate, onDelete, boxPrice, framePrice }: Props) {
  const addItem = () => {
    const newItem = {
      id: crypto.randomUUID(),
      type: 'box' as const,
      length: 0,
      breadth: 0,
      totalLength: 0,
      totalPrice: 0,
    };
    onUpdate({
      ...room,
      items: [...room.items, newItem],
    });
  };

  const updateItem = (itemId: string, updates: Partial<typeof room.items[0]>) => {
    const updatedItems = room.items.map((item) => {
      if (item.id === itemId) {
        const updatedItem = { ...item, ...updates };
        
        // Ensure length and breadth are non-negative
        if ('length' in updates) {
          updatedItem.length = validateNumberInput(updates.length!.toString());
        }
        if ('breadth' in updates) {
          updatedItem.breadth = validateNumberInput(updates.breadth!.toString());
        }

        const totalLength = updatedItem.length * updatedItem.breadth;
        const price = updatedItem.type === 'box' ? boxPrice : framePrice;
        return {
          ...updatedItem,
          totalLength,
          totalPrice: totalLength * price,
        };
      }
      return item;
    });
    onUpdate({ ...room, items: updatedItems });
  };

  const deleteItem = (itemId: string) => {
    onUpdate({
      ...room,
      items: room.items.filter((item) => item.id !== itemId),
    });
  };

  return (
    <div className="card mt-6">
      <div className="flex justify-between items-center mb-4">
        <div className="flex-1">
          <input
            type="text"
            value={room.type}
            onChange={(e) => onUpdate({ ...room, type: e.target.value })}
            placeholder="Room Type"
            className="input-field"
          />
        </div>
        <button
          onClick={onDelete}
          className="ml-4 text-red-600 hover:text-red-800"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-neutral-gray">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-primary">#</th>
              <th className="px-4 py-2 text-left text-primary">Type</th>
              <th className="px-4 py-2 text-left text-primary">Length</th>
              <th className="px-4 py-2 text-left text-primary">Breadth</th>
              <th className="px-4 py-2 text-left text-primary">Total Length</th>
              <th className="px-4 py-2 text-left text-primary">Total Price</th>
              <th className="px-4 py-2 text-left text-primary">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-gray">
            {room.items.map((item, index) => (
              <tr key={item.id}>
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">
                  <select
                    value={item.type}
                    onChange={(e) => updateItem(item.id, { type: e.target.value as 'box' | 'frame' })}
                    className="input-field"
                  >
                    <option value="box">Box</option>
                    <option value="frame">Frame</option>
                  </select>
                </td>
                <td className="px-4 py-2">
                  <input
                    type="number"
                    value={item.length}
                    onChange={(e) => updateItem(item.id, { length: Number(e.target.value) })}
                    min="0"
                    step="0.01"
                    className="input-field"
                    onKeyDown={(e) => {
                      if (e.key === '-' || e.key === 'e') {
                        e.preventDefault();
                      }
                    }}
                  />
                </td>
                <td className="px-4 py-2">
                  <input
                    type="number"
                    value={item.breadth}
                    onChange={(e) => updateItem(item.id, { breadth: Number(e.target.value) })}
                    min="0"
                    step="0.01"
                    className="input-field"
                    onKeyDown={(e) => {
                      if (e.key === '-' || e.key === 'e') {
                        e.preventDefault();
                      }
                    }}
                  />
                </td>
                <td className="px-4 py-2">{item.totalLength.toFixed(2)}</td>
                <td className="px-4 py-2">{item.totalPrice.toFixed(2)}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => deleteItem(item.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        onClick={addItem}
        className="mt-4 flex items-center text-accent-blue hover:text-blue-700"
      >
        <Plus className="w-5 h-5 mr-2" />
        Add Item
      </button>
    </div>
  );
}