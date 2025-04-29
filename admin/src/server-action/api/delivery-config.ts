import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../utils/ApiGateway';
import { toast } from 'react-toastify';
import { graphqlClient, gql } from '../utils/GraphQlGateway';
import {
  IDistanceBase,
  IFlat,
  IFreeDeliveryThreshold,
  IMinimumThreshold,
} from '@/(___types)/_type-delivery-config';

export const deliveryFlatRate = gql`
  query GetFlatRates {
    getFlatRates {
      _id
      title
      description
      flatRate
      isActive
      type
    }
  }
`;
const distanceBased = gql`
  query GetFlatRates {
    getDistanceRates {
      _id
      perKm
      fee
      type
    }
  }
`;

const minimumOrderThresold = gql`
  query GetMinimumThresholds {
    getMinimumThresholds {
      _id
      below
      charge
      isActive
    }
  }
`;

const freeDeliveryThreshold = gql`
  query GetMinimumThresholds {
    getFreeDeliveryThresholds {
      _id
      above
      charge
      isActive
    }
  }
`;

// Flat Rates
export const useGetFlatRates = () => {
  return useQuery<IFlat[]>({
    queryKey: [deliveryFlatRate],
    queryFn: () =>
      graphqlClient<{ getFlatRates: IFlat[] }>(deliveryFlatRate).then(
        (res) => res.getFlatRates
      ),
  });
};

export const useCreateFlatRate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (deliveryFeeBasedOnFlatRate: FormData) =>
      apiClient.post('deliveryConfig/flatRate', deliveryFeeBasedOnFlatRate),
    onError: (error: any) => {
      toast.error('Entered', error);
    },
    onSuccess: () => {
      toast.success('Delivery Fee Created Successfully');
      queryClient.invalidateQueries({ queryKey: [deliveryFlatRate] });
    },
  });
};

export const useUpdateFlatRate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ flatRateData, id }: { flatRateData: any; id: string }) =>
      apiClient.patch(`deliveryConfig/flatRate/${id}`, flatRateData, {}),
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || 'Failed to update Flat Rate'
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [deliveryFlatRate] });
      // toast.success('Flat Rate updated successfully');
    },
  });
};

export const useDeleteFlatRates = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      apiClient.delete(`deliveryConfig/flatRate/${id}`),
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || 'Failed to delete Flat Rate'
      );
    },
    onSuccess: () => {
      // Remove refetchQueries as invalidateQueries will trigger a refetch
      queryClient.invalidateQueries({ queryKey: [deliveryFlatRate] });
      toast.success('Flat Rate deleted successfully');
    },
  });
};

// Distance Based
export const useGetDistanceBased = () => {
  return useQuery<IDistanceBase[]>({
    queryKey: ['distanceBased'],
    queryFn: () =>
      graphqlClient<{ getDistanceRates: IDistanceBase[] }>(distanceBased).then(
        (res) => res.getDistanceRates
      ),
  });
};

export const useCreateDistanceBased = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (deliveryFeeBasedOnDistanceRate: FormData) => {
      return apiClient.post(
        'deliveryConfig/distanceRate',
        deliveryFeeBasedOnDistanceRate
      );
    },
    onError: (error: any) => {
      console.log('entered', error);
      toast.error('Entered', error);
    },
    onSuccess: () => {
      toast.success('Delivery Fee Created Successfully');
      queryClient.invalidateQueries({ queryKey: ['deliveryConfig/flatRate'] });
    },
  });
};

export const useUpdateDistanceBased = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      distanceBased,
      id,
    }: {
      distanceBased: FormData;
      id: string;
    }) =>
      apiClient.patch(`deliveryConfig/distanceRate/${id}`, distanceBased, {}),
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ||
          'Failed to update Distance-Based Configuration'
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['deliveryConfig/distanceRate'],
      });
      // toast.success('Distance-Based Configuration updated successfully');
    },
  });
};

