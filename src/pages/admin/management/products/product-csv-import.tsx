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

export default function ProductCsvImport() {
  const ref = React.useRef<any>(null);
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState<Array<Record<string, any>>>([]);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const validateList = React.useMemo(
    () => [
      "sku_name",
      "sku_name_kannada",
      "description",
      "sku_code",
      "category_id",
      "subcategory_id",
      "brand_id",
      "hsn_code",
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
        Cell: (cell: any) => <CheckDataCell cell={cell} />,
      },
      {
        Header: "SKU Name Kannada",
        accessor: "sku_name_kannada",
        Cell: (cell: any) => <CheckDataCell cell={cell} />,
      },
      {
        Header: "Description",
        accessor: "description",
        Cell: (cell: any) => <CheckDataCell cell={cell} />,
      },
      {
        Header: "SKU Code",
        accessor: "sku_code",
        width: "6%",
        Cell: (cell: any) => <CheckDataCell cell={cell} />,
      },
      {
        Header: "Category",
        accessor: "category_id",
        width: "6%",
        Cell: (cell: any) => <CheckDataCell cell={cell} />,
      },
      {
        Header: "Sub Category",
        accessor: "subcategory_id",
        width: "6%",
        Cell: (cell: any) => <CheckDataCell cell={cell} />,
      },
      {
        Header: "Brand",
        accessor: "brand_id",
        width: "6%",
        Cell: (cell: any) => <CheckDataCell cell={cell} />,
      },
      {
        Header: "Hsn Code",
        accessor: "hsn_code",
        width: "6%",
        Cell: (cell: any) => <CheckDataCell cell={cell} />,
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
      let col = "";
      for (const column of validateList) {
        if (
          typeof row[column] === "undefined" ||
          row[column] === null ||
          row[column] === ""
        ) {
          col += column + ", ";
          show = true;
        }
      }
      if (show) {
        enqueueSnackbar(
          `${col} not allowed to be empty, please check S No. ${index + 1}`,
          { variant: "error" }
        );
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
