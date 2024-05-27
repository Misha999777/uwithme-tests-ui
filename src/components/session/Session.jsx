import {Fragment, useEffect, useRef} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {skipToken} from "@reduxjs/toolkit/query";
import {selectAnswers, selectQuestionId, selectTestId, sessionActions} from "../../store/session/sessionSlice";
import {useFetchTestSessionQuery} from "../../store/session/sessionApiSlice";
import Paging from "../navigation/Paging";
import QuestionViewer from "../common/QuestionViewer";

export default function Session() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const testId = useSelector(selectTestId);
    const selectedQuestionId = useSelector(selectQuestionId);
    const userAnswers = useSelector(selectAnswers);

    const {currentData} = useFetchTestSessionQuery(testId ?? skipToken);

    const lastTestId = useRef()
    if (testId) {
        lastTestId.current = testId;
    }

    useEffect(() => {
        if (!testId) {
            navigate(lastTestId.current ? "/start?testId=" + lastTestId.current : "/start")
        }
    }, [testId, navigate])

    const selectedQuestion = currentData?.questionSnapshots
        ?.find(question => question.id === selectedQuestionId);

    return (
        <Fragment>
            <QuestionViewer
                question={selectedQuestion}
                userAnswers={userAnswers}
                onAnswerSelected={(data) => dispatch(sessionActions.answerSelected(data))}
            />
            <Paging
                questions={currentData?.questionSnapshots}
                selectedQuestion={selectedQuestion}
                userAnswersByQuestionId={userAnswers}
                onQuestionSelected={(question) => dispatch(sessionActions.questionSelected(question.id))}
            />
        </Fragment>
    );
}