import { Fragment, useState } from 'react'

import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Button, ListGroup, Toast } from 'react-bootstrap'

import { useFetchTestsQuery } from '../../store/tests/testsApiSlice'
import { selectTestId, testsActions } from '../../store/tests/testsSlice'

import logo from '../../assets/logo32.png'

export default function TestSelector() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const selectedTestId = useSelector(selectTestId)

  const { data } = useFetchTestsQuery()

  const [show, setShow] = useState(false)

  function copyTestUrl() {
    const textarea = document.createElement('textarea')
    textarea.textContent = window.location.origin + '/start?testId=' + selectedTestId

    document.body.appendChild(textarea)
    textarea.select()

    try {
      document.execCommand('copy')
      setShow(true)
    } finally {
      document.body.removeChild(textarea)
    }
  }

  const listItems = data?.map(item => (
    <ListGroup.Item
      className="text-center"
      key={item.name}
      action
      onClick={() => {
        dispatch(testsActions.menuToggled())
        dispatch(testsActions.testSelected(item.id))
        navigate('/admin')
      }}
    >
      {item.name}
    </ListGroup.Item>
  ))

  return (
    <Fragment>
      <div className="pb-3 text-center">
        <Button
          variant="purple"
          onClick={() => copyTestUrl()}
        >
          Створити посилання
        </Button>
      </div>
      <div className="pb-3 text-center">
        <Button
          variant="purple"
          onClick={() => {
            dispatch(testsActions.testSelected(null))
          }}
        >
          Додати тест
        </Button>
      </div>
      <ListGroup className="border w-100">
        {listItems}
      </ListGroup>
      <Toast
        className="position-fixed bottom-0 end-0 m-3"
        show={show}
        delay={3000}
        autohide
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
          Посилання скопійовано
        </Toast.Body>
      </Toast>
    </Fragment>
  )
}
