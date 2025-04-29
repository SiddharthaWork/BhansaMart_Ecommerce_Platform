import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { _Category } from '../../(___types)/_type-Category';
import { apiClient } from '../utils/ApiGateway';
import { graphqlClient, gql } from '../utils/GraphQlGateway';
import { ISupplier } from '@/(___types)/_type-supplier';
import { toast } from 'react-toastify';

const categoryQueryDocument = gql`
  query GetAllCategories {
    getAllCategories {
      _id
      name
      description
      images
      priority
      subCategories {
        _id
        name
        description
        images
      }
    }
    getAllSuppliers {
      _id
      name
    }
  }
`;

export const useCategories = () => {
  return useQuery<{ categories: _Category[]; getAllSuppliers: ISupplier[] }>({
    queryKey: ['categories'],
    queryFn: () =>
      graphqlClient<{
        getAllCategories: _Category[];
        getAllSuppliers: ISupplier[];
      }>(categoryQueryDocument).then((res) => {
        const categories = res?.getAllCategories;
        const getAllSuppliers = res?.getAllSuppliers;
        const toReturn = {
          categories,
          getAllSuppliers,
        };
        return toReturn;
      }),
  });
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (categoryData: FormData) =>
      apiClient.post('category', categoryData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }),
    onError: (error: any) => {
      console.log('entered', error);
      toast.error('Something went wrong');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast.success('Category created succesfully');
    },
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      categoryData,
      id,
    }: {
      categoryData: FormData;
      id: string;
    }) =>
      apiClient.patch(`category/${id}`, categoryData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }),
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'An error occurred');
    },
    onSuccess: (data, variable) => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      // queryClient.setQueryData(['categories', { id: variable.id }], data);
      toast.success('Category updated successfully');
    },
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id }: { id: string }) => apiClient.delete(`category/${id}`),
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'An error occurred');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast.success('Category deleted successfully');
    },
  });
};
