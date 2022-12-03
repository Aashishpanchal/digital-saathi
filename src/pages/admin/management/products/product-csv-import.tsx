import React from "react";
import { useSnackbar } from "notistack";
import { Box, Button, CircularProgress } from "@mui/material";
import CommonToolbar from "../../../../components/admin/common-toolbar";
import SerialNumber from "../../../../components/admin/serial-number";
import { MainContainer } from "../../../../components/layout";
import ProductTemplate from "../../../../csv-json-template/products.json";
import CSVFileReader from "../../../../components/csv/csv-file-reader";
import PreviewTable from "../../../../components/table/preview-table";
import CheckDataCell from "../../../../components/table/cell/CheckDataCell";
import { shopProducts } from "../../../../http";
import { useNavigate } from "react-router-dom";
import { dtypeValidation } from "../../../../components/admin/utils";

export default function ProductCsvImport() {
  const ref = React.useRef<any>(null);
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState<Array<Record<string, any>>>([]);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const validateList =
    React.useMemo<
    Array<{
      label: string;
      dtype: "string" | "number";
    }>>(
      () => [
        { label: "sku_name", dtype: "string" },
        { label: "sku_name_kannada", dtype: "string" },
        { label: "description", dtype: "string" },
        { label: "sku_code", dtype: "string" },
        { label: "category_id", dtype: "number" },
        { label: "subcategory_id", dtype: "number" },
        { label: "brand_id", dtype: "number" },
        { label: "hsn_code", dtype: "number" },
        { label: "mrp", dtype: "number" },
        { label: "price", dtype: "number" },
        { label: "gst", dtype: "string" },
        { label: "weight", dtype: "number" },
        { label: "package", dtype: "number" },
        { label: "units_per_case", dtype: "number" },
        { label: "dimension", dtype: "number" },
        { label: "actualweight", dtype: "number" },
      ],
      []
    );

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
        Cell: (cell: any) => <CheckDataCell cell={cell} dtype="string" />,
      },
      {
        Header: "SKU Name Kannada",
        accessor: "sku_name_kannada",
        Cell: (cell: any) => <CheckDataCell cell={cell} dtype="string" />,
      },
      {
        Header: "Description",
        accessor: "description",
        Cell: (cell: any) => <CheckDataCell cell={cell} dtype="string" />,
      },
      {
        Header: "SKU Code",
        accessor: "sku_code",
        Cell: (cell: any) => <CheckDataCell cell={cell} dtype="string" />,
      },
      {
        Header: "Category",
        accessor: "category_id",
        Cell: (cell: any) => <CheckDataCell cell={cell} dtype="number" />,
      },
      {
        Header: "Sub Category",
        accessor: "subcategory_id",
        Cell: (cell: any) => <CheckDataCell cell={cell} dtype="number" />,
      },
      {
        Header: "Brand",
        accessor: "brand_id",
        Cell: (cell: any) => <CheckDataCell cell={cell} dtype="number" />,
      },
      {
        Header: "Hsn Code",
        accessor: "hsn_code",
        Cell: (cell: any) => <CheckDataCell cell={cell} dtype="number" />,
      },
      {
        Header: "MRP",
        accessor: "mrp",
        Cell: (cell: any) => <CheckDataCell cell={cell} dtype="number" />,
      },
      {
        Header: "Price",
        accessor: "price",
        Cell: (cell: any) => <CheckDataCell cell={cell} dtype="number" />,
      },
      {
        Header: "Gst",
        accessor: "gst",
        Cell: (cell: any) => <CheckDataCell cell={cell} dtype="string" />,
      },
      {
        Header: "Weight",
        accessor: "weight",
        Cell: (cell: any) => <CheckDataCell cell={cell} dtype="string" />,
      },
      {
        Header: "Package",
        accessor: "package",
        Cell: (cell: any) => <CheckDataCell cell={cell} dtype="number" />,
      },
      {
        Header: "Units per case",
        accessor: "units_per_case",
        Cell: (cell: any) => <CheckDataCell cell={cell} dtype="number" />,
      },
      {
        Header: "Dimension",
        accessor: "dimension",
        Cell: (cell: any) => <CheckDataCell cell={cell} dtype="number" />,
      },
      {
        Header: "Actual Weight",
        accessor: "actualweight",
        Cell: (cell: any) => <CheckDataCell cell={cell} dtype="string" />,
      },
    ],
    []
  );

  const exportHandle = () => ref.current.link.click();
  const onRead = (data: Array<Record<string, any>>) => setData(data);

  const updateMyData = (rowIndex: number, columnId: string, value: any) => {
    setData((old) =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...old[rowIndex],
            [columnId]: value,
          };
        }
        return row;
      })
    );
  };

  const onUpload = async () => {
    let show = false;
    for (let index = 0; index < data.length; index++) {
      const row = data[index];
      for (const column of validateList) {
        const { error } = dtypeValidation(
          row[column.label],
          column.dtype
        );
        show = error;
      }
      if (show) {
        enqueueSnackbar(`please check S No. ${index + 1}`, {
          variant: "error",
        });
        break;
      }
    }
    if (!show) {
      try {
        setLoading(true);
        for (let index = 0; index < data.length; index++) {
          const row = data[index];
          try {
            await shopProducts("post", {
              data: JSON.stringify(row),
            });
          } catch (err: any) {
            console.log(err);
          }
        }
        navigate(-1);
        enqueueSnackbar(`product csv upload successfully.`, {
          variant: "success",
        });
      } catch (error) {
        console.log(error);
      }
    }
    setLoading(false);
  };

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
      <Box sx={{ mt: 1 }}>
        <PreviewTable
          columns={columns}
          data={data || []}
          showNotFound={data.length === 0}
          updateMyData={updateMyData}
        />
      </Box>
      <Button
        sx={{ mt: 2 }}
        color="secondary"
        size="small"
        variant="contained"
        onClick={onUpload}
        disabled={loading}
        startIcon={
          loading ? <CircularProgress color="inherit" size={18} /> : undefined
        }
      >
        Upload
      </Button>
    </MainContainer>
  );
}
