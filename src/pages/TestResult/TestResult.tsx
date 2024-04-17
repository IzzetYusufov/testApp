import { Box, Typography } from "@mui/material"
import { lightGreen } from "@mui/material/colors"
import { StorageKeys } from "../../enums/StorageKeys"
import { TestResults } from "../../types/TestResults"
import {
	answerCont,
	answerStyle,
	answerTitle,
	resultCont,
	resultsCont,
} from "./style"

const TestResult = () => {
	const results: TestResults[] = JSON.parse(
		sessionStorage.getItem(StorageKeys.results) || JSON.stringify([])
	)

	return (
		<Box sx={resultsCont}>
			<Typography variant="h4" color={lightGreen[800]}>
				Ваши ответы:
			</Typography>
			{results.map(res => (
				<Box key={res.id} sx={resultCont}>
					<Box sx={answerTitle}>
						<Typography variant="h6">Ответ № {res.id}</Typography>

						<Typography variant="body2">
							Время потраченное на ответ: {res.time} мин.
						</Typography>
					</Box>

					<Box sx={answerCont}>
						{Object.entries(res.answer).map(answer => {
							const [id, text] = answer
							return (
								<Typography variant="body1" sx={answerStyle} key={answer[0]}>
									{id} - {text}
								</Typography>
							)
						})}
					</Box>
				</Box>
			))}
		</Box>
	)
}
export default TestResult
