import React, { useEffect } from "react";
import DashBoardSidebar from "../../components/DashBoardSidebar";
import { SupplierListResults } from "../../components/Supplier/supplierListResults";
import { SupplierListToolbar } from "../../components/Supplier/supplierListToolbar";

export default function Suppliers() {
  useEffect(() => {
    document.title = "Suppliers";
  }, []);

  return (
    <DashBoardSidebar>
      <SupplierListToolbar />
      <SupplierListResults />
    </DashBoardSidebar>
  );
}
