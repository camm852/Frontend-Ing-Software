import React, { useState } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import Header from "../../components/Header";
import { useDispatch, useSelector } from "react-redux";
import CardCheckout from "../../components/Card/cardCheckout";
import apiCall from "../../api";
import Stripe from "react-stripe-checkout";
import Swal from "sweetalert2";
import "../../components/sweetStyle.css";
import { useNavigate } from "react-router-dom";
import { buyServiceApiCall, myLocalStorage } from "../../utils";
import { useAuth } from "../../routes/auth-context";
import { clearShoes } from "../../redux/slices/cartSlice";
import axios from "axios";

export default function Checkout() {
  const shoesRedux = useSelector((state) => state.cart.value);

  const auth = useAuth();
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const paddingTop = "50px";

  let total = 0;

  async function handleToken(token) {
    let response = await axios.post(
      "http://localhost:8080/api/payment/charge",
      "",
      {
        headers: {
          token: token.id,
          amount: 5000,
        },
      }
    );

    if (response.status !== 200) {
      Swal.fire({
        customClass: {
          container: "my-swal",
        },
        title: "Error",
        text: "Failure in the purchase",
        icon: "error",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      const userId = auth.user.userId;
      const shoesList = [];

      shoesRedux.map((shoe) => {
        shoesList.push({ shoeCode: shoe.shoeCode });
      });

      let responseBuy = await buyServiceApiCall({ total, userId, shoesList });

      if (responseBuy.status !== 200) {
        Swal.fire({
          customClass: {
            container: "my-swal",
          },
          title: "Error",
          text: "Failure in the purchase",
          icon: "error",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        setTimeout(() => {
          navigate("/dashboard");
          dispatch(clearShoes());
        }, 1000);
      }
    }
  }

  return (
    <Box>
      <Header />
      <Box sx={{ p: "30px 40px" }}>
        <Box sx={{ mt: "50px" }}>
          <Typography component="h3" variant="h6">
            There are {shoesRedux.length} on the cart
          </Typography>
        </Box>
        <Grid container>
          <Grid item xs={12} md={10} lg={9} xl={11}>
            <Box
              sx={{
                pt: paddingTop,
                minWidth: "570px",
                height: "50vh",
                overflowY: "auto",
              }}
            >
              {shoesRedux.map((shoe, i) => {
                return (
                  <Box sx={{ minWidht: "200px" }}>
                    <CardCheckout shoe={shoe} index={i} />
                  </Box>
                );
              })}
            </Box>
          </Grid>
          <Grid item xs={12} md={2} lg={3} xl={1} sx={{ pl: "20px" }}>
            <Typography
              component="h3"
              variant="h5"
              sx={{ fontFamily: "Roboto", pt: paddingTop }}
            >
              Total:
            </Typography>
            <Typography
              component="h3"
              variant="h4"
              sx={{ fontFamily: "inherit", pt: paddingTop }}
            >
              {shoesRedux.map((shoe, i) => {
                total += parseInt(shoe.cant, 10) * parseInt(shoe.price, 10);
              })}
              $ {total}
            </Typography>
            <Box sx={{ pt: "30px" }}>
              <Stripe
                stripeKey="pk_test_51KfQ5HDQi8w4oNzHSHdVWcpohAEGFo9dFrLKdJOWwyDOOKbzUqq5dSXHiLseFDunFjvKho5dlObYl9Sca9kKmYZY00U1zrbvEs"
                token={handleToken}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
