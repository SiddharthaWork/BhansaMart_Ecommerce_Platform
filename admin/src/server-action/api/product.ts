import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../utils/ApiGateway';
import { IProduct } from '@/(___types)';
import { gql, graphqlClient } from '../utils/GraphQlGateway';
import { toast } from 'react-toastify';

const productQueryDocument = gql`
  query GetAllProducts($page: Int!, $limit: Int!) {
    getAllProducts(pagination: { page: $page, limit: $limit }) {
      totalCount
      hasMore
      currentPage
      totalPages
      products {
        _id
        name
        description
        sellingPrice
        sku
        badges
        isFeatured
        featuredPriority
        metaTitle
        metaDescription
        attributeValue
        attributeUnit
        images
        featuredImage
        tags
        searchKeywords
        createdAt
        updatedAt
        category {
          _id
          name
        }
        subCategory {
          _id
          name
        }
        attributes {
          name
          value
          unit
          color
          price
        }

        inventoryDetails {
          remainingStock
          totalStock
          usedStock
          reorderPoint
        }
      }
    }
  }
`;

const getProductForAddPurchase = gql`
  query GetAllProducts($page: Int!, $limit: Int!) {
    getAllProducts(pagination: { page: $page, limit: $limit }) {
      totalCount
      hasMore
      currentPage
      totalPages
      products {
        _id
        name
        attributes {
          name
          value
          unit
          color
        }
      }

      totalPages
    }
  }
`;

const getProductQueryDocument = gql`
  query GetProduct($id: ID!) {
    getProduct(id: $id) {
      _id
      name
      description
      sellingPrice
      sku
      badges
      attributeValue
      attributeUnit
      inventoryDetails {
        unit
        reorderPoint
        remainingStock
        totalStock
        usedStock
      }
      attributes {
        name
        unit
        color
        value
        price
      }
      brand {
        _id
        name
        isActive
      }
      isFeatured
      featuredPriority
      metaTitle
      metaDescription
      images
      featuredImage
      tags
      searchKeywords
      status
      createdAt
      updatedAt
      category {
        _id
        name
      }
      subCategory {
        _id
        name
      }
    }
  }
`;

// Custom hook to get a product by ID
export const useProductById = (id: string) => {
  return useQuery<IProduct>({
    queryKey: ['product', id],
    queryFn: () =>
      graphqlClient<{ getProduct: IProduct }>(getProductQueryDocument, {
        id,
      }).then((res) => res.getProduct),
    enabled: !!id, // Ensure the query only runs if `id` is provided
  });
};

export const useProductForPurchaseHistory = (page: number, limit: number) => {
  return useQuery<{
    getAllProducts: {
      totalCount: number;
      hasMore: boolean;
      currentPage: number;
      totalPages: number;
      products: IProduct[];
    };
  }>({
    queryKey: ['product', page, limit],
    queryFn: () =>
      graphqlClient<{
        getAllProducts: {
          totalCount: number;
          hasMore: boolean;
          currentPage: number;
          totalPages: number;
          products: IProduct[];
        };
      }>(getProductForAddPurchase, { page, limit }).then((res) => res),
  });
};

export const useProducts = (page: number, limit: number) => {
  return useQuery<{
    getAllProducts: {
      totalCount: number;
      hasMore: boolean;
      currentPage: number;
      totalPages: number;
      products: IProduct[];
    };
  }>({
    queryKey: ['product', page, limit],
    queryFn: () =>
      graphqlClient<{
        getAllProducts: {
          totalCount: number;
          hasMore: boolean;
          currentPage: number;
          totalPages: number;
          products: IProduct[];
        };
      }>(
        productQueryDocument,
        { page, limit } // Pass variables dynamically
      ).then((res) => {
        return {
          getAllProducts: res.getAllProducts,
        };
      }),
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productData: FormData) =>
      apiClient.post('product', productData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }),
    onError: (error: any) => {
      console.log('entered', error);
      toast.error('Error while creating product');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['product'] });
      toast.success('Product created Succesfully');
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ productData, id }: { productData: FormData; id: string }) =>
      apiClient.patch(`product/${id}`, productData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }),
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'An error occurred');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['product'] });
      toast.success('Product updated successfully');
    },
  });
};

// delete
export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: { id: string }) => apiClient.delete(`product/${id}`),
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to delete product');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['product'] });
      toast.success('Product deleted successfully');
    },
  });
};
