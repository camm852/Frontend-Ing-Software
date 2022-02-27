import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../routes/auth-context";
import { useDispatch, useSelector } from "react-redux";
import {
  Avatar,
  Badge,
  AppBar,
  Box,
  Button,
  createTheme,
  Divider,
  Grid,
  IconButton,
  InputBase,
  SwipeableDrawer,
  Toolbar,
  Typography,
  Card,
  CardActions,
  CardContent,
  CardMedia,
} from "@mui/material";
import styled from "@mui/styled-engine";
import { ThemeProvider } from "@emotion/react";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { arrayShoe } from "../../assets/ShoesJson/Shoes";
import "./style.css";
import CardCart from "./CardCart";
import lodash, { indexOf } from "lodash";
import { findIndexElement } from "../../utils";

export default function Header({ showSearch, cantidad }) {
  const [state, setState] = React.useState({
    right: false,
  });
  const shoesRedux = useSelector((state) => state.cart.value);
  const dispatch = useDispatch();
  const SearchInput = styled(InputBase)({});
  const userProvider = useAuth();
  const navigate = useNavigate();

  // const list = (anchor) => (
  //   <Box
  //     role="presentation"
  //     onClick={toggleDrawer(anchor, false)}
  //     onKeyDown={toggleDrawer(anchor, false)}
  //   ></Box>
  // );

  const theme = createTheme({
    typography: {
      fontFamily: {
        fontFamily: "Monserrat",
      },
    },
    palette: {
      secondary: {
        main: "#FF0000",
      },
    },
  });

  const CardStyle = styled(Card)(({ theme }) => ({
    "&:hover": {
      boxShadow: "1px 1px 13px 0px rgba(0,0,0,0.75)",
    },
    "&": {
      marginTop: "10px",
      marginBottom: "10px",
      maxWidth: "250px",
    },
    [theme.breakpoints.up("lg")]: {
      marginLeft: "30px",
    },
    [theme.breakpoints.down("lg")]: {
      marginLeft: "30px",
    },
  }));

  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: "0 4px",
    },
  }));

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ right: open });
  };

  const isLoggin = (user) => {
    if (user) {
      return (
        <Avatar
          src="/broken-image.jpg"
          sx={{ bgcolor: "#1976d2", color: "#fff" }}
        />
      );
    } else {
      return "sign-in";
    }
  };

  const navigateRender = () => {
    if (!!userProvider) {
      navigate("/profile");
    } else {
      navigate("/login");
    }
  };

  // const findElement = (array, item) => {
  //   let count;
  //   array.map((element, i) => {
  //     if (Object.values(element).join("").includes(item)) {
  //       count = i;
  //     }
  //   });

  //   return count;

  //   // if (!find) return -1;
  //   // else return 1;
  // };

  // const countRepeat = (code) => {
  //   let contador = 1;

  //   for (let i = 0; i < shoeCodes.length; i++) {
  //     for (let j = 0; j < shoeCodes.length; j++) {
  //       if (code !== shoeCodes[i]) {
  //         break;
  //       } else {
  //         if (shoeCodes[i] !== shoeCodes[j] || j === i) {
  //           break;
  //         } else {
  //           contador++;
  //         }
  //       }
  //     }
  //   }

  //   return contador;
  // };

  return (
    <ThemeProvider theme={theme}>
      <Box>
        {/* App bar es la barra completa del header */}
        <AppBar position="static" sx={{ minWidth: "600px" }}>
          <Toolbar>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 3, sm: 2, md: 3 }}
            >
              {/* Icono */}

              <Grid item xs={4} sm={3} md={2} lg={4} xl={4}>
                <Box
                  sx={{
                    ml: "20%",
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    paddingTop: "5px",
                  }}
                >
                  <Typography
                    component="h1"
                    variant="h4"
                    sx={{ cursor: "pointer", fontSize: "1.8em" }}
                    onClick={() => {
                      navigate("/");
                    }}
                  >
                    Zhopy
                  </Typography>
                </Box>
              </Grid>

              {/* Barra de busqueda  */}

              <Grid item xs={5} sm={7} md={6} lg={5} xl={4}>
                <Box sx={{ display: "flex", aligItems: "center" }}>
                  {showSearch && (
                    <>
                      <SearchInput
                        sx={{
                          color: "#fff",
                          width: "600px",
                          minWidth: "150px",
                        }}
                        placeholder="Buscar..."
                      />
                      <IconButton
                        type="submit"
                        sx={{ p: "10px", color: "#fff" }}
                        aria-label="search"
                      >
                        <SearchIcon />
                      </IconButton>
                      <Divider
                        sx={{ height: 28, m: 0.5, backgroundColor: "#fff" }}
                        orientation="vertical"
                      />
                    </>
                  )}
                </Box>
              </Grid>

              {/* Iconos */}

              <Grid
                item
                xs={3}
                sm={2}
                md={3}
                lg={3}
                xl={3}
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
                className="grid-buttons"
              >
                {/* Icono Carrito */}

                <IconButton
                  aria-label="cart"
                  sx={{ marginRight: "5px" }}
                  onClick={toggleDrawer(true)}
                >
                  <StyledBadge
                    badgeContent={shoesRedux.length}
                    color="secondary"
                  >
                    <ShoppingCartIcon sx={{ color: "#fff" }} />
                  </StyledBadge>
                </IconButton>

                {/* Modal */}

                <SwipeableDrawer
                  anchor={"right"}
                  open={state["right"]}
                  onClose={toggleDrawer(false)}
                  onOpen={toggleDrawer(true)}
                >
                  {/* Contenido Modal */}

                  <Box sx={{ width: "300px" }}>
                    {arrayShoe.map((shoe, i) => {
                      let indexShoe = findIndexElement(shoesRedux, shoe.code);
                      if (indexShoe >= 0) {
                        // const objectShoe = JSON.parse(shoes[indexShoe]);
                        return (
                          <CardCart
                            key={i}
                            shoe={JSON.parse(shoesRedux[indexShoe])}
                            index={indexShoe}
                          />
                        );
                        // let index = lodash.findIndex(shoeCodes, {
                        //   code: "shoe.code",
                        // });
                        // const count = countRepeat(shoe.code);
                        // return <CardCart shoe={shoeCodes[index]} key={i} />;
                      }
                    })}
                  </Box>
                </SwipeableDrawer>

                {/* Icono usuario / login */}

                <Button
                  color="inherit"
                  sx={{
                    fontSize: ".8em",
                    mr: "1%",
                    ml: "10px",
                  }}
                  onClick={navigateRender}
                  className="cartIcon"
                >
                  {isLoggin(!!userProvider.user)}
                </Button>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
}
