export interface IReferralReward {
  _id: string;
  point: number;
  isActive: boolean;
  pointPerReferral: {
    point: number;
    cash: number;
    isActive: boolean;
  };
}

export interface IPurchaseReward {
  _id: string;

  isActive: boolean;
  earned: {
    point: number;
    cash: number;
  };
  equivalence: {
    point: number;
    cash: number;
  };
}
