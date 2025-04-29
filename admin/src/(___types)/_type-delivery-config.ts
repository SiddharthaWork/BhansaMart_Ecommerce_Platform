export interface IFlat {
  _id: string;
  title: string;
  description: string;
  flatRate: number;
  isActive: boolean;
  type: 'flat';
}

export interface IDistanceBase {
  _id: string;
  perKm: number;
  fee: number;
  type: 'distance';
}

export interface IMinimumThreshold {
  _id: string;
  below: number;
  charge: number;
  isActive: boolean;
}

export interface IFreeDeliveryThreshold {
  _id: string;
  above: number;
  charge: number;
  isActive: boolean;
}
