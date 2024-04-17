import { TestData } from "../types/TestData"
import { TestResults } from "../types/TestResults"

export type StoreType = {
	testData: TestData
	answers: TestResults[]
	isStart: boolean
	setAnswer: (answer: TestResults) => void
	setIsStart: (v: boolean) => void
	setInitialState: () => void
}
