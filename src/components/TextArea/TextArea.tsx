import { FormGroup, FormLabel, TextareaAutosize } from "@mui/material"
import { FC } from "react"
import { useParams } from "react-router-dom"
import useCountDownTimer from "../../hooks/useCountDownTimer"
import useTaskStore from "../../store/store"
import { TestResults } from "../../types/TestResults"
import CustomButton from "../CustomButton/CustomButton"

type Props = {
	answer: Omit<TestResults, "time"> | null
	setAnswer: (d: string, id: number, isCheckBox?: boolean) => void
	nextTask: () => void
	placeHolder: string
	maxRowsHeight: number
	minRowsHeight: number
}

const TextArea: FC<Props> = ({
	answer,
	nextTask,
	setAnswer,
	placeHolder,
	maxRowsHeight,
	minRowsHeight,
}) => {
	const { testId = 1 } = useParams()
	const { idFromStorage, answerValuesFromStorage } = useCountDownTimer()
	const dataFromStore = useTaskStore(state => state.testData)
	const { question } = dataFromStore.tests[+testId - 1]
	const isDisabledBtn =
		(answer?.answer ? !!!Object.values(answer.answer).length : true) ||
		idFromStorage === +testId

	return (
		<FormGroup>
			<FormLabel component="legend">{question}</FormLabel>

			<TextareaAutosize
				maxRows={maxRowsHeight}
				minRows={minRowsHeight}
				style={{ outline: "none" }}
				value={
					answerValuesFromStorage
						? answerValuesFromStorage[0]
						: answer?.answer[1] || ""
				}
				placeholder={placeHolder}
				onChange={e => setAnswer(e.currentTarget.value, 1)}
			/>
			<CustomButton
				handleNextTask={() => nextTask()}
				isDisabled={isDisabledBtn}
			/>
		</FormGroup>
	)
}

export default TextArea
