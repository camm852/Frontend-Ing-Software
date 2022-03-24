import React from "react";
import { useDispatch } from "react-redux";
import {
  decrease,
  deleteShoe,
  increase,
} from "../../../redux/slices/cartSlice";
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

export default function CardCart(props) {
  const dispatch = useDispatch();

  const CardStyle = styled(Card)(({ theme }) => ({
    "&:hover": {},
    "&": {
      marginTop: "10px",
      marginBottom: "10px",
      maxWidth: "250px",
    },
    [theme.breakpoints.up("lg")]: {
      marginLeft: "20px",
    },
    [theme.breakpoints.down("lg")]: {
      marginLeft: "30px",
    },
  }));

  const StyledButton = styled(Button)(({ theme }) => ({
    textTransform: "capitalize",
    boxShadow: "none !important",
  }));

  return (
    <CardStyle>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Box>
          <CardContent sx={{ mb: -3 }}>
            <Box sx={{ display: "block" }}>
              <Typography gutterBottom variant="h5" component="div">
                {props.shoe.shoeName}
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
            <StyledButton
              variant="contained"
              size="small"
              sx={{ width: "100px" }}
              onClick={() => {
                dispatch(deleteShoe(props.index));
              }}
            >
              <DeleteIcon />
            </StyledButton>
            <StyledButton
              variant="contained"
              size="small"
              sx={{ width: "100px" }}
              onClick={() => {
                dispatch(increase(props.index));
              }}
            >
              +
            </StyledButton>
            <StyledButton
              variant="contained"
              size="small"
              sx={{}}
              onClick={() => {
                dispatch(decrease(props.index));
              }}
            >
              -
            </StyledButton>
          </CardActions>
        </Box>
        <Box>
          <CardMedia
            component="img"
            image={`data:image/jpeg;base64,${props.shoe.imageBytes}`}
            sx={{ width: "120px", pt: "40px" }}
          />
        </Box>
      </Box>
    </CardStyle>
  );
}
