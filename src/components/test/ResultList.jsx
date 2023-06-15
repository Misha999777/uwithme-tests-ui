import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {skipToken} from "@reduxjs/toolkit/dist/query";
import {selectTestId, testsActions} from "../../store/tests/testsSlice";
import {useDeleteResultMutation, useFetchResultsQuery} from "../../store/tests/testsApiSlice";
import {Button, Table} from "react-bootstrap";

export default function ResultList() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const selectedTestId = useSelector(selectTestId);

    const {currentData} = useFetchResultsQuery(selectedTestId ?? skipToken);
    const [deleteResult] = useDeleteResultMutation();

    const testSessions = currentData?.map(item => (
        <tr
            key={item.id}
            onClick={() => {
                dispatch(testsActions.resultSelected(item))
                navigate("/result")
            }}
        >
            <td>
                {item.userName}
            </td>
            <td>
                {item.score}
            </td>
            <td>
                {item.elapsedTime}
            </td>
            <td className="text-center">
                <Button
                    variant="red"
                    className="mt-1"
                    onClick={(event) => {
                        event.stopPropagation();
                        deleteResult({testId: selectedTestId, sessionId: item.id})
                    }}
                >
                    <i className="fa fa-trash-o"/>
                </Button>
            </td>
        </tr>
    ));


    return (
        <Table bordered hover>
            <thead>
            <tr>
                <th className="col-6">Імʼя</th>
                <th className="col-2 detail">Бал</th>
                <th className="col-2 detail">Час</th>
                <th className="col-2">Дії</th>
            </tr>
            </thead>
            <tbody>{testSessions}</tbody>
        </Table>
    )
}