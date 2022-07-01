import React from "react";
import { FaRegFileExcel } from "react-icons/fa";
import { usePapaParse, useCSVDownloader } from "react-papaparse";

export default function SampleDownload(props: {
  jsonData: { [key: string]: any };
  title?: string;
  filename?: string;
}) {
  const { jsonToCSV } = usePapaParse();
  const { CSVDownloader, Type } = useCSVDownloader();

  return (
    <CSVDownloader
      filename={props.filename || "sample-csv"}
      type={Type.Button}
      data={jsonToCSV(props.jsonData)}
      className="flex justify-center items-center space-x-2 mb-2 mr-2 text-sm disabled:opacity-50 disabled:cursor-default px-4 py-2 tracking-wide transition-colors duration-300 transform rounded-md focus:outline-none text-gray-700 active:bg-gray-100 hover:shadow-md dark:bg-gray-800 dark:hover:bg-gray-600 border dark:text-white border-gray-300 dark:border-gray-800 bg-white"
    >
      <FaRegFileExcel size={20} />
      <span>{props.title || "Template Download"}</span>
    </CSVDownloader>
  );
}
