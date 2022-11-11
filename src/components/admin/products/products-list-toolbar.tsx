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
import LinkRouter from "../../../routers/LinkRouter";
import RowSearch from "../../table/row-search";
import AsyncAutocomplete from "../../form/async-autocomplete";

export default function ProductsListToolbar(props: {
  title?: string;
  onClickSort?: () => void;
  onSearch: (value: string, category?: number, subcategory?: number) => void;
  exportProps?: {
    ref?: any;
    headers?: Headers;
    onClick?: () => void;
    data: string | Data | (() => string | Data);
    filename?: string;
  };
}) {
  const { onSearch, exportProps, title, onClickSort } = props;

  const [searchText, setSearchText] = React.useState("");
  const [categoryId, setCategoryId] = React.useState<undefined | number>();
  const [subcategoryId, setSubcategoryId] = React.useState<
    undefined | number
  >();

  const [category, setCategory] = React.useState({
    categories: [],
    isLoading: false,
  });
  const [subcategory, setSubcategory] = React.useState({
    subcategories: [],
    isLoading: false,
  });

  const categoriesGet = React.useCallback(async () => {
    try {
      setCategory({
        categories: [],
        isLoading: true,
      });
      let res = await categoriesHttp("get");
      if (res?.status === 200) {
        let {
          data: { totalItems, categories, totalPages },
        } = res;

        if (totalPages > 1) {
          res = await categoriesHttp("get", {
            postfix: `?page=0&size=${totalItems}`,
          });
          if (res?.status === 200) {
            let {
              data: { categories },
            } = res;
            return setCategory({
              categories: categories,
              isLoading: false,
            });
          }
        }
        return setCategory({
          categories: categories,
          isLoading: false,
        });
      }
    } catch (error) {
      console.log(error);
    }
    setCategory({
      categories: [],
      isLoading: false,
    });
  }, []);

  const subCategoriesGet = React.useCallback(async (category_id: number) => {
    if (category_id) {
      try {
        setSubcategory({
          subcategories: [],
          isLoading: false,
        });
        let res = await subCategoriesHttp("get", {
          postfix: `?category_id=${category_id}`,
        });
        if (res?.status === 200) {
          let {
            data: { totalItems, subcategories, totalPages },
          } = res;

          if (totalPages > 1) {
            res = await subCategoriesHttp("get", {
              postfix: `?category_id=${category_id}&page=0&size=${totalItems}`,
            });
            if (res?.status === 200) {
              let {
                data: { subcategories },
              } = res;
              return setSubcategory({
                subcategories: subcategories,
                isLoading: false,
              });
            }
          }
          return setSubcategory({
            subcategories: subcategories,
            isLoading: false,
          });
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      return setSubcategory({
        subcategories: [],
        isLoading: false,
      });
    }
    setSubcategory({
      subcategories: [],
      isLoading: false,
    });
  }, []);

  const onReset = () => {
    setSearchText("");
    onSearch("");
    setCategoryId(undefined);
    setSubcategoryId(undefined);
  };

  React.useEffect(() => {
    categoriesGet();
  }, []);

  React.useEffect(() => {
    if (categoryId) {
      subCategoriesGet(categoryId);
    }
  }, [categoryId]);

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
        {exportProps ? (
          <Box sx={{ m: 1 }}>
            <LinkRouter to={"product-import-export"}>
              <Button
                color="error"
                startIcon={<FaFileCsv fontSize="small" />}
                sx={{ mr: 1 }}
                size="small"
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
              size="small"
              startIcon={<FaFileCsv fontSize="small" />}
            >
              Export
            </Button>
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
            <LinkRouter to={"new"}>
              <Button color="secondary" variant="contained" size="small">
                Add Product
              </Button>
            </LinkRouter>
          </Box>
        ) : null}
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
                    loading={category.isLoading}
                    label="Category"
                    options={category.categories || []}
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
                    loading={subcategory.isLoading}
                    label="Sub Category"
                    options={subcategory.subcategories || []}
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
