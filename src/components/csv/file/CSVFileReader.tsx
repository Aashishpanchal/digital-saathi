import React from "react";
import {
  useCSVReader,
  lightenDarkenColor,
  formatFileSize,
} from "react-papaparse";

const DEFAULT_REMOVE_HOVER_COLOR = "#A01919";
const REMOVE_HOVER_COLOR_LIGHT = lightenDarkenColor(
  DEFAULT_REMOVE_HOVER_COLOR,
  40
);

export default function CSVFileReader(props: { setFile: any }) {
  const { CSVReader } = useCSVReader();
  const [zoneHover, setZoneHover] = React.useState(false);
  const [removeHoverColor, setRemoveHoverColor] = React.useState(
    DEFAULT_REMOVE_HOVER_COLOR
  );
  const [onRemove, setOnRemove] = React.useState(null);

  React.useEffect(() => {
    if (!onRemove) {
      props.setFile({ data: [], error: [], meta: [] });
    }
  }, [onRemove]);

  return (
    <div className="hover:cursor-pointer max-w-lg">
      <CSVReader
        onUploadAccepted={(results: any) => {
          props.setFile(results);
          setZoneHover(false);
        }}
        onDragOver={(event: DragEvent) => {
          event.preventDefault();
          setZoneHover(true);
        }}
        onDragLeave={(event: DragEvent) => {
          event.preventDefault();
          setZoneHover(false);
        }}
        config={{
          header: true,
        }}
        maxSize={1024 * 5}
        onUploadRejected={(file: any) => {
          console.log(file);
        }}
      >
        {({
          getRootProps,
          acceptedFile,
          ProgressBar,
          getRemoveFileProps,
          Remove,
        }: any) => {
          setOnRemove(acceptedFile);
          return (
            <>
              <div
                {...getRootProps()}
                className={"flex flex-col justify-center p-4 items-center border-2 border-dashed rounded-lg ".concat(
                  zoneHover ? "border-gray-600" : "border-gray-300"
                )}
              >
                {acceptedFile ? (
                  <>
                    <div
                      style={{
                        background: "linear-gradient(to bottom, #EEE, #DDD)",
                      }}
                      className="rounded-lg flex h-32 w-32 relative z-10 flex-col justify-center"
                    >
                      <div className="flex items-center flex-col px-4">
                        <span className="bg-gray-200 rounded-lg mb-2 justify-center flex">
                          {formatFileSize(acceptedFile.size)}
                        </span>
                        <span className="bg-gray-200 rounded-lg text-[12px] mb-2">
                          {acceptedFile.name}
                        </span>
                      </div>
                      <div className="bottom-[14px] absolute w-full px-4">
                        <ProgressBar />
                      </div>
                      <div
                        {...getRemoveFileProps()}
                        className="h-6 absolute right-2 top-2 w-6"
                        onMouseOver={(event: Event) => {
                          event.preventDefault();
                          setRemoveHoverColor(REMOVE_HOVER_COLOR_LIGHT);
                        }}
                        onMouseOut={(event: Event) => {
                          event.preventDefault();
                          setRemoveHoverColor(DEFAULT_REMOVE_HOVER_COLOR);
                        }}
                      >
                        <Remove color={removeHoverColor} />
                      </div>
                    </div>
                  </>
                ) : (
                  <span className="text-center">
                    Drop CSV file here or click to upload and File must be{" "}
                    <strong>.csv</strong>, size <strong>1024kb</strong>
                  </span>
                )}
              </div>
            </>
          );
        }}
      </CSVReader>
    </div>
  );
}
