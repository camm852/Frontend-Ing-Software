import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActions, Grid } from "@mui/material";
import { useDispatch } from "react-redux";
import {
  decrease,
  deleteShoe,
  increase,
} from "../../../redux/slices/cartSlice";

export default function CardCheckout(props) {
  const dispatch = useDispatch();

  return (
    <Card sx={{ mb: "10px", boxShadow: "none" }}>
      <Grid container>
        <Grid item md={7}>
          <Box sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
            <CardMedia
              component="img"
              sx={{ width: "150px", height: "128px" }}
              image={`data:image/jpeg;base64,${props.shoe.imageBytes}`}
              alt="Live from space album cover"
            />
            <CardContent>
              <Typography component="div" variant="h5">
                {props.shoe.name}
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="div"
              >
                {props.shoe.description}
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="div"
              >
                Cant: {props.shoe.cant}
              </Typography>
            </CardContent>
          </Box>
        </Grid>
        <Grid item md={2}>
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <CardActions
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography
                sx={{ cursor: "pointer" }}
                onClick={() => dispatch(deleteShoe(props.index))}
              >
                Eliminar
              </Typography>
              <Typography
                sx={{ cursor: "pointer" }}
                onClick={() => dispatch(decrease(props.index))}
              >
                -
              </Typography>
              <Typography
                sx={{ cursor: "pointer" }}
                onClick={() => dispatch(increase(props.index))}
              >
                +
              </Typography>
            </CardActions>
          </CardContent>
        </Grid>
        <Grid item md={3}>
          <CardContent>
            <CardActions>
              <Typography
                variant="h4"
                component="div"
                sx={{ fontFamily: "inherit", fontWeight: "200" }}
              >
                ${props.shoe.price * props.shoe.cant}
              </Typography>
            </CardActions>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
}
