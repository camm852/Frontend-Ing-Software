import React, { useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import { arrayShoe } from "../../assets/ShoesJson/index";
import usePagination from "../../utils/Pagination";
import {
  Box,
  Card,
  CardContent,
  InputAdornment,
  Pagination,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import { shoesServiceApiCall } from "../../utils";

export const ProductListResults = () => {
  const [shoes, setShoes] = useState([{}]);
  const [shoesFilter, setShoesFilter] = useState([{}]);

  const perPage = 5;

  const [page, setPage] = useState(1);
  const count = Math.ceil(shoesFilter.length / perPage);

  let _Shoes = usePagination(shoesFilter, perPage);

  const handleChange = (e, page) => {
    setPage(page);
    _Shoes.jump(page);
  };

  const onSearch = (e) => {
    e.preventDefault();
    let value = e.target.value;
    const dataFilter = shoes.filter((item) => {
      return Object.values(item).join("").toLowerCase().includes(value);
    });
    console.log(dataFilter);
    if (dataFilter) {
      console.log(1);
      setShoesFilter(dataFilter);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(async () => {
    let response = await shoesServiceApiCall({ service: "get" });
    console.log(response);
    let info = await response.json();
    console.log(info);
    setShoes(info);
    setShoesFilter(info);
  }, []);

  return (
    <Card>
      <PerfectScrollbar>
        <Box sx={{ mt: 2, mb: 2 }}>
          <Card>
            <CardContent>
              <Box sx={{ maxWidth: 500 }}>
                <TextField
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SvgIcon color="action" fontSize="small">
                          <SearchIcon />
                        </SvgIcon>
                      </InputAdornment>
                    ),
                  }}
                  placeholder="Search Shoe"
                  variant="outlined"
                  onChange={onSearch}
                />
              </Box>
            </CardContent>
          </Card>
        </Box>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Code</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Stock</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Supplier</TableCell>
                <TableCell>Description</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {_Shoes.currentData().map((shoe) => {
                return (
                  <TableRow hover>
                    <TableCell>{shoe.shoeCode}</TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          alignItems: "center",
                          display: "flex",
                        }}
                      >
                        {shoe.shoeName}
                      </Box>
                    </TableCell>
                    <TableCell>{shoe.price}</TableCell>
                    <TableCell>{shoe.stock}</TableCell>
                    <TableCell>{shoe.categoryName}</TableCell>
                    <TableCell>{shoe.supplierName}</TableCell>
                    <TableCell>{shoe.description}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <Pagination
        sx={{ float: "right" }}
        count={count}
        size="large"
        shape="rounded"
        page={page}
        variant="outlined"
        onChange={handleChange}
      />
    </Card>
  );
};
