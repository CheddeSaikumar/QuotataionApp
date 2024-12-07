import React from 'react';
import { CompanyDetails } from '../types';

interface Props {
  companyDetails: CompanyDetails;
  onChange: (details: CompanyDetails) => void;
}

export function CompanyDetailsForm({ companyDetails, onChange }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange({ ...companyDetails, [name]: value });
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
          />
        </div>
        <div>
          <label className="form-label">Mobile Number</label>
          <input
            type="tel"
            name="mobile"
            value={companyDetails.mobile}
            onChange={handleChange}
            className="input-field"
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
          />
        </div>
      </div>
    </div>
  );
}