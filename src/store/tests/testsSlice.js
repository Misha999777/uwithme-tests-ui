import { createSlice } from '@reduxjs/toolkit'

import { testsApiSlice } from './testsApiSlice'

export const initialState = {
  isMenuOpened: false,
  selectedTestId: null,
  selectedQuestionId: null,
  selectedResultId: null,
  selectedResultQuestionId: null,
}

export const testsSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    menuToggled: (state) => {
      state.isMenuOpened = !state.isMenuOpened
    },
    testSelected: (state, { payload }) => {
      state.selectedTestId = payload
    },
    questionSelected: (state, { payload }) => {
      state.selectedQuestionId = payload
    },
    resultSelected: (state, { payload }) => {
      state.selectedResultId = payload.id
      state.selectedResultQuestionId = payload.questionSnapshots?.[0]?.id
    },
    resultQuestionSelected: (state, { payload }) => {
      state.selectedResultQuestionId = payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(testsApiSlice.endpoints.fetchTests.matchFulfilled, (state, { payload }) => {
        if (!state.selectedTestId) {
          state.selectedTestId = payload[0]?.id
        }
      })
  },
})

export const testsActions = testsSlice.actions

export const selectIsMenuOpened = state => state.tests.isMenuOpened
export const selectTestId = state => state.tests.selectedTestId
export const selectQuestionId = state => state.tests.selectedQuestionId
export const selectResultId = state => state.tests.selectedResultId
export const selectResultQuestionId = state => state.tests.selectedResultQuestionId

export default testsSlice.reducer
