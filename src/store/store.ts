import { create } from "zustand"
import { testData } from "../data/data"
import { StorageKeys } from "../enums/StorageKeys"
import { StoreType } from "./StoreType"

const getAnswers = () => {
	const answersInStorage = sessionStorage.getItem(StorageKeys.results)

	return answersInStorage ? JSON.parse(answersInStorage) : []
}

const useTaskStore = create<StoreType>()(set => ({
	testData: testData,
	answers: getAnswers(),
	isStart: Boolean(sessionStorage.getItem(StorageKeys.isStart)) || false,
	setIsStart: v =>
		set(() => {
			if (v) {
				sessionStorage.setItem(StorageKeys.isStart, "1")
				return { isStart: true }
			} else {
				sessionStorage.removeItem(StorageKeys.isStart)
				return { isStart: false }
			}
		}),
	setAnswer: answer =>
		set(state => {
			const newResults = [...state.answers, answer]
			sessionStorage.setItem(StorageKeys.results, JSON.stringify(newResults))
			return { answers: newResults }
		}),
	setInitialState: () =>
		set(() => {
			sessionStorage.clear()
			return {
				isStart: false,
				answers: [],
			}
		}),
}))

export default useTaskStore
