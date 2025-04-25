import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { authService } from '../../service/authService'
import { BASE_URL } from '../../config'

export const sessionApiSlice = createApi({
  reducerPath: 'sessionApi',
  tagTypes: ['TestSession'],
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      const authResult = authService.getToken()
      headers.set('Authorization', 'Bearer ' + authResult)
      headers.set('Content-Type', 'application/json')
    },
  }),
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
