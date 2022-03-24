import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { close } from "../../../redux/slices/modalMapSlice";
import {
  Backdrop,
  Button,
  Divider,
  Fade,
  Grid,
  Modal,
  Typography,
  Box,
} from "@mui/material";

function ModalMapSite() {
  const mapSiteState = useSelector((state) => state.map.value);
  const dispatch = useDispatch();

  const handleCloseModalMap = () => dispatch(close());

  const pathsAdmin = [
    {
      href: "/",
      title: "Home",
      description: "Main page",
    },
    {
      href: "/users",
      title: "Users",
      description: "Users Management",
    },
    {
      href: "/shoes",
      title: "Shoes",
      description: "Shoes Management",
    },
    {
      href: "/profile",
      title: "Profile",
      description: "User profile",
    },
    {
      href: "/suppliers",
      title: "Suppliers",
      description: "Suppliers Management",
    },
    {
      href: "/dashboard",
      title: "Dashboard",
      description: "Account Information",
    },
  ];

  const pathsUser = [
    {
      href: "/",
      title: "Home",
      description: "Main page",
    },
    {
      href: "/profile",
      title: "Profile",
      description: "User profile",
    },
    {
      href: "/dashboard",
      title: "Dashboard",
      description: "Account Information",
    },
  ];

  const modalStyle = {
    position: "absolute",
    borderRadius: "30px",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 680,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={mapSiteState}
      onClose={handleCloseModalMap}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={mapSiteState}>
        <Box sx={modalStyle}>
          <Grid container columnSpacing={2}>
            <Grid item xs={6}>
              <Typography component="h1" variant="h6">
                Routes for Admin
              </Typography>
              {pathsAdmin.map((path) => {
                return (
                  <Box>
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: "primary.main",
                        textTransform: "capitalize",
                        boxShadow: "none !important",
                        mt: 1,
                      }}
                      // onClick={navigate("/dashboard")}
                    >
                      <Link
                        to={path.href}
                        style={{
                          textDecoration: "none",
                          color: "#fff",
                          textTransform: "capitalize",
                        }}
                      >
                        {path.title}
                      </Link>
                    </Button>
                    <Button
                      sx={{
                        mt: 1,
                        color: "#000",
                        cursor: "default",
                        textTransform: "capitalize",
                      }}
                    >
                      {path.description}
                    </Button>
                  </Box>
                );
              })}
            </Grid>
            <Divider orientation="vertical" flexItem variant="middle"></Divider>

            <Grid item xs={5.5}>
              <Typography component="h1" variant="h6">
                Routes for User
              </Typography>
              {pathsUser.map((path, i) => {
                return (
                  <Box key={i}>
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: "primary.main",
                        textTransform: "capitalize",
                        boxShadow: "none !important",
                        mt: 1,
                      }}
                      // onClick={navigate("/dashboard")}
                    >
                      <Link
                        to={path.href}
                        style={{
                          textDecoration: "none",
                          color: "#fff",
                          textTransform: "capitalize",
                        }}
                      >
                        {path.title}
                      </Link>
                    </Button>
                    <Button
                      sx={{
                        mt: 1,
                        color: "#000",
                        cursor: "default",
                        textTransform: "capitalize",
                      }}
                    >
                      {path.description}
                    </Button>
                  </Box>
                );
              })}
            </Grid>
          </Grid>
        </Box>
      </Fade>
    </Modal>
  );
}

export default ModalMapSite;
