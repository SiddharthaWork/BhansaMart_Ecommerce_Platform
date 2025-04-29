import { useQuery } from '@tanstack/react-query';
import { gql, graphqlClient } from '../utils/GraphQlGateway';
import { ICashFlow } from '@/(___types)';

const categoryQueryDocument = gql`
  query GetWeeklyCashFlow($startDate: String, $endDate: String) {
    getWeeklyCashFlow(startDate: $startDate, endDate: $endDate) {
      startDate
      endDate
      totalSales
      totalExpenses
      netCashFlow
    }
  }
`;

export const useCashflowQuery = () => {
  return useQuery<{ getWeeklyCashFlow: ICashFlow[] }>({
    queryKey: ['cashflow'],
    queryFn: () =>
      graphqlClient<{
        getWeeklyCashFlow: ICashFlow[];
      }>(categoryQueryDocument, {
        fetchPolicy: 'network-only',
      }).then((res) => {
        const getWeeklyCashFlow = res?.getWeeklyCashFlow;
        const toReturn = {
          getWeeklyCashFlow,
        };
        return toReturn;
      }),
  });
};
