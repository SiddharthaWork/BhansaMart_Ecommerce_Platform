import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../utils/ApiGateway';
import { gql, graphqlClient } from '../utils/GraphQlGateway';

import { toast } from 'react-toastify';
import { IPurchaseReward, IReferralReward } from '@/(___types)';

const getAllReferalRewards = gql`
  query GetPointPerReferrals {
    getPointPerReferrals {
      _id
      isActive
      point
      cash
    }
  }
`;

export const useGetReferalRewards = () => {
  return useQuery<{ getPointPerReferrals: IReferralReward[] }>({
    queryKey: ['referalreward'],
    queryFn: () =>
      graphqlClient<{ getPointPerReferrals: IReferralReward[] }>(
        getAllReferalRewards
      ).then((res) => res),
  });
};

export const useCreateReferalReward = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (referalReward: any) =>
      apiClient.post('reward/purchase', referalReward),

    onError: (error: any) => {
      toast.error(error);
    },
    onSuccess: () => {
      toast.success('Referal Reward Created Successfully');
      queryClient.invalidateQueries({ queryKey: ['referalreward'] });
      queryClient.refetchQueries({ queryKey: ['referalreward'] });
    },
  });
};

export const useEditReferalReward = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, updatedData }: { id: string; updatedData: any }) =>
      apiClient.patch(`reward/purchase/${id}`, updatedData),
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to update reward');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['referalreward'] });
    },
  });
};

export const useDeleteReferalReward = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => apiClient.delete(`reward/purchase/${id}`),
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to delete reward');
    },
    onSuccess: () => {
      toast.success('Referral Reward Deleted Successfully');
      queryClient.invalidateQueries({ queryKey: ['referalreward'] });
    },
  });
};

export const useCreatePurchaseReward = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (purchaseReward: any) =>
      apiClient.post('reward/point', purchaseReward),
    onError: (error: any) => {
      toast.error(error);
    },
    onSuccess: () => {
      toast.success('Referal Reward Created Successfully');
      queryClient.invalidateQueries({ queryKey: ['purchasereward'] });
    },
  });
};

const getAllPurchaseRewards = gql`
  query GetPurchaseRewards {
    getPurchaseRewards {
      _id
      isActive
      earned {
        point
        cash
      }
      equivalence {
        point
        cash
      }
    }
  }
`;

export const useGetPurchaseReward = () => {
  return useQuery({
    queryKey: ['purchasereward'],
    queryFn: () =>
      graphqlClient<{ getPurchaseRewards: IPurchaseReward[] }>(
        getAllPurchaseRewards
      ).then((res) => res),
  });
};

export const useEditPurchaseReward = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, updateData }: { id: string; updateData: any }) =>
      apiClient.patch(`reward/point/${id}`, updateData),
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to update reward');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['purchasereward'] });
    },
  });
};

export const useDeletePurchaseReward = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => apiClient.delete(`reward/point/${id}`),
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || 'Failed to delete purchase reward'
      );
    },
    onSuccess: () => {
      toast.success('Purchase Reward Deleted Successfully');
      queryClient.invalidateQueries({ queryKey: ['purchasereward'] });
    },
  });
};
