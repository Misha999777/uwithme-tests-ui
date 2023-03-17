import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {skipToken} from "@reduxjs/toolkit/dist/query";
import {useFetchTestSessionQuery, useSaveTestSessionMutation} from "../../store/session/sessionApiSlice";
import {selectAnswers, selectTestId, sessionActions} from "../../store/session/sessionSlice";
import {Button} from "react-bootstrap";
import Countdown, {zeroPad} from "react-countdown";

export default function Timer() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const testId = useSelector(selectTestId);
    const userAnswers = useSelector(selectAnswers);

    const {currentData} = useFetchTestSessionQuery(testId ?? skipToken);
    const [saveTestSession] = useSaveTestSessionMutation();

    useEffect(() => {
        if (currentData?.elapsedTime) {
            dispatch(sessionActions.sessionCompleted());
            navigate("/start?testId=" + testId);
        }
    }, [currentData, testId, dispatch, navigate])

    const dueDate = new Date(new Date(currentData?.startTime).getTime() + currentData?.durationMinutes * 60_000);

    function renderer({hours, minutes, seconds}) {
        return (
            <span>
                {zeroPad(hours)}:{zeroPad(minutes)}:{zeroPad(seconds)}
            </span>
        )
    }

    return (
        <div className="d-inline-flex flex-column text-center">
            <Countdown
                renderer={renderer}
                date={dueDate}
                onComplete={() => saveTestSession({...currentData, userAnswersByQuestionId: userAnswers})}
            />
            <Button
                className="mt-3"
                variant="purple"
                onClick={() => saveTestSession({...currentData, userAnswersByQuestionId: userAnswers})}
            >
                Закінчити тест
            </Button>
        </div>
    );
}