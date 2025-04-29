import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../utils/ApiGateway';
import { toast } from 'react-toastify';
import { encryptData } from '@/utils/Secure';

type TLogin = {
  email: string;
  password: string;
};

export const useLogin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['login'],
    mutationFn: async (userData: TLogin) => {
      const response = await apiClient.post('/login', userData, {
        headers: { 'Content-Type': 'application/json' },
      });
      return response.data;
    },

    onSuccess: (data) => {
      console.log(data);
      if (data?.data?.user?.role === 'superadmin') {
        const originalWord = 'WELCOMESUPERADMIN';

        const encryptedWord = encryptData(originalWord);

        localStorage.setItem('_UPLFMMATRIX', data?.data?.token);
        localStorage.setItem('user', JSON.stringify(data?.data?.user));
        localStorage.setItem(
          '_GBLFMATRIX',
          'F1L22S.eLA000c2Vy2N.lIjoic3VwZXJhZG-iJTaG-HVkaW9uZXBhbC5jb20iL'
        );
        localStorage.setItem('_TFDSFUMATRIX', 'HVkaW9uZXBhbC5jb20iL');
        localStorage.setItem('_WBMJEBUJPMMATRIX', encryptedWord);

        toast.success('Login Successfull');
      } else {
        toast.error('Access Denied!!!');
        return;
      }
      // Update React Query cache
      queryClient.setQueryData(['auth'], {
        token: data.token,
        user: data.user,
      });
      queryClient.invalidateQueries({ queryKey: ['login'] });
    },
  });
};
