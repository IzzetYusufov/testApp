import {
	Checkbox,
	FormControl,
	FormControlLabel,
	FormGroup,
	FormLabel,
	Radio,
	RadioGroup,
	TextareaAutosize,
	Typography,
} from "@mui/material"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { TypeOfButtons } from "../../enums/TypeOfButtons"
import useCountDownTimer from "../../hooks/useCountDownTimer"
import useTaskStore from "../../store/store"
import { TestResults } from "../../types/TestResults"
import CustomButton from "../CustomButton/CustomButton"
import "./style.css"

export const QuestionForm = () => {
	const { testId = 1 } = useParams()
	const tests = useTaskStore(state => state.testData.tests)
	const [answer, setAnswer] = useState<Omit<TestResults, "time"> | null>(null)
	const setStoreAnswer = useTaskStore(state => state.setAnswer)
	const navigate = useNavigate()
	const {
		hours,
		minutes,
		seconds,
		taskTime,
		isStart,
		answerValuesFromStorage,
		idFromStorage,
	} = useCountDownTimer()
	const {
		question,
		type,
		options = [],
	} = useTaskStore(state => state.testData.tests[+testId - 1])
	const isDisabledBtn =
		(answer?.answer ? !!!Object.values(answer.answer).length : true) ||
		idFromStorage === +testId

	const handleNextTask = () => {
		if (!answer) {
			return
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
		navigate(`/testApp/test/${+testId + 1}`, { replace: true })
	}

	useEffect(() => {
		if (hours === 0 && minutes === 0 && +seconds === 0) {
			handleNextTask()
		}
	}, [hours, minutes, +seconds, answer])

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
				<>
					<FormControl>
						<FormLabel component="legend">{question}</FormLabel>
						<RadioGroup
							aria-labelledby={question}
							name="controlled-radio-buttons-group"
							aria-disabled={idFromStorage === +testId}
							onChange={e => handleSetAnswer(e.currentTarget.value, 1)}
							value={
								answerValuesFromStorage
									? answerValuesFromStorage[0]
									: answer?.answer[1] || ""
							}
						>
							{options?.map(opt => (
								<FormControlLabel
									control={<Radio />}
									label={opt}
									value={opt}
									key={opt}
									disabled={idFromStorage === +testId}
								/>
							))}
						</RadioGroup>
					</FormControl>

					<CustomButton
						handleNextTask={() => handleNextTask()}
						isDisabled={isDisabledBtn}
					/>
				</>
			)
		case TypeOfButtons.severalAnswer === type && isStart:
			return (
				<>
					<FormGroup>
						<FormLabel component="legend">{question}</FormLabel>

						{options?.map((opt, i) => (
							<FormControlLabel
								control={
									<Checkbox
										checked={
											answerValuesFromStorage
												? answerValuesFromStorage.includes(opt)
												: !!answer?.answer[i + 1]
										}
										disabled={idFromStorage === +testId}
									/>
								}
								label={opt}
								key={opt}
								onChange={() => handleSetAnswer(opt, i + 1, true)}
							/>
						))}
						<CustomButton
							handleNextTask={() => handleNextTask()}
							isDisabled={isDisabledBtn}
						/>
					</FormGroup>
				</>
			)
		case TypeOfButtons.shortAnswer === type && isStart:
		case TypeOfButtons.fullAnswer === type && isStart:
			return (
				<>
					<FormLabel component="legend">{question}</FormLabel>

					<TextareaAutosize
						maxRows={10}
						minRows={10}
						style={{ outline: "none" }}
						value={
							answerValuesFromStorage
								? answerValuesFromStorage[0]
								: answer?.answer[1] || ""
						}
						placeholder={
							TypeOfButtons.fullAnswer === type
								? "Напишите развернутый ответ, максимум 20 строк"
								: "Напишите короткий ответ, максимум 10 строк"
						}
						onChange={e => handleSetAnswer(e.currentTarget.value, 1)}
					/>
					<CustomButton
						handleNextTask={() => handleNextTask()}
						isDisabled={isDisabledBtn}
					/>
				</>
			)
		default:
			return (
				<div className="initial">
					<div className="initial-instructions">
						<Typography variant="h5" className="initial-title">
							Добро пожаловать!
						</Typography>
						<Typography className="initial-start">
							Что бы начать прохождение теста нажмите на кнопку "Начать тест"
						</Typography>
						<Typography className="initial-rules">
							На выполнение некоторых тестовых заданий будет отведено
							ограниченное количество времени
						</Typography>
					</div>

					<CustomButton
						handleNextTask={() => handleNextTask()}
						isDisabled={!isStart}
					/>
				</div>
			)
	}
}

export default QuestionForm
