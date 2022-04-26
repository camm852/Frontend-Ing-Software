import React, { useEffect, useState } from "react";
import CardShoe from "../../../components/Card/CardShoe/index";
import { Box } from "@mui/material";
import { shoesServiceApiCall } from "../../../utils";
import { arrayShoe } from "../../../assets/ShoesJson";

export default function ShowShoes() {
  // const [arrayShoe, setArrayShoe] = useState([{}]);

  useEffect(() => {
    document.title = "Home";
    // const getAllShoes = async () => {
    //   let response = await shoesServiceApiCall({ service: "get" });
    //   let info = await response.json();
    //   setArrayShoe(arraySHoe);
    // };
    // getAllShoes();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        minWidth: "600.1px",
      }}
    >
      {arrayShoe.map((shoe, i) => {
        return (
          <CardShoe
            key={i}
            code={shoe.code}
            image={shoe.image}
            alt={shoe.alt}
            description={shoe.description}
            price={shoe.price}
            shoe={shoe}
          />
        );
      })}
    </Box>
  );
}
