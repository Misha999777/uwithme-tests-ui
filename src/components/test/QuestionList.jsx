import {Fragment} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {skipToken} from "@reduxjs/toolkit/dist/query";
import {selectTestId, testsActions} from "../../store/tests/testsSlice";
import {useDeleteQuestionMutation, useFetchQuestionsQuery} from "../../store/tests/testsApiSlice";
import {Button, Table} from "react-bootstrap";

export default function QuestionList() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const selectedTestId = useSelector(selectTestId);

    const {currentData} = useFetchQuestionsQuery(selectedTestId ?? skipToken);
    const [deleteQuestion] = useDeleteQuestionMutation();

    const questions = currentData?.map(item => (
        <tr
            key={item.id}
            onClick={() => {
                dispatch(testsActions.questionSelected(item.id))
                navigate("/question")
            }}
        >
            <td>
                {item.text}
            </td>
            <td className="text-center">
                <Button
                    variant="red"
                    className="mt-1"
                    onClick={(event) => {
                        event.stopPropagation();
                        deleteQuestion({testId: selectedTestId, questionId: item.id})
                    }}
                >
                    <i className="fa fa-trash-o"/>
                </Button>
            </td>
        </tr>
    ));

    return (
        <Fragment>
            <Button
                variant="purple"
                onClick={() => {
                    dispatch(testsActions.questionSelected(null))
                    navigate("/question")
                }}
            >
                Додати питання
            </Button>
            <Table bordered hover className="mt-3">
                <thead>
                <tr>
                    <th className="col-10">Текст питання</th>
                    <th className="col-2">Дії</th>
                </tr>
                </thead>
                <tbody>{questions}</tbody>
            </Table>
        </Fragment>
    )
};