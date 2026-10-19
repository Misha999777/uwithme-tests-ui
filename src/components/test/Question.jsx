import { useEffect, useRef, useState } from 'react'

import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { skipToken } from '@reduxjs/toolkit/query'
import { Accordion, Button, Form } from 'react-bootstrap'

import { selectQuestionId, selectTestId } from '../../store/tests/testsSlice'
import { useFetchQuestionQuery, useSaveQuestionMutation } from '../../store/tests/testsApiSlice'
import MarkdownEditor from '../common/MarkdownEditor'

export default function Question() {
  const navigate = useNavigate()

  const selectedTestId = useSelector(selectTestId)
  const selectedQuestionId = useSelector(selectQuestionId)

  const { currentData } = useFetchQuestionQuery(
    selectedQuestionId
      ? { testId: selectedTestId, questionId: selectedQuestionId }
      : skipToken,
  )
  const [saveQuestion] = useSaveQuestionMutation()

  const [answers, setAnswers] = useState([])
  const [text, setText] = useState('')
  const nextIdRef = useRef(0)

  useEffect(() => {
    if (!selectedTestId) {
      navigate('/admin')
    }
    setText(currentData?.text ?? '')
    setAnswers((currentData?.answers ?? []).map(a => ({ ...a, id: nextIdRef.current++ })))
  }, [currentData, selectedTestId, navigate])

  function answerSelected(id, key, value) {
    const copy = [...answers]
    copy[id] = {
      id: copy[id]?.id ?? nextIdRef.current++,
      ...copy[id],
      [key]: value,
    }

    if (key === 'text' && value.length === 0) {
      copy.splice(id, 1)
    }

    setAnswers(copy)
  }

  const answersToRender = [...answers, { id: nextIdRef.current }].map((answer, i) => (
    <Accordion.Item key={answer.id} eventKey={answer.id}>
      <Accordion.Header>
        <div className={answer.correct ? 'answered' : ''}>
          {answer.text ?? 'Додати варіант відповіді'}
        </div>
      </Accordion.Header>
      <Accordion.Body>
        <Form.Group>
          <Form.Control
            as="textarea"
            value={answer.text ?? ''}
            onChange={e => answerSelected(i, 'text', e.target.value)}
          />
          <Form.Check
            label="Правильна"
            checked={answer.correct}
            onChange={() => answerSelected(i, 'correct', !answer.correct)}
          />
        </Form.Group>
      </Accordion.Body>
    </Accordion.Item>
  ))

  return (
    <Form
      autoComplete="off"
      noValidate
      onSubmit={(event) => {
        event.preventDefault()
        saveQuestion({
          testId: selectedTestId,
          question: {
            ...currentData,
            text: text,
            answers: answers.map(({ text, correct }) => ({ text, correct })),
          },
        })
        navigate('/admin')
      }}
    >
      <Form.Label className="w-100 text-center">
        Питання
      </Form.Label>
      <MarkdownEditor
        value={text}
        onChange={text => setText(text)}
      />
      <Accordion>
        {answersToRender}
      </Accordion>
      <br />
      <Button
        variant="purple"
        className="mb-3 btn-primary"
        type="submit"
      >
        Зберегти
      </Button>
    </Form>
  )
}
