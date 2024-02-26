import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "/" }),
  endpoints: (builder) => ({
    getHeroes: builder.query({
      query: () => "/api/heroes",
    }),
  }),
});

const { useGetHeroesQuery } = apiSlice;

export { apiSlice, useGetHeroesQuery };
