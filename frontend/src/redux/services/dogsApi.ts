import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface DogQueryParams {
  page: number;
  count: number;
}

export const dogsApi = createApi({
  reducerPath: "dogsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4200/api/" }),
  endpoints: (build) => ({
    getDogs: build.query<string[], DogQueryParams>({
      query: ({ page, count }) => ({
        url: `dogs`,
        params: {
          page: page,
          count: count,
        },
        providesTags: ["dogsApi"],
      }),
    }),
  }),
});
