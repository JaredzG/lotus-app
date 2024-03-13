import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "/" }),
  endpoints: (builder) => ({
    getHeroes: builder.query({
      query: ({ order }) => {
        if (!order) return "/api/heroes";
        return `/api/heroes?order=${order}`;
      },
    }),
    getItems: builder.query({
      query: ({ order }) => {
        if (!order) return "/api/items";
        return `/api/items?order=${order}`;
      },
    }),
  }),
});

const {
  useGetHeroesQuery,
  useLazyGetHeroesQuery,
  useGetItemsQuery,
  useLazyGetItemsQuery,
} = apiSlice;

export {
  apiSlice,
  useGetHeroesQuery,
  useLazyGetHeroesQuery,
  useGetItemsQuery,
  useLazyGetItemsQuery,
};
