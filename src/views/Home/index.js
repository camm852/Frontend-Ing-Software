import React, { useEffect, useRef, useState } from "react";
import CardShoe from "../../components/Card";
import Header from "../../components/Header/Header";
import { arrayShoe } from "../../assets/ShoesJson/Shoes";
import Carousel from "react-elastic-carousel";
import brahma from "../../assets/images/bannerWebBrahma.jpg";
import precios from "../../assets/images/bannerWebPrecios.jpg";
import ultimos from "../../assets/images/bannerWebUltimos.jpg";
import creditCart from "../../assets/images/creditCard.svg";
import box from "../../assets/images/box.svg";
import shield from "../../assets/images/shield.svg";
import "./style.css";

import {
  Box,
  Button,
  createTheme,
  Divider,
  Grid,
  ThemeProvider,
  Typography,
  styled,
  Modal,
  Fade,
  Backdrop,
} from "@mui/material";
import MapIcon from "@mui/icons-material/Map";
import HelpIcon from "@mui/icons-material/Help";
import HouseIcon from "@mui/icons-material/House";
import { textAlign } from "@mui/system";
import { Link, useNavigate } from "react-router-dom";
import ShowAllShoes from "./ShowAllShoes/ShowAllShoes";

const items = [brahma, precios, ultimos];

