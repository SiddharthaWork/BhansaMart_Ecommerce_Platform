// User type representing individual user data
export interface ICustomer {
  _id: string;
  name: string;
  email: string;
  dob: string;
  gender: string;
  phone: string;
  license: string;
  licenseNumber: string;
  citizenship: string;
  joinDate: Date;
  image: string;
  isActive: boolean;
  referralCode: string;
  role: string;
  lastLogin: string;
  isVerified: boolean;
  resetPasswordToken: string | null;
  resetPasswordTokenExpiresAt: string | null;
  isResetEmailVerified: boolean;
  verificationToken: string | null;
  verificationTokenExpiresAt: string | null;
  address: string;
  orders: string[]; // Assuming these are order IDs
  reviews: string[]; // Assuming these are review IDs
  // referredBy: string | null; // Assuming this is a user ID
  // referredUsers: string[]; // Assuming these are user IDs
  spent: number; // Assuming this is the total amount spent by the user
  royalty: number; // Assuming this is the total royalty earned by the user
}

// Pagination info type
interface PaginationInfo {
  totalCount: number;
  hasMore: boolean;
  currentPage: number;
  totalPages: number;
}

// The complete response type for the GetAllUsers query
interface GetAllUsersResponse {
  getAllUsers: PaginationInfo;
}

// If you're using Apollo Client, you might want this type for the query hook
interface GetAllUsersQueryResult {
  data?: GetAllUsersResponse;
  loading: boolean;
  error?: Error;
}
