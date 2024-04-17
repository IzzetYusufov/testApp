import { TypeOfButtons } from "../enums/TypeOfButtons"
import { TestResults } from "./TestResults"

export type Test = {
	id: number
	question: string
	options?: string[]
	type: TypeOfButtons
	time?: number
	answer: TestResults[]
}
