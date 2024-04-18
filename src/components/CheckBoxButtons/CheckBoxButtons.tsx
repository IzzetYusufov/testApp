import { Checkbox, FormControlLabel, FormGroup, FormLabel } from "@mui/material"
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

const CheckBoxButtons: FC<Props> = ({ answer, setAnswer, nextTask }) => {
	const { testId = 1 } = useParams()
	const { idFromStorage, answerValuesFromStorage } = useCountDownTimer()
	const dataFromStore = useTaskStore(state => state.testData)
	const { question, options = [] } = dataFromStore.tests[+testId - 1]
	const isDisabledBtn =
		(answer?.answer ? !!!Object.values(answer.answer).length : true) ||
		idFromStorage === +testId

	return (
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
					onChange={() => setAnswer(opt, i + 1, true)}
				/>
			))}
			<CustomButton
				handleNextTask={() => nextTask()}
				isDisabled={isDisabledBtn}
			/>
		</FormGroup>
	)
}

export default CheckBoxButtons
