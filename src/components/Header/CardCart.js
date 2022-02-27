import React from "react";
import {
  Box,
  Button,
  Typography,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  styled,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { decrease, deleteShoe, increase } from "../../redux/slices/cartSlice";

export default function CardCart(props) {
  const shoeCodes = useSelector((state) => state.cart.value);
  const dispatch = useDispatch();

  const CardStyle = styled(Card)(({ theme }) => ({
    "&:hover": {
      boxShadow: "1px 1px 13px 0px rgba(0,0,0,0.75)",
    },
    "&": {
      marginTop: "10px",
      marginBottom: "10px",
      maxWidth: "250px",
    },
    [theme.breakpoints.up("lg")]: {
      marginLeft: "30px",
    },
    [theme.breakpoints.down("lg")]: {
      marginLeft: "30px",
    },
  }));

  return (
    <CardStyle>
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <Box>
          <CardContent sx={{ mb: -3 }}>
            <Box sx={{ display: "block" }}>
              <Typography gutterBottom variant="h5" component="div">
                {props.shoe.name}
              </Typography>
            </Box>

            <Box sx={{ display: "block" }}>
              <Typography gutterBottom variant="body1" component="div">
                Cant: {`${props.shoe.cant}  `}
              </Typography>
              <Typography gutterBottom variant="body1" component="div">
                Price: {`$ ${props.shoe.price * props.shoe.cant}  `}
              </Typography>
            </Box>
          </CardContent>
          <CardActions sx={{ width: "130px" }}>
            <Button
              variant="contained"
              size="small"
              sx={{ width: "100px" }}
              onClick={() => {
                dispatch(deleteShoe(props.index));
              }}
            >
              <DeleteIcon />
            </Button>
            <Button
              variant="contained"
              size="small"
              sx={{ width: "100px" }}
              onClick={() => {
                dispatch(increase(props.index));
              }}
            >
              +
            </Button>
            <Button
              variant="contained"
              size="small"
              sx={{}}
              onClick={() => {
                dispatch(decrease(props.index));
              }}
            >
              -
            </Button>
          </CardActions>
        </Box>
        <Box>
          <CardMedia
            component="img"
            image={props.shoe.image}
            sx={{ width: "120px", pt: "40px" }}
          />
        </Box>
      </Box>
    </CardStyle>
  );
}
