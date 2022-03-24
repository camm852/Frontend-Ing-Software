import React, { useEffect, useState } from "react";
import CardShoe from "../../../components/Card/CardShoe/index";
import { Box } from "@mui/material";
import { shoesServiceApiCall } from "../../../utils";

export default function ShowShoes() {
  const [arrayShoe, setArrayShoe] = useState([{}]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    document.title = "Home";
    let response = await shoesServiceApiCall({ service: "get" });
    let info = await response.json();
    setArrayShoe(info);
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
