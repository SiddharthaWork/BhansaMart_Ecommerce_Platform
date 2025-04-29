import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../utils/ApiGateway';
import { toast } from 'react-toastify';
import { IPushNotification } from '@/(___types)';

export const useCreateSendPushNotification = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (notificationData: IPushNotification) =>
      apiClient.post('push-notification', notificationData),
    onError: (error: any) => {
      toast.error('Something went wrong');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['push-notification'] });
      toast.success('Notification send Succesfully');
    },
  });
};

export const useCreateSendBulkPushNotification = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (notificationData: IPushNotification) =>
      apiClient.post('push-notification', notificationData),
    onError: (error: any) => {
      toast.error('Something went wrong');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['push-notification'] });
      toast.success('Notification send Succesfully');
    },
  });
};
