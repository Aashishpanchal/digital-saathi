import React from "react";
import { useParams } from "react-router-dom";
import AdminContainer from "../../../../../../components/AdminContainer";
import MainContainer from "../../../../../../components/common/MainContainer";
import Image from "../../../../../../components/Image/Index";
import ReactTable from "../../../../../../components/table/ReactTable";
import { shopProducts } from "../../../../../../http";
import Action from "./Action";

export default function RetailerSkuPricing() {
  const { retailer_name, retailer_id } = useParams();
  const [data, setData] = React.useState({
    totalItems: 0,
    totalPages: 1,
    orders: [],
  });

  const [loading, setLoading] = React.useState(true);
  const [page, setPage] = React.useState(0);

  const onGetRetailerProducts = async () => {
    setLoading(true);
    try {
      const res = await shopProducts("get", {
        params: "retailerproducts",
        postfix: `?page=${page}&retailer_id=${retailer_id}`,
      });
      if (res?.status === 200) {
        setData(res.data);
      }
    } catch (err: any) {
      console.log(err);
    }
    setLoading(false);
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "S No.",
        accessor: "sku_id",
        extraProps: {
          columnStyle: {
            width: "0px",
            textAlign: "center",
            paddingRight: "0px",
          },
        },
      },
      {
        Header: "Image",
        accessor: "category_image",
        Cell: (cell: any) => <Image url={cell.value} alt="" />,
      },
      {
        Header: "SKU Code",
        accessor: "sku_code",
      },
      {
        Header: "Category/Sub-Category",
        extraProps: {
          align: "center",
        },
        Cell: (cell: any) => {
          const { category_name, subcategory_name } = cell.row.original;
          return (
            <span className="font-bold">
              {category_name}
              <br /> {subcategory_name}
            </span>
          );
        },
      },
      {
        Header: "Brand",
        accessor: "brand_name",
      },
      {
        Header: "Action",
        extraProps: {
          columnStyle: { textAlign: "center", width: "30rem" },
        },
        Cell: (cell: any) => (
          <Action
            cell={cell}
            setData={setData}
            axiosFunction={shopProducts}
            params="retailerproducts"
            postfix={`?page=${page}&retailer_id=${retailer_id}`}
          />
        ),
      },
    ],
    [page]
  );

  const getData = React.useMemo(() => data.orders, [data, page]);

  React.useEffect(() => {
    onGetRetailerProducts();
  }, [page]);
  return (
    <AdminContainer>
      <MainContainer heading={`${retailer_name} / Data SKU Pricing`}>
        <ReactTable
          loading={loading}
          showMessage={data.totalItems === 0}
          columns={columns}
          data={getData}
          page={page}
          changePage={(page: number) => setPage(page)}
          totalEntries={data.totalItems}
          entriesPerPage={10}
          showPagination
        />
      </MainContainer>
    </AdminContainer>
  );
}
