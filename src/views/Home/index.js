import {
  Box,
  Container,
  createTheme,
  CssBaseline,
  Grid,
  ThemeProvider,
} from "@mui/material";
import React, { useState } from "react";
import CardShoe from "../../components/Card";
import Header from "../../components/Header/Header";

const theme = createTheme({
  typography: {
    fontFamily: {
      fontFamily: "monserrat",
    },
  },
});

const array = [1, 2, 3, 4, 5, 7, 8, 9, 10];

export default function Home() {
  const [numero, setNumero] = useState(0);

  const clickeo = () => {
    setNumero(numero + 1);
  };

  return (
    <ThemeProvider theme={theme}>
      <Header showSearch={true} cantidad={numero} />

      <Box
        className="Home"
        sx={{
          pt: 0.5,
          pb: 1,
          // backgroundColor: "#E3E3E3",
          width: "100%",
          height: "100%",
        }}
      >
        <Box
          onClick={clickeo}
          sx={{
            m: 2,
            backgroundColor: "#fff",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            flexWrap: "wrap",
            borderRadius: 2,
          }}
        >
          {array.map((i) => {
            return <CardShoe key={i} />;
          })}
        </Box>
      </Box>
    </ThemeProvider>
  );
}
