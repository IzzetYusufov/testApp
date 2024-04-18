import { TypeOfButtons } from "../src/enums/TypeOfButtons"
import { TestData } from "../src/types/TestData"

export const testData: TestData = {
	title: "React",
	tests: [
		{
			id: 1,
			question: "Что такое JSX в React?",
			options: [
				"Виртуальное представление реального DOM для оптимизации обновлений",
				"Виртуальный сервер для хранения данных",
				"Способ создания анимаций в React",
			],
			type: TypeOfButtons.oneAnswer,
			time: 1,
			answer: [],
		},
		{
			id: 2,
			question: "Какие жизненные методы цикла есть в React?",
			options: [
				"componentDidMount()",
				"componentWillUnmount()",
				"render()",
				"shouldComponentUpdate()",
			],
			type: TypeOfButtons.severalAnswer,
			time: 1,
			answer: [],
		},
		{
			id: 3,
			question: "Что делает метод shouldComponentUpdate()?",
			type: TypeOfButtons.shortAnswer,
			time: 5,
			answer: [],
		},
		{
			id: 4,
			question: "Как передать данные между компонентами в React?",
			type: TypeOfButtons.fullAnswer,
			answer: [],
		},
		{
			id: 5,
			question: "Что такое контекст (context) в React?",
			options: [
				"Механизм передачи данных через дерево компонентов без явной передачи через props",
				"Модуль для управления состоянием приложения",
				"Список всех установленных npm пакетов",
			],
			type: TypeOfButtons.oneAnswer,
			time: 2,
			answer: [],
		},
		{
			id: 6,
			question: "Какие основные преимущества использования React?",
			type: TypeOfButtons.fullAnswer,
			answer: [],
		},
		{
			id: 7,
			question: "Что такое хуки (hooks) в React?",
			options: [
				"Функции, которые позволяют использовать состояние и другие возможности React без написания классов",
				"Список всех доступных HTML атрибутов",
				"Механизм для обработки исключений в React",
			],
			type: TypeOfButtons.oneAnswer,
			time: 2,
			answer: [],
		},
		{
			id: 8,
			question: "Каким образом можно изменить состояние компонента в React?",
			type: TypeOfButtons.fullAnswer,
			answer: [],
		},
		{
			id: 9,
			question: "Какие события можно обрабатывать в React?",
			options: [
				"События ввода данных (например, onChange)",
				"События мыши (например, onClick)",
				"События жизненного цикла компонента (например, componentDidMount)",
			],
			type: TypeOfButtons.severalAnswer,
			time: 2,
			answer: [],
		},
		{
			id: 10,
			question: "Что такое компоненты высшего порядка (HOC) в React?",
			options: [
				"Функции, принимающие компонент и возвращающие новый компонент с дополнительным функционалом",
				"Способ группировки компонентов для оптимизации производительности",
				"Модули для работы с базами данных",
			],
			type: TypeOfButtons.oneAnswer,
			time: 2,
			answer: [],
		},
	],
}
