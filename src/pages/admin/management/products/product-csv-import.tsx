import React from "react";
import { Box, Button } from "@mui/material";
import CommonToolbar from "../../../../components/admin/common-toolbar";
import SerialNumber from "../../../../components/admin/serial-number";
import { MainContainer } from "../../../../components/layout";
import DataTable from "../../../../components/table/data-table";
import ProductTemplate from "../../../../csv-json-template/products.json";
import CSVFileReader from "../../../../components/csv/csv-file-reader";

export default function ProductCsvImport() {
  const ref = React.useRef<any>(null);

  const [data, setData] = React.useState<Array<Record<string, any>>>([]);

  const columns = React.useMemo(
    () => [
      {
        Header: "S No.",
        accessor: (_row: any, i: number) => i + 1,
        Cell: (cell: any) => <SerialNumber cell={cell} page={0} size={"1"} />,
        width: "5.5%",
      },
      {
        Header: "SKU Name",
        accessor: "sku_name",
      },
      {
        Header: "SKU Name Kannada",
        accessor: "sku_name_kannada",
      },
      {
        Header: "SKU Code",
        accessor: "sku_code",
        width: "6%",
      },
      {
        Header: "Description",
        accessor: "description",
      },
      {
        Header: "Category",
        accessor: "category_id",
        width: "6%",
      },
      {
        Header: "Sub Category",
        accessor: "subcategory_id",
        width: "6%",
      },
      {
        Header: "Brand",
        accessor: "brand_id",
        width: "6%",
      },
      {
        Header: "Hsn Code",
        accessor: "hsn_code",
        width: "6%",
      },
    ],
    []
  );

  const exportHandle = () => ref.current.link.click();
  const onRead = (data: Array<Record<string, any>>) => setData(data);

  return (
    <MainContainer>
      <CommonToolbar
        title="Import CSV Product"
        exportProps={{
          ref,
          data: ProductTemplate,
          title: "Export Template",
          filename: "product-template-csv",
          onClick: exportHandle,
        }}
      />
      <Box my={1}>
        <CSVFileReader setFile={onRead} />
      </Box>
      <CommonToolbar title="csv data preview" titleVariant="subtitle" />
      <Box sx={{ mt: 1, maxHeight: 400, borderRadius: 1, overflow: "auto" }}>
        <DataTable
          columns={columns}
          data={data || []}
          showNotFound={data.length === 0}
        />
      </Box>
      <Button sx={{ mt: 2 }} color="secondary" size="small" variant="contained">
        Upload
      </Button>
    </MainContainer>
  );
}
