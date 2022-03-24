import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { close } from "../../../redux/slices/modalCardDetail";
import {
  Backdrop,
  Fade,
  Modal,
  Box,
  Typography,
  styled,
  Card,
  Button,
  CardActions,
  CardContent,
  CardMedia,
  CardHeader,
} from "@mui/material";
import "../../../components/sweetStyle.css";
import { findIndexElement } from "../../../utils";
import { add } from "../../../redux/slices/cartSlice";

function ModalCardDetail() {
  const cardDetailVisible = useSelector((state) => state.detail.visible);
  const cardDetails = useSelector((state) => state.detail.value);
  const shoesRedux = useSelector((state) => state.cart.value);

  const dispatch = useDispatch();

  const handleCloseModalCardDetail = () => {
    dispatch(close());
  };

  const CardStyle = styled(Card)(({ theme }) => ({
    "&:hover": {},
    "&": {
      marginTop: "10px",
      boxShadow: "none",
      minWidth: 250,
    },
    [theme.breakpoints.up("lg")]: {
      marginLeft: "30px",
    },
    [theme.breakpoints.down("lg")]: {
      marginLeft: "30px",
    },
  }));

  const modalStyle = {
    outlineStyle: "none",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "absolute",
    borderRadius: "10px",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 2,
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={cardDetailVisible}
      onClose={handleCloseModalCardDetail}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
      sx={{ fontWeight: "500" }}
    >
      <Fade in={cardDetailVisible}>
        <Box sx={modalStyle}>
          <CardStyle sx={{ maxWidth: 345 }}>
            {cardDetailVisible ? (
              <Box>
                <CardHeader
                  title={
                    cardDetails.shoe.shoeName + " $" + cardDetails.shoe.price
                  }
                  sx={{ alignText: "center" }}
                />
                <CardMedia
                  component="img"
                  height="194"
                  image={`data:image/jpeg;base64,${cardDetails.shoe.imageBytes}`}
                  alt="Paella dish"
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    {cardDetails.description}
                  </Typography>
                </CardContent>
                <CardActions
                  disableSpacing
                  sx={{ justifyContent: "center", mb: "20px" }}
                >
                  <Button
                    variant="contained"
                    size="fullwidth"
                    sx={{
                      boxShadow: "none !important",
                      textTransform: "capitalize",
                      minWidth: "250px",
                    }}
                    onClick={() => {
                      if (
                        findIndexElement(
                          shoesRedux,
                          cardDetails.shoe.shoeCode
                        ) === -1
                      )
                        dispatch(add({ ...cardDetails.shoe, cant: 1 }));
                    }}
                  >
                    {findIndexElement(shoesRedux, cardDetails.shoe.shoeCode) ===
                    -1
                      ? "Add to cart"
                      : "Is added"}
                  </Button>
                </CardActions>
              </Box>
            ) : (
              ""
            )}
          </CardStyle>
        </Box>
      </Fade>
    </Modal>
  );
}
export default ModalCardDetail;
