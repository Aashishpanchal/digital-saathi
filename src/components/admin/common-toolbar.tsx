import React from "react";
import { Box, Typography, Button, Card, CardContent } from "@mui/material";
import RowSearch from "../table/row-search";
import { FaFileCsv } from "react-icons/fa";
import { Data, Headers } from "react-csv/components/CommonPropTypes";
import { CSVLink } from "react-csv";

export default function CommonToolbar(props: {
  title: string;
  onAddProps?: {
    title: string;
    onClick: () => void;
  };
  onSearch?: (value: string) => void;
  onClickExport?: () => void;
  exportProps?: {
    ref?: any;
    headers?: Headers;
    onClick?: () => void;
    data: string | Data | (() => string | Data);
    filename?: string;
  };
}) {
  const { onAddProps, title, onSearch, exportProps } = props;

  const [searchText, setSearchText] = React.useState("");

  const onReset = () => {
    setSearchText("");
    onSearch && onSearch("");
  };

  return (
    <>
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
          {title}
        </Typography>
        <Box sx={{ m: 1 }}>
          {exportProps && (
            <>
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
            </>
          )}
          {onAddProps && (
            <Button
              color="secondary"
              variant="contained"
              onClick={onAddProps.onClick}
            >
              {onAddProps.title}
            </Button>
          )}
        </Box>
      </Box>
      {onSearch && (
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
      )}
    </>
  );
}
