import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { authService } from '../service/authService'
import { BASE_URL } from '../config'

const fetchQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers) => {
    headers.set('Content-Type', 'application/json')
  },
})

export async function baseQuery(args, api, extraOptions) {
  const result = await fetchQuery(args, api, extraOptions)
  if (result.error?.status === 401) {
    authService.login()
  }
  return result
}
