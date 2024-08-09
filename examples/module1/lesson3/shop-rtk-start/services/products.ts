import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Product } from '../types/Product';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://fakestoreapi.com/', prepareHeaders: (headers) => {
      headers.set('mode', 'no-cors');
      headers.set('Access-Control-Allow-Origin', '*');
      return headers;
    }
  }),
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => 'products',
    })
  })
});

export const { useGetProductsQuery } = productsApi;