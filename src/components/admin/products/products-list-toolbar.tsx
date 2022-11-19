import React from "react";
import { CSVLink } from "react-csv";
import { FaFileCsv } from "react-icons/fa";
import { Data, Headers } from "react-csv/components/CommonPropTypes";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Grid,
} from "@mui/material";
import {
  categories as categoriesHttp,
  subCategories as subCategoriesHttp,
} from "../../../http";
import RowSearch from "../../table/row-search";
import AsyncAutocomplete from "../../form/async-autocomplete";
import { useQuery } from "@tanstack/react-query";
import { queryToStr } from "../utils";

export default function ProductsListToolbar(props: {
  title?: string;
  onClickSort?: () => void;
  onSearch: (value: string, category?: number, subcategory?: number) => void;
  onImport?: () => void;
  onAdd?: () => void;
  exportProps?: {
    ref?: any;
    headers?: Headers;
    onClick?: () => void;
    data: string | Data | (() => string | Data);
    filename?: string;
  };
}) {
  const { onSearch, exportProps, title, onClickSort, onImport, onAdd } = props;
  const [searchText, setSearchText] = React.useState("");
  const [categoryId, setCategoryId] = React.useState<undefined | number>();
  const [subcategoryId, setSubcategoryId] = React.useState<
    undefined | number
  >();

  const [categories, setCategories] = React.useState<
    Array<{ [key: string]: any }>
  >([]);
  const [subCategories, setSubCategories] = React.useState<
    Array<{ [key: string]: any }>
  >([]);

  const { isLoading: categoryLoading } = useQuery(
    ["get-all-categories"],
    () => categoriesHttp("get", { params: "categories" }),
    {
      onSuccess(data) {
        if (data?.status === 200)
          setCategories(data.data instanceof Array ? data.data : []);
      },
    }
  );
  const { isLoading: subcategoryLoading } = useQuery(
    ["get-all-subcategories", categoryId],
    () =>
      subCategoriesHttp("get", {
        params: "subcategories",
        postfix: "?".concat(queryToStr({ category_id: categoryId || 0 })),
      }),
    {
      onSuccess(data) {
        if (data?.status === 200)
          setSubCategories(data.data instanceof Array ? data.data : []);
      },
    }
  );

  const onReset = () => {
    setSearchText("");
    onSearch("");
    setCategoryId(undefined);
    setSubcategoryId(undefined);
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
          {title ? title : "Products"}
        </Typography>
        <Box sx={{ m: 1 }}>
          {onImport && (
            <Button
              color="secondary"
              startIcon={<FaFileCsv fontSize="small" />}
              sx={{ mr: 1 }}
              size="small"
              onClick={onImport}
            >
              Import
            </Button>
          )}
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
                size="small"
                startIcon={<FaFileCsv fontSize="small" />}
              >
                Export
              </Button>
            </>
          )}
          {onClickSort && (
            <Button
              sx={{ mr: 1 }}
              color="secondary"
              variant="outlined"
              onClick={onClickSort}
              size="small"
            >
              Sort
            </Button>
          )}
          {onAdd && (
            <Button
              color="secondary"
              variant="contained"
              size="small"
              onClick={onAdd}
            >
              Add Product
            </Button>
          )}
        </Box>
      </Box>
      <Box sx={{ mt: 2 }}>
        <Card>
          <CardContent>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item>
                <RowSearch
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  placeholder="Search"
                />
              </Grid>
              <Grid item>
                <Box sx={{ minWidth: 220 }}>
                  <AsyncAutocomplete
                    id="category-option"
                    loading={categoryLoading}
                    label="Category"
                    options={categories}
                    objFilter={{
                      title: "name",
                      value: "category_id",
                    }}
                    value={categoryId}
                    onChangeOption={(value) => {
                      setCategoryId(value);
                      setSubcategoryId(undefined);
                    }}
                  />
                </Box>
              </Grid>
              <Grid item>
                <Box sx={{ minWidth: 220 }}>
                  <AsyncAutocomplete
                    id="sub-category-option"
                    loading={subcategoryLoading}
                    label="Sub Category"
                    options={subCategories}
                    objFilter={{
                      title: "name",
                      value: "category_id",
                    }}
                    value={subcategoryId}
                    onChangeOption={(value) => setSubcategoryId(value)}
                  />
                </Box>
              </Grid>
            </Grid>
            <Box
              sx={{
                display: "flex",
                gap: 3,
                marginTop: 0.5,
                justifyContent: "flex-end",
              }}
            >
              <Button
                color="secondary"
                variant="contained"
                size="small"
                onClick={() => onSearch(searchText, categoryId, subcategoryId)}
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
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
