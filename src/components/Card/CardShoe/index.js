import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Card,
  CardContent,
  CardMedia,
  styled,
  Typography,
} from "@mui/material";
import { open } from "../../../redux/slices/modalCardDetail";

const CardStyle = styled(Card)(({ theme }) => ({
  "&:hover": {},
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
        // image={`data:image/jpeg;base64,${props.shoe.imageBytes}`}
        image={`${props.shoe.image}`}
        alt={props.alt}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.shoe.shoeName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.description}
        </Typography>
        <Typography variant="body2" color="text.secondary"></Typography>
      </CardContent>
    </CardStyle>
  );
}
