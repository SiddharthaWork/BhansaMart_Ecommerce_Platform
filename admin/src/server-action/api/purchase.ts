import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { gql } from 'graphql-request';
import { graphqlClient } from '../utils/GraphQlGateway';
import { apiClient } from '../utils/ApiGateway';
import { toast } from 'react-toastify';
import { InputIPurchase, IPurchase } from '@/(___types)/_type-purchase';

const useGetAllPurchaseData = () => gql`
  query GetAllPurchases {
    getAllPurchases {
      _id
      products {
        quantity
        price
        paidAmount
        expiryDate
        product {
          _id
          name
        }
        attributes {
          attribute
          price
          quantity
          expiryDate
          paidAmount
        }
      }
      supplier {
        _id
        name
      }
    }
  }
`;

export const useGetPurchase = () => {
  return useQuery<{
    getAllPurchases: IPurchase[]; // Ensure it's an array if multiple purchases are returned
  }>({
    queryKey: ['purchases'],
    queryFn: () =>
      graphqlClient<{
        getAllPurchases: IPurchase[]; // Ensure this matches the GraphQL response structure
      }>(useGetAllPurchaseData()).then((res) => ({
        getAllPurchases: res.getAllPurchases, // Extracting the purchases correctly
      })),
  });
};

export const useCreatePurchase = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (purchaseData: InputIPurchase) =>
      apiClient.post('purchase', purchaseData),
    onError: (error: any) => {
      toast.error('Something went wrong');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['purchases'] });
      toast.success('Purchase created succesfully');
    },
  });
};

export const useDeletePurchase = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: { id: string }) => apiClient.delete(`purchase/${id}`),

    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || 'Failed to delete Purchase'
      );
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['purchases'] });
      toast.success('Purchase deleted successfully');
    },
  });
};

export const useUpdatePurchase = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      purchaseData,
      id,
    }: {
      purchaseData: InputIPurchase;
      id: string;
    }) => apiClient.patch(`purchase/${id}`, purchaseData),

    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'An error occurred');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['purchases'] });
      toast.success('Purchase updated successfully');
    },
  });
};
