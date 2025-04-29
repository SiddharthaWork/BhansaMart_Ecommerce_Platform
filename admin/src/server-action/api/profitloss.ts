import { useQuery } from '@tanstack/react-query';
import { graphqlClient, gql } from '../utils/GraphQlGateway';

const profitloss = gql`
  query GetProfitLoss {
    getProfitLoss {
      grossSales
      goodsReturn
      discounts
      badDebts
      cogs
      incomeFromRevenue
      totalExpenses
      expenseSummary {
        category
        amount
      }
    }
  }
`;

export const useGetProfitLoss = () => {
  return useQuery<any>({
    queryKey: [profitloss],
    queryFn: () =>
      graphqlClient<{ getProfitLoss: any }>(profitloss).then(
        (res) => res.getProfitLoss
      ),
  });
};
