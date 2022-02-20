import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import { NavItem } from "./NavItem";
import profileLogo from "../assets/profile.png";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import HouseIcon from "@mui/icons-material/House";
import { myLocalStorage } from "../utils";
import LogoutIcon from "@mui/icons-material/Logout";
import { Button } from "@mui/material";
import { useAuth } from "../routes/auth-context";

const drawerWidth = 260;

const itemsAdmin = [
  {
    href: "/",
    icon: <HouseIcon fontSize="small" />,
    title: "Main",
  },
  {
    href: "/profile",
    icon: <AccountCircleIcon fontSize="small" />,
    title: "Profile",
  },
  {
    href: "/account",
    icon: <AccountCircleIcon fontSize="small" />,
    title: "Dashboard",
  },
  {
    href: "/users",
    icon: <GroupAddIcon fontSize="small" />,
    title: "Users",
  },
  {
    href: "/shoes",
    icon: <Inventory2Icon fontSize="small" />,
    title: "Shoes",
  },
  {
    href: "/providers",
    icon: <AccountCircleIcon fontSize="small" />,
    title: "Providers",
  },
];

const itemsUser = [
  {
    href: "/",
    icon: <HouseIcon fontSize="small" />,
    title: "Main",
  },
  {
    href: "/profile",
    icon: <AccountCircleIcon fontSize="small" />,
    title: "Profile",
  },
  {
    href: "/dashboard",
    icon: <AccountCircleIcon fontSize="small" />,
    title: "Dashboard",
  },
];

function DashBoardSidebar(props) {
  const { children } = props;
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const user = useAuth();

  const userInfo = myLocalStorage.get("session");

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const logout = () => {
    user.signOut();
  };

  const drawer = (
    <Box sx={{ mt: 10 }}>
      <Toolbar />
      <List>
        {(userInfo.roleCode === 1 &&
          itemsUser.map((item) => (
            <NavItem
              key={item.title}
              icon={item.icon}
              href={item.href}
              title={item.title}
            />
          ))) ||
          (userInfo.roleCode === 2 &&
            itemsAdmin.map((item) => (
              <NavItem
                key={item.title}
                icon={item.icon}
                href={item.href}
                title={item.title}
              />
            )))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: "#fff",
          boxShadow: "0px 1px 4px rgb(100 116 139 / 12%)",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon sx={{ color: "#000" }} />
          </IconButton>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <Box component="img" src={profileLogo} sx={{ width: "40px" }}></Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{
          width: { sm: drawerWidth },
          flexShrink: { sm: 0 },
        }}
        aria-label="mailbox folders"
      >
        {
          //**Drawner mobile */
        }

        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "primary.main",
            },
          }}
        >
          <Box sx={{ ml: 5, mt: 1 }}>
            {/* {
              //TODO logo de la pagina
            } */}
          </Box>
          {drawer}
          <Box
            sx={{
              widht: "100%",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button
              onClick={logout}
              startIcon={<LogoutIcon />}
              sx={{
                borderRadius: 1,
                color: "#fff",
                fontWeight: "fontWeightBold",
                justifyContent: "flex-start",
                px: 3,
                pt: 1,
                pb: 1,
                borderRadius: "10px",
                textAlign: "left",
                textTransform: "none",
                width: "50px",
                marginRight: "10px",
                "& .MuiButton-startIcon": {
                  color: "neutral.400",
                },
                "&:hover": {
                  color: "primary.main",
                  backgroundColor: "#fff",
                },
              }}
            ></Button>
          </Box>
        </Drawer>

        {
          //**Drawner pc*/
        }
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "primary.main",
            },
          }}
          open
        >
          <Box sx={{ ml: 5, mt: 1 }}>
            {/* {
              //TODO logo de la pagina
            } */}
          </Box>
          {drawer}
          <Box
            sx={{
              widht: "100%",
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "180px",
            }}
          >
            <Button
              onClick={logout}
              startIcon={<LogoutIcon />}
              sx={{
                borderRadius: 1,
                color: "#fff",
                fontWeight: "fontWeightBold",
                justifyContent: "flex-start",
                px: 3,
                pt: 1,
                pb: 1,
                borderRadius: "10px",
                textAlign: "left",
                textTransform: "none",
                width: "50px",
                marginRight: "10px",
                "& .MuiButton-startIcon": {
                  color: "neutral.400",
                },
                "&:hover": {
                  color: "primary.main",
                  backgroundColor: "#fff",
                },
              }}
            ></Button>
          </Box>
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}

DashBoardSidebar.propTypes = {
  window: PropTypes.func,
};

export default DashBoardSidebar;
