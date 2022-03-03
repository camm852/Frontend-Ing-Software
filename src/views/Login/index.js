import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useAuth } from "../../routes/auth-context";
import Header from "../../components/Header/index";
import { open } from "../../redux/slices/modalForgotPass";
import ModalForgotpassword from "../../components/Modals/ModalForgotPassword";
import {
  Avatar,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LoadingButton from "@mui/lab/LoadingButton";

const theme = createTheme({
  typography: {
    fontFamily: {
      fontFamily: "monserrat",
    },
  },
});

export default function Login() {
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const userProvider = useAuth();

  const dispatch = useDispatch();

  const handleForgotPass = () => dispatch(open());

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Required"),
    password: Yup.string("Enter your password")
      .min(3, "Minimum 8 characters length")
      .required("Password is required"),
  });

  useEffect(() => {
    document.title = "Sign In";
  }, []);

  return userProvider.user ? (
    <Navigate to="/profile" state={{ from: location }} replace />
  ) : (
    <Formik
      validationSchema={validationSchema}
      initialValues={{
        email: "",
        password: "",
      }}
      onSubmit={async (values) => {
        setLoading(true);
        userProvider.signIn(values);
        setTimeout(() => {
          if (!userProvider.user) setLoading(false);
        }, 1000);
      }}
    >
      {({
        errors,
        touched,
        handleChange,
        handleSubmit,
        values,
        /* and other goodies */
      }) => (
        <ThemeProvider theme={theme}>
          <Header showSearch={false} />
          <Container
            component="main"
            maxWidth="xs"
            sx={{
              minWidth: "600px !important",
            }}
          >
            <CssBaseline />

            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h4">
                Sign in
              </Typography>
              <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  fullWidth
                  name="email"
                  id="email"
                  label="Email Address"
                  autoComplete="off"
                  autoFocus
                  onChange={handleChange}
                  values={values.email}
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                />
                <TextField
                  margin="normal"
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  onChange={handleChange}
                  values={values.password}
                  autoComplete="current-password"
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                />
                <LoadingButton
                  loading={loading}
                  fullWidth
                  variant="contained"
                  type="submit"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </LoadingButton>
                <Grid container>
                  <Grid item xs sx={{}}>
                    <Link
                      href="#"
                      variant="body2"
                      style={{ textDecoration: "none" }}
                      onClick={handleForgotPass}
                    >
                      Forgot password?
                    </Link>
                    <ModalForgotpassword />
                  </Grid>
                  <Grid item>
                    <Link
                      href="/signUp"
                      variant="body2"
                      style={{ textDecoration: "none" }}
                    >
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
      )}
    </Formik>
  );
}