export const useDeleteDistanceBased = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      apiClient.delete(`deliveryConfig/distanceRate/${id}`),

    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || 'Failed to delete Distance Based'
      );
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['deliveryConfig/distanceBased'],
      });
      toast.success('Distance Based Deleted Successfully');
    },
  });
};

// Minimum order threshold
export const useCreateMinimumOrderThreshold = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (minimumOrderThreasold: FormData) => {
      return apiClient.post(
        'deliveryConfig/minThreshold',
        minimumOrderThreasold
      );
    },
    onError: (error: any) => {
      toast.error('Entered', error);
    },
    onSuccess: () => {
      toast.success('Minimil Order Threasold Created Successfully');
      queryClient.invalidateQueries({
        queryKey: ['deliveryConfig/minThreshold'],
      });
    },
  });
};

export const useGetMinimumOrderThreshold = () => {
  return useQuery<IMinimumThreshold[]>({
    queryKey: ['deliveryConfig/minThreshold'],
    queryFn: () =>
      graphqlClient<{ getMinimumThresholds: IMinimumThreshold[] }>(
        minimumOrderThresold
      ).then((res) => res.getMinimumThresholds),
  });
};

export const useUpdateMinimumOrderThreshold = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      minimumThresholdData,
      id,
    }: {
      minimumThresholdData: any;
      id: string;
    }) =>
      apiClient.patch(
        `deliveryConfig/minThreshold/${id}`,
        minimumThresholdData,
        {}
      ),
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ||
          'Failed to update Minimum Order Threshold'
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['deliveryConfig/minThreshold'],
      });
      // toast.success('Minimum Order Threshold updated successfully');
    },
  });
};

export const useDeleteMinimumOrderThreshold = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      apiClient.delete(`deliveryConfig/minThreshold/${id}`),

    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ||
          'Failed to delete Minimum order Threshold'
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['deliveryConfig/minThreshold'],
      });
      toast.success('Minimum order Threshold Deleted Successfully');
    },
  });
};

// Free delivery
export const useGetFreeDeliveryThreshold = () => {
  return useQuery<IFreeDeliveryThreshold[]>({
    queryKey: ['deliveryConfig/deliveryRate'],
    queryFn: () =>
      graphqlClient<{ getFreeDeliveryThresholds: IFreeDeliveryThreshold[] }>(
        freeDeliveryThreshold
      ).then((res) => res.getFreeDeliveryThresholds),
  });
};

export const useCreateFreeDeliveryThreashold = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (freeDeliveryThreashold: FormData) => {
      return apiClient.post(
        'deliveryConfig/deliveryRate',
        freeDeliveryThreashold
      );
    },
    onError: (error: any) => {
      toast.error('Error Occured', error);
    },
    onSuccess: () => {
      toast.success('Free Delivery Fee Created Successfully');
      queryClient.invalidateQueries({
        queryKey: ['deliveryConfig/deliveryRate'],
      });
    },
  });
};

export const usDeleteFreeDeliveryThreshold = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      apiClient.delete(`deliveryConfig/deliveryRate/${id}`),

    onError: (error: any) => {
      error?.response?.data?.message ||
        'Failed to delete Free Delivery Threshold';
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`deliveryConfig/deliveryRate`],
      });
      toast.success('Free Delivery Threshold Delete Successfully');
    },
  });
};

export const useUpdateFreeDeliveryThreshold = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      freeDeliveryThreshold,
      id,
    }: {
      freeDeliveryThreshold: any;
      id: string;
    }) =>
      apiClient.patch(
        `deliveryConfig/deliveryRate/${id}`,
        freeDeliveryThreshold,
        {}
      ),
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ||
          'Failed to update Free Delivery Threshold'
      );
    },

    onSuccess: async () => {
      const res = await queryClient.invalidateQueries({
        queryKey: ['deliveryConfig/deliveryRate'],
      });

      // toast.success('Free Delivery Threshold updated successfully');
    },
  });
};
