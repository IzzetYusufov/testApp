import { Box, SxProps, Typography } from "@mui/material"
import { grey, orange } from "@mui/material/colors"
import { useEffect } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import "./App.css"
import QuestionForm from "./components/QuestionForm/QuestionForm"
import { StorageKeys } from "./enums/StorageKeys"
import { TypeOfButtons } from "./enums/TypeOfButtons"
import useCountDownTimer from "./hooks/useCountDownTimer"
import useTaskStore from "./store/store"

const isActiveStyle = (currId: number, testId: number, isStart: boolean) => {
	const style: SxProps = {
		width: "80px",
		height: "12px",
		backgroundColor: grey[300],
		transition: "all 0.3s ease",
	}

	if (testId === currId && isStart) {
		style.backgroundColor = orange[900]
	}

	if (testId > currId) {
		style.backgroundColor = grey[900]
	}

	return style
}

function App() {
	const { testId = 1 } = useParams()
	const testsData = useTaskStore(state => state.testData.tests)
	const title = useTaskStore(state => state.testData.title)
	const answers = useTaskStore(state => state.answers)
	const setInitialState = useTaskStore(state => state.setInitialState)
	const navigate = useNavigate()
	const { pathname } = useLocation()
	const {
		hours,
		minutes,
		seconds,
		isStart,
		idFromStorage,
		answerValuesFromStorage,
	} = useCountDownTimer()
	const currentTypeTask = testsData[+testId - 1].type
	const answerFromStorage = answers.slice(-1)[0]
	const remainTime = sessionStorage.getItem(StorageKeys.remainTime)

	useEffect(() => {
		const answersInStorage = sessionStorage.getItem(StorageKeys.results)
		const lastAnswerId =
			answersInStorage && JSON.parse(answersInStorage).slice(-1)[0].id

		console.log("pathname APP Component", pathname)

		if (
			(answersInStorage && lastAnswerId === testsData.length) ||
			pathname === "/testApp/" ||
			pathname === "/testApp/test" ||
			pathname === "/testApp/test/"
		) {
			navigate(`/testApp/test`, { replace: true })
			setInitialState()
			return
		}
	}, [])

	useEffect(() => {
		const timeToSet = hours
			? `${hours}:${minutes}:${seconds}`
			: `${minutes}:${seconds}`
		sessionStorage.setItem(StorageKeys.remainTime, timeToSet)
	}, [isStart, hours, minutes, seconds])

	return (
		<main>
			<div className="task-title">
				<Typography variant="h4">
					Тестирование на тему: <strong>{title}</strong>
				</Typography>

				{isStart && currentTypeTask !== TypeOfButtons.fullAnswer && (
					<div className="task-time">
						{answerValuesFromStorage && answerFromStorage.time}

						{idFromStorage === +testId &&
							!answerValuesFromStorage &&
							remainTime}

						{idFromStorage !== +testId &&
							!answerValuesFromStorage &&
							`${!!hours ? `${hours}:` : ""}${minutes}:${seconds}`}
					</div>
				)}
			</div>

			<div className="task-cells">
				{testsData.map(task => (
					<Box
						key={task.id}
						sx={() => isActiveStyle(task.id, +testId, isStart)}
					></Box>
				))}
			</div>

			<QuestionForm />
		</main>
	)
}

export default App
