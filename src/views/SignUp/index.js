/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Formik } from "formik";
import Swal from "sweetalert2";
import ReCAPTCHA from "react-google-recaptcha";
import { questionServiceCall, signUpCall } from "../../utils";
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
  Select,
  InputLabel,
  MenuItem,
  FormControl,
  FormHelperText,
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
  const [questions, setQuesitons] = useState([{}]);
  const [captcha, setCaptcha] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorPass, setErrorPass] = useState();
  const [errorIdentification, setErrorIdentification] = useState();
  const [errorEmail, setErrorEmail] = useState();
  const [errorName, setErrorName] = useState();
  const [errorPhone, setErrorPhone] = useState();
  const [errorAddres, setErrorAddres] = useState();
  const [errorQuestion, setErrorQuestion] = useState(false);
  const [errorAnswer, setErrorAnswer] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const userProvide = useAuth();

  //Recapchat
  const handleOnChange = (value) => {
    let chunk = value;
    chunk.length !== 0 ? setCaptcha(false) : setCaptcha(true);
  };

  useEffect(async () => {
    document.title = "Sign Up";
    try {
      let response = await questionServiceCall();
      if (response.status === 200) {
        let data = await response.json();
        setQuesitons(data);
      }
    } catch {
      alert("Error question");
    }
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
        question: "",
        answer: "",
      }}
      onSubmit={async (values) => {
        console.log(values.question);
        const _password = values.password.length;
        const _identification = values.identification.length;
        const _phone = values.telephone.length;
        const _name = values.name.length;
        const _address = values.address.length;
        const _email = values.email;
        const _question = values.question;
        const _answer = values.answer.length;
        if (
          _password >= 8 &&
          4 <= _identification <= 12 &&
          _email.includes("@" && ".com") &&
          _phone === 10 &&
          _address > 5 &&
          _question !== "" &&
          _answer > 0
        ) {
          setLoading(true);
          const body = {
            userId: values.identification,
            userName: `${values.name} ${values.lastName}`,
            email: values.email,
            password: values.password,
            address: values.address,
            phone: values.telephone,
            questionCode: values.question,
            secureAnswer: values.answer,
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
          if (_password === 0) {
            setErrorPass("Required");
          } else {
            if (_password < 8) {
              setErrorPass("Minimum 8 characteres");
            } else {
              setErrorPass();
            }
          }
          if (_identification === 0) {
            setErrorIdentification("Required");
          } else {
            if (4 > _identification && 12 > _identification) {
              setErrorIdentification("Minimum 4 and max 12 characteres");
            } else {
              setErrorIdentification();
            }
          }
          if (_email.length === 0) {
            setErrorEmail("Required");
          } else {
            if (!_email.includes("@" && ".com")) {
              setErrorEmail("Must contain @ and .com");
            } else {
              setErrorEmail();
            }
          }
          if (_name === 0) {
            setErrorName("Required");
          } else {
            if (_name < 3) {
              setErrorName("Minimum 4 characteres");
            } else {
              setErrorName();
            }
          }
          if (_phone === 0) {
            setErrorPhone("Required");
          } else {
            if (_phone < 10) {
              setErrorPhone("Must contain 10 characteres");
            } else {
              setErrorPhone();
            }
          }
          if (_address === 0) {
            setErrorAddres("Required");
          } else {
            if (_address < 5) {
              setErrorAddres("Minimum 5 characters");
            } else {
              setErrorAddres();
            }
          }
          if (_question === "") {
            setErrorQuestion(true);
          } else {
            setErrorQuestion(false);
          }
          if (_answer === 0) {
            setErrorAnswer(true);
          } else {
            setErrorAnswer(false);
          }
        }
      }}
    >
      {({ values, handleChange, handleBlur, handleSubmit }) => (
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
                marginTop: 4,
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
              <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={7}>
                    <TextField
                      autoComplete="off"
                      name="name"
                      fullWidth
                      value={values.name}
                      id="name"
                      label="Full name"
                      onChange={handleChange}
                      error={!!errorName}
                      helperText={!!errorName && errorName}
                    />
                  </Grid>
                  <Grid item xs={12} sm={5}>
                    <TextField
                      autoComplete="off"
                      name="telephone"
                      fullWidth
                      id="telephone"
                      value={values.telephone}
                      label="Telephone"
                      onChange={handleChange}
                      error={!!errorPhone}
                      helperText={!!errorPhone && errorPhone}
                    />
                  </Grid>
                  <Grid item xs={12} sm={5}>
                    <TextField
                      fullWidth
                      id="identification"
                      label="Identification"
                      name="identification"
                      autoComplete="off"
                      value={values.identification}
                      onChange={handleChange}
                      error={!!errorIdentification}
                      helperText={!!errorIdentification && errorIdentification}
                    />
                  </Grid>
                  <Grid item xs={12} sm={7}>
                    <TextField
                      fullWidth
                      id="address"
                      label="Address"
                      name="address"
                      autoComplete="off"
                      value={values.address}
                      onChange={handleChange}
                      error={!!errorAddres}
                      helperText={!!errorAddres && errorAddres}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="off"
                      value={values.email}
                      onChange={handleChange}
                      error={!!errorEmail}
                      helperText={!!errorEmail && errorEmail}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                      onChange={handleChange}
                      value={values.password}
                      error={!!errorPass}
                      helperText={!!errorPass && errorPass}
                    />
                  </Grid>
                  <Grid item xs={12} sm={7}>
                    <FormControl fullWidth error={errorQuestion}>
                      <InputLabel id="demo-simple-select-label">
                        Question
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="question"
                        name="question"
                        value={values.question}
                        label="Question"
                        onChange={handleChange}
                      >
                        {questions.map((question, i) => {
                          return (
                            <MenuItem key={i + 1} value={question.questionCode}>
                              {question.question}
                            </MenuItem>
                          );
                        })}
                      </Select>
                      <FormHelperText>Security question</FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={5}>
                    <TextField
                      fullWidth
                      name="answer"
                      label="Answer"
                      type="text"
                      id="answer"
                      onChange={handleChange}
                      value={values.answer}
                      error={errorAnswer}
                      helperText={errorAnswer && "Required"}
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
