import { Fragment, useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { skipToken } from '@reduxjs/toolkit/query'
import { useNavigate } from 'react-router-dom'
import { Button, Form } from 'react-bootstrap'

import { selectTestId, testsActions } from '../../store/tests/testsSlice'
import { useDeleteTestMutation, useFetchTestQuery, useSaveTestMutation } from '../../store/tests/testsApiSlice'
import { hasAdminRole } from '../../service/authService'
import QuestionList from './QuestionList'
import TestSessionList from './ResultList'

import '../../styles/Test.css'

export default function Test() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const selectedTestId = useSelector(selectTestId)

  const { currentData } = useFetchTestQuery(selectedTestId ?? skipToken)
  const [saveTest] = useSaveTestMutation()
  const [deleteTest] = useDeleteTestMutation()

  const [name, setName] = useState('')
  const [questionsNumber, setQuestionsNumber] = useState('')
  const [durationMinutes, setDurationMinutes] = useState('')

  useEffect(() => {
    if (!hasAdminRole()) {
      navigate('/start')
    }
    setName(currentData?.name ?? '')
    setQuestionsNumber(currentData?.questionsNumber ?? '')
    setDurationMinutes(currentData?.durationMinutes ?? '')
  }, [currentData, navigate])

  return (
    <Fragment>
      <Form autoComplete="off" noValidate>
        <Form.Label className="w-100 text-center">
          Налаштування тесту
        </Form.Label>
        <Form.Label>
          Назва
        </Form.Label>
        <Form.Control
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <Form.Label>
          Кількість питань
        </Form.Label>
        <Form.Control
          type="text"
          value={questionsNumber}
          onChange={e => setQuestionsNumber(e.target.value)}
        />
        <Form.Label>
          Тривалість тесту
        </Form.Label>
        <Form.Control
          type="text"
          value={durationMinutes}
          onChange={e => setDurationMinutes(e.target.value)}
        />
        <Button
          className="mt-3"
          variant="purple"
          onClick={() => saveTest({
            ...currentData,
            name: name,
            durationMinutes: durationMinutes,
            questionsNumber: questionsNumber,
          })}
        >
          {selectedTestId ? 'Зберегти' : 'Створити'}
        </Button>
        {selectedTestId && (
          <Button
            className="mt-3 ms-3"
            variant="red"
            onClick={() => {
              dispatch(testsActions.testSelected(null))
              deleteTest(selectedTestId)
            }}
          >
            Видалити тест
          </Button>
        )}
      </Form>
      <hr />
      {selectedTestId && (
        <Fragment>
          <QuestionList />
          <hr />
          <TestSessionList />
        </Fragment>
      )}
    </Fragment>
  )
}
