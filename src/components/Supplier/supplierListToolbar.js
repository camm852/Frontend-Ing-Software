import {
  Backdrop,
  Box,
  Button,
  Container,
  CssBaseline,
  Fade,
  Grid,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import "../sweetStyle.css";
import React from "react";
import { LoadingButton } from "@mui/lab";
import Swal from "sweetalert2";
import { Formik } from "formik";

export const SupplierListToolbar = () => {
  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
          Suppliers
        </Typography>
        <Box sx={{ m: 1 }}>
          <Button
            color="primary"
            variant="contained"
            sx={{ fontWeight: "600" }}
            onClick={handleOpen}
          >
            Add Supplier
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
                    nit: "",
                    name: "",
                    telephone: "",
                    address: "",
                    city: "",
                  }}
                  onSubmit={async (values) => {
                    setLoading(true);
                    const body = {
                      // userId: values.identification,
                      // userName: `${values.name} ${values.lastName}`,
                      // email: values.email,
                      // password: values.password,
                      // address: values.address,
                      // roleCode: 1,
                      // phone: values.telephone,
                    };
                    // let response = await signUpCall(body);

                    // if (response.status !== 200) {
                    //   setLoading(false);

                    //   Swal.fire({
                    //     customClass: {
                    //       container: "my-swal",
                    //     },
                    //     title: "Error",
                    //     text: "Failed to Add User",
                    //     icon: "error",
                    //   });
                    // } else {
                    //   setLoading(false);

                    //   Swal.fire({
                    //     customClass: {
                    //       container: "my-swal",
                    //     },
                    //     title: "God job",
                    //     text: "Correct Add User",
                    //     icon: "success",
                    //     showConfirmButton: false,
                    //     timer: 1500,
                    //   });
                    //   setTimeout(() => {
                    //     window.location.reload();
                    //   }, 1500);
                    // }
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
                          Add Supplier
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
                                name="nit"
                                required
                                fullWidth
                                value={values.name}
                                id="nit"
                                label="Nit"
                                onChange={handleChange}
                                error={touched.nit && Boolean(errors.nit)}
                                helperText={touched.nit && errors.nit}
                              />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                              <TextField
                                required
                                fullWidth
                                id="name"
                                label="Name"
                                name="name"
                                autoComplete="off"
                                value={values.name}
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
                                name="city"
                                label="City"
                                type="city"
                                id="city"
                                autoComplete="new-password"
                                value={values.city}
                                onChange={handleChange}
                                error={touched.city && Boolean(errors.city)}
                                helperText={touched.city && errors.city}
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
                            Add Supplier
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
