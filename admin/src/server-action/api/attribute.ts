import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../utils/ApiGateway';
import {
  _IBrand,
  _inputBrandDiscount,
  _inputCategoryDiscount,
  _inputIBrand,
  _inputIndividualDiscount,
  _inputVoucher,
  _IVoucher,
  _onlyIBrand,
} from '@/(___types)/_type-attributes';
import { graphqlClient, gql } from '../utils/GraphQlGateway';
import { _Category } from '@/(___types)/_type-Category';
import { toast } from 'react-toastify';

const categoryQueryDocument = gql`
  query GetAllCategories {
    getAllCategories {
      _id
      name
    }
  }
`;

export const useGetCategories = () => {
  return useQuery<{ categories: _Category[] }>({
    queryKey: ['categories'], // Add a queryKey
    queryFn: async () => {
      const res = await graphqlClient<{ getAllCategories: _Category[] }>(
        categoryQueryDocument
      );
      return { categories: res?.getAllCategories || [] };
    },
  });
};

const voucherQueryDocument = gql`
  query GetCoupons {
    getCoupons {
      _id
      couponCode
      couponType
      value
      minPurchase
      maxUsage
      perUserLimit
      expiresOn
      status
      productRestrictions
      createdAt
      updatedAt
    }
  }
`;

export const useGetVouchers = () => {
  return useQuery<{ vouchers: _IVoucher[] }>({
    queryKey: ['attribute-voucher'],
    queryFn: async () => {
      const res = await graphqlClient<{ getCoupons: _IVoucher[] }>(
        voucherQueryDocument
      );
      return { vouchers: res?.getCoupons || [] };
    },
  });
};

export const useCreateVoucher = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (voucherData: _inputVoucher) =>
      apiClient.post('attributes/voucher', voucherData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }),
    onError: (error: any) => {
      toast.error(error);
    },
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries({ queryKey: ['attribute-voucher'] });
    },
  });
};

export const useCreateBrand = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (brandData: _inputIBrand) => {
      const response = await apiClient.post('attributes/brand', brandData);
      return response.data;
    },
    onError: (error: any) => {
      toast.error(error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['attribute-brand'] });
    },
  });
};

export const useUpdateBrand = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      brandData,
      id,
    }: {
      brandData: _inputIBrand;
      id: string;
    }) => apiClient.patch(`attributes/brand/${id}`, brandData),
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'An error occurred');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['attribute-brand'] });
      toast.success('Product updated successfully');
    },
  });
};

const brandQueryDocument = gql`
  query GetBrands {
    getBrands {
      _id
      name
      isActive
      category {
        _id
        name
      }
    }
  }
`;

export const useGetBrands = () => {
  return useQuery<{ brand: _IBrand[] }>({
    queryKey: ['attribute-brand'],
    queryFn: async () => {
      const res = await graphqlClient<{ getBrands: _IBrand[] }>(
        brandQueryDocument
      );
      return { brand: res?.getBrands || [] };
    },
  });
};

export const useDeleteBrand = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => apiClient.delete(`attributes/brand/${id}`),
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to delete brand');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['attribute-brand'] }); // Refresh brand list
      toast.success('Brand deleted successfully');
    },
  });
};

const onlyBrandQueryDocument = gql`
  query GetBrands {
    getBrands {
      _id
      name
    }
  }
`;

export const useGetJustBrands = () => {
  return useQuery<{ brand: _onlyIBrand[] }>({
    queryKey: ['attribute-brand'],
    queryFn: async () => {
      const res = await graphqlClient<{ getBrands: _onlyIBrand[] }>(
        onlyBrandQueryDocument
      );
      return { brand: res?.getBrands || [] };
    },
  });
};

export const useCreateBrandDiscount = () => {
  return useMutation({
    mutationFn: (brandDiscountData: _inputBrandDiscount[]) =>
      apiClient.post('discounts/brand', brandDiscountData),
    onError: (error: any) => {
      toast.error(error);
    },
  });
};

const discountQueryDocument = gql`
  query GetDiscountCategories {
    discountBrands: getDiscountBrands {
      _id
      isActive
      discount
      type
      startDate
      endDate
      brand {
        _id
        name
      }
      product {
        _id
        name
      }
    }
    categoryDiscount: getDiscountCategories {
      _id
      isActive
      subCategory
      discount
      type
      startDate
      endDate
      category {
        _id
        name
      }
    }

    individualDiscount: getDiscountIndividuals {
      _id
      isActive
      discount
      type
      startDate
      endDate
      product {
        _id
        name
      }
    }
  }
`;

// export const useGetBrandDiscount = () => {
//   return useQuery<{
//     getDiscountBrands: {
//       _id: string;
//       isActive: boolean;
//       type: string;
//       startDate: string;
//       endDate: string;
//       brand: {
//         _id: string;
//         name: string;
//       };
//       product: {
//         _id: string;
//         name: string;
//       };
//     }[];
//   }>({
//     queryKey: ['brand-discount'],
//     queryFn: () =>
//       graphqlClient<{
//         getDiscountBrands: {
//           _id: string;
//           isActive: boolean;
//           type: string;
//           startDate: string;
//           endDate: string;
//           brand: {
//             _id: string;
//             name: string;
//           };
//           product: {
//             _id: string;
//             name: string;
//           };
//         }[];
//       }>(discountQueryDocument).then((res) => {
//         return res;
//       }),
//   });
// };

export const useGetDiscounts = () => {
  return useQuery<{
    discountBrands: {
      _id: string;
      isActive: boolean;
      discount: number;
      type: string;
      startDate: string;
      endDate: string;
      brand: {
        _id: string;
        name: string;
      };
      product: {
        _id: string;
        name: string;
      };
    }[];
    categoryDiscount: {
      _id: string;
      isActive: boolean;
      subCategory: string;
      discount: number;
      type: string;
      startDate: string;
      endDate: string;
      category: {
        _id: string;
        name: string;
      };
    }[];
    individualDiscount: {
      _id: string;
      isActive: boolean;
      discount: number;
      type: string;
      startDate: string;
      endDate: string;
      product: {
        _id: string;
        name: string;
      };
    }[];
  }>({
    queryKey: ['discounts'],
    queryFn: () =>
      graphqlClient<{
        discountBrands: {
          _id: string;
          isActive: boolean;
          discount: number;
          type: string;
          startDate: string;
          endDate: string;
          brand: {
            _id: string;
            name: string;
          };
          product: {
            _id: string;
            name: string;
          };
        }[];
        categoryDiscount: {
          _id: string;
          isActive: boolean;
          subCategory: string;
          discount: number;
          type: string;
          startDate: string;
          endDate: string;
          category: {
            _id: string;
            name: string;
          };
        }[];
        individualDiscount: {
          _id: string;
          isActive: boolean;
          discount: number;
          type: string;
          startDate: string;
          endDate: string;
          product: {
            _id: string;
            name: string;
          };
        }[];
      }>(discountQueryDocument),
  });
};

export const useCreateCategoryDiscount = () => {
  return useMutation({
    mutationFn: (categoryDiscountData: _inputCategoryDiscount[]) =>
      apiClient.post('discounts/category', categoryDiscountData),
    onError: (error: any) => {
      toast.error(error);
    },
  });
};

export const useCreateIndividualDiscount = () => {
  return useMutation({
    mutationFn: (brandDiscountData: _inputIndividualDiscount[]) =>
      apiClient.post('discounts/individual', brandDiscountData),
    onError: (error: any) => {
      toast.error(error);
    },
  });
};
