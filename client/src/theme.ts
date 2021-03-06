import { createMuiTheme } from "@material-ui/core/styles";
const ACCENT_COLOR = "rgb(105, 186, 190)";

// Create a theme instance.
export const theme = createMuiTheme({
  palette: {
    primary: {
      main: ACCENT_COLOR,
    },
    secondary: {
      main: ACCENT_COLOR,
      contrastText: "#fff",
    },
  },
  typography: {
    fontFamily: "Roboto",
    body2: {
      fontFamily: "Roboto",
      marginBottom: "10px",
    },
  },
  shape: {
    borderRadius: 0,
  },
  overrides: {
    MuiChip: {
      root: {
        margin: "0 10px 20px 0",
      },
    },
    MuiCard: {
      root: {
        boxShadow: "none",
      },
    },
    MuiTextField: {
      root: {
        borderColor: ACCENT_COLOR,
        marginBottom: "20px",
        // width: "370px",
        "& .MuiInput-underline:before": {
          borderBottomColor: ACCENT_COLOR,
        },
        "&:hover": {
          borderBottomColor: ACCENT_COLOR,
        },
      },
    },
    MuiNativeSelect: {
      root: {
        color: "#fff",
      },
      icon: {
        color: "#fff",
      },
    },
    MuiButton: {
      root: {
        "&:focus": {
          outline: "none",
        },
      },
    },
    MuiInputLabel: {
      root: {
        color: ACCENT_COLOR,
      },
    },
  },
});
