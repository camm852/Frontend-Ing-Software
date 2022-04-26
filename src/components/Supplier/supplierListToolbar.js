import {
  Backdrop,
  Box,
  Button,
  Container,
  CssBaseline,
  Fade,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import "../sweetStyle.css";
import React from "react";
import { LoadingButton } from "@mui/lab";
import Swal from "sweetalert2";
import { Formik } from "formik";
import { cityServiceCall, supplierServiceCall } from "../../utils";

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

export const SupplierListToolbar = () => {
  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [cities, setCities] = React.useState([{}]);

  React.useEffect(() => {
    const getAllCities = async () => {
      let response = await cityServiceCall();
      if (response.status === 200) {
        let data = await response.json();
        setCities(data);
      }
    };
    getAllCities();
  }, []);

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
                    phone: "",
                    address: "",
                    city: "",
                  }}
                  onSubmit={async (values) => {
                    setLoading(true);
                    const body = {
                      supplierNit: values.nit,
                      supplierName: values.name,
                      supplierAddress: values.address,
                      phone: values.phone,
                      cityCode: values.city,
                    };
                    try {
                      let response = await supplierServiceCall(body, "add");

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
                          text: "Correct Add Supplier",
                          icon: "success",
                          showConfirmButton: false,
                          timer: 1500,
                        });
                        setTimeout(() => {
                          window.location.reload();
                        }, 1500);
                      }
                    } catch {
                      setLoading(false);
                    }
                  }}
                >
                  {({
                    values,
                    handleChange,
                    handleBlur,
                    handleSubmit,
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
                                value={values.nit}
                                id="nit"
                                label="Nit"
                                onChange={handleChange}
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
                              />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                              <TextField
                                autoComplete="off"
                                name="phone"
                                required
                                fullWidth
                                id="phone"
                                value={values.phone}
                                label="Telephone"
                                onChange={handleChange}
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
                              />
                            </Grid>

                            <Grid item xs={12} sm={12}>
                              <FormControl fullWidth error={false}>
                                <InputLabel id="demo-simple-select-label">
                                  City
                                </InputLabel>
                                <Select
                                  labelId="demo-simple-select-label"
                                  id="city"
                                  name="city"
                                  value={values.city}
                                  label="City"
                                  onChange={handleChange}
                                >
                                  {cities.map((city, i) => {
                                    return (
                                      <MenuItem
                                        key={i + 1}
                                        value={city.cityCode}
                                      >
                                        {city.cityName}
                                      </MenuItem>
                                    );
                                  })}
                                </Select>
                              </FormControl>
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
