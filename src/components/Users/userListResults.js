import React, { useCallback, useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import debounce from "lodash.debounce";
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
  TextField,
  SvgIcon,
  InputAdornment,
} from "@mui/material";
import usePagination from "../../utils/Pagination";
import SearchIcon from "@mui/icons-material/Search";

import { userServiceCall } from "../../utils";

export const UserListResults = () => {
  const [users, setUsers] = useState([{}]);
  const [usersFilter, setUsersFilter] = useState([{}]);
  const [page, setPage] = useState(1);

  const perPage = 5;

  const count = Math.ceil(usersFilter.length / perPage);
  const _Users = usePagination(usersFilter, perPage);

  const handleChange = (e, page) => {
    setPage(page);
    _Users.jump(page);
  };

  const onSearch = (e) => {
    e.preventDefault();
    let value = e.target.value;
    // handler(value);
    const dataFilter = users.filter((item) => {
      return Object.values(item).join("").toLowerCase().includes(value);
    });
    console.log(dataFilter);
    if (dataFilter) {
      setUsersFilter(dataFilter);
    }
  };

  // const handler = useCallback(
  //   debounce((value) => {
  //     if (value.length !== 0) {
  //       const dataFilter = users.filter((item) => {
  //         return Object.values(item).join("").toLowerCase().includes(value);
  //       });
  //       console.log(dataFilter);
  // if (dataFilter) {
  //   setUsersFilter(dataFilter);
  // }
  //     } else {
  //       setUsersFilter(users);
  //     }
  //   }, 1000),
  //   []
  // );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(async () => {
    let response = await userServiceCall({ type: "list", service: "user" });
    if (response.status === 200) {
      const data = await response.json();
      setUsers(data);
      setUsersFilter(data);
    }
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
                  placeholder="Search user"
                  variant="outlined"
                  onChange={onSearch}
                />
              </Box>
            </CardContent>
          </Card>
        </Box>
        <Box>
          {usersFilter.length !== 0 ? (
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "primary.main" }}>
                  <TableCell sx={{ color: "#fff", fontWeight: "600" }}>
                    IDENTIFICATION
                  </TableCell>
                  <TableCell sx={{ color: "#fff", fontWeight: "600" }}>
                    NAME
                  </TableCell>
                  <TableCell sx={{ color: "#fff", fontWeight: "600" }}>
                    EMAIL
                  </TableCell>
                  <TableCell sx={{ color: "#fff", fontWeight: "600" }}>
                    PHONE
                  </TableCell>
                  <TableCell sx={{ color: "#fff", fontWeight: "600" }}>
                    ADDRESS
                  </TableCell>
                  <TableCell sx={{ color: "#fff", fontWeight: "600" }}>
                    ROL
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {_Users.currentData().map((user) => {
                  return (
                    <TableRow hover key={user.userId + 1}>
                      <TableCell>{user.userId}</TableCell>
                      <TableCell>{user.userName}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.phone}</TableCell>
                      <TableCell>{user.address}</TableCell>
                      <TableCell>
                        {user.roleCode === 1 ? "User" : "Admin"}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          ) : (
            <h1>Data not found</h1>
          )}
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
      {/* <TablePagination component="div" /> */}
    </Card>
  );
};
