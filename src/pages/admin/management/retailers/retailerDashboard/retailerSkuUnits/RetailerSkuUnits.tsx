import React from "react";
import { useParams } from "react-router-dom";
import MainContainer from "../../../../../../components/common/MainContainer";
import { SelectColumnFilter } from "../../../../../../components/filter/SelectColumnFilter";
import Image from "../../../../../../components/Image/Index";
import ReactTable from "../../../../../../components/table/ReactTable";
import { shopProducts } from "../../../../../../http";
import { shopAssignRetailerProducts } from "../../../../../../http/server-api/server-apis";
import Action from "./Action";
import AssignUnassign from "./AssignUnassign";

export default function RetailerSkuUnits() {
  const { retailer_name, retailer_id } = useParams();
  const [data, setData] = React.useState({
    totalItems: 0,
    totalPages: 1,
    product: [],
  });
  const [loading, setLoading] = React.useState(true);
  const [page, setPage] = React.useState(0);

  const onGetRetailerProducts = async () => {
    setLoading(true);
    try {
      const res = await shopProducts("get", {
        params: "products",
        postfix: `?page=${page}&retailer_id=${retailer_id}`,
      });
      if (res?.status === 200) {
        const rowData = res.data;
        if (rowData.products) {
          for (let i = 0; i < rowData.products.length; i++) {
            try {
              const otherRes = await shopAssignRetailerProducts("get", {
                postfix: `?retailer_id=${retailer_id}&sku_id=${rowData.products[i].sku_id}`,
              });
              if (otherRes?.status === 200) {
                if (otherRes.data?.length) {
                  rowData.products[i]["assign_unassign_status"] = "assign";
                } else {
                  rowData.products[i]["assign_unassign_status"] = "unassign";
                }
                rowData.products[i]["assign_unassign"] = otherRes.data;
              }
            } catch (error: any) {
              rowData.products[i]["assign_unassign_status"] = "unassign";
              console.log(error.response);
            }
          }
        }
        setData(rowData);
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
        Header: "Product Status",
        accessor: "assign_unassign_status",
        Filter: SelectColumnFilter,
        filter: "equals",
        Cell: (cell: any) => (
          <AssignUnassign
            cell={cell}
            retailerId={retailer_id}
            onComplete={onGetRetailerProducts}
          />
        ),
        extraProps: {
          columnStyle: {
            width: "250px",
            textAlign: "center",
            paddingRight: "0px",
          },
          align: "center",
        },
      },
      {
        Header: "Image",
        accessor: "image_url",
        extraProps: {
          columnStyle: { textAlign: "center" },
          align: "center",
        },
        Cell: (cell: any) => <Image url={cell.value} alt={""} />,
      },
      {
        Header: "Sku Name",
        accessor: "sku_name",
      },
      {
        Header: "Category/Sub-Category",
        accessor: "category_id",
      },
      {
        Header: "Brand",
        accessor: "brand_id",
      },
      {
        Header: "Action",
        extraProps: {
          columnStyle: { textAlign: "center", width: "30rem" },
        },
        Cell: (cell: any) => <Action cell={cell} retailerId={retailer_id} />,
      },
    ],
    [data]
  );

  const getData = React.useMemo(() => data.product, [data, page]);

  React.useEffect(() => {
    onGetRetailerProducts();
  }, [page]);
  return (
    <MainContainer heading={`${retailer_name} / Data SKU Units`}>
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
  );
}
