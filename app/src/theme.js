import { createTheme } from "@mui/material/styles";
import { blue, red, deepPurple } from "@mui/material/colors";

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
      main: blue[200],
    },
    neutral2: {
      main: deepPurple[200],
    },
    neutral3: {
      main: blue[100],
    },
    neutral4: {
      main: deepPurple[100],
    },
  },
});

export default theme;
