import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { findIndexElement } from "../../../utils";
import { add } from "../../../redux/slices/cartSlice";
import {
  Card,
  CardContent,
  CardMedia,
  styled,
  Typography,
} from "@mui/material";
import { open } from "../../../redux/slices/modalCardDetail";
import { Box } from "@mui/system";

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
  const dispatch = useDispatch();
  const shoesRedux = useSelector((state) => state.cart.value);

  const shoeInformation = {
    ...props,
  };

  return (
    <CardStyle
      sx={{ padding: 1.5 }}
      onClick={() => dispatch(open({ ...shoeInformation }))}
    >
      <CardMedia
        component="img"
        height="140px"
        image={`data:image/jpeg;base64,${props.shoe.imageBytes}`}
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
    </CardStyle>
  );
}
