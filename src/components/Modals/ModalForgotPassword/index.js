import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { close } from "../../../redux/slices/modalForgotPass";
import {
  Backdrop,
  Fade,
  Modal,
  Box,
  TextField,
  Typography,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import Swal from "sweetalert2";
import "../../../components/sweetStyle.css";

function ModalForgotpassword() {
  //TODO desquemar datos

  const email = "camm@gmail.com";
  const answerQuestion = "linda";

  const [emailState, setEmailState] = useState("");
  const [confirmEmail, setConfirmEmail] = useState(false);
  const [answerState, setAnswerState] = useState("");
  const [answerConfirm, setAnswerConfirm] = useState(false);
  const [password, setPassword] = useState("");

  const [loadingSearch, setLoadingSearch] = useState(false);
  const [loadingCheck, setLoadingCheck] = useState(false);
  const [loadingChange, setLoadingChange] = useState(false);

  const helpState = useSelector((state) => state.forgotpassword.value);
  const dispatch = useDispatch();

  const handleCloseModalForgotpassword = () => {
    setConfirmEmail(false);
    dispatch(close());
  };

  const handleChangeEmail = (e) => {
    setEmailState(e.target.value);
  };

  const handleChangeAnswer = (e) => {
    setAnswerState(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmitEmail = () => {
    setLoadingSearch(true);
    if (emailState !== email) {
      setLoadingSearch(false);
      Swal.fire({
        customClass: {
          container: "my-swal",
        },
        title: "Error",
        text: `Email does not exist`,
        icon: "error",
      });
    } else {
      setTimeout(() => {
        setConfirmEmail(true);
        setLoadingSearch(false);
      }, 2000);
    }
  };

  const handleSubmitAnswer = (e) => {
    e.preventDefault();
    setLoadingCheck(true);
    if (answerState !== answerQuestion) {
      setLoadingCheck(false);
      Swal.fire({
        customClass: {
          container: "my-swal",
        },
        title: "Error",
        text: `The answer is not correct`,
        icon: "error",
      });
    } else {
      setTimeout(() => {
        setAnswerConfirm(true);
        setLoadingCheck(false);
      }, 2000);
    }
  };

  const handleSubmitPassword = (values) => {
    setLoadingChange(true);
    if (password.length !== 0) {
      Swal.fire({
        customClass: {
          container: "my-swal",
        },
        title: "Good Job",
        text: `Your password have been changed`,
        icon: "success",
      });
      setTimeout(() => {
        setConfirmEmail(true);
        setLoadingSearch(false);
        dispatch(close());
      }, 2000);
    } else {
      setLoadingChange(false);
      Swal.fire({
        customClass: {
          container: "my-swal",
        },
        title: "!Please!",
        text: `Write a password`,
        icon: "error",
      });
    }
  };

  const modalStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "absolute",
    borderRadius: "30px",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={helpState}
      onClose={handleCloseModalForgotpassword}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={helpState}>
        <Box sx={modalStyle}>
          <Box component="form" onSubmit={handleSubmitEmail}>
            <Box>
              <Typography
                component="h2"
                variant="h5"
                sx={{ textAlign: "center" }}
              >
                Enter your email
              </Typography>
              <TextField
                required
                margin="normal"
                name="emailModal"
                id="emailModal"
                label="Email Address"
                autoComplete="off"
                autoFocus
                onChange={handleChangeEmail}
                sx={{ mt: "20px" }}
              />
              <Typography sx={{ textAlign: "center !important" }}>
                <LoadingButton
                  loading={loadingSearch}
                  variant="contained"
                  onClick={handleSubmitEmail}
                  sx={{
                    mt: 1,
                    mb: 2,
                    boxShadow: "none !important",
                    textTransform: "capitalize",
                  }}
                >
                  Search
                </LoadingButton>
              </Typography>
            </Box>
          </Box>
          {confirmEmail && (
            <Box
              component="form"
              sx={{ mt: "30px" }}
              onSubmit={handleSubmitAnswer}
            >
              <Box>
                <Typography
                  component="h2"
                  variant="h6"
                  sx={{ textAlign: "center" }}
                >
                  What is the name of your first pet?
                </Typography>
                <Typography sx={{ textAlign: "center" }}>
                  <TextField
                    margin="normal"
                    name="answer"
                    id="answer"
                    label="Answer"
                    autoComplete="off"
                    autoFocus
                    onChange={handleChangeAnswer}
                    sx={{ mt: "20px" }}
                  />
                </Typography>
                <Typography sx={{ textAlign: "center !important" }}>
                  <LoadingButton
                    loading={loadingCheck}
                    variant="contained"
                    // type="submit"
                    onClick={handleSubmitAnswer}
                    sx={{
                      mt: 1,
                      mb: 2,
                      boxShadow: "none !important",
                      textTransform: "capitalize",
                    }}
                  >
                    Check
                  </LoadingButton>
                </Typography>
              </Box>
            </Box>
          )}
          {answerConfirm && (
            <Box
              component="form"
              sx={{ mt: "30px" }}
              onSubmit={handleSubmitPassword}
            >
              <Box>
                <Typography
                  component="h2"
                  variant="h6"
                  sx={{ textAlign: "center" }}
                >
                  Write the new password
                </Typography>
                <Typography sx={{ textAlign: "center" }}>
                  <TextField
                    type="password"
                    margin="normal"
                    name="passwrod"
                    id="passwrod"
                    label="Password"
                    autoComplete="off"
                    autoFocus
                    onChange={handleChangePassword}
                    sx={{ mt: "20px" }}
                  />
                </Typography>
                <Typography sx={{ textAlign: "center !important" }}>
                  <LoadingButton
                    loading={loadingChange}
                    variant="contained"
                    // type="submit"
                    onClick={handleSubmitPassword}
                    onChange={handleChangePassword}
                    sx={{
                      mt: 1,
                      mb: 2,
                      boxShadow: "none !important",
                      textTransform: "capitalize",
                    }}
                  >
                    Change
                  </LoadingButton>
                </Typography>
              </Box>
            </Box>
          )}
        </Box>
      </Fade>
    </Modal>
  );
}
export default ModalForgotpassword;
