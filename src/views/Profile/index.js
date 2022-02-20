import React, { useEffect, useState } from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import { AccountProfile } from "../../components/Account/accountProfile";
import { AccountProfileDetails } from "../../components/Account/accountProfileDetails";
import DashBoardSidebar from "../../components/DashBoardSidebar";
import { useSelector, useDispatch } from "react-redux";
import { getInfoUser } from "../../redux/slices/userSlice";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../routes/auth-context";

export default function User() {
  const user = useAuth();

  return (
    <DashBoardSidebar>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 3,
        }}
      >
        <Container maxWidth="lg">
          <Typography sx={{ mb: 3 }} variant="h4">
            Account
          </Typography>
          <Grid container spacing={3}>
            <Grid item lg={4} md={6} xs={12}>
              <AccountProfile />
            </Grid>
            <Grid item lg={8} md={6} xs={12}>
              <AccountProfileDetails />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </DashBoardSidebar>
  );
}
