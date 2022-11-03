import React from "react";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { FaFileCsv } from "react-icons/fa";
import LinkRouter from "../../../routers/LinkRouter";
import RowSearch from "../../table/row-search";
import { Data, Headers } from "react-csv/components/CommonPropTypes";
import { CSVLink } from "react-csv";

export default function ProductsListToolbar(props: {
  onSearch: (value: string) => void;
  exportProps: {
    ref?: any;
    headers?: Headers;
    onClick?: () => void;
    data: string | Data | (() => string | Data);
    filename?: string;
  };
}) {
  const { onSearch, exportProps } = props;

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
        <Typography sx={{ m: 1 }} variant="h5">
          Products
        </Typography>
        <Box sx={{ m: 1 }}>
          <LinkRouter to={"product-import-export"}>
            <Button
              color="error"
              startIcon={<FaFileCsv fontSize="small" />}
              sx={{ mr: 1 }}
            >
              Import
            </Button>
          </LinkRouter>
          <CSVLink
            data={exportProps.data}
            headers={exportProps.headers}
            filename={exportProps?.filename}
            target="_blank"
            ref={exportProps.ref}
          />
          <Button
            sx={{ mr: 1 }}
            color="secondary"
            onClick={exportProps?.onClick}
            startIcon={<FaFileCsv fontSize="small" />}
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
                <RowSearch
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  placeholder="Search"
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
