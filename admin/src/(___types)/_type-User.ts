import { AddressType, GenderType } from '../constants/enums/User';

export interface Addresses {
  addressType: AddressType;
  city: string;
  isDefault: boolean;
  postalCode: string;
  state: string;
  streetAddress: string;
}

export interface _User {
  _id: string;
  address: string;
  addresses: Addresses[];
  citizenship?: string[];
  createdAt: Date;
  dob: string;
  email: string;
  gender: string;
  image?: string;
  isActive: boolean;
  isResetEmailVerified?: boolean;
  isVerified?: boolean;
  joinDate: Date;
  lastLogin?: Date;
  license?: string[];
  licenseNumber: string;
  cashCollected: number;
  cashHandover: number;
  name: string;
  orders: string[];
  password: string;
  phone: string;
  FCMToken: string;
  referralCode?: string;
  referredBy?: _User;
  referredUsers: _User[];
  resetPasswordToken?: string;
  resetPasswordTokenExpiresAt?: Date;
  reviews: string[];
  role: string;
  status: string;
  updatedAt: Date;
  vehicle?: {
    type: string;
    number: string;
    model: string;
  };
  verificationToken?: string;
  verificationTokenExpiresAt?: Date;
}

export interface _Addresses {
  streetAddress: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
  addressType: AddressType;
}
