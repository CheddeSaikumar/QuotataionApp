export interface CompanyDetails {
  name: string;
  mobile: string;
  email: string;
  location: string;
}

export interface UserDetails {
  name: string;
  address: string;
  mobile: string;
  flatNumber: string;
  email: string;
}

export interface PriceSettings {
  boxPrice: number;
  framePrice: number;
  workType: string;
}

export interface RoomDetails {
  id: string;
  type: string;
  items: Array<{
    id: string;
    name: string;
    type: 'box' | 'frame';
    length: number;
    breadth: number;
    totalLength: number;
    totalPrice: number;
  }>;
}

export interface EstimationData {
  companyDetails: CompanyDetails;
  userDetails: UserDetails;
  priceSettings: PriceSettings;
  rooms: RoomDetails[];
}