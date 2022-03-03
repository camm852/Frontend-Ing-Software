import React, { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Formik } from "formik";
import Swal from "sweetalert2";
import ReCAPTCHA from "react-google-recaptcha";
import { signUpCall } from "../../utils";
import Header from "../../components/Header/index";
import { useAuth } from "../../routes/auth-context";
import {
  createTheme,
  ThemeProvider,
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
  const [errorPass, setErrorPass] = useState(false);
  const [errorId, setErrorId] = useState(false);
  const [errorEmail, setErrorEmail] = useState({
    format: false,
    required: false,
  });
  const [errorPhone, setErrorPhone] = useState(false);
  const [errorName, setErrorName] = useState(false);

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
        name: "",
        lastName: "",
        email: "",
        telephone: "",
        userId: "",
        password: "",
        address: "",
        identification: "",
      }}
      onSubmit={async (values) => {
        setLoading(true);
        if (values.email.includes("@" && ".com")) {
          // if (
          //   values.password.length > 8 &&
          //   values.identification.length > 8 &&
          //   values.email.includes("@" && ".com")
          // ) {
          const body = {
            userId: values.identification,
            userName: `${values.name} ${values.lastName}`,
            email: values.email,
            password: values.password,
            address: values.address,
            phone: values.telephone,
            questionCode: 3,
            secureAnswer: "velasques",
          };
          try {
            let response = await signUpCall(body);

            if (response.status !== 200) {
              let payload = await response.json();
              console.log(payload.message);
              setLoading(false);
              Swal.fire({
                title: "Error",
                text: `${payload.message}`,
                icon: "error",
              });
            } else {
              setLoading(false);

              Swal.fire({
                title: "Good job",
                text: "Correct Sign Up",
                icon: "success",
                showConfirmButton: false,
                timer: 1500,
              });
              setTimeout(() => {
                navigate("/login");
              }, 2000);
            }
          } catch {
            setLoading(false);
          }
        } else {
          //   setLoading(false);
          //   setErrorPass(true);
          //   setErrorId(true);
          setErrorEmail({ format: true });
          values.password.length <= 1
            ? setErrorEmail({ required: true })
            : setErrorEmail({ required: false });
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
          <Container
            component="main"
            maxWidth="xs"
            sx={{
              minWidth: "590px !important",
            }}
          >
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
                      name="name"
                      fullWidth
                      value={values.name}
                      id="name"
                      label="Name"
                      onChange={handleChange}
                      // error={touched.name && Boolean(errors.name)}
                      // helperText={touched.name && errors.name}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
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
                      fullWidth
                      id="telephone"
                      value={values.telephone}
                      label="Telephone"
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      id="identification"
                      label="Identification"
                      name="identification"
                      autoComplete="off"
                      value={values.identification}
                      onChange={handleChange}
                      // error={errorId}
                      // helperText={
                      //   errorId &&
                      //   (values.identification.length <= 1
                      //     ? "Required"
                      //     : "Minimum 8 characters length")
                      // }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="address"
                      label="Address"
                      name="address"
                      autoComplete="off"
                      value={values.address}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="off"
                      value={values.email}
                      onChange={handleChange}
                      // error={errorEmail["format"] || errorEmail["required"]}
                      // helperText={
                      //   errorEmail &&
                      //   (values.email.length <= 1
                      //     ? "Required"
                      //     : "Invalid Format")
                      // }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                      onChange={handleChange}
                      value={values.password}
                      // error={errorPass}
                      // helperText={
                      //   errorPass &&
                      //   (values.password.length <= 1
                      //     ? "Required"
                      //     : "Minimum 8 characters length")
                      // }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <ReCAPTCHA
                      sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                      onChange={handleOnChange}
                    />
                  </Grid>
                  {
                    //TODO implementar seleccionar pregunta y contraseña
                    /* <InputLabel id="demo-simple-select-standard-label"></InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                // value={age}
                // onChange={handleChange}
                label="age"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select> */
                  }
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
