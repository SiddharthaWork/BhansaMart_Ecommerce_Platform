import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { graphqlClient, gql } from '../utils/GraphQlGateway';
import { IOrder } from '@/(___types)';
import { apiClient } from '@/server-action/utils/ApiGateway';
import { toast } from 'react-toastify';

const orderQueryDocument = gql`
  query GetAllOrders(
    $page: Int
    $limit: Int
    $orderStatus: String
    $deliveryStatus: String
  ) {
    getAllOrders(
      pagination: {
        page: $page
        limit: $limit
        orderStatus: $orderStatus
        deliveryStatus: $deliveryStatus
      }
    ) {
      orders {
        _id
        orderStatus
        totalAmount
        deliveryStatus
        paymentStatus
        shippingAddress {
          address
          landmark
        }
        orderedProducts {
          quantity
          product {
            _id
            name
          }
        }
        cancellation {
          reason
          date
        }
        orderTimeline {
          orderCreated
          orderConfirmation
          canceled {
            by
            date
            reason
          }
          pickUp
          deliveryAssignment
          outForDelivery
          orderHandOver
          deliveryCompletion
        }
        customer {
          _id
          name
        }
      }
      totalCount
      hasMore
      currentPage
      totalPages
    }
  }
`;

export const useGetOrders = (
  page: number,
  limit: number,
  orderStatus?: string,
  deliveryStatus?: string
) => {
  return useQuery<{
    getAllOrders: {
      orders: IOrder[];
      totalCount: number;
      hasMore: boolean;
      currentPage: number;
      totalPages: number;
    };
  }>({
    queryKey: ['orders', page, limit, orderStatus, deliveryStatus],
    queryFn: async () => {
      const res = await graphqlClient<{
        getAllOrders: {
          orders: IOrder[];
          totalCount: number;
          hasMore: boolean;
          currentPage: number;
          totalPages: number;
        };
      }>(orderQueryDocument, {
        page,
        limit,
        orderStatus,
        deliveryStatus,
      });

      return { getAllOrders: res.getAllOrders };
    },
  });
};

const getOrderById = gql`
  query GetOrder($id: ID!) {
    getOrder(id: $id) {
      _id
      orderStatus
      totalAmount
      paymentStatus
      transactionDetails {
        image
        transactionId
        payment
        remainingPayment
        paymentMethod
      }
      deliveryPerson {
        _id
        name
      }
      orderTimeline {
        orderCreated
        orderConfirmation
        canceled {
          by
          date
          reason
        }
        pickUp
        deliveryAssignment
        outForDelivery
        orderHandOver
        deliveryCompletion
      }
      billDetails {
        subTotalItemPrice
        shippingCost
        discount
        totalBill
      }
      orderedProducts {
        quantity
        product {
          _id
          name
          sellingPrice
          discountPrice
          images
          inventoryDetails {
            remainingStock
            totalStock
            reorderPoint
          }
        }
      }
      shippingAddress {
        fullname
        address
        landmark
        phone
        email
      }
      billingAddress {
        fullname
        address
        landmark
        phone
        email
      }
      customer {
        _id
        name
      }
    }
  }
`;

export const useGetOrderById = (id: string) => {
  return useQuery<IOrder>({
    queryKey: ['orders', id],
    queryFn: () =>
      graphqlClient<{ getOrder: IOrder }>(getOrderById, { id }).then(
        (res) => res.getOrder
      ),
    // enabled: !!id, // Ensures the query runs only if an ID is provided
  });
};

const orderByPaymentMethod = gql`
  query FetchOrdersByPaymentMethod(
    $page: Int
    $limit: Int
    $paymentMethod: String
  ) {
    fetchOrdersByPaymentMethod(
      pagination: { page: $page, limit: $limit, paymentMethod: $paymentMethod }
    ) {
      totalCount
      hasMore
      currentPage
      totalPages
      orders {
        _id
        orderStatus
        totalAmount
        paymentStatus
        customer {
          _id
          name
          image
        }
        orderTimeline {
          orderCreated
        }
        transactionDetails {
          image
          transactionId
          payment
          remainingPayment
          paymentMethod
        }
      }
    }
  }
`;

export const useFetchOrderByPayment = (
  page: number,
  limit: number,
  paymentMethod?: string
) => {
  return useQuery({
    queryKey: ['fetchOrdersByPaymentMethod', page, limit, paymentMethod],
    queryFn: async () => {
      const res = await graphqlClient<{
        fetchOrdersByPaymentMethod: {
          orders: IOrder[];
          totalCount: number;
          hasMore: boolean;
          currentPage: number;
          totalPages: number;
        };
      }>(orderByPaymentMethod, { page, limit, paymentMethod });

      return res; // ✅ Return as-is, don't wrap it again
    },
  });
};

export const useDeleteOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => apiClient.delete(`order/${id}`),
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to delete order');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      toast.success('Order deleted successfully');
    },
  });
};

export const useUpdateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ orderData, id }: { orderData: IOrder; id: string }) =>
      apiClient.patch(`order/${id}`, orderData),
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to update order');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      toast.success('Order updated successfully');
    },
  });
};
