/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import usePagination from "../../utils/Pagination";
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Pagination,
  CardContent,
  InputAdornment,
  SvgIcon,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export const SupplierListResults = () => {
  const [suppliers, setSuppliers] = useState([{}]);
  const [suppliersFilter, setSuppliersFilter] = useState([{}]);

  const [page, setPage] = useState(1);

  const perPage = 5;

  const count = Math.ceil(suppliersFilter.length / perPage);
  const _Suppliers = usePagination(suppliersFilter, perPage);

  const onClickPush = (values) => {
    suppliersJson.push(values);
    setSuppliers(values);
  };

  const suppliersJson = [
    {
      nit: "100",
      name: "bimbo",
      telephone: "334324",
      direction: "la 40",
      city: "bogota",
    },
    {
      nit: "110",
      name: "mimbo",
      telephone: "334324",
      direction: "la 40",
      city: "bogota",
    },
    {
      nit: "130",
      name: "dimbo",
      telephone: "334324",
      direction: "la 40",
      city: "bogota",
    },
    {
      nit: "120",
      name: "cimbo",
      telephone: "334324",
      direction: "la 40",
      city: "bogota",
    },
    {
      nit: "150",
      name: "himbo",
      telephone: "334324",
      direction: "la 40",
      city: "villavo",
    },
  ];

  const onSearch = (e) => {
    e.preventDefault();
    let value = e.target.value;
    // handler(value);
    const dataFilter = suppliers.filter((item) => {
      return Object.values(item).join("").toLowerCase().includes(value);
    });
    console.log(dataFilter);
    if (dataFilter) {
      setSuppliersFilter(dataFilter);
    }
  };

  const handleChange = (e, page) => {
    setPage(page);
    _Suppliers.jump(page);
  };

  React.useEffect(() => {
    // let response = await supplierServiceCall(null, "list", "supplier");
    // if (response.status === 200) {
    //   setSuppliers(await response.json());
    // }
    setSuppliers(suppliersJson);
    setSuppliersFilter(suppliersJson);
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
                  onChange={onSearch}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SvgIcon color="action" fontSize="small">
                          <SearchIcon />
                        </SvgIcon>
                      </InputAdornment>
                    ),
                  }}
                  placeholder="Search Supplier"
                  variant="outlined"
                />
              </Box>
            </CardContent>
          </Card>
        </Box>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nit</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Telephone</TableCell>
                <TableCell>Direction</TableCell>
                <TableCell>City</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {_Suppliers.currentData().map((suplier) => {
                return (
                  <TableRow hover>
                    <TableCell>{suplier.nit}</TableCell>
                    <TableCell>{suplier.name}</TableCell>
                    <TableCell>{suplier.telephone}</TableCell>
                    <TableCell>{suplier.direction}</TableCell>
                    <TableCell>{suplier.city}</TableCell>
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
