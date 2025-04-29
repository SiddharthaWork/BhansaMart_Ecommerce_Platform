import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../utils/ApiGateway';
import { gql, graphqlClient } from '../utils/GraphQlGateway';
import { toast } from 'react-toastify';
import { IBanner } from '@/(___types)';

export const useCreateBanner = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (bannerData: any) =>
      apiClient.post('banner', bannerData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }),
    onError: (error: any) => {
      toast.error(error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['banner'] });
      toast.success('Banner created successfully');
    },
  });
};

const bannerQuery = gql`
  query GetAllBanners {
    getAllBanners {
      _id
      title
      description
      image
      mobImage
      priority
      locations
      category {
        _id
        name
      }
      brand {
        _id
        name
      }
      product {
        _id
        name
      }
    }
  }
`;

export const useGetBanners = () => {
  return useQuery<{
    getAllBanners: IBanner[];
  }>({
    queryKey: ['banner'],
    queryFn: () =>
      graphqlClient<{
        getAllBanners: IBanner[];
      }>(bannerQuery).then((res) => res),
  });
};

export const useDeleteBanner = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id }: { id: string }) => apiClient.delete(`banner/${id}`),
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'An error occurred');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['banner'] });
      toast.success('banner deleted successfully');
    },
  });
};

export const useUpdateBanner = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ bannerData, id }: { bannerData: any; id: string }) =>
      apiClient.patch(`banner/${id}`, bannerData),
    onError: (error: any) => {
      toast.error(error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['banner'] });
      toast.success('Banner updated successfully');
    },
  });
};
