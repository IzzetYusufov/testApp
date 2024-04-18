import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { TypeOfButtons } from "../../enums/TypeOfButtons"
import useCountDownTimer from "../../hooks/useCountDownTimer"
import StartPage from "../../pages/StartPage"
import useTaskStore from "../../store/store"
import { TestResults } from "../../types/TestResults"
import CheckBoxButtons from "../CheckBoxButtons/CheckBoxButtons"
import RadioButtons from "../RadioButtons/RadioButtons"
import TextArea from "../TextArea/TextArea"
import "./style.css"

export const QuestionForm = () => {
	const { testId = 1 } = useParams()
	const tests = useTaskStore(state => state.testData.tests)
	const [answer, setAnswer] = useState<Omit<TestResults, "time"> | null>(null)
	const setStoreAnswer = useTaskStore(state => state.setAnswer)
	const navigate = useNavigate()

	const { hours, minutes, seconds, taskTime, isStart } = useCountDownTimer()

	const { type } = useTaskStore(state => state.testData.tests[+testId - 1])

	const handleNextTask = () => {
		if (!answer) {
			setStoreAnswer({
				id: +testId,
				answer: { 1: "Время вышло, ответ не выбран" },
				time: taskTime.toFixed(2),
			})
			if (+testId === tests.length) {
				navigate(`/testApp/result`)
				setAnswer(null)
				return
			} else {
				setAnswer(null)
				navigate(`/testApp/test/${+testId + 1}`)
				return
			}
		}

		const calcTime = taskTime * 60 - (hours * 120 + minutes * 60 + +seconds)
		const transformTime = new Date(0, 0, 0, 0, 0, calcTime)

		const hour =
			transformTime.getHours() > 0 ? `${transformTime.getHours()}.` : ""
		const min =
			transformTime.getMinutes() > 0 ? `${transformTime.getMinutes()}.` : "0."
		const sec =
			transformTime.getSeconds() > 9
				? `${transformTime.getSeconds()}`
				: `0${transformTime.getSeconds()}`

		const resolvedTime = hour + min + sec

		if (+testId === tests.length) {
			setStoreAnswer({ ...answer, time: resolvedTime })
			navigate(`/testApp/result`)
			setAnswer(null)
			return
		}

		setStoreAnswer({ ...answer, time: resolvedTime })
		setAnswer(null)
		navigate(`/testApp/test/${+testId + 1}`)
	}

	useEffect(() => {
		if (hours === 0 && minutes === 0 && +seconds === 0) {
			handleNextTask()
		}
	}, [hours, minutes, +seconds])

	const handleSetAnswer = (
		data: string,
		answerId: number,
		isCheckBox?: boolean
	) => {
		setAnswer(prevForm => {
			if (prevForm && isCheckBox) {
				const updateAnswer = { ...prevForm.answer }

				if (!(answerId in updateAnswer)) {
					updateAnswer[answerId] = data
				} else {
					delete updateAnswer[answerId]
				}
				return { ...prevForm, answer: updateAnswer }
			}

			return {
				id: +testId,
				answer: { [answerId]: data },
			}
		})
	}

	switch (true) {
		case TypeOfButtons.oneAnswer === type && isStart:
			return (
				<RadioButtons
					answer={answer}
					setAnswer={handleSetAnswer}
					nextTask={handleNextTask}
				/>
			)
		case TypeOfButtons.severalAnswer === type && isStart:
			return (
				<CheckBoxButtons
					answer={answer}
					setAnswer={handleSetAnswer}
					nextTask={handleNextTask}
				/>
			)
		case TypeOfButtons.shortAnswer === type && isStart:
		case TypeOfButtons.fullAnswer === type && isStart:
			return (
				<TextArea
					answer={answer}
					setAnswer={handleSetAnswer}
					maxRowsHeight={10}
					minRowsHeight={10}
					nextTask={handleNextTask}
					placeHolder={
						TypeOfButtons.fullAnswer === type
							? "Напишите развернутый ответ, максимум 20 строк"
							: "Напишите короткий ответ, максимум 10 строк"
					}
				/>
			)
		default:
			return <StartPage nextTask={handleNextTask} />
	}
}

export default QuestionForm
