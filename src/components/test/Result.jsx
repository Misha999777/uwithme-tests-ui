import {Fragment, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {skipToken} from "@reduxjs/toolkit/query";
import {selectResultId, selectResultQuestionId, selectTestId, testsActions} from "../../store/tests/testsSlice";
import {useFetchResultQuery} from "../../store/tests/testsApiSlice";
import Paging from "../navigation/Paging";
import QuestionViewer from "../common/QuestionViewer";

export default function Result() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const selectedTestId = useSelector(selectTestId);
    const selectedResultId = useSelector(selectResultId);
    const selectedQuestionId = useSelector(selectResultQuestionId);

    const {currentData} = useFetchResultQuery(selectedResultId
        ? {testId: selectedTestId, resultId: selectedResultId}
        : skipToken);

    useEffect(() => {
        if (!selectedResultId) {
            navigate("/admin")
        }
    }, [selectedResultId, navigate])

    const selectedQuestion = currentData?.questionSnapshots
        ?.find(question => question.id === selectedQuestionId);

    return (
        <Fragment>
            <QuestionViewer
                result
                question={selectedQuestion}
                userAnswers={currentData?.userAnswersByQuestionId}
            />
            <Paging
                result
                questions={currentData?.questionSnapshots}
                selectedQuestion={selectedQuestion}
                userAnswersByQuestionId={currentData?.userAnswersByQuestionId}
                onQuestionSelected={(question) => dispatch(testsActions.resultQuestionSelected(question.id))}
            />
        </Fragment>
    );
}