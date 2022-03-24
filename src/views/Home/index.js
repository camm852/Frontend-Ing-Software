import React, { useEffect, useRef, useState } from "react";
import Carousel from "react-elastic-carousel";
import CardShoe from "../../components/Card/CardShoe/index";
import Header from "../../components/Header/index";
import brahma from "../../assets/images/bannerWebBrahma.jpg";
import precios from "../../assets/images/bannerWebPrecios.jpg";
import ultimos from "../../assets/images/bannerWebUltimos.jpg";
import creditCart from "../../assets/images/creditCard.svg";
import box from "../../assets/images/box.svg";
import shield from "../../assets/images/shield.svg";
import ShowAllShoes from "./ShowAllShoes/index";
import Footer from "../../components/Footer/FooterHome/index";
import {
  Box,
  Button,
  createTheme,
  Divider,
  Grid,
  ThemeProvider,
  Typography,
} from "@mui/material";
import HouseIcon from "@mui/icons-material/House";
import "./style.css";
import ModalCardDetail from "../../components/Modals/ModalCardDetails";
import { shoesServiceApiCall } from "../../utils";

const items = [brahma, precios, ultimos];

export default function Home() {
  //States

  const [arrayShoe, setArrayShoe] = useState([{}]);
  const [showAll, setShowAll] = useState(false);

  //Refs

  const carouselImagesRef = useRef(null);

  //Funcitons

  const handleShowAllShoes = () => setShowAll(true);
  const handleComeBack = () => setShowAll(false);

  //Theme

  const theme = createTheme({
    typography: {
      fontFamily: {
        fontFamily: "Robot",
      },
    },
  });

  //Object

  const breakpointsCarousel = [
    { width: theme.breakpoints.values.xs, itemsToShow: 2 },
    { width: theme.breakpoints.values.sm, itemsToShow: 3 },
    { width: theme.breakpoints.values.md, itemsToShow: 4 },
    { width: theme.breakpoints.values.lg, itemsToShow: 5 },
  ];

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    document.title = "Home";
    let response = await shoesServiceApiCall({ service: "get" });
    let info = await response.json();
    setArrayShoe(info);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Header showSearch={showAll} />
      <ModalCardDetail />

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
                        alt={shoe.alt}
                        description={shoe.description}
                        price={shoe.price}
                        image={shoe.imageBytes}
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
          <Footer />
        </Box>
      )}
    </ThemeProvider>
  );
}
