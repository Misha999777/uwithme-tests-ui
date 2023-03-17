import {Fragment, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {skipToken} from "@reduxjs/toolkit/dist/query";
import {selectQuestionId, selectTestId} from "../../store/tests/testsSlice";
import {useFetchQuestionQuery, useSaveQuestionMutation} from "../../store/tests/testsApiSlice";
import {Accordion, Button, Form} from "react-bootstrap";
import MarkdownEditor from "../common/MarkdownEditor";
import "../../styles/Question.css"

export default function Question() {
    const navigate = useNavigate();

    const selectedTestId = useSelector(selectTestId);
    const selectedQuestionId = useSelector(selectQuestionId);

    const {currentData} = useFetchQuestionQuery(selectedQuestionId
        ? {testId: selectedTestId, questionId: selectedQuestionId}
        : skipToken);
    const [saveQuestion] = useSaveQuestionMutation();

    const [answers, setAnswers] = useState([]);
    const [text, setText] = useState("");

    useEffect(() => {
        if (!selectedTestId) {
            navigate("/admin")
        }
        setText(currentData?.text ?? "");
        setAnswers(currentData?.answers ?? []);
    }, [currentData, selectedTestId, navigate])

    function answerSelected(id, key, value) {
        const copy = [...answers];
        copy[id] = {...copy[id], [key]: value}

        if (key === "text" && value.length === 0) {
            copy.splice(id, 1)
        }

        setAnswers(copy);
    }

    const answersToRender = [...answers, {}].map((answer, i) => (
        <Accordion.Item key={i.toString()} eventKey={i.toString()}>
            <Accordion.Header>
                <div className={answer.correct ? "answered" : ""}>
                    {answer.text ?? "Додати варіант відповіді"}
                </div>
            </Accordion.Header>
            <Accordion.Body>
                <Form.Group>
                    <Form.Control
                        as="textarea"
                        value={answer.text ?? ""}
                        onChange={(e) => answerSelected(i, "text", e.target.value)}
                    />
                    <Form.Check
                        label={"Правильна"}
                        checked={answer.correct ?? false}
                        onChange={() => answerSelected(i, "correct", !answer.correct ?? false)}
                    />
                </Form.Group>
            </Accordion.Body>
        </Accordion.Item>)
    );

    return (
        <Fragment>
            <Form
                autoComplete="off"
                noValidate
                onSubmit={(event) => {
                    event.preventDefault()
                    saveQuestion({
                        testId: selectedTestId,
                        question: {...currentData, text: text, answers: answers}
                    })
                    navigate("/admin");
                }}
            >
                <Form.Label className="w-100 text-center">
                    Питання
                </Form.Label>
                <MarkdownEditor
                    value={text}
                    onChange={(text) => setText(text)}
                />
                <Accordion>
                    {answersToRender}
                </Accordion>
                <br/>
                <Button
                    variant="purple"
                    className="mb-3 btn-primary"
                    type="submit"
                >
                    Зберегти
                </Button>
            </Form>
        </Fragment>
    );
}