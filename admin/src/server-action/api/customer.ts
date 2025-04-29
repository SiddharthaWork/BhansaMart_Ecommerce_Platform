import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ICustomer } from '@/(___types)/_type-customer';
import { gql, graphqlClient } from '../utils/GraphQlGateway';
import { toast } from 'react-toastify';
import { apiClient } from '@/server-action/utils/ApiGateway';

// Query document for getting all customers with pagination
const customerQueryDocument = gql`
  query GetAllCustomers($page: Int!, $limit: Int!) {
    getAllUsers(pagination: { page: $page, limit: $limit }) {
      totalCount
      hasMore
      currentPage
      totalPages
      users {
        _id
        name
        email
        dob
        gender
        phone
        license
        licenseNumber
        citizenship
        joinDate
        image
        isActive
        referralCode
        FCMToken
        role
        lastLogin
        address
        orders {
          _id
          orderStatus
          totalAmount
          paymentStatus
        }
      }
    }
  }
`;

// Query document for getting a single customer
const getCustomerQueryDocument = gql`
  query GetCustomer($id: String!) {
    getUser(id: $id) {
      _id
      name
      email
      dob
      gender
      phone
      license
      licenseNumber
      citizenship
      joinDate
      image
      FCMToken
      isActive
      referralCode
      role
      lastLogin
      isVerified
      resetPasswordToken
      resetPasswordTokenExpiresAt
      isResetEmailVerified
      verificationToken
      verificationTokenExpiresAt
      address
      orders {
        _id
        orderStatus
        totalAmount
        paymentStatus
      }

      joinDate
      addresses {
        streetAddress
        city
        state
        postalCode
        isDefault
        addressType
      }
    }
  }
`;

// Interface for the paginated response
interface GetAllCustomersResponse {
  getAllUsers: {
    totalCount: number;
    hasMore: boolean;
    currentPage: number;
    totalPages: number;
    users: ICustomer[];
  };
}

// Hook to get a single customer by ID
export const useCustomerById = (id: string) => {
  return useQuery<ICustomer>({
    queryKey: ['customer', id],
    queryFn: () =>
      graphqlClient<{ getUser: ICustomer }>(getCustomerQueryDocument, {
        id,
      }).then((res) => res.getUser),
    enabled: !!id,
  });
};

// Hook to get all customers with pagination
export const useCustomers = (page: number, limit: number) => {
  return useQuery<GetAllCustomersResponse>({
    queryKey: ['customers', page, limit],
    queryFn: () =>
      graphqlClient<GetAllCustomersResponse>(customerQueryDocument, {
        page,
        limit,
      }).then((res) => {
        return {
          getAllUsers: res.getAllUsers,
        };
      }),
  });
};

// // delete customer
// export const useDeleteCustomer = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: (id: string) => apiClient.delete(`customer/${id}`), // Adjust the endpoint as needed
//     onError: (error: any) => {
//       toast.error(
//         error?.response?.data?.message || 'Failed to delete customer'
//       );
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['customers'] });
//       toast.success('Customer deleted successfully');
//     },
//   });
// };

export const useDeleteCustomer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => apiClient.delete(`profile/${id}`),
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || 'Failed to delete customer'
      );
    },
    onSuccess: (_, id) => {
      // Manually update cache
      queryClient.setQueryData(
        ['customers'],
        (oldData: GetAllCustomersResponse | undefined) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            getAllUsers: {
              ...oldData.getAllUsers,
              users: oldData.getAllUsers.users.filter(
                (user) => user._id !== id
              ),
            },
          };
        }
      );

      // Force refetch
      queryClient.invalidateQueries({ queryKey: ['customers'], exact: false });
      queryClient.refetchQueries({ queryKey: ['customers'] });

      toast.success('Customer deleted successfully');
    },
  });
};
