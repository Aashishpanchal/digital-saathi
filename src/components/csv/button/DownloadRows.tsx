import React from "react";
import { TbDatabaseExport } from "react-icons/tb";
import exportFromJSON, { ExportType } from "export-from-json";
import { Row } from "react-table";
import Button from "../../button/Button";
import { Select } from "flowbite-react";

export default function DownloadRows(props: {
  title: string;
  rows: Array<
    Row<{
      [key: string]: any;
    }>
  >;
  fileName?: string;
  axiosFunction?: Function;
}) {
  const [exportTypeExt, setExportTypeExt] = React.useState<
    ExportType | "export-all-csv" | "export-all-excel"
  >(exportFromJSON.types.csv);
  const onDownload = async () => {
    if (
      exportTypeExt !== "export-all-excel" &&
      exportTypeExt !== "export-all-csv"
    ) {
      let jsonData: Array<{ [key: string]: any }> = [];
      props.rows.forEach((item) => {
        jsonData.push(item.original);
      });
      exportFromJSON({
        data: jsonData,
        fileName: props.fileName || `export-data`,
        exportType: exportTypeExt,
      });
      return;
    }
    return;
  };
  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    switch (e.target.value) {
      case "csv":
        setExportTypeExt(exportFromJSON.types.csv);
        break;
      case "excel":
        setExportTypeExt(exportFromJSON.types.xls);
        break;
      case "export-all-csv":
        setExportTypeExt("export-all-csv");
        break;
      case "export-all-excel":
        setExportTypeExt("export-all-excel");
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex space-x-2">
      <Button
        icon={<TbDatabaseExport size={18} />}
        color="white"
        onClick={onDownload}
      >
        {props.title || "Export Data"}
      </Button>
      <Select className="w-fit pr-7" onChange={onChange}>
        <option value="csv">CSV</option>
        <option value="excel">Excel</option>
        <option value="export-all-csv">Export all in CSV</option>
        <option value="export-all-excel">Export all in Excel</option>
      </Select>
    </div>
  );
}
