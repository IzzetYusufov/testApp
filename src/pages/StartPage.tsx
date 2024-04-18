import { Typography } from "@mui/material"
import { FC } from "react"
import CustomButton from "../components/CustomButton/CustomButton"
import useCountDownTimer from "../hooks/useCountDownTimer"

type Props = {
	nextTask: () => void
}

const StartPage: FC<Props> = ({ nextTask }) => {
	const { isStart } = useCountDownTimer()

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
					На выполнение некоторых тестовых заданий будет отведено ограниченное
					количество времени
				</Typography>
			</div>

			<CustomButton handleNextTask={() => nextTask()} isDisabled={!isStart} />
		</div>
	)
}

export default StartPage
