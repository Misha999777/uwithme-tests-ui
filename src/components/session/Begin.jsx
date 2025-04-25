import { useEffect } from 'react'

import { useNavigate, useSearchParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { skipToken } from '@reduxjs/toolkit/query'
import { Alert } from 'react-bootstrap'

import { useFetchTestSessionQuery } from '../../store/session/sessionApiSlice'
import { selectTestId } from '../../store/session/sessionSlice'

export default function Begin() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const selectedTestId = useSelector(selectTestId)

  const urlTestId = searchParams.get('testId')
  const testId = urlTestId ?? selectedTestId

  const { currentData, isError } = useFetchTestSessionQuery(testId ?? skipToken)

  useEffect(() => {
    if (currentData && !currentData.elapsedTime) {
      navigate('/test')
    }
  }, [currentData, navigate])

  if (!testId || isError) {
    return (
      <Alert variant="danger">
        <Alert.Heading>Помилка</Alert.Heading>
        <p>
          Тест не обрано, якщо ви хочете пройти тест - перейдіть за посиланням, котре вам надав викладач
        </p>
        <hr />
      </Alert>
    )
  }

  if (!currentData?.elapsedTime) {
    return
  }

  if (currentData.elapsedTime > currentData.durationMinutes) {
    return (
      <Alert variant="danger">
        <Alert.Heading>Помилка</Alert.Heading>
        <p>
          Ви не завершили тест вчасно, зв'яжіться з викладачем.
        </p>
        <hr />
      </Alert>
    )
  } else {
    return (
      <Alert variant="success">
        <Alert.Heading>Дякуємо</Alert.Heading>
        <p>
          Результати тесту збережено
        </p>
        <hr />
      </Alert>
    )
  }
}
