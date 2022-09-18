import React from "react";
import { FaCartPlus, FaPrint } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import AdminContainer from "../../../components/AdminContainer";
import Button from "../../../components/button/Button";
import ComingSoonPage from "../../../components/ComingSoonPage";
import MainContainer from "../../../components/common/MainContainer";
import { PrintCard } from "../../../components/print";
import { shopOrders } from "../../../http";

export default function OrderDetails() {
  const { order_id } = useParams();
  const [orderData, setOrderData] = React.useState({});
  let componentRef = React.useRef<any>(null);

  const orderLabel = React.useMemo(
    () => [
      {
        Label: "Order ID",
        accessor: "order_id",
      },
      {
        Label: "Order Date",
        accessor: "date",
      },
    ],
    []
  );

  const onRetrieveOrder = async () => {
    try {
      const res = await shopOrders("get", {
        params: order_id,
      });
      if (res?.status === 200) {
        setOrderData(res.data);
      }
    } catch (error: any) {
      console.log(error);
    }
  };
  const pageStyle = `
  @media print {
    @page {
      size: landscape;
    }
  }
  
  @media print {
    html,
    body {
      height: initial !important;
      overflow: initial !important;
      background-color: white !important;
      -webkit-print-color-adjust: exact;
    }
  
    .page-break {
      page-break-after: avoid;
    }
  }
  
  @page {
    size: auto;
    margin: 15mm 10mm;
  }
`;

  const onPrint = useReactToPrint({
    content: () => componentRef.current,
    pageStyle: pageStyle,
  });

  React.useEffect(() => {});

  return (
    <AdminContainer>
      <MainContainer heading="Order Details">
        <div className="mb-4">
          <Button onClick={onPrint} icon={<FaPrint size={18} />} color="dark">
            Print
          </Button>
        </div>
        <div className="flex flex-col space-y-4" ref={componentRef}>
          <PrintCard.Container>
            <PrintCard.Heading
              icon={<FaCartPlus size={40} />}
              title="View Order"
            />
            <PrintCard.RenderData labels={orderLabel} data={orderData} />
          </PrintCard.Container>
        </div>
      </MainContainer>
    </AdminContainer>
  );
}
