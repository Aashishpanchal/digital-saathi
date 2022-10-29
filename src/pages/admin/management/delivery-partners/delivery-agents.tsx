import React from "react";
import Box from "@mui/material/Box";
import { MainContainer } from "../../../../components/layout";
import CommonToolbar from "../../../../components/admin/common-toolbar";
import DeliveryAgentList from "../../../../components/admin/delivery-partner/delivery-agent-list";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { deliveryPartners } from "../../../../http";

export default function DeliveryAgents() {
  const [open, setOpen] = React.useState(false);
  const [searchText, setSearchText] = React.useState("");
  const { partner_id } = useParams();

  const onAdd = () => setOpen(true);
  const onClose = () => setOpen(false);

  const searchHandler = (value: string) => {
    value =
      value.toLowerCase() === "active"
        ? "1"
        : value.toLowerCase() === "deactive"
        ? "0"
        : value;
    setSearchText(value ? `/search?search_agent=${value}` : "");
  };

  const { data } = useQuery(["delivery-agent-name"], () =>
    deliveryPartners("get", { params: partner_id })
  );

  const partnerName = React.useMemo(() => {
    if (data?.status) return data.data?.partner_name;
    return "no name";
  }, [data]);

  return (
    <MainContainer>
      <CommonToolbar
        title={`${partnerName} / Delivery Agent`}
        onAddProps={{ title: "Add Delivery Agent", onClick: onAdd }}
        onSearch={searchHandler}
      />
      <Box sx={{ mt: 3 }}>
        <DeliveryAgentList
          searchText={searchText}
          addClose={onClose}
          addOpen={open}
          partner_id={partner_id as string}
        />
      </Box>
    </MainContainer>
  );
}
