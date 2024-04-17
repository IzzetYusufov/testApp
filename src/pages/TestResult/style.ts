import { SxProps, Theme } from "@mui/material"
import { grey, lightGreen } from "@mui/material/colors"

export const resultsCont: SxProps<Theme> = {
	display: "flex",
	flexDirection: "column",
	gap: "20px",
	mb: "20px",
}

export const resultCont: SxProps<Theme> = {
	background: lightGreen[400],
	borderRadius: "8px",
}

export const answerTitle: SxProps<Theme> = {
	display: "flex",
	flexDirection: "column",
	p: 1,
	pl: 2,
	mb: 1,
	color: grey[100],
	bgcolor: lightGreen[800],
	border: 0,
	borderRadius: "8px",
}

export const answerCont: SxProps<Theme> = { p: 2 }

export const answerStyle: SxProps<Theme> = { mb: 1, bgcolor: lightGreen }
