import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { findIndexElement } from "../../../utils";
import { add } from "../../../redux/slices/cartSlice";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  styled,
  Typography,
} from "@mui/material";

const CardStyle = styled(Card)(({ theme }) => ({
  "&:hover": {
    // boxShadow: "1px 1px 13px 0px rgba(0,0,0,0.75)",
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

export default function CardShoe(props) {
  const distpatch = useDispatch();
  const shoesRedux = useSelector((state) => state.cart.value);
  // const handleClick = (value) => {
  //   distpatch(add(value));
  // };

  return (
    <CardStyle sx={{ padding: 1.5 }}>
      <CardMedia
        component="img"
        height="140"
        image={props.image}
        alt={props.alt}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Shoe
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.description}
        </Typography>
        <Typography variant="body2" color="text.secondary"></Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          size="small"
          sx={{ boxShadow: "none !important", textTransform: "capitalize" }}
          onClick={() => {
            if (findIndexElement(shoesRedux, props.code) === -1)
              distpatch(add({ ...props.shoe, cant: 1 }));
          }}
        >
          {findIndexElement(shoesRedux, props.code) === -1
            ? "Add to cart"
            : "Is added"}
        </Button>
        <Box sx={{ ml: "20px" }}>{`$ ${props.price}`}</Box>
      </CardActions>
    </CardStyle>
  );
}