export default function Home() {
  //States

  const [mapSiteState, setMapSiteState] = useState(false);
  const [helpState, setHelpState] = useState(false);
  const [showAll, setShowAll] = useState(false);

  //Refs

  const carouselImagesRef = useRef(null);

  //Navigation

  const navigate = useNavigate();

  //Object

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

  //Funcitons

  const handleOpenModalMap = () => setMapSiteState(true);
  const handleCloseModalMap = () => setMapSiteState(false);
  const handleShowAllShoes = () => setShowAll(true);
  const handleComeBack = () => setShowAll(false);

  const ModalMapSite = () => {
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
              <Divider
                orientation="vertical"
                flexItem
                variant="middle"
              ></Divider>

              <Grid item xs={5.5}>
                <Typography component="h1" variant="h6">
                  Routes for User
                </Typography>
                {pathsUser.map((path) => {
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
            </Grid>
          </Box>
        </Fade>
      </Modal>
    );
  };

  const handleOpenModalHelp = () => setHelpState(true);
  const handleCloseModalHelp = () => setHelpState(false);

  const ModalHelp = () => {
    return (
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={helpState}
        onClose={handleCloseModalHelp}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={helpState}>
          <Box sx={modalStyle}>Map site</Box>
        </Fade>
      </Modal>
    );
  };

  //Theme

  const theme = createTheme({
    typography: {
      fontFamily: {
        fontFamily: "Robot",
      },
    },
  });

  //StyledComponets

  const StyledButton = styled(Button)(({ theme }) => ({
    color: "#fff",
    backgroundColor: "#000",
    textTransform: "capitalize",
    boxShadow: "none !important",
    "&:hover": {
      backgroundColor: "#424242",
    },
  }));

  const breakpointsCarousel = [
    { width: theme.breakpoints.values.xs, itemsToShow: 2 },
    { width: theme.breakpoints.values.sm, itemsToShow: 3 },
    { width: theme.breakpoints.values.md, itemsToShow: 4 },
    { width: theme.breakpoints.values.lg, itemsToShow: 5 },
  ];

  useEffect(() => {
    document.title = "Home";
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Header showSearch={showAll} />
      {showAll ? (
        <Box sx={{ paddingTop: "40px" }}>
          <Box sx={{ minWidth: "600px" }}>
            <Typography sx={{ textAlign: "center" }}>
              <Button
                startIcon={<HouseIcon />}
                variant="contained"
                sx={{
                  boxShadow: "none",
                  textTransform: "capitalize",
                  "&:hover": { boxShadow: "none" },
                }}
                onClick={handleComeBack}
              >
                Come back main page
              </Button>
            </Typography>
          </Box>
          <Box sx={{ mt: "20px" }}>
            <ShowAllShoes />
          </Box>
        </Box>
      ) : (
        <Box>
          <Box sx={{ minWidth: "600px" }}>
            <Carousel
              ref={carouselImagesRef}
              showArrows={false}
              enableAutoPlay
              autoPlaySpeed={1500} // same time
              onNextEnd={({ index }) => {
                if (index + 1 === 3) {
                  setTimeout(() => {
                    carouselImagesRef.current.goTo(0);
                  }, 1500); // same time
                }
              }}
            >
              {items.map((item, i) => {
                return (
                  <img key={i} src={item} style={{ height: "550px" }}></img>
                );
              })}
            </Carousel>
          </Box>

          <Box
            sx={{
              pb: 2,

              mt: "20px",
            }}
          >
            {/* Recently added */}

            <Box
              sx={{
                backgroundColor: "#F4F4F4",
                padding: "20px 0",
                minWidth: "600px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  mb: "30px",
                }}
              >
                <Typography component="h1" variant="h4">
                  Recently added
                </Typography>
              </Box>
              <Box sx={{ minWidth: "600px" }}>
                <Carousel
                  breakPoints={breakpointsCarousel}
                  disableArrowsOnEnd={false}
                  itemsToScroll={4}
                  itemsToShow={4}
                >
                  {arrayShoe.map((shoe, i) => {
                    return (
                      <CardShoe
                        key={i}
                        code={shoe.code}
                        image={shoe.image}
                        alt={shoe.alt}
                        description={shoe.description}
                        price={shoe.price}
                        shoe={shoe}
                      />
                    );
                  })}
                </Carousel>
              </Box>
            </Box>

            {/* Bidding*/}

            <Box
              sx={{
                padding: "20px 0",
                mt: "20px",
                minWidth: "600px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  mb: "30px",
                }}
              >
                <Typography component="h1" variant="h4">
                  Bidding
                </Typography>
              </Box>
              <Box sx={{ minWidth: "600px" }}>
                <Carousel
                  breakPoints={breakpointsCarousel}
                  disableArrowsOnEnd={false}
                  itemsToScroll={4}
                  itemsToShow={4}
                >
                  {arrayShoe.map((shoe, i) => {
                    return (
                      <CardShoe
                        key={i}
                        code={shoe.code}
                        image={shoe.image}
                        alt={shoe.alt}
                        description={shoe.description}
                        price={shoe.price}
                        shoe={shoe}
                      />
                    );
                  })}
                </Carousel>
              </Box>
            </Box>

            {/* Best sellers */}

            <Box
              sx={{
                backgroundColor: "#F4F4F4",
                padding: "20px 0",
                mt: "50px",
                minWidth: "600px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  mb: "30px",
                }}
              >
                <Typography component="h1" variant="h4">
                  Best sellers
                </Typography>
              </Box>
              <Box sx={{ minWidth: "600px" }}>
                <Carousel
                  breakPoints={breakpointsCarousel}
                  disableArrowsOnEnd={false}
                  itemsToScroll={4}
                  itemsToShow={4}
                >
                  {arrayShoe.map((shoe, i) => {
                    return (
                      <CardShoe
                        key={i}
                        code={shoe.code}
                        image={shoe.image}
                        alt={shoe.alt}
                        description={shoe.description}
                        price={shoe.price}
                        shoe={shoe}
                      />
                    );
                  })}
                </Carousel>
              </Box>
            </Box>
          </Box>

          {/* Show all shoes */}

          <Box sx={{ minWidth: "600px", mt: "50px", mb: "50px" }}>
            <Typography sx={{ textAlign: "center" }}>
              <Button
                variant="contained"
                sx={{ boxShadow: "none", textTransform: "capitalize" }}
                onClick={handleShowAllShoes}
              >
                Show All Shoes
              </Button>
            </Typography>
          </Box>

          {/* Information */}

          <Box
            sx={{
              padding: "20px 0",
              minWidth: "600px",
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={3} sm={4}>
                <Box sx={{ textAlign: "center" }}>
                  <Typography component="h1" variant="h4">
                    <img src={creditCart}></img>
                  </Typography>
                </Box>
                <Box
                  sx={{
                    textAlign: "center",
                    padding: "20px 10px 0 10px",
                  }}
                >
                  <Typography
                    component="h1"
                    variant="h5"
                    sx={{ color: "#3D3D3D" }}
                  >
                    Free shipping over $70,000
                  </Typography>
                  <Typography
                    component="body"
                    variant="body1"
                    sx={{
                      fontSize: "12px",
                      mt: "6px",
                      color: "#787878",
                    }}
                  >
                    Just by being registered in Mercado Libre, you have free
                    shipping on thousands of selected products.
                  </Typography>
                </Box>
              </Grid>
              <Divider
                orientation="vertical"
                flexItem
                variant="middle"
              ></Divider>
              <Grid item xs={4} sm={4}>
                <Box sx={{ textAlign: "center" }}>
                  <Typography component="h1" variant="h4">
                    <img src={box}></img>
                  </Typography>
                </Box>
                <Box sx={{ textAlign: "center", pt: "20px" }}>
                  <Typography
                    component="h1"
                    variant="h5"
                    sx={{ color: "#3D3D3D" }}
                  >
                    Payment by card
                  </Typography>
                  <Typography
                    component="body"
                    variant="body1"
                    sx={{
                      fontSize: "12px",
                      mt: "6px",
                      color: "#787878",
                    }}
                  >
                    pay in installments and take advantage of the comfort of
                    financing that your bank gives you, or do it with cash at
                    payment points. And it's always safe!
                  </Typography>
                </Box>
              </Grid>
              <Divider
                orientation="vertical"
                flexItem
                variant="middle"
              ></Divider>
              <Grid item xs={4} sm={3.5}>
                <Box sx={{ textAlign: "center", ml: "50px" }}>
                  <Typography component="h1" variant="h4">
                    <img src={shield}></img>
                  </Typography>
                  <Box sx={{ textAlign: "center", pt: "20px" }}>
                    <Typography
                      component="h1"
                      variant="h5"
                      sx={{ color: "#3D3D3D" }}
                    >
                      Security, from start to finish
                    </Typography>
                    <Typography
                      component="body"
                      variant="body1"
                      sx={{
                        fontSize: "12px",
                        mt: "6px",
                        color: "#787878",
                      }}
                    >
                      You do not like? Return it! In Mercado Libre, there is
                      nothing you cannot do, because you are always protected.
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>

          {/* Footer */}

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
                  Carlos Muñoz - Kevin Martinez - Jorge Abella - Daniel Alferez
                  - Alex el capo, Unillanos - Ingeniera de Software, 2021-2
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
        </Box>
      )}
    </ThemeProvider>
  );
}
