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
  }),
});

const { useGetHeroesQuery } = apiSlice;

export { apiSlice, useGetHeroesQuery };
