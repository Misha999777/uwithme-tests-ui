import { configureStore, createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit'

import { testsApiSlice } from './tests/testsApiSlice'
import { sessionApiSlice } from './session/sessionApiSlice'
import testsSlice from './tests/testsSlice'
import sessionSlice, { initialState, sessionActions } from './session/sessionSlice'

const sessionState = JSON.parse(localStorage.getItem('session'))

export const listenerMiddleware = createListenerMiddleware()
listenerMiddleware.startListening({
  matcher: isAnyOf(
    sessionApiSlice.endpoints.fetchTestSession.matchFulfilled,
    sessionActions.questionSelected,
    sessionActions.answerSelected,
    sessionActions.sessionEnded,
  ),
  effect: (_action, listenerApi) =>
    localStorage.setItem(
      'session',
      JSON.stringify(listenerApi.getState().session),
    ),
})

export const store = configureStore({
  preloadedState: {
    session: sessionState ?? initialState,
  },
  reducer: {
    tests: testsSlice,
    session: sessionSlice,
    [testsApiSlice.reducerPath]: testsApiSlice.reducer,
    [sessionApiSlice.reducerPath]: sessionApiSlice.reducer,
  },
  middleware: getDefaultMiddleware => (
    getDefaultMiddleware().concat(
      listenerMiddleware.middleware,
      testsApiSlice.middleware,
      sessionApiSlice.middleware,
    )
  ),
})
