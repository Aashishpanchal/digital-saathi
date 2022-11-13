import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

function RetailerOrdersTab(props: {
  onSetOrderStatus: (value: number) => void;
}) {
  const [value, setValue] = React.useState(0);
  const { onSetOrderStatus } = props;

  const lists = React.useMemo(
    () => [
      {
        label: "new orders",
        order_status: 0,
      },
      {
        label: "accepted orders",
        order_status: 1,
      },
      {
        label: "in transit orders",
        order_status: 2 /*3*/,
      },
      {
        label: "delivered orders",
        order_status: 5,
      },
      {
        label: "returned orders",
        order_status: 6,
      },
      {
        label: "cancelled orders",
        order_status: 7 /*9, 10*/,
      },
    ],
    []
  );

  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        zIndex: 125,
        position: "fixed",
        right: 0,
        left: {
          lg: 280,
          sm: 0,
        },
      }}
      boxShadow={1}
    >
      <Tabs
        textColor="secondary"
        indicatorColor="secondary"
        value={value}
        onChange={(event: React.SyntheticEvent, newValue: number) =>
          setValue(newValue)
        }
        centered
      >
        {lists.map((item, index) => (
          <Tab
            key={index}
            label={item.label}
            sx={{ textTransform: "capitalize" }}
            onClick={() => onSetOrderStatus(item.order_status)}
          />
        ))}
      </Tabs>
    </Box>
  );
}

export default React.memo(RetailerOrdersTab);
