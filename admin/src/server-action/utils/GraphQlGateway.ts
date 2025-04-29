import { request, ClientError, gql } from 'graphql-request';

const local = 'http://localhost:8080/graphql';
// Configure GraphQL endpoint from environment variables
const GRAPHQL_ENDPOINT = `${import.meta.env.VITE_API_BASE_URL}graphql`;

type GraphQLRequestConfig = {
  token?: string;
  headers?: Record<string, string>;
};

const getHeaders = (config?: GraphQLRequestConfig) => ({
  'Content-Type': 'application/json',
  Authorization: config?.token ? `Bearer ${config.token}` : '',
  ...config?.headers,
});

export const graphqlClient = async <T>(
  document: string,
  variables?: any,
  config?: GraphQLRequestConfig
): Promise<T> => {
  const token = localStorage.getItem('_UPLFMMATRIX') ?? '';

  // Remove the custom cache implementation since TanStack Query handles caching
  try {
    const response = await request<T>(
      GRAPHQL_ENDPOINT,
      document,
      variables,
      getHeaders({ ...config, token })
    );
    return response;
  } catch (error) {
    if (error instanceof ClientError) {
      if (error.response.status === 401) {
        localStorage.removeItem('token');
        const redirectPath = encodeURIComponent(window.location.pathname);
        window.location.href = `/auth-login?redirect=${redirectPath}`;
        // Return empty promise to prevent error propagation after redirect
        return new Promise(() => {});
      }
      throw new Error(error.message);
    }
    throw error;
  }
};

export { gql };
