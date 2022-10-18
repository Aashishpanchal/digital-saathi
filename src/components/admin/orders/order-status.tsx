import { Box, Typography } from "@mui/material";

const label: { [key: string]: any } = {
  "0": {
    name: "new",
    color: "#120ee9",
  },
  "1": {
    name: "accepted",
    color: "#e90e69",
  },
  "3": {
    name: "in-process",
    color: "#a414dd",
  },
  "4": {
    name: "out-for-delivery",
    color: "#d77b11",
  },
  "5": {
    name: "delivered",
    color: "#1896ea",
  },
  "6": {
    name: "returned",
    color: "#0ee932",
  },
  "7": {
    name: "cancelled",
    color: "#e90e24",
  },
  "8": {
    name: "returning",
    color: "#0ee932",
  },
  "10": {
    name: "returning",
    color: "#0ee932",
  },
};

export default function OrderStatus(props: { value: number }) {
  const { value } = props;

  return (
    <Box textAlign={"center"}>
      <Typography
        fontSize={"small"}
        fontWeight="bold"
        fontStyle={"oblique"}
        sx={{
          color: label[value.toString()]?.color,
        }}
      >
        {label[value.toString()]?.name}
      </Typography>
    </Box>
  );
}
