import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ThemeProvider } from "@emotion/react";
import CardCart from "../Card/CartCard/index";
import { useAuth } from "../../routes/auth-context";
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
} from "@mui/material";
import styled from "@mui/styled-engine";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import "./style.css";

export default function Header({ showSearch, cantidad }) {
  const [state, setState] = React.useState({
    right: false,
  });
  const shoesRedux = useSelector((state) => state.cart.value);
  const SearchInput = styled(InputBase)({});
  const userProvider = useAuth();
  const navigate = useNavigate();

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
                md={4}
                lg={3}
                xl={4}
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

                  <Box
                    sx={{
                      width: "300px",
                      height: "90vh",
                      overflowY: "auto",
                    }}
                  >
                    {shoesRedux.map((shoe, i) => {
                      return <CardCart key={i} shoe={shoe} index={i} />;
                    })}
                  </Box>
                  <Box
                    sx={{
                      position: "absolute",
                      mt: "92vh",
                      width: "90%",
                    }}
                  >
                    {shoesRedux.length > 0 && (
                      <Button
                        fullWidth
                        variant="contained"
                        sx={{ marginLeft: "15px", padding: "10px" }}
                        onClick={() => {
                          navigate("/checkout");
                        }}
                      >
                        Checkout
                      </Button>
                    )}
                  </Box>
                </SwipeableDrawer>

                {/* Icono usuario / login */}

                <Button
                  color="inherit"
                  sx={{
                    [theme.breakpoints.down("lg")]: {
                      fontSize: ".65em",
                    },
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
