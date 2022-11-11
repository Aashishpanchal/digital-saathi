import { Box, Paper, Select, CircularProgress } from "@mui/material";

export default function RetailerAreaList(props: {
  value: Array<string>;
  loading: boolean;
  onChange: Function;
  options: Array<Record<string, any>>;
}) {
  const { options, value, onChange, loading } = props;

  return (
    <Paper>
      {loading ? (
        <Box
          sx={{
            width: "100%",
            height: 530,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress color="secondary" />
        </Box>
      ) : (
        <Select
          multiple
          native
          value={value}
          onChange={onChange as any}
          fullWidth
          color="secondary"
          sx={{
            width: "100%",
            height: 530,
            "& .MuiInputBase-input:focus": {
              boxShadow: "none",
            },
            ".css-1yutpuv-MuiNativeSelect-select-MuiInputBase-input-MuiOutlinedInput-input[multiple]":
              {
                height: "90%",
              },
          }}
        >
          {options.map((item: Record<string, any>, index: number) => (
            <option key={index} value={item.area_id}>
              {item?.pincode} - {item?.area}, {item?.state}
            </option>
          ))}
        </Select>
      )}
    </Paper>
  );
}
