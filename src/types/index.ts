export interface CompanyDetails {
  name: string;
  mobileNumbers: string[];
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

export interface BasketItem {
  name: string;
  quantity: number;
  price: number;
}

export interface RoomItem {
  id: string;
  type: 'box' | 'frame';
  length: number;
  breadth: number;
  totalLength: number;
  totalPrice: number;
}

export interface RoomDetails {
  id: string;
  type: string;
  items: RoomItem[];
}

export interface EstimationData {
  companyDetails: CompanyDetails;
  userDetails: UserDetails;
  priceSettings: PriceSettings;
  rooms: RoomDetails[];
  basketItems: BasketItem[];
}