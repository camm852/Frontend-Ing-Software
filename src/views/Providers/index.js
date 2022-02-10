import React from "react";
import DashBoardSidebar from "../../components/DashBoardSidebar";
import { ProviderListResults } from "../../components/Provider/providerListResults";
import { ProvidertListToolbar } from "../../components/Provider/providerListToolbar";

export default function Providers() {
  return (
    <DashBoardSidebar>
      <ProvidertListToolbar />
      <ProviderListResults />
    </DashBoardSidebar>
  );
}
