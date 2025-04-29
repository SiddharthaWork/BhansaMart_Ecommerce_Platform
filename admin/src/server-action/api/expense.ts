import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../utils/ApiGateway';
import { IExpense, InputIExpese } from '@/(___types)/_type-expense';
import { toast } from 'react-toastify';
import { gql, graphqlClient } from '../utils/GraphQlGateway';

export const useCreateExpense = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (expenseData: InputIExpese) =>
      apiClient.post('expense', expenseData),
    onError: (error: any) => {
      toast.error(error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expense'] });
    },
  });
};

const expenseQueryDocument = gql`
  query GetAllExpenses {
    getAllExpenses {
      id
      expenseCategory
      date
      description
      amount
      note
      purchaseId {
        _id
        quantity
        price
        product {
          _id
        }
      }
    }
  }
`;

export const useGetExpenses = () => {
  return useQuery<{
    getAllExpenses: IExpense[];
  }>({
    queryKey: ['expense'],
    queryFn: () =>
      graphqlClient<{
        getAllExpenses: IExpense[];
      }>(expenseQueryDocument).then((res) => res),
  });
};
