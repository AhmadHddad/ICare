const LoginStyle = (theme) => ({
  inputsContainer: {
    marginTop: theme.spacing(5),
  },
  logo: {
    height: theme.spacing(12),
  },
  modalActions: {
    padding: theme.spacing(2),
    textAlign: "center",
    display: "block",
  },
  logoText: {
    color: theme.palette.primary.main,
    fontWeight: "bold",
    fontSize: 24,
    letterSpacing: 2,
  },
  loginRegister: {
    color: theme.palette.primary.main,
    display: "inline",
    fontWeight: "bolder",
    fontSize: 14,
  },
  switchBase: {
    color: theme.palette.primary.light,
    "&$checked": {
      color: theme.palette.primary.main,
    },
    "&$checked + $track": {
      backgroundColor: theme.palette.primary.main,
    },
  },
});

export default LoginStyle;
