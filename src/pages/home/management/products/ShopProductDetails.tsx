import React from "react";
import { FaRupeeSign, FaImage, FaPrint } from "react-icons/fa";
import { MdProductionQuantityLimits } from "react-icons/md";
import { useParams } from "react-router-dom";
import AdminContainer from "../../../../components/AdminContainer";
import Button from "../../../../components/button/Button";
import MainContainer from "../../../../components/common/MainContainer";
import Image from "../../../../components/Image/Index";
import { PrintCard } from "../../../../components/print";
import {
  shopProductImages,
  shopProducts,
  shopProductWeightPrice,
} from "../../../../http";
import { useReactToPrint } from "react-to-print";

export default function ShopProductDetails() {
  const { sku_id, sku_name } = useParams();
  const [productData, setProductData] = React.useState({});
  const [productWeightPriceData, setProductWeightPriceData] = React.useState(
    []
  );
  const [productImageData, setProductImageData] = React.useState([]);
  let componentRef = React.useRef<any>(null);

  const onRetrieveProduct = async () => {
    try {
      const res = await shopProducts("get", { params: sku_id });
      if (res?.status === 200) {
        setProductData(res.data);
      }
    } catch (err: any) {
      console.log(err.response);
    }
  };

  const onRetrieveProductWP = async () => {
    try {
      const res = await shopProductWeightPrice("get", {
        postfix: `?sku_id=${sku_id}`,
      });
      if (res?.status === 200) {
        setProductWeightPriceData(res.data.product_prices);
      }
    } catch (err: any) {
      console.log(err.response);
    }
  };

  const onRetrieveProductImages = async () => {
    try {
      const res = await shopProductImages("get", {
        postfix: `?sku_id=${sku_id}`,
      });
      if (res?.status === 200) {
        setProductImageData(res.data.product_images);
      }
    } catch (error: any) {
      console.log(error.response);
    }
  };

  const productLabels = React.useMemo(
    () => [
      {
        Label: "SKU Name",
        accessor: "sku_name",
      },
      {
        Label: "SKU Name Kannada",
        accessor: "sku_name_kannada",
      },
      {
        Label: "SKU Code",
        accessor: "sku_code",
      },
      {
        Label: "Category",
        accessor: "category_id",
      },
      {
        Label: "Sub Category",
        accessor: "subcategory_id",
      },
      {
        Label: "Brand",
        accessor: "brand_id",
      },
      {
        Label: "HSN Code",
        accessor: "hsn_code",
      },
      {
        Label: "Description",
        accessor: "description",
      },
    ],
    []
  );

  const productWeightPriceLabels = React.useMemo(
    () => [
      {
        Label: "Price",
        accessor: "price",
      },
      {
        Label: "MRP",
        accessor: "1litre",
      },
      {
        Label: "GST",
        accessor: "gst",
      },
      {
        Label: "Weight",
        accessor: "weight",
      },
      {
        Label: "Package",
        accessor: "package",
      },
      {
        Label: "Units Per Case",
        accessor: "units_per_case",
      },
    ],
    []
  );

  const productImagesLabels = React.useMemo(
    () => [
      {
        Label: "Title",
        accessor: "sku_id",
      },
      {
        Label: "Image",
        accessor: "image",
        Cell: (cell: any) => {
          return (
            <Image
              size={85}
              src={`product-images/small-images/${cell.value}`}
              alt={""}
            />
          );
        },
      },
    ],
    []
  );
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

  React.useEffect(() => {
    onRetrieveProduct();
    onRetrieveProductWP();
    onRetrieveProductImages();
  }, []);

  return (
    <AdminContainer>
      <MainContainer heading={`${sku_name} / Price`}>
        <div className="mb-4">
          <Button onClick={onPrint} icon={<FaPrint size={18} />} color="dark">
            Print
          </Button>
        </div>
        <div className="flex flex-col space-y-4" ref={componentRef}>
          <PrintCard.Container>
            <PrintCard.Heading
              icon={<MdProductionQuantityLimits size={40} />}
              title="View Products"
            />
            <PrintCard.RenderData labels={productLabels} data={productData} />
          </PrintCard.Container>
          <PrintCard.Container>
            <PrintCard.Heading
              icon={<FaRupeeSign size={32} />}
              title="Product Weight & Price"
            />
            {productWeightPriceData.map((item, index) => (
              <PrintCard.RenderData
                key={index.toString()}
                labels={productWeightPriceLabels}
                data={item}
              />
            ))}
          </PrintCard.Container>
          <PrintCard.Container>
            <PrintCard.Heading
              icon={<FaImage size={32} />}
              title="Product Images"
            />
            {productImageData.map((item, index) => (
              <PrintCard.RenderData
                key={index.toString()}
                labels={productImagesLabels}
                data={item}
              />
            ))}
          </PrintCard.Container>
        </div>
      </MainContainer>
    </AdminContainer>
  );
}
