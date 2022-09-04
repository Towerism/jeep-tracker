import { createTheme } from "@mui/material/styles";
import { blue, red, purple } from "@mui/material/colors";

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red.A400,
    },
    background: {
      paper: "#fefefe",
      default: "#f6f6f6",
    },
    neutral: {
      main: blue[100],
    },
    neutral2: {
      main: purple[100],
    },
  },
});

export default theme;
