import React from "react";
import { Formik } from "formik";
import Swal from "sweetalert2";
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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import "../sweetStyle.css";
import {
  categoryServiceApiCall,
  shoesServiceApiCall,
  supplierServiceCall,
} from "../../utils";

export const ProductListToolbar = () => {
  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [categories, setCategories] = React.useState([{}]);
  const [suppliers, setSuppliers] = React.useState([{}]);
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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(async () => {
    let response = await categoryServiceApiCall();
    if (response.status === 200) {
      let info = await response.json();
      setCategories(info);
    }
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(async () => {
    let response = await supplierServiceCall(null, "list");
    if (response.status === 200) {
      let info = await response.json();
      setSuppliers(info);
    }
  }, []);

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
                    let input = document.querySelector('input[type="file"]');
                    const body = {
                      shoeCode: values.code,
                      shoeName: values.name,
                      price: values.price,
                      stock: values.stock,
                      description: values.description,
                      categoryCode: values.category,
                      supplierNit: values.supplier,
                    };

                    const json = JSON.stringify(body);
                    const blob = new Blob([json], {
                      type: "application/json",
                    });
                    let formData = new FormData();
                    formData.append("shoesRequest", blob);
                    formData.append("image", input.files[0]);

                    let response = await shoesServiceApiCall({
                      form: formData,
                      service: "post",
                    });

                    // let response = await apiCall({
                    //   url: `http://localhost:8080/api/shoes/save`,
                    //   method: "post",
                    //   body: formData,
                    //   headers: {
                    //     Authorization: `Bearer ${myLocalStorage.get("token")}`,
                    //   },
                    // });

                    if (response.status !== 200) {
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
                              <FormControl fullWidth error={false}>
                                <InputLabel id="demo-simple-select-label">
                                  Category
                                </InputLabel>
                                <Select
                                  labelId="demo-simple-select-label"
                                  id="category"
                                  name="category"
                                  value={values.category}
                                  label="Category"
                                  onChange={handleChange}
                                >
                                  {categories.map((category, i) => {
                                    return (
                                      <MenuItem
                                        key={i + 1}
                                        value={category.categoryCode}
                                      >
                                        {category.categoryName}
                                      </MenuItem>
                                    );
                                  })}
                                </Select>
                              </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                              <FormControl fullWidth error={false}>
                                <InputLabel id="demo-simple-select-label">
                                  Supplier
                                </InputLabel>
                                <Select
                                  labelId="demo-simple-select-label"
                                  id="supplier"
                                  name="supplier"
                                  value={values.supplier}
                                  label="Supplier"
                                  onChange={handleChange}
                                >
                                  {suppliers.map((suppliers, i) => {
                                    return (
                                      <MenuItem
                                        key={i + 1}
                                        value={suppliers.supplierNit}
                                      >
                                        {suppliers.supplierName}
                                      </MenuItem>
                                    );
                                  })}
                                </Select>
                              </FormControl>
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
                              <Button
                                variant="contained"
                                component="label"
                                fullWidth
                              >
                                Upload File
                                <input
                                  type="file"
                                  hidden
                                  accept="image/png, image/gif, image/jpeg"
                                />
                              </Button>
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
