import { Button } from "@mui/material"
import { FC } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import useTaskStore from "../../store/store"

type Props = {
	handleNextTask: () => void
	isDisabled: boolean
	title?: string
}

const CustomButton: FC<Props> = ({ handleNextTask, isDisabled, title }) => {
	const { testId = 1 } = useParams()
	const tests = useTaskStore(state => state.testData.tests)
	const isStart = useTaskStore(state => state.isStart)
	const setIsStart = useTaskStore(state => state.setIsStart)
	const setInitialState = useTaskStore(state => state.setInitialState)
	const navigate = useNavigate()
	const { pathname } = useLocation()

	const handleStart = () => {
		setInitialState()
		navigate("/testApp/test/1", { replace: true })
		setIsStart(true)
	}

	const typeOfButton = () => {
		if (!isStart || title) {
			return {
				title: title ? title : "Начать тест",
				func: () => handleStart(),
				style: {},
			}
		}

		if (isStart && +testId === tests.length) {
			return {
				title: "Завершить тест",
				func: handleNextTask,
				style: { width: "200px", alignSelf: "flex-end" },
			}
		}

		return {
			title: "Следующий тест",
			func: handleNextTask,
			style: { width: "200px", alignSelf: "flex-end" },
		}
	}

	return (
		<Button
			variant="contained"
			color="secondary"
			sx={typeOfButton().style}
			onClick={() => typeOfButton().func()}
			disabled={isDisabled && pathname !== "testApp/test"}
		>
			{typeOfButton().title}
		</Button>
	)
}

export default CustomButton
