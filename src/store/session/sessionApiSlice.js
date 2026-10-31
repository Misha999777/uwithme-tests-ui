import { createApi } from '@reduxjs/toolkit/query/react'

import { baseQuery } from '../baseQuery'

export const sessionApiSlice = createApi({
  reducerPath: 'sessionApi',
  tagTypes: ['TestSession'],
  baseQuery,
  endpoints: builder => ({
    fetchTestSession: builder.query({
      query: testId => ({
        url: `/tests/${testId}/sessions`,
        method: 'GET',
      }),
      providesTags: ['TestSession'],
    }),
    saveTestSession: builder.mutation({
      query: testSession => ({
        url: `/tests/${testSession.testId}/sessions`,
        method: 'PUT',
        body: testSession,
      }),
      invalidatesTags: ['TestSession'],
    }),
  }),
})

export const { useFetchTestSessionQuery, useSaveTestSessionMutation } = sessionApiSlice

export const selectSessionLoading = (state) => {
  return Object.values(state.sessionApi.queries)
    .concat(Object.values(state.sessionApi.mutations))
    .some(query => query.status === 'pending')
}
