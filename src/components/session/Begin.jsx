import {useEffect} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {skipToken} from "@reduxjs/toolkit/query";
import {useFetchTestSessionQuery} from "../../store/session/sessionApiSlice";
import {selectTestId} from "../../store/session/sessionSlice";
import {hasAdminRole} from "../../service/authService";
import {Alert} from "react-bootstrap";

export default function Begin() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const selectedTestId = useSelector(selectTestId);

    const urlTestId = searchParams.get("testId");
    const testId = urlTestId ?? selectedTestId;

    const {currentData, isError} = useFetchTestSessionQuery(testId ?? skipToken);

    useEffect(() => {
        if (currentData && !currentData.elapsedTime) {
            navigate("/test")
        }
        if (!testId && hasAdminRole()) {
            navigate("/admin")
        }
    }, [currentData, testId, navigate])

    if (!testId || isError) {
        return (
            <Alert variant="danger">
                <Alert.Heading>Помилка</Alert.Heading>
                <p>
                    Тест не обрано, якщо ви хочете пройти тест - перейдіть за посиланням, котре вам надав викладач
                </p>
                <hr/>
            </Alert>
        );
    } else if (currentData?.elapsedTime) {
        return (
            <Alert variant="success">
                <Alert.Heading>Дякуємо</Alert.Heading>
                <p>
                    Результати тесту збережено
                </p>
                <hr/>
            </Alert>
        );
    }
}
