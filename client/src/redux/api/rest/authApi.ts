import { baseApi } from "../restBaseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body: { email: string; password: string }) => ({
        url: "login",
        body,
        method: "POST",
      }),
    }),
    register: builder.mutation({
      query: (body: {
        name: string;
        email: string;
        address: string;
        dob: Date;
        gender: string;
        password: string;
        phone: string;
        referralCode: string;
      }) => ({
        url: "signup",
        body,
        method: "POST",
      }),
    }),
    verifyEmail: builder.mutation({
      query: (body: { verificationToken: string }) => ({
        url: "verify-email",
        body,
        method: "POST",
      }),
    }),
    forgotPassword: builder.mutation({
      query: (body: { email: string }) => ({
        url: "forgot-password",
        body,
        method: "POST",
      }),
    }),
    otpVerification: builder.mutation({
      query: (body: string) => ({
        url: `verifyOTP/${body}`,
        body,
        method: "POST",
      }),
    }),
    resetPassword: builder.mutation({
      query: (body: { newPassword: string }) => ({
        url: "reset-password",
        body,
        method: "POST",
      }),
    }),
    updateProfile: builder.mutation({
      query: (body: {
        name?: string;
        email?: string;
        dob?: Date;
        address?: string;
        gender?: string;
        phone?: string;
        collectedCoupons?: string[];
      }) => ({
        url: "profile/update",
        body,
        method: "PATCH",
      }),
    }),
    changePassword: builder.mutation({
      query: (body: { oldPassword: string; newPassword: string }) => ({
        url: "change-password",
        body,
        method: "POST",
      }),
    }),

    createOrder: builder.mutation<
      any, // Replace 'any' with a specific type if needed
      {
        customer: string;
        shippingAddress: {
          fullname: string;
          address: string;
          landmark: string;
          phone: string;
          email: string;
        };
        billingAddress: {
          fullname: string;
          address: string;
          landmark: string;
          phone: string;
          email: string;
        };
        orderedProducts: {
          product: string;
          quantity: string;
        }[];
        billDetails: {
          subTotalItemPrice: number,
          shippingCost: number,
          discount: number
          ,
          coupon: string,
          totalBill: number,
        };
      }
    >({
      query: (body) => ({
        url: "order",
        body,
        method: "POST",
      }),
    }),

    // ✅ Corrected addCart Mutation (Placed Inside Endpoints)
    addCart: builder.mutation({
      query: (body: {
        user: string;
        products: {
          product: string;
          quantity: number;
          variant: string;
          price: number;
        }[];
      }) => ({
        url: "cart",
        body,
        method: "POST",
      }),
    }),

    updateCart: builder.mutation({
      query: (body: {
        user: string;
        cartID: string;
        products: {
          product: string;
          quantity: number;
          variant: string;
          price: number;
        }[];
      }) => ({
        url: `cart/${body.cartID}`, // Assuming user ID is part of the URL
        body,
        method: "PATCH",
      }),
    }),
    reviewProduct: builder.mutation({
      query: (body: {
        product: string;
        user: string;
        rating: number;
        reviewText: string;
      }) => ({
        url: "review",
        body,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useVerifyEmailMutation,
  useForgotPasswordMutation,
  useOtpVerificationMutation,
  useResetPasswordMutation,
  useUpdateProfileMutation,
  useChangePasswordMutation,
  useCreateOrderMutation,
  useAddCartMutation,
  useUpdateCartMutation,
  useReviewProductMutation
} = authApi;
