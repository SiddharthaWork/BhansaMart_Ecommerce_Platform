export interface IPushNotification {
  token: string;
  title: string;
  body: {
    orderId?: string;
    location?: string;
  };
  type: string;
  notificationStatus: string;
  user: string;
}
