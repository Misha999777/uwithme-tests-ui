import { useEffect, useState } from 'react'

import { useSelector } from 'react-redux'
import { skipToken } from '@reduxjs/toolkit/query'
import { Button, Toast } from 'react-bootstrap'
import Countdown, { zeroPad } from 'react-countdown'

import { useFetchTestSessionQuery, useSaveTestSessionMutation } from '../../store/session/sessionApiSlice'
import { selectAnswers, selectTestId } from '../../store/session/sessionSlice'

import logo from '../../assets/logo32.png'

export default function Timer() {
  const testId = useSelector(selectTestId)
  const userAnswers = useSelector(selectAnswers)

  const { currentData } = useFetchTestSessionQuery(testId ?? skipToken)
  const [saveTestSession, { error }] = useSaveTestSessionMutation()

  const [show, setShow] = useState(false)

  useEffect(() => {
    if (error) {
      setShow(true)
    }
  }, [error])

  const dueDate = new Date(new Date(currentData?.startTime).getTime() + currentData?.durationMinutes * 60_000)

  function renderer({ hours, minutes, seconds }) {
    return (
      <span>
        {zeroPad(hours)}
        :
        {zeroPad(minutes)}
        :
        {zeroPad(seconds)}
      </span>
    )
  }

  return (
    <div className="d-inline-flex flex-column text-center">
      <Countdown
        renderer={renderer}
        date={dueDate}
        onComplete={() => saveTestSession({ ...currentData, userAnswersByQuestionId: userAnswers })}
      />
      <Button
        className="mt-3"
        variant="purple"
        onClick={() => saveTestSession({ ...currentData, userAnswersByQuestionId: userAnswers })}
      >
        Закінчити тест
      </Button>
      <Toast
        className="position-fixed bottom-0 end-0 m-3"
        show={show}
        onClose={() => setShow(false)}
      >
        <Toast.Header>
          <img
            src={logo}
            height="20px"
            className="me-2"
            alt="logo"
          />
          <strong className="me-auto">
            Система тестування
          </strong>
        </Toast.Header>
        <Toast.Body className="text-center">
          Не вдається зберігти результати тесту.
          <br />
          Перевірте ваше інтернет-з'єднання і перезавантажте сторінку.
        </Toast.Body>
      </Toast>
    </div>
  )
}
