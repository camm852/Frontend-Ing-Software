import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getInfoUser } from "../../redux/slices/userSlice";
import { useAuth } from "../../routes/auth-context";
import { myLocalStorage } from "../../utils";

export const AccountProfile = (props) => {
  const location = useLocation();
  const dispatch = useDispatch();

  const userProvider = useAuth();

  return (
    <Card {...props}>
      <CardContent>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Avatar
            sx={{
              height: 64,
              mb: 2,
              width: 64,
            }}
          />
          <Typography color="textPrimary" gutterBottom variant="h5">
            {userProvider.user.userName}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
    </Card>
  );
};
