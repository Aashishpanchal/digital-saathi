import React from "react";
import { Box } from "@mui/material";
import AsyncAutocomplete from "../../../../form/async-autocomplete";
import { useQuery } from "@tanstack/react-query";
import { deliveryPartners, shopDeliveryAgent } from "../../../../../http";
import Typography from "@mui/material/Typography";
import { queryToStr } from "../../../utils";

export default function InProcess() {
  const [partnerSelect, setPartnerSelect] = React.useState<
    number | undefined
  >();
  const [partnerAgentSelect, setPartnerAgentSelect] = React.useState<
    number | undefined
  >();

  const { isLoading, data } = useQuery(["get-all-partner"], () =>
    deliveryPartners("get")
  );

  const { isLoading: partnerAgentLoading, data: partnerAgentData } = useQuery(
    ["get-all-delivery-agent", partnerSelect],
    () =>
      shopDeliveryAgent("get", {
        postfix: "?".concat(
          queryToStr({
            partner_id: partnerSelect,
          })
        ),
      })
  );

  const partnerOptions = React.useMemo(() => {
    if (data?.status === 200) return data.data || [];
    return [];
  }, [data]);

  const partnerAgent = React.useMemo(() => {
    if (partnerAgentData?.status === 200) return partnerAgentData.data || [];
    return [];
  }, [partnerAgentData]);

  return (
    <Box mt={2}>
      <Typography my={1} variant={"h6"}>
        Move order in-process
      </Typography>
      <AsyncAutocomplete
        id="partner-option"
        label="Partner"
        loading={isLoading}
        options={partnerOptions}
        value={partnerSelect}
        objFilter={{
          title: "partner_name",
          value: "partner_id",
        }}
        onChangeOption={(value) => setPartnerSelect(value)}
      />
      <AsyncAutocomplete
        id="partner-agent-option"
        sx={{ my: 2 }}
        label="Agent"
        loading={partnerAgentLoading}
        options={partnerAgent}
        value={partnerAgentSelect}
        objFilter={{
          title: "agent_name",
          value: "agent_id",
        }}
        onChangeOption={(value) => setPartnerAgentSelect(value)}
      />
    </Box>
  );
}
