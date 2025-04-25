import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { authService } from '../../service/authService'
import { BASE_URL } from '../../config'

export const testsApiSlice = createApi({
  reducerPath: 'testsApi',
  tagTypes: ['Tests', 'Questions', 'Results'],
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      const authResult = authService.getToken()
      headers.set('Authorization', 'Bearer ' + authResult)
      headers.set('Content-Type', 'application/json')
    },
  }),
  endpoints: builder => ({
    fetchTests: builder.query({
      query: () => `/tests`,
      providesTags: ['Tests'],
    }),
    fetchTest: builder.query({
      query: id => `/tests/${id}`,
      providesTags: ['Tests'],
    }),
    saveTest: builder.mutation({
      query: test => ({
        url: `/tests`,
        method: 'POST',
        body: test,
      }),
      invalidatesTags: ['Tests'],
    }),
    deleteTest: builder.mutation({
      query: id => ({
        url: `/tests/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Tests'],
    }),
    fetchQuestions: builder.query({
      query: testId => `/tests/${testId}/questions`,
      providesTags: ['Questions'],
    }),
    fetchQuestion: builder.query({
      query: ({ testId, questionId }) => `/tests/${testId}/questions/${questionId}`,
      providesTags: ['Questions'],
    }),
    saveQuestion: builder.mutation({
      query: ({ testId, question }) => ({
        url: `/tests/${testId}/questions`,
        method: 'POST',
        body: question,
      }),
      invalidatesTags: ['Questions'],
    }),
    deleteQuestion: builder.mutation({
      query: ({ testId, questionId }) => ({
        url: `/tests/${testId}/questions/${questionId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Questions'],
    }),
    fetchResults: builder.query({
      query: testId => `/tests/${testId}/results`,
      providesTags: ['Results'],
    }),
    fetchResult: builder.query({
      query: ({ testId, resultId }) => `/tests/${testId}/results/${resultId}`,
      providesTags: ['Results'],
    }),
    deleteResult: builder.mutation({
      query: ({ testId, sessionId }) => ({
        url: `/tests/${testId}/results/${sessionId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Results'],
    }),
  }),
})

export const {
  useFetchTestsQuery,
  useFetchTestQuery,
  useSaveTestMutation,
  useDeleteTestMutation,
  useFetchQuestionsQuery,
  useFetchQuestionQuery,
  useSaveQuestionMutation,
  useDeleteQuestionMutation,
  useFetchResultsQuery,
  useFetchResultQuery,
  useDeleteResultMutation,
} = testsApiSlice

export const selectAdminLoading = (state) => {
  return Object.values(state.testsApi.queries)
    .concat(Object.values(state.testsApi.mutations))
    .some(query => query.status === 'pending')
}
