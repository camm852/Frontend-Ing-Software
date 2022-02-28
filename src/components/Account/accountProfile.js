import { myLocalStorage } from "../../utils";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";

export const AccountProfile = (props) => {
  const userProvider = myLocalStorage.get("session");

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
            {userProvider.userName}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
    </Card>
  );
};
