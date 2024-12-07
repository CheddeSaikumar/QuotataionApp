import React from 'react';
import { UserDetails } from '../types';

interface Props {
  userDetails: UserDetails;
  onChange: (details: UserDetails) => void;
}

export function UserDetailsForm({ userDetails, onChange }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange({ ...userDetails, [name]: value });
  };

  return (
    <div className="card">
      <h2 className="text-2xl font-semibold mb-6 text-primary">Customer Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="form-label">Name</label>
          <input
            type="text"
            name="name"
            value={userDetails.name}
            onChange={handleChange}
            className="input-field"
          />
        </div>
        <div>
          <label className="form-label">Mobile</label>
          <input
            type="tel"
            name="mobile"
            value={userDetails.mobile}
            onChange={handleChange}
            className="input-field"
          />
        </div>
        <div>
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            value={userDetails.email}
            onChange={handleChange}
            className="input-field"
          />
        </div>
        <div>
          <label className="form-label">Flat Number</label>
          <input
            type="text"
            name="flatNumber"
            value={userDetails.flatNumber}
            onChange={handleChange}
            className="input-field"
          />
        </div>
        <div className="md:col-span-2">
          <label className="form-label">Address</label>
          <input
            type="text"
            name="address"
            value={userDetails.address}
            onChange={handleChange}
            className="input-field"
          />
        </div>
      </div>
    </div>
  );
}