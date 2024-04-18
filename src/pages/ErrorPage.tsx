import { useNavigate } from "react-router-dom"
import CustomButton from "../components/CustomButton/CustomButton"

const ErrorPage = () => {
	const navigate = useNavigate()

	return (
		<div className="h-screen w-full flex flex-col justify-center items-center gap-5 z-50">
			<h1>Не верный путь, данной страницы не существует</h1>

			<CustomButton
				handleNextTask={() => () =>
					navigate("/testApp/test", { replace: true })}
				isDisabled={false}
				title="На главную"
			/>
		</div>
	)
}

export default ErrorPage
