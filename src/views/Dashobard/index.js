import { useEffect } from "react";
import DashBoardSidebar from "../../components/DashBoardSidebar";

export default function Dashboard() {
  useEffect(() => {
    document.title = "Dashboard";
  }, []);
  return <DashBoardSidebar></DashBoardSidebar>;
}
