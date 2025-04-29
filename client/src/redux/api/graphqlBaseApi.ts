import { createApi } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';
import { gql } from 'graphql-request';
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query';

export const api = createApi({
  baseQuery: graphqlRequestBaseQuery({
    url: 'https://api-bhansa.webstudiomatrix.com/graphql',
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      const token = state.configUser?.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => ({
        document: gql`
          query GetAllUsers {
            getAllUsers{
              name
              email
              gender
              phone
            }
          }
        `,
      }),
    }),

    getAllCategories: builder.query({
      query: () => ({
        document: gql`
            query GetAllCategories {
              getAllCategories {
                _id
                name
                description
                isActive
                images
                subCategories {
                    _id
                    name
                    description
                    isActive
                    images
                }
            }
        }
        `,
      })
    }),

    getAllProducts: builder.query({
      query: ({ page, limit }) => ({
        document: gql`
          query GetAllProducts($page: Int, $limit: Int) {
            getAllProducts(pagination: { page: $page, limit: $limit }) {
                totalCount
                hasMore
                currentPage
                totalPages
                products {
                    _id
                    name
                    description
                    sellingPrice
                    sku
                    badges
                    isFeatured
                    featuredPriority
                    metaTitle
                    metaDescription
                    images
                    featuredImage
                    tags
                    status
                    searchKeywords
                    numberOfReviews
                    createdAt
                    updatedAt
                    discountPrice
                    inventoryDetails {
                        unit
                        reorderPoint
                        remainingStock
                        totalStock
                        usedStock
                    }
                    category {
                        _id
                        name
                        description
                        isActive
                        images
                    }
                    subCategory {
                        _id
                        name
                        description
                        isActive
                        images
                    }
                    attributes {
                      name
                      value
                      unit
                      color
                  }
                }
            }
          }
        `,
        variables: {
          page,
          limit,
        }
      }),
    }),

    getProductsBycategory: builder.query({
      query: ({ categoryId, subCategoryId, brandId, page, limit, sortBy, sortOrder }) => ({
        document: gql`
          query GetProductsByCategory($categoryId: ID!, $subCategoryId: ID!, $brandId: ID!, $page: Int, $limit: Int, $sortBy: String, $sortOrder: Int) {
            getProductsByCategory(
                input: {
                    categoryId: $categoryId
                    subCategory: $subCategoryId
                    brand: $brandId
                    page: $page
                    limit: $limit
                    sortBy: $sortBy
                    sortOrder: $sortOrder
                }
            ) {
                totalCount
                hasMore
                currentPage
                totalPages
                products {
                    _id
                    name
                    description
                    sellingPrice
                    discountPrice
                    sku
                    badges
                    isFeatured
                    featuredPriority
                    metaTitle
                    metaDescription
                    images
                    featuredImage
                    tags
                    status
                    searchKeywords
                    createdAt
                    updatedAt
                    inventoryDetails {
                        unit
                        reorderPoint
                        remainingStock
                        totalStock
                        usedStock
                    }
                    category {
                    _id
                    name
                    description
                    isActive
                    images
                    }
                    subCategory {
                        _id
                        name
                        description
                        isActive
                        images
                    }
                    attributes {
                      name
                      value
                      unit
                      color
                  }
                }
            }
          }
        `,
        variables: {
          categoryId,
          subCategoryId,
          brandId,
          page,
          limit,
          sortBy,
          sortOrder
        }
      }),
    }),


    getUser: builder.query({
      query: ({ userId }) => ({
        document: gql`
          query GetUser($userId: String!) {
            getUser(id: $userId) {
              _id
              name
              email
              dob
              gender
              phone
              license
              licenseNumber
              citizenship
              joinDate
              image
              isActive
              referralCode
              role
              lastLogin
              isVerified
              resetPasswordToken
              resetPasswordTokenExpiresAt
              isResetEmailVerified
              verificationToken
              verificationTokenExpiresAt
              address
              loyaltyPoints
              orders {
                _id
                orderedProducts {
                    quantity
                    product {
                      _id
                      name
                      images
                  }
                }  
              }
              collectedCoupons{
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
              }
              usedCoupons{
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
              }
              referredBy {
                  _id
                  name
                  email
              }
              referredUsers {
                _id
                name
                email
              }
              reviews {
                _id
                rating
                reviewText
                isVerified
                createdAt
                updatedAt
                product {
                    _id
                    name
                    images
                }
                user {
                    _id
                    name
                      }
                  }
                }
          }
        `,
        variables: {
          userId,
        },
      }),
    }),
    getCoupons: builder.query({
      query: () => ({
        document: gql`
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
          }`
      })
    }),
    getProduct: builder.query({
      query: (id: string) => ({
        document: gql`
          query GetProduct($id: ID!) {
            getProduct(id: $id) {
              sellingPrice
              discountPrice
              sku
              badges
              isFeatured
              featuredPriority
              metaTitle
              metaDescription
              images
              featuredImage
              tags
              status
              searchKeywords
              createdAt
              updatedAt
              description
              name
              _id
              inventoryDetails {
                  unit
                  reorderPoint
                  remainingStock
                  totalStock
                  usedStock
              }
              brand {
                  _id
                  name
                  isActive
              }
              averageRating
              numberOfReviews
              category {
                  _id
                  name
                  description
                  isActive
                  images
              }
              subCategory {
                  _id
                  name
                  description
                  isActive
                  images
              }
              reviews {
                  _id
                  rating
                  reviewText
                  isVerified
                  createdAt
                  updatedAt
                  product {
                      _id
                  }
                  user {
                      _id
                      name
                  }
              }
              attributes {
                  unit
                  name
                  value
                  color
              }
          
                  }
                }
        `,
        variables: { id }, 
      }),
    }),
    getCartByUser: builder.query({
      query: (userId) => ({
        document: gql`
          query GetCartByUser($userId: ID!) {
            getByUserId(id: $userId) {
              _id
              products {
                quantity
                variant
                product {
                  _id
                  name
                  description
                  sellingPrice
                  sku
                  status
                  tags
                  searchKeywords
                  averageRating
                  numberOfReviews
                  createdAt
                  updatedAt
                  discountPrice
                  attributes {
                    name
                    value
                    unit
                    color
                    price
                    totalStock
                    remainingStock
                    usedStock
                  }
                }
              }
            }
          }
        `,
        variables: { userId }, // Pass the userId
      }),
    }),
    getOrder: builder.query({
      query: ({ id }) => ({
        document: gql`
          query GetOrder($id: ID!) {
            getOrder(id: $id) {
              _id
              orderStatus
              totalAmount
              paymentStatus
              createdAt
              updatedAt
              orderedProducts {
                quantity
                product {
                  _id
                  name
                  description
                  sellingPrice
                  sku
                  badges
                  isFeatured
                  featuredPriority
                  metaTitle
                  metaDescription
                  images
                  featuredImage
                  status
                  tags
                  searchKeywords
                  averageRating
                  numberOfReviews
                  createdAt
                  updatedAt
                  discountPrice
                }
              }
              billDetails {
                subTotalItemPrice
                shippingCost
                discount
                coupon
                totalBill
              }
            }
          }
        `,
        variables: { id },  // Pass the ID as a variable
      }),
    }),
    getCoupon: builder.query({
      query: ({ id }) => ({
        document: gql`query GetCoupon($id: ID!) {
          getCoupon(id: $id) {
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
        }`,
        variables: { id },
      }),
    }),
  })
});

export const {
  useGetAllUsersQuery,
  useGetAllCategoriesQuery,
  useGetAllProductsQuery,
  useGetProductsBycategoryQuery,
  useGetUserQuery,
  useGetCouponsQuery,
  useGetProductQuery,
  useGetCartByUserQuery,
  useGetOrderQuery,
  useGetCouponQuery,
  useLazyGetCouponQuery
} = api;
