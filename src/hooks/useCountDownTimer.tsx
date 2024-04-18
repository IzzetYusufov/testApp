import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { StorageKeys } from "../enums/StorageKeys"
import useTaskStore from "../store/store"

function useCountDownTimer(m?: number, s?: number) {
	const tests = useTaskStore(state => state.testData.tests)
	const answers = useTaskStore(state => state.answers)
	const isStart = useTaskStore(state => state.isStart)
	const { testId = 1 } = useParams()
	const taskTime: number = tests[+testId - 1].time || 60
	const [min, sec] = [m ? m : taskTime, s ? s : 0]
	const idFromStorage = !!answers[+testId - 1] ? answers[+testId - 1].id : null
	const answerValuesFromStorage = !!answers[+testId - 1]
		? Object.values(answers[+testId - 1].answer)
		: null

	const [time, setTime] = useState({
		h: new Date(0, 0, 0, 0, min, sec).getHours(),
		m: new Date(0, 0, 0, 0, min, sec).getMinutes(),
		s: new Date(0, 0, 0, 0, min, sec).getSeconds(),
	})

	const { h: hours, m: minutes, s: seconds } = time

	useEffect(() => {
		if (idFromStorage === +testId) {
			return
		}
		setTime({
			h: new Date(0, 0, 0, 0, taskTime).getHours(),
			m: new Date(0, 0, 0, 0, taskTime).getMinutes(),
			s: new Date(0, 0, 0, 0, taskTime).getSeconds(),
		})
	}, [testId])

	useEffect(() => {
		if (idFromStorage === +testId) {
			return
		}

		let interval: ReturnType<typeof setTimeout> = 0

		if (isStart) {
			interval = setInterval(() => {
				setTime(prev => {
					if (prev.s > 0) {
						return { ...prev, s: prev.s - 1 }
					}
					if (prev.s === 0) {
						if (prev.m === 0) {
							if (prev.h === 0) {
								clearInterval(interval)
								return prev
							} else {
								return { ...prev, h: prev.h - 1, m: 59, s: 59 }
							}
						} else {
							return { ...prev, m: prev.m - 1, s: 59 }
						}
					}
					return prev
				})
			}, 1000)
		} else if (!isStart && time.s !== 0) {
			clearInterval(interval)
		}
		return () => clearInterval(interval)
	}, [hours, minutes, seconds, isStart, taskTime])

	useEffect(() => {
		const timeInStorage = sessionStorage.getItem(StorageKeys.remainTime)

		if (timeInStorage) {
			const [min, sec] = timeInStorage.split(":")
			setTime({
				h: new Date(0, 0, 0, 0, +min, +sec).getHours(),
				m: new Date(0, 0, 0, 0, +min, +sec).getMinutes(),
				s: new Date(0, 0, 0, 0, +min, +sec).getSeconds(),
			})
		}
	}, [])

	return {
		hours,
		minutes,
		seconds: seconds > 9 ? seconds : `0${seconds}`,
		isStart,
		taskTime,
		answerValuesFromStorage,
		idFromStorage,
	}
}

export default useCountDownTimer
