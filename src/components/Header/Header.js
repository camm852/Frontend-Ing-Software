import SearchIcon from "@mui/icons-material/Search";
import styled from "@mui/styled-engine";
import {
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
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { ThemeProvider } from "@emotion/react";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { myLocalStorage } from "../../utils/index";
import { useAuth } from "../../routes/auth-context";

export default function Header({ showSearch, cantidad }) {
  const SearchInput = styled(InputBase)({});

  const userProvider = useAuth();

  const [state, setState] = React.useState({
    right: false,
  });

  const list = (anchor) => (
    <Box
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    ></Box>
  );

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

  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: "0 4px",
    },
  }));

  const navigate = useNavigate();

  const navigateRender = () => {
    if (!!userProvider) {
      navigate("/profile");
    } else {
      navigate("/login");
    }
  };

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

  return (
    <ThemeProvider theme={theme}>
      <Box>
        <AppBar position="static" sx={{ minWidth: "500px" }}>
          <Toolbar>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 3, sm: 2, md: 3 }}
            >
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
              <Grid item xs={5} sm={7} md={8} lg={4} xl={4}>
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
              <Grid
                item
                xs={3}
                sm={2}
                md={2}
                lg={4}
                xl={3}
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
                className="grid-buttons"
              >
                <IconButton
                  aria-label="cart"
                  sx={{ marginRight: "5px" }}
                  onClick={toggleDrawer(true)}
                >
                  <StyledBadge badgeContent={cantidad} color="secondary">
                    <ShoppingCartIcon sx={{ color: "#fff" }} />
                  </StyledBadge>
                </IconButton>
                <SwipeableDrawer
                  anchor={"right"}
                  open={state["right"]}
                  onClose={toggleDrawer(false)}
                  onOpen={toggleDrawer(true)}
                >
                  <Box sx={{ width: "250px" }}></Box>
                </SwipeableDrawer>
                <Button
                  color="inherit"
                  sx={{ fontSize: ".8em", mr: "1%", ml: "10px" }}
                  onClick={navigateRender}
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
