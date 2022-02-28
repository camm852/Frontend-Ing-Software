import React from "react";
import { useDispatch } from "react-redux";
import ModalMapSite from "../../../components/Modals/ModalSite";
import ModalHelp from "../../../components/Modals/ModalHelp";
import { open as openModalMapSite } from "../../../redux/slices/modalMapSlice";
import { open as openModalHelp } from "../../../redux/slices/modalHelpSlice";
import { Box, Button, Grid, Typography, styled } from "@mui/material";
import MapIcon from "@mui/icons-material/Map";
import HelpIcon from "@mui/icons-material/Help";

function Footer() {
  const dispatch = useDispatch();

  const handleOpenModalMap = () => dispatch(openModalMapSite()); //open modal map site
  const handleOpenModalHelp = () => dispatch(openModalHelp());

  const StyledButton = styled(Button)(({ theme }) => ({
    color: "#fff",
    backgroundColor: "#000",
    textTransform: "capitalize",
    boxShadow: "none !important",
    "&:hover": {
      backgroundColor: "#424242",
    },
  }));

  return (
    <Box
      sx={{
        mt: "50px",
        minWidth: "600px",
        height: "120px !important",
        backgroundColor: "#F4F4F4",
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={4} sm={4}>
          <Box sx={{ textAlign: "center", mt: "20px" }}>
            <Typography
              component="h1"
              variant="h4"
              sx={{ fontSize: "1.8em", color: "#2A2A2A" }}
            >
              Zhopy
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={4} sm={4}>
          <Box sx={{ mt: "19px", textAlign: "center" }}>
            <Typography
              component="h1"
              variant="h4"
              sx={{ fontSize: "1.4em", color: "#2A2A2A" }}
            >
              ©Copyright
            </Typography>
          </Box>
          <Typography
            component="body"
            variant="body1"
            sx={{
              fontSize: "12px",
              mt: "6px",
              textAlign: "center",
              color: "#787878",
            }}
          >
            Carlos Muñoz - Kevin Martinez - Jorge Abella - Daniel Alferez - Alex
            el capo, Unillanos - Ingeniera de Software, 2021-2
          </Typography>
        </Grid>
        <Grid item xs={4} sm={4}>
          <Box
            sx={{
              textAlign: "center",
              mt: "20px",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
            className="buttonContainer"
          >
            <Box className="buttonChild">
              <Typography
                component="h1"
                variant="h4"
                sx={{ fontSize: "1.8em", color: "#2A2A2A" }}
              >
                <StyledButton
                  variant="contained"
                  startIcon={<MapIcon />}
                  sx={{
                    backgroundColor: "black",
                  }}
                  onClick={handleOpenModalMap}
                >
                  Map Site
                </StyledButton>
                <ModalMapSite />
              </Typography>
            </Box>
            <Box>
              <Typography
                component="h1"
                variant="h4"
                sx={{ fontSize: "1.8em", color: "#2A2A2A" }}
              >
                <StyledButton
                  variant="contained"
                  startIcon={<HelpIcon />}
                  sx={{ ml: "20px" }}
                  onClick={handleOpenModalHelp}
                >
                  Help
                </StyledButton>
                <ModalHelp />
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Footer;
