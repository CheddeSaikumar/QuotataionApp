import React from 'react';
import { CompanyDetails } from '../types';
import { Plus, Trash2 } from 'lucide-react';

interface Props {
  companyDetails: CompanyDetails;
  onChange: (details: CompanyDetails) => void;
}

export function CompanyDetailsForm({ companyDetails, onChange }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange({ ...companyDetails, [name]: value });
  };

  const addMobileNumber = () => {
    onChange({
      ...companyDetails,
      mobileNumbers: [...companyDetails.mobileNumbers, '']
    });
  };

  const updateMobileNumber = (index: number, value: string) => {
    const newMobileNumbers = [...companyDetails.mobileNumbers];
    newMobileNumbers[index] = value;
    onChange({
      ...companyDetails,
      mobileNumbers: newMobileNumbers
    });
  };

  const removeMobileNumber = (index: number) => {
    onChange({
      ...companyDetails,
      mobileNumbers: companyDetails.mobileNumbers.filter((_, i) => i !== index)
    });
  };

  return (
    <div className="card mb-6">
      <h2 className="text-2xl font-semibold mb-6 text-primary">Company Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="form-label">Company Name</label>
          <input
            type="text"
            name="name"
            value={companyDetails.name}
            onChange={handleChange}
            className="input-field"
            required
          />
        </div>
        <div>
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            value={companyDetails.email}
            onChange={handleChange}
            className="input-field"
            required
          />
        </div>
        <div>
          <label className="form-label">Location</label>
          <input
            type="text"
            name="location"
            value={companyDetails.location}
            onChange={handleChange}
            className="input-field"
            required
          />
        </div>
        <div className="md:col-span-2">
          <label className="form-label">Mobile Numbers</label>
          {companyDetails.mobileNumbers.map((number, index) => (
            <div key={index} className="flex items-center gap-2 mb-2">
              <input
                type="tel"
                value={number}
                onChange={(e) => updateMobileNumber(index, e.target.value)}
                className="input-field"
                required
              />
              {index > 0 && (
                <button
                  onClick={() => removeMobileNumber(index)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addMobileNumber}
            className="flex items-center text-accent-blue hover:text-blue-700"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Mobile Number
          </button>
        </div>
      </div>
    </div>
  );
}