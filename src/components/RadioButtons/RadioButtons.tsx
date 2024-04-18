import {
	FormControl,
	FormControlLabel,
	FormLabel,
	Radio,
	RadioGroup,
} from "@mui/material"
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
}

const RadioButtons: FC<Props> = ({ answer, setAnswer, nextTask }) => {
	const { testId = 1 } = useParams()
	const { idFromStorage, answerValuesFromStorage } = useCountDownTimer()
	const dataFromStore = useTaskStore(state => state.testData)
	const { question, options = [] } = dataFromStore.tests[+testId - 1]
	const isDisabledBtn =
		(answer?.answer ? !!!Object.values(answer.answer).length : true) ||
		idFromStorage === +testId

	return (
		<FormControl>
			<FormLabel component="legend">{question}</FormLabel>
			<RadioGroup
				aria-labelledby={question}
				name="controlled-radio-buttons-group"
				aria-disabled={idFromStorage === +testId}
				onChange={e => setAnswer(e.currentTarget.value, 1)}
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

				<CustomButton
					handleNextTask={() => nextTask()}
					isDisabled={isDisabledBtn}
				/>
			</RadioGroup>
		</FormControl>
	)
}

export default RadioButtons
