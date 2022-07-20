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
}) {
  const [exportTypeExt, setExportTypeExt] = React.useState<ExportType>(
    exportFromJSON.types.csv
  );
  const onDownload = () => {
    let jsonData: Array<{ [key: string]: any }> = [];
    props.rows.forEach((item) => {
      jsonData.push(item.original);
    });
    exportFromJSON({
      data: jsonData,
      fileName: props.fileName || `export-data`,
      exportType: exportTypeExt,
    });
  };
  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    switch (e.target.value) {
      case "csv":
        setExportTypeExt(exportFromJSON.types.csv);
        break;
      case "excel":
        setExportTypeExt(exportFromJSON.types.xls);
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
      <Select className="w-20" onChange={onChange}>
        <option value="csv">CSV</option>
        <option value="excel">Excel</option>
      </Select>
    </div>
  );
}
