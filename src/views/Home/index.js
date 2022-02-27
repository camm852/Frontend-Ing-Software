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

import {
  Box,
  Button,
  createTheme,
  Divider,
  Grid,
  ThemeProvider,
  Typography,
  styled,
} from "@mui/material";
import MapIcon from "@mui/icons-material/Map";
import HelpIcon from "@mui/icons-material/Help";

const items = [brahma, precios, ultimos];

export default function Home() {
  const carouselImagesRef = useRef(null);

  const theme = createTheme({
    typography: {
      fontFamily: {
        fontFamily: "Robot",
      },
    },
  });

  const StyledButton = styled(Button)(({ theme }) => ({
    color: "#fff",
    backgroundColor: "#000",
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
      <Header showSearch={true} />

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
            return <img key={i} src={item} style={{ height: "550px" }}></img>;
          })}
        </Carousel>
      </Box>

      <Box
        sx={{
          pb: 2,
          width: "100%",
          height: "100%",
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
              // mt: "50px",
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
                    code={shoe.code}
                    key={i}
                    image={shoe.image}
                    alt={shoe.alt}
                    description={shoe.description}
                    price={shoe.price}
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
                  />
                );
              })}
            </Carousel>
          </Box>
        </Box>
      </Box>

      {/* Information */}

      <Box
        sx={{
          mb: "100px",
          mt: "100px",
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
              <Typography component="h1" variant="h5" sx={{ color: "#3D3D3D" }}>
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
          <Divider orientation="vertical" flexItem variant="middle"></Divider>
          <Grid item xs={4} sm={4}>
            <Box sx={{ textAlign: "center" }}>
              <Typography component="h1" variant="h4">
                <img src={box}></img>
              </Typography>
            </Box>
            <Box sx={{ textAlign: "center", pt: "20px" }}>
              <Typography component="h1" variant="h5" sx={{ color: "#3D3D3D" }}>
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
          <Divider orientation="vertical" flexItem variant="middle"></Divider>
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
                  You do not like? Return it! In Mercado Libre, there is nothing
                  you cannot do, because you are always protected.
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
              Carlos Muñoz - Kevin Martinez - Jorge Abella - Daniel Alferez -
              Alex el capo, Unillanos - Ingeniera de Software, 2021-2
            </Typography>
          </Grid>
          <Grid item xs={4} sm={4}>
            <Box sx={{ textAlign: "center", mt: "20px" }}>
              <Typography
                component="h1"
                variant="h4"
                sx={{ fontSize: "1.8em", color: "#2A2A2A" }}
              >
                <StyledButton
                  variant="contained"
                  startIcon={<MapIcon />}
                  sx={{ backgroundColor: "black" }}
                >
                  Map Site
                </StyledButton>
                <StyledButton
                  variant="contained"
                  startIcon={<HelpIcon />}
                  sx={{ ml: "20px" }}
                >
                  Help
                </StyledButton>
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}
