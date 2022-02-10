import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  styled,
  Typography,
} from "@mui/material";
import React from "react";

const CardStyle = styled(Card)(({ theme }) => ({
  "&:hover": {
    boxShadow: "1px 1px 13px 0px rgba(0,0,0,0.75)",
  },
  "&": {
    cursor: "pointer",
    marginTop: "10px",
    marginBottom: "10px",
    maxWidth: 250,
  },
  [theme.breakpoints.up("lg")]: {
    marginLeft: "30px",
  },
  [theme.breakpoints.down("lg")]: {
    marginLeft: "30px",
  },
}));

export default function CardShoe() {
  return (
    <CardStyle>
      <CardMedia
        component="img"
        height="100"
        image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvhku_lEouF4DcjthKhLHiwO9jSI_VLr9qVYOELiCETPlcaPV1Ac_nb4P6SGvIJ9LReY0&usqp=CAU"
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="contained" size="small">
          Add to cart
        </Button>
      </CardActions>
    </CardStyle>
  );
}
