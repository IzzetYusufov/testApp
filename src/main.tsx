import { ThemeProvider } from "@emotion/react"
import { createTheme } from "@mui/material"
import { green, grey } from "@mui/material/colors"
import ReactDOM from "react-dom/client"
import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from "react-router-dom"
import App from "./App"
import QuestionForm from "./components/QuestionForm/QuestionForm"
import "./index.css"
import ErrorPage from "./pages/ErrorPage"
import TestResult from "./pages/TestResult/TestResult"

const colors = {
	primary: { main: grey[900] },
	secondary: { main: green[800] },
}

export const theme = createTheme({
	palette: {
		primary: colors.primary,
		secondary: colors.secondary,
		info: colors.secondary,
	},
	components: {
		MuiTypography: {
			styleOverrides: {
				h4: {
					color: colors.primary.main,
					fontWeight: 900,
				},
			},
		},
		MuiCheckbox: {
			styleOverrides: {
				root: {
					color: colors.secondary.main,
				},
			},
		},
		MuiSvgIcon: {
			styleOverrides: {
				root: {
					fill: colors.secondary.main,
				},
			},
		},
		MuiFormLabel: {
			styleOverrides: {
				root: {
					color: colors.primary.main,
					marginBottom: "20px",
					marginLeft: "9px",
					fontSize: "20px",
					fontWeight: 700,
				},
			},
			defaultProps: {
				focused: false,
			},
		},
		MuiFormControlLabel: {
			styleOverrides: {
				root: {
					display: "flex",
					margin: 0,
					marginBottom: "10px",
					alignItems: "center",
				},
			},
		},
		MuiRadio: {
			styleOverrides: {
				root: {
					color: colors.secondary.main,
					padding: "0 9px",

					"&.Mui-checked": {
						color: colors.secondary.main,
					},
				},
			},
		},
	},
})

export const router = createBrowserRouter(
	createRoutesFromElements(
		<>
			<Route path="/testApp/" element={<App />} errorElement={<ErrorPage />}>
				<Route path="test" element={<App />}>
					<Route
						path=":testId"
						element={<QuestionForm />}
						errorElement={<ErrorPage />}
					/>
				</Route>
			</Route>
			<Route path="/testApp/result" element={<TestResult />} />
		</>
	)
)

ReactDOM.createRoot(document.getElementById("root")!).render(
	<ThemeProvider theme={theme}>
		<RouterProvider router={router} />
	</ThemeProvider>
)
