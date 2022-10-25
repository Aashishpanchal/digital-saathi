import React from "react";
import { Box, Typography, Button, Card, CardContent } from "@mui/material";
import RowSearch from "../table/row-search";

export default function CommonToolbar(props: {
  title: string;
  onAddProps?: {
    title: string;
    onClick: () => void;
  };
  onSearch: (value: string) => void;
}) {
  const { onAddProps, title, onSearch } = props;

  const [searchText, setSearchText] = React.useState("");

  const onReset = () => {
    setSearchText("");
    onSearch("");
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
        {onAddProps && (
          <Box sx={{ m: 1 }}>
            <Button
              color="secondary"
              variant="contained"
              onClick={onAddProps.onClick}
            >
              {onAddProps.title}
            </Button>
          </Box>
        )}
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
    </>
  );
}
