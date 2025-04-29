import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { graphqlClient, gql } from '../utils/GraphQlGateway';
import { apiClient } from '../utils/ApiGateway';
import { InputSupplier, ISupplier } from '@/(___types)/_type-supplier';
import { toast } from 'react-toastify';

const supplierQueryDocument = gql`
  query GetAllSuppliers {
    getAllSuppliers {
      _id
      name
      description
      email
      phone
      businessType
      products {
        _id
        name
      }
      logo
      createdAt
      updatedAt
      addresses {
        district
        address
        province
      }
      contactPerson {
        name
        phone
        email
      }
      businessInfo {
        company
        PAN
      }
      bankDetails {
        accountHolderName
        accountNumber
        bankName
        branch
        paymentTerms
      }
    }
  }
`;

export const useGetSupplier = () => {
  return useQuery<{
    getAllSuppliers: ISupplier[]; // Now expects an array of ISupplier
  }>({
    queryKey: ['suppliers'],
    queryFn: () =>
      graphqlClient<{
        getAllSuppliers: ISupplier[]; // Corrected field name to match server response
      }>(supplierQueryDocument).then((res) => ({
        getAllSuppliers: res.getAllSuppliers, // Fixed typo and structure
      })),
  });
};

const getSupplierById = gql`
  query GetSupplier($id: ID!) {
    getSupplier(id: $id) {
      name
      email
      businessType
      address
      addresses {
        district
        address
        province
      }
      contactPerson {
        name
        phone
        email
      }
      businessInfo {
        company
        PAN
      }
      bankDetails {
        accountHolderName
        accountNumber
        bankName
        branch
        paymentTerms
      }
      products {
        _id
        name
      }
      logo
    }
  }
`;

// fetching single supplier data
export const useGetSupplierById = (id: string) => {
  return useQuery<ISupplier>({
    queryKey: ['supplier', id],
    queryFn: () =>
      graphqlClient<{ getSupplier: ISupplier }>(getSupplierById, {
        id,
      }).then((res) => res.getSupplier),
    // enabled: !!id,
  });
};

export const useCreateSupplier = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (supplierData: FormData) =>
      apiClient.post('supplier', supplierData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }),
    onError: (error: any) => {
      toast.error('Error adding supplier');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['supplier'] });
      toast.success('Supplier created successfully');
    },
  });
};

export const useUpdateSupplier = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      supplierData,
      id,
    }: {
      supplierData: FormData;
      id: string;
    }) =>
      apiClient.patch(`supplier/${id}`, supplierData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }),
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'An error occurred');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['supplier'] });
      toast.success('Supplier updated successfully');
    },
  });
};

// delete suppliers
export const useDeleteSupplier = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => apiClient.delete(`supplier/${id}`),
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || 'Failed to delete supplier'
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['suppliers'] }); // Refresh supplier list
      toast.success('Supplier deleted successfully');
    },
  });
};
