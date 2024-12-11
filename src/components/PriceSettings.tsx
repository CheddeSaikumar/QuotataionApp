import React from 'react';
import { PriceSettings as PriceSettingsType } from '../types';
import { validateNumberInput } from '../utils/validation';

const WORK_TYPES = [
  'Home',
  'Office',
  'Coffee Shop',
  'Cloth Store',
  'Restaurant',
  'Retail Store',
  'Salon',
  'Gym',
];

interface Props {
  settings: PriceSettingsType;
  onChange: (settings: PriceSettingsType) => void;
}

export function PriceSettings({ settings, onChange }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    onChange({
      ...settings,
      [name]: name === 'workType' ? value : validateNumberInput(value),
    });
  };

  return (
    <div className="card mt-6">
      <h2 className="text-2xl font-semibold mb-6 text-primary">Price Settings</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="form-label">Box Price (per unit)</label>
          <input
            type="number"
            name="boxPrice"
            value={settings.boxPrice}
            onChange={handleChange}
            min="0"
            step="0.01"
            className="input-field"
            onKeyDown={(e) => {
              if (e.key === '-' || e.key === 'e') {
                e.preventDefault();
              }
            }}
          />
        </div>
        <div>
          <label className="form-label">Frame Price (per unit)</label>
          <input
            type="number"
            name="framePrice"
            value={settings.framePrice}
            onChange={handleChange}
            min="0"
            step="0.01"
            className="input-field"
            onKeyDown={(e) => {
              if (e.key === '-' || e.key === 'e') {
                e.preventDefault();
              }
            }}
          />
        </div>
        <div>
          <label className="form-label">Work Type</label>
          <select
            name="workType"
            value={settings.workType}
            onChange={handleChange}
            className="input-field"
          >
            <option value="">Select Work Type</option>
            {WORK_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}