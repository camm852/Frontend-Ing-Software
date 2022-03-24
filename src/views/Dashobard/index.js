/* eslint-disable react-hooks/exhaustive-deps */
import DashBoardSidebar from "../../components/DashBoardSidebar";
import React, { useEffect, useState } from "react";
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
import { orderServiceApiCall, supplierServiceCall } from "../../utils";
import { useAuth } from "../../routes/auth-context";

export default function Dashboard() {
  const auth = useAuth();

  const [orders, setOrders] = useState([{}]);
  const [ordersFilter, setOrdersFilter] = useState([{}]);

  const [page, setPage] = useState(1);

  const perPage = 10;

  const count = Math.ceil(ordersFilter.length / perPage);
  const _Orders = usePagination(ordersFilter, perPage);

  const onSearch = (e) => {
    e.preventDefault();
    let value = e.target.value;
    const dataFilter = orders.filter((item) => {
      return Object.values(item).join("").toLowerCase().includes(value);
    });
    if (dataFilter) {
      setOrdersFilter(dataFilter);
    }
  };

  const handleChange = (e, page) => {
    setPage(page);
    _Orders.jump(page);
  };

  useEffect(async () => {
    // if (auth.user.roleCode === 2) {
    let response = await orderServiceApiCall({ service: "get" });
    console.log(response);
    if (response.status === 200) {
      let info = await response.json();
      setOrders(info);
      setOrdersFilter(info);
    }
  }, []);
  useEffect(() => {
    document.title = "Dashboard";
  }, []);
  return (
    <DashBoardSidebar>
      <Card>
        <PerfectScrollbar>
          <Box sx={{ minWidth: 1050 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell># Order</TableCell>
                  <TableCell>Date</TableCell>
                  {auth.user.roleCode === 2 ? <TableCell>ID</TableCell> : ""}
                  <TableCell>Status</TableCell>
                  <TableCell># Buy</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {_Orders.currentData().map((order, i) => {
                  return (
                    <TableRow hover key={i + 1}>
                      <TableCell>{order.orderNumber}</TableCell>
                      <TableCell>{order.orderDate}</TableCell>
                      {auth.user.roleCode === 2 ? (
                        <TableCell>{order.userId}</TableCell>
                      ) : (
                        ""
                      )}

                      <TableCell>
                        {order.statusCode === 1
                          ? "Pendiente"
                          : order.statusCode === 2
                          ? "Enviado"
                          : "Pago pendiente"}
                      </TableCell>
                      <TableCell>{order.buyNumber}</TableCell>
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
    </DashBoardSidebar>
  );
}
