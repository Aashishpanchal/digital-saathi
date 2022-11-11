import React from "react";
import { Box } from "@mui/material";
import { MainContainer } from "../../../../components/layout";
import CommonToolbar from "../../../../components/admin/common-toolbar";
import BrandsListResults from "../../../../components/admin/brand/brands-list-results";
import useStateWithCallback from "../../../../hooks/useStateWithCallback";
import { useDispatch } from "react-redux";
import { setPageLoading } from "../../../../redux/slices/admin-slice";
import { addSno } from "../../../../components/admin/utils";
import { brands } from "../../../../http";
import { brandsFields } from "../../../../constants";
import { TbBrandSublimeText } from "react-icons/tb";

export default function Brands() {
  const [searchText, setSearchText] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const { state: csvData, updateState: setCsvData } = useStateWithCallback<
    Array<Record<string, any>>
  >([]);
  const ref = React.useRef<any>(null);
  const dispatch = useDispatch();

  const onAdd = () => setOpen(true);
  const onClose = () => setOpen(false);

  const searchHandler = (value: string) => {
    setSearchText(value ? `/search?search_brand=${value}` : "");
  };

  const exportHandle = async () => {
    try {
      dispatch(setPageLoading(true));
      const res = await brands("get", {
        postfix: searchText,
      });
      if (res?.status === 200) {
        let csvData = res.data || [];
        // indexing
        csvData = addSno(csvData);

        setCsvData(csvData, () => {
          ref.current.link.click();
          dispatch(setPageLoading(false));
        });
      }
    } catch (error) {
      console.log(error);
      dispatch(setPageLoading(false));
    }
  };

  return (
    <MainContainer>
      <CommonToolbar
        onAddProps={{
          title: "Add Brand",
          onClick: onAdd,
        }}
        title="Brands"
        icon={<TbBrandSublimeText/>}
        onSearch={searchHandler}
        exportProps={{
          ref,
          data: csvData,
          filename: `brands-csv`,
          onClick: exportHandle,
          headers: brandsFields,
        }}
      />
      <Box sx={{ mt: 3 }}>
        <BrandsListResults
          searchText={searchText}
          addOpen={open}
          addClose={onClose}
        />
      </Box>
    </MainContainer>
  );
}
