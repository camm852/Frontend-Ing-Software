import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  CssBaseline,
  Container,
  Modal,
  Backdrop,
  Fade,
} from "@mui/material";
import { Formik } from "formik";
import React from "react";
import Swal from "sweetalert2";
import "../sweetStyle.css";
import { arrayShoe } from "../../assets/ShoesJson/Shoes";

export const ProductListToolbar = () => {
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

  // const hanldAddShoe = (values) => {
  //   arrayShoe.push(values);
  // };

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
          Shoes
        </Typography>
        <Box sx={{ m: 1 }}>
          <Button
            color="primary"
            variant="contained"
            onClick={handleOpen}
            sx={{ fontWeight: "600" }}
          >
            Add Shoe
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
                    code: "",
                    name: "",
                    price: "",
                    stock: "",
                    category: "",
                    supplier: "",
                    description: "",
                    image: "",
                  }}
                  onSubmit={async (values) => {
                    setLoading(true);
                    const body = {
                      code: values.code,
                      name: values.name,
                      price: values.price,
                      stock: values.stock,
                      category: values.category,
                      supplier: values.supplier,
                      description: values.description,
                      image: values.image,
                    };

                    if (!arrayShoe.push(values)) {
                      setLoading(false);
                      Swal.fire({
                        customClass: {
                          container: "my-swal",
                        },
                        title: "Error",
                        text: "Failed to Add Shoe",
                        icon: "error",
                      });
                    } else {
                      Swal.fire({
                        customClass: {
                          container: "my-swal",
                        },
                        title: "God job",
                        text: "Correct Add Shoe",
                        icon: "success",
                        showConfirmButton: false,
                        timer: 1500,
                      });
                      setTimeout(() => {
                        window.location.reload();
                      }, 1500);
                    }

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
                          Add Shoe
                        </Typography>
                        <Box
                          component="form"
                          onSubmit={handleSubmit}
                          sx={{ mt: 1 }}
                        >
                          <Grid container spacing={2}>
                            <Grid item xs={12} sm={4}>
                              <TextField
                                autoComplete="off"
                                name="code"
                                required
                                fullWidth
                                value={values.code}
                                id="code"
                                label="Code"
                                onChange={handleChange}
                                error={touched.code && Boolean(errors.code)}
                                helperText={touched.code && errors.code}
                              />
                            </Grid>
                            <Grid item xs={12} sm={8}>
                              <TextField
                                autoComplete="off"
                                name="name"
                                required
                                fullWidth
                                id="name"
                                value={values.name}
                                label="Name"
                                onChange={handleChange}
                                error={touched.name && Boolean(errors.name)}
                                helperText={touched.name && errors.name}
                              />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <TextField
                                required
                                fullWidth
                                id="price"
                                label="Price"
                                name="price"
                                autoComplete="off"
                                value={values.price}
                                onChange={handleChange}
                                error={touched.price && Boolean(errors.price)}
                                helperText={touched.price && errors.price}
                              />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <TextField
                                required
                                fullWidth
                                id="stock"
                                label="Stock"
                                name="stock"
                                autoComplete="off"
                                value={values.stock}
                                onChange={handleChange}
                                error={touched.stock && Boolean(errors.stock)}
                                helperText={touched.stock && errors.stock}
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <TextField
                                required
                                fullWidth
                                id="category"
                                label="Category"
                                name="category"
                                autoComplete="off"
                                value={values.category}
                                onChange={handleChange}
                                error={
                                  touched.category && Boolean(errors.category)
                                }
                                helperText={touched.category && errors.category}
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <TextField
                                required
                                fullWidth
                                name="supplier"
                                label="Supplier"
                                type="supplier"
                                id="supplier"
                                value={values.supplier}
                                onChange={handleChange}
                                error={
                                  touched.supplier && Boolean(errors.supplier)
                                }
                                helperText={touched.supplier && errors.supplier}
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <TextField
                                required
                                fullWidth
                                name="description"
                                label="Description"
                                type="description"
                                id="description"
                                value={values.description}
                                onChange={handleChange}
                                error={
                                  touched.description &&
                                  Boolean(errors.description)
                                }
                                helperText={
                                  touched.description && errors.description
                                }
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <TextField
                                required
                                fullWidth
                                name="image"
                                label="Image"
                                id="image"
                                value={values.image}
                                onChange={handleChange}
                                error={touched.image && Boolean(errors.image)}
                                helperText={touched.image && errors.image}
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
                            Add Shoe
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
