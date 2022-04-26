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
import { supplierServiceCall } from "../../utils";

export const SupplierListResults = () => {
  const [suppliers, setSuppliers] = useState([{}]);
  const [suppliersFilter, setSuppliersFilter] = useState([{}]);
  const [page, setPage] = useState(1);

  React.useEffect(() => {
    const getAllSuppliers = async () => {
      let response = await supplierServiceCall(null, "list");
      if (response.status === 200) {
        let data = await response.json();
        setSuppliers(data);
        setSuppliersFilter(data);
      }
    };
    getAllSuppliers();
  }, []);

  const perPage = 5;
  const count = Math.ceil(suppliersFilter.length / perPage);
  const _Suppliers = usePagination(suppliersFilter, perPage);

  const onSearch = (e) => {
    e.preventDefault();
    let value = e.target.value;
    const dataFilter = suppliers.filter((item) => {
      return Object.values(item).join("").toLowerCase().includes(value);
    });
    if (dataFilter) {
      setSuppliersFilter(dataFilter);
    }
  };

  const handleChange = (e, page) => {
    setPage(page);
    _Suppliers.jump(page);
  };

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
              {_Suppliers.currentData().map((suplier, i) => {
                return (
                  <TableRow hover key={i + 1}>
                    <TableCell>{suplier.supplierNit}</TableCell>
                    <TableCell>{suplier.supplierName}</TableCell>
                    <TableCell>{suplier.phone}</TableCell>
                    <TableCell>{suplier.supplierAddress}</TableCell>
                    <TableCell>{suplier.cityName}</TableCell>
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
