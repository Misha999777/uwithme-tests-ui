import { Fragment } from 'react'

import { Form } from 'react-bootstrap'

import MarkdownRenderer from './MarkdownRenderer'

import styles from '../../styles/Viewer.module.css'

export default function QuestionViewer({ result, question, userAnswers, onAnswerSelected }) {

  const answerOptions = question?.answers.map(answer => (
    <Fragment key={answer.text}>
      <Form.Check
        type={question.multipleChoice ? 'checkbox' : 'radio'}
        className={answer.correct && 'answered'}
        label={answer.text}
        disabled={result}
        checked={userAnswers?.[question.id]?.includes(answer.text) ?? false}
        onChange={() => onAnswerSelected({
          multipleChoice: question.multipleChoice,
          questionId: question.id,
          answer: answer.text,
        })}
      />
    </Fragment>
  ))

  return (
    <div className={`pt-5 d-flex ${styles.question}`}>
      <div className={`text-center ${styles.renderer}`}>
        <MarkdownRenderer source={question?.text} />
      </div>
      <Form.Group>
        {answerOptions}
      </Form.Group>
    </div>
  )
}
