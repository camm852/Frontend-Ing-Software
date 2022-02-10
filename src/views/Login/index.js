import Header from "../../components/Header/Header";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  Avatar,
  Button,
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
import { useEffect, useState } from "react";
import { myLocalStorage, signInCall, tokenInfoCall } from "../../utils";
import { login } from "../../redux/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import userSlice from "../../redux/slices/userSlice";
import store from "../../redux/store";
import { useAuth } from "../../routes/auth-context";

const theme = createTheme({
  typography: {
    fontFamily: {
      fontFamily: "monserrat",
    },
  },
});

export default function Login() {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const userProvider = useAuth();

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Required"),
    password: Yup.string("Enter your password")
      .min(3, "Minimum 3 characters length")
      .required("Password is required"),
  });

  return userProvider.user ? (
    <Navigate to="/" state={{ from: location }} replace />
  ) : (
    <Formik
      validationSchema={validationSchema}
      initialValues={{
        email: "camm@gmail.com",
        password: "camm1234",
      }}
      onSubmit={async (values) => {
        setLoading(true);
        userProvider.signIn(values);
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
          <Container component="main" maxWidth="xs">
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
              <Typography
                component="h1"
                variant="h4"
                sx={{ fontFamily: "Monserrat" }}
              >
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
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="/signUp" variant="body2">
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
