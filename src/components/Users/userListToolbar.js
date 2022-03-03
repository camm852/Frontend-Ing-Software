import React from "react";
import { Formik } from "formik";
import { signUpCall } from "../../utils";
import SearchIcon from "@mui/icons-material/Search";
import LoadingButton from "@mui/lab/LoadingButton";
import Swal from "sweetalert2";
import "../sweetStyle.css";
import {
  Box,
  Button,
  Backdrop,
  TextField,
  Modal,
  Fade,
  Typography,
  Grid,
  Container,
  CssBaseline,
} from "@mui/material";

const style = {
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

export const UserListToolbar = () => {
  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box sx={{ mb: 2 }}>
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          m: -1,
        }}
      >
        <Typography
          sx={{
            m: 1,
            fontFamily: "Roboto Serif, sans-serif",
            fontWeight: "Bold",
          }}
          variant="h4"
        >
          Users
        </Typography>
        <Box sx={{ m: 1 }}>
          <Button
            color="primary"
            variant="contained"
            onClick={handleOpen}
            sx={{ fontWeight: "600" }}
          >
            Add User
          </Button>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={open}>
              <Box sx={style}>
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
                    const body = {
                      userId: values.identification,
                      userName: `${values.name} ${values.lastName}`,
                      email: values.email,
                      password: values.password,
                      address: values.address,
                      roleCode: 1,
                      phone: values.telephone,
                      questionCode: 3,
                      secureAnswer: "velasques",
                    };
                    let response = await signUpCall(body);

                    if (response.status !== 200) {
                      setLoading(false);
                      let payload = await response.json();

                      Swal.fire({
                        customClass: {
                          container: "my-swal",
                        },
                        title: "Error",
                        text: `${payload.message}`,
                        icon: "error",
                      });
                    } else {
                      setLoading(false);

                      Swal.fire({
                        customClass: {
                          container: "my-swal",
                        },
                        title: "God job",
                        text: "Correct Add User",
                        icon: "success",
                        showConfirmButton: false,
                        timer: 1500,
                      });
                      setTimeout(() => {
                        window.location.reload();
                      }, 1500);
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
                    <Container component="main" maxWidth="xs">
                      <CssBaseline />
                      <Box
                        sx={{
                          marginTop: 3,
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Typography
                          component="h1"
                          variant="h5"
                          sx={{ fontWeight: "600", mb: "10px" }}
                        >
                          Add User
                        </Typography>
                        <Box
                          component="form"
                          onSubmit={handleSubmit}
                          sx={{ mt: 1 }}
                        >
                          <Grid container spacing={2}>
                            <Grid item xs={12} sm={12}>
                              <TextField
                                autoComplete="off"
                                name="name"
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
                            <Grid item xs={12} sm={12}>
                              <TextField
                                autoComplete="off"
                                name="telephone"
                                required
                                fullWidth
                                id="telephone"
                                value={values.telephone}
                                label="Telephone"
                                onChange={handleChange}
                                error={
                                  touched.telephone && Boolean(errors.telephone)
                                }
                                helperText={
                                  touched.telephone && errors.telephone
                                }
                              />
                            </Grid>
                            <Grid item xs={12} sm={12}>
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
                                  touched.identification &&
                                  Boolean(errors.identification)
                                }
                                helperText={
                                  touched.identification &&
                                  errors.identification
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
                                error={
                                  touched.address && Boolean(errors.address)
                                }
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
                                error={
                                  touched.password && Boolean(errors.password)
                                }
                                helperText={touched.password && errors.password}
                              />
                            </Grid>
                          </Grid>
                          <LoadingButton
                            loading={loading}
                            fullWidth
                            variant="contained"
                            type="submit"
                            sx={{ mt: 3, mb: 2, fontWeight: "600" }}
                          >
                            Add User
                          </LoadingButton>
                        </Box>
                      </Box>
                    </Container>
                  )}
                </Formik>
              </Box>
            </Fade>
          </Modal>
        </Box>
      </Box>
    </Box>
  );
};
