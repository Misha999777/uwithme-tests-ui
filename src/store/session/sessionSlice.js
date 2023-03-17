import {createSlice} from "@reduxjs/toolkit";
import {sessionApiSlice} from "./sessionApiSlice";

export const initialState = {
    selectedTestId: null,
    selectedQuestionId: null,
    userAnswersByQuestionId: null
};

export const sessionSlice = createSlice({
    name: "session",
    initialState,
    reducers: {
        questionSelected: (state, {payload}) => {
            state.selectedQuestionId = payload;
        },
        answerSelected: (state, {payload}) => {
            let userAnswers = state.userAnswersByQuestionId?.[payload.questionId] ?? []

            if (payload.multipleChoice) {
                if (userAnswers.includes(payload.answer)) {
                    userAnswers = userAnswers.filter(value => value !== payload.answer);
                } else {
                    userAnswers.push(payload.answer);
                }
            } else {
                userAnswers = [payload.answer];
            }

            state.userAnswersByQuestionId = {...state.userAnswersByQuestionId, [payload.questionId]: userAnswers};
        },
        sessionCompleted: (state) => {
            state.selectedTestId = null;
            state.selectedQuestionId = null;
            state.userAnswersByQuestionId = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(sessionApiSlice.endpoints.fetchTestSession.matchFulfilled, (state, {payload}) => {
                state.selectedTestId = payload.testId;
                state.selectedQuestionId = state.selectedQuestionId ?? payload.questionSnapshots[0].id;
            })
    }
});

export const sessionActions = sessionSlice.actions;

export const selectTestId = (state) => state.session.selectedTestId;
export const selectQuestionId = (state) => state.session.selectedQuestionId;
export const selectAnswers = (state) => state.session.userAnswersByQuestionId;

export default sessionSlice.reducer;