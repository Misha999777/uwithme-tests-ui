import {Fragment} from "react";
import {Form} from "react-bootstrap";
import MarkdownRenderer from "./MarkdownRenderer";
import "../../styles/Viewer.css";

export default function QuestionViewer({result, question, userAnswers, onAnswerSelected}) {

    const answerOptions = question?.answers.map((answer, i) => (
        <Fragment key={i}>
            <Form.Check
                type={question.multipleChoice ? "checkbox" : "radio"}
                className={answer.correct && "answered"}
                label={answer.text}
                disabled={result}
                checked={userAnswers?.[question.id]?.includes(answer.text) ?? false}
                onChange={() => onAnswerSelected({
                    multipleChoice: question.multipleChoice,
                    questionId: question.id,
                    answer: answer.text
                })}
            />
        </Fragment>
    ));

    return (
        <div className="pt-5 d-flex flex-column align-items-center question">
            <div className="text-center renderer">
                <MarkdownRenderer source={question?.text}/>
            </div>
            <Form.Group>
                {answerOptions}
            </Form.Group>
        </div>
    );
}