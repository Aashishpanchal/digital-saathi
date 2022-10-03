import React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  InputAdornment,
  SvgIcon,
  TextField,
  Typography,
} from "@mui/material";
import { FaSearch } from "react-icons/fa";
import { HiOutlineDownload, HiOutlineUpload } from "react-icons/hi";
import LinkRouter from "../../../routers/LinkRouter";

export default function ProductsListToolbar(props: {
  onClickExport?: () => void;
  onSearch: (value: string) => void;
}) {
  const { onClickExport, onSearch } = props;

  const [searchText, setSearchText] = React.useState("");

  const onReset = () => {
    setSearchText("");
    onSearch("");
  };

  return (
    <Box>
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          m: -1,
        }}
      >
        <Typography sx={{ m: 1 }} variant="h4">
          Products
        </Typography>
        <Box sx={{ m: 1 }}>
          <LinkRouter to={"product-import-export"}>
            <Button
              color="secondary"
              startIcon={<HiOutlineUpload fontSize="small" />}
              sx={{ mr: 1 }}
            >
              Import
            </Button>
          </LinkRouter>
          <Button
            color="secondary"
            startIcon={<HiOutlineDownload fontSize="small" />}
            sx={{ mr: 1 }}
            onClick={onClickExport}
          >
            Export
          </Button>
          <LinkRouter to={"new"}>
            <Button color="secondary" variant="contained">
              Add Product
            </Button>
          </LinkRouter>
        </Box>
      </Box>
      <Box sx={{ mt: 2 }}>
        <Card>
          <CardContent>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
              }}
            >
              <Box sx={{ maxWidth: 250 }}>
                <TextField
                  fullWidth
                  sx={{
                    "& .MuiInputBase-input": {
                      padding: 1,
                    },
                    "& .MuiInputBase-input:focus": {
                      boxShadow: "none",
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SvgIcon color="action" fontSize="small">
                          <FaSearch />
                        </SvgIcon>
                      </InputAdornment>
                    ),
                  }}
                  placeholder="Search Products"
                  color="secondary"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </Box>
              <Box sx={{ display: "flex", gap: 3 }}>
                <Button
                  color="secondary"
                  variant="contained"
                  size="small"
                  onClick={() => onSearch(searchText)}
                >
                  Search
                </Button>
                <Button
                  sx={{
                    borderColor: "neutral.200",
                    color: "neutral.600",
                    "&:hover": {
                      borderColor: "neutral.300",
                      color: "neutral.800",
                    },
                  }}
                  variant="outlined"
                  size="small"
                  onClick={onReset}
                >
                  Reset
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
