import React, { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { signUpCall } from "../../utils";
import Header from "../../components/Header/Header";
import * as Yup from "yup";
import { Formik } from "formik";
import Swal from "sweetalert2";
import { useAuth } from "../../routes/auth-context";
import ReCAPTCHA from "react-google-recaptcha";
import {
  createTheme,
  ThemeProvider,
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
import LoadingButton from "@mui/lab/LoadingButton";

const theme = createTheme({
  typography: {
    fontFamily: {
      fontFamily: "monserrat",
    },
  },
});

export default function SignUp() {
  const [captcha, setCaptcha] = useState(true);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const userProvide = useAuth();

  const handleOnChange = (value) => {
    let chunk = value;
    chunk.length !== 0 ? setCaptcha(false) : setCaptcha(true);
  };

  useEffect(() => {
    document.title = "Sign Up";
  }, []);

  return userProvide.user ? (
    <Navigate to="/" state={{ from: location }} replace />
  ) : (
    <Formik
      initialValues={{
        name: "carlos",
        lastName: "marin",
        email: "camm@gmail.com",
        telephone: "3445678796",
        userId: "1995670030",
        password: "camm",
        address: "calle15679",
        identification: "13333333",
      }}
      onSubmit={async (values) => {
        setLoading(true);
        const body = {
          userId: values.identification,
          userName: `${values.name} ${values.lastName}`,
          email: values.email,
          password: values.password,
          address: values.address,
          phone: values.telephone,
        };
        let response = await signUpCall(body);

        if (response.status !== 200) {
          setLoading(false);
          Swal.fire({
            title: "Error",
            text: "Failed to SignUp",
            icon: "error",
          });
        } else {
          setLoading(false);

          Swal.fire({
            title: "God job",
            text: "Correct autentication",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          });
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        }
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        /* and other goodies */
      }) => (
        <ThemeProvider theme={theme}>
          <Header showSearch={false} />
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 1.5,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Avatar sx={{ m: 0.5, bgcolor: "primary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign up
              </Typography>
              <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="off"
                      name="firstName"
                      required
                      fullWidth
                      value={values.name}
                      id="firstName"
                      label="First Name"
                      onChange={handleChange}
                      error={touched.name && Boolean(errors.name)}
                      helperText={touched.name && errors.name}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      value={values.lastName}
                      autoComplete="family-name"
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="off"
                      name="telephone"
                      required
                      fullWidth
                      id="telephone"
                      value={values.telephone}
                      label="Telephone"
                      onChange={handleChange}
                      error={touched.telephone && Boolean(errors.telephone)}
                      helperText={touched.telephone && errors.telephone}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="identification"
                      label="Identification"
                      name="identification"
                      autoComplete="off"
                      value={values.identification}
                      onChange={handleChange}
                      error={
                        touched.identification && Boolean(errors.identification)
                      }
                      helperText={
                        touched.identification && errors.identification
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="address"
                      label="Address"
                      name="address"
                      autoComplete="off"
                      value={values.address}
                      onChange={handleChange}
                      error={touched.address && Boolean(errors.address)}
                      helperText={touched.address && errors.address}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="off"
                      value={values.email}
                      onChange={handleChange}
                      error={touched.email && Boolean(errors.email)}
                      helperText={touched.email && errors.email}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                      value={values.password}
                      onChange={handleChange}
                      error={touched.password && Boolean(errors.password)}
                      helperText={touched.password && errors.password}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <ReCAPTCHA
                      sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                      onChange={handleOnChange}
                    />
                  </Grid>
                </Grid>
                <LoadingButton
                  disabled={captcha}
                  loading={loading}
                  fullWidth
                  variant="contained"
                  type="submit"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign Up
                </LoadingButton>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link href="/login" variant="body2">
                      Already have an account? Sign in
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
