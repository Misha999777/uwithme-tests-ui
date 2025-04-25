import { Button, Pagination } from 'react-bootstrap'

import '../../styles/Paging.css'

export default function Paging({ result, questions, selectedQuestion, userAnswersByQuestionId, onQuestionSelected }) {

  const nextQuestion = (() => {
    const index = questions?.map(question => question.id)
      .indexOf(selectedQuestion?.id) ?? -1
    if (index < 0) {
      return null
    }

    return questions[index + 1]
  })()

  function getClass(question) {
    const userAnswers = userAnswersByQuestionId?.[question.id]

    if (!result) {
      return userAnswers?.length ? 'answered' : 'wrong'
    }

    const correctAnswers = question.answers
      .filter(answer => answer.correct)
      .map(answer => answer.text)
    const isCorrect = correctAnswers.length === userAnswers?.length
      && correctAnswers.every(answer => userAnswers?.includes(answer))

    return isCorrect ? 'answered' : 'wrong'
  }

  const listItems = questions?.map((item, id) => (
    <Pagination.Item
      key={id}
      active={selectedQuestion?.id === item.id}
      onClick={() => onQuestionSelected(item)}
    >
      <div className={getClass(item)}>
        {id + 1}
      </div>
    </Pagination.Item>
  ))

  return (
    <div className="mt-5 text-center">
      {nextQuestion && (
        <Button
          variant="purple"
          onClick={() => onQuestionSelected(nextQuestion)}
        >
          Наступне питання
        </Button>
      )}
      <Pagination className="flex-wrap justify-content-center mt-3">
        {listItems}
      </Pagination>
    </div>
  )
}
