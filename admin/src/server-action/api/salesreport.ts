import { useQuery } from '@tanstack/react-query';
import { graphqlClient, gql } from '../utils/GraphQlGateway';

const productWiseSalesReport = gql`
  query GetAllSalesReports {
    getAllSalesReports {
      productWise {
        unitsSold
        totalRevenue
        category
        brand
        product
      }
    }
  }
`;

const categoryWiseSalesReport = gql`
  query GetAllSalesReports {
    getAllSalesReports {
      categoryWise {
        category
        totalOrders
        totalRevenue
        percentageShare
      }
    }
  }
`;

const brandWiseSalesReport = gql`
  query GetAllSalesReports {
    getAllSalesReports {
      brandWise {
        brand
        totalOrders
        totalRevenue
        percentageShare
      }
    }
  }
`;
// productwise sales report
export const useProductWiseSalesReport = () => {
  return useQuery({
    queryKey: ['productWiseSalesReport'],
    queryFn: async () => {
      const res = await graphqlClient<{ getAllSalesReports: any }>(
        productWiseSalesReport
      );
      return res.getAllSalesReports;
    },
  });
};

//categorywise sales report
export const useCategoryWiseSalesReport = () => {
  return useQuery({
    queryKey: [categoryWiseSalesReport],
    queryFn: async () => {
      const res = await graphqlClient<{ getAllSalesReports: any }>(
        categoryWiseSalesReport
      );
      return res.getAllSalesReports;
    },
  });
};

// brandwise sales report
export const useBrandWiseSalesReport = () => {
  return useQuery({
    queryKey: [brandWiseSalesReport],
    queryFn: async () => {
      const res = await graphqlClient<{ getAllSalesReports: any }>(
        brandWiseSalesReport
      );
      return res.getAllSalesReports;
    },
  });
};
