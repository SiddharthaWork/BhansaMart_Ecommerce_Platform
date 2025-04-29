import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../utils/ApiGateway';
import { toast } from 'react-toastify';
import { gql, graphqlClient } from '../utils/GraphQlGateway';
import { _User } from '@/(___types)';

export const useCreateuser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (userData: FormData) =>
      apiClient.post('signup', userData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }),
    onError: (error) => {
      toast.error(error as unknown as string);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
};

const fetchuserByRoleQueryDocument = gql`
  query GetUsersByRole($page: Int!, $limit: Int!, $role: String!) {
    getUsersByRole(pagination: { page: $page, limit: $limit, role: $role }) {
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
        lastLogin
        isVerified
        resetPasswordToken
        resetPasswordTokenExpiresAt
        isResetEmailVerified
        verificationToken
        verificationTokenExpiresAt
        loyaltyPoints
        address
        FCMToken
        orders {
          _id
          orderStatus
          totalAmount
          paymentStatus
        }
        vehicle {
          type
          number
        }
      }
    }
  }
`;

export const useFetchuserByRole = (
  page: number,
  limit: number,
  role: string
) => {
  return useQuery<{
    getUsersByRole: {
      totalCount: number;
      hasMore: boolean;
      currentPage: number;
      totalPages: number;
      users: _User[];
    };
  }>({
    queryKey: ['user', page, limit, role],
    queryFn: () =>
      graphqlClient<{
        getUsersByRole: {
          totalCount: number;
          hasMore: boolean;
          currentPage: number;
          totalPages: number;
          users: _User[];
        };
      }>(fetchuserByRoleQueryDocument, {
        page,
        limit,
        role,
      }).then((res) => {
        return {
          getUsersByRole: res?.getUsersByRole,
        };
      }),
  });
};

const GetReferredUsers = gql`
  query GetReferredUsers($page: Int!, $limit: Int!) {
    getReferredUsers(pagination: { page: $page, limit: $limit }) {
      totalCount
      hasMore
      currentPage
      totalPages
      users {
        _id
        name
        referralCode
        loyaltyPoints
        referredUsers {
          _id
        }
      }
    }
  }
`;

export const useFetchUserByReferal = (page: number, limit: number) => {
  return useQuery<{
    getReferredUsers: {
      totalCount: number;
      hasMore: boolean;
      currentPage: number;
      totalPages: number;
      users: _User[];
    };
  }>({
    queryKey: ['user', page, limit],
    queryFn: () =>
      graphqlClient<{
        getReferredUsers: {
          totalCount: number;
          hasMore: boolean;
          currentPage: number;
          totalPages: number;
          users: _User[];
        };
      }>(GetReferredUsers, {
        page,
        limit,
      }).then((res) => {
        return {
          getReferredUsers: res?.getReferredUsers,
        };
      }),
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => apiClient.delete(`profile/${id}`),
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to delete user');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      toast.success('User deleted successfully');
    },
  });
};
