import React from "react";
import { useNavigate } from "react-router-dom";
import MainContainer from "../../../../../components/common/MainContainer";
import { CSVButton, CSVReader } from "../../../../../components/csv";
import { UploadDataModal } from "../../../../../components/modals";
import { CheckDataCell, Table } from "../../../../../components/table";
import { shopProducts } from "../../../../../http";

export default function ImportCsvProducts() {
  const jsonData = require("../../../../../csv-json-template/products.json");

  const [uploadModalShow, setUploadModalShow] = React.useState(false);
  const [file, setFile] = React.useState({
    data: [],
    error: [],
    meta: [],
  });
  const [errors, setErrors] = React.useState<any>([]);

  const navigate = useNavigate();

  const columns = React.useMemo(
    () => [
      {
        Header: "S No.",
        Cell: (row: any) => {
          return <div>{Number(row.row.id) + 1}</div>;
        },
        extraProps: {
          columnStyle: {
            width: "0px",
            textAlign: "center",
            paddingRight: "0px",
          },
        },
      },
      {
        Header: "SKU Name",
        accessor: "sku_name",
        extraProps: {
          columnStyle: { textAlign: "center" },
        },
        Cell: (cell: any) => <CheckDataCell cell={cell} />,
      },
      {
        Header: "SKU Name Kannada",
        accessor: "sku_name_kannada",
        Cell: (cell: any) => <CheckDataCell cell={cell} />,
      },
      {
        Header: "SKU Code",
        accessor: "sku_code",
        Cell: (cell: any) => <CheckDataCell cell={cell} />,
      },
      {
        Header: "Category",
        accessor: "category_id",
        Cell: (cell: any) => <CheckDataCell cell={cell} />,
      },
      {
        Header: "Sub Category",
        accessor: "subcategory_id",
        Cell: (cell: any) => <CheckDataCell cell={cell} />,
      },
      {
        Header: "Brand",
        accessor: "brand_id",
        Cell: (cell: any) => <CheckDataCell cell={cell} />,
      },
      {
        Header: "Brand",
        accessor: "hsn_code",
        Cell: (cell: any) => <CheckDataCell cell={cell} />,
      },
    ],
    []
  );

  const getData = React.useMemo(() => file.data, [file]);
  const onCheck = (data: any) => {
    const error: any[] = [];
    data.forEach((item: any) => {
      const { id, values } = item;
      Object.keys(values).forEach((name) => {
        if (name === "S No.") {
          return;
        }
        if (typeof values[name] === "string") {
          if (values[name] === "") {
            error.push({
              row: id,
              errorText: `${name} is compulsory`,
            });
          }
        }
      });
    });
    return error;
  };

  const onUpload = async (data: any) => {
    if (data.length !== 0) {
      const errs = onCheck(data);
      if (errs.length !== 0) {
        setErrors(errs);
        setUploadModalShow(true);
        return;
      }
      for (let item of data) {
        const { original } = item;
        try {
          const res = await shopProducts("post", {
            data: JSON.stringify(original),
          });
          if (res?.status === 200) {
            console.log(res.data);
          }
        } catch (err: any) {
          console.log(err);
        }
      }
      navigate(-1);
    }
  };

  return (
    <MainContainer heading="Import Product CSV File">
      <div className="mb-4">
        <CSVButton.SampleDownload
          title="Product Template"
          jsonData={jsonData}
          filename="product-sample"
        />
        <CSVReader.CSVFileReader setFile={setFile} />
      </div>
      {file.data.length !== 0 ? (
        <Table columns={columns} data={getData} onUpload={onUpload} />
      ) : null}
      <UploadDataModal
        show={uploadModalShow}
        onClose={setUploadModalShow}
        errors={errors}
      />
    </MainContainer>
  );
}
