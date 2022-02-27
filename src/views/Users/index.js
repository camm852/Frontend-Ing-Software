import React, { useEffect } from "react";
import DashBoardSidebar from "../../components/DashBoardSidebar";
import { UserListResults } from "../../components/Users/userListResults";
import { UserListToolbar } from "../../components/Users/userListToolbar";

export default function Users() {
  useEffect(() => {
    document.title = "Users";
  }, []);

  return (
    <DashBoardSidebar>
      <UserListToolbar />
      <UserListResults />
    </DashBoardSidebar>
  );
}
