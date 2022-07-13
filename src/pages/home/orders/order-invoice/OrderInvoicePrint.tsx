import React from "react";
import { FaPrint } from "react-icons/fa";

export default function OrderInvoicePrint() {
  const labelOne = React.useMemo(
    () => [
      {
        Label: "Sold by",
        accessor: "sold_by",
      },
      {
        Label: "Billing Address",
        accessor: "billing_address",
      },
      {
        Label: "Shipping Address",
        accessor: "shipping_address",
      },
      {
        Label: "Shipping Address",
        accessor: "shipping_address",
      },
      {
        Label: "GST Registration No",
        accessor: "gst_registration_no",
      },
      {
        Label: "Pan Number",
        accessor: "pan_number",
      },
      {
        Label: "Phone",
        accessor: "phone_billing",
      },
      {
        Label: "Phone",
        accessor: "phone_shipping",
      },
    ],
    []
  );

  const labelTwo = React.useMemo(
    () => [
      {
        Label: "Order Number",
        accessor: "order_number",
      },
      {
        Label: "Order Date",
        accessor: "order_date",
      },
      {
        Label: "Pan No.",
        accessor: "pan_no",
      },
    ],
    []
  );

  // React.useEffect(() => {
  //   window.print();
  // }, []);

  return (
    <div className="lg:mx-32 xl:mx-44">
      <table className="w-full">
        <tbody>
          {/* Title Part */}
          <tr className="flex justify-between items-center  border-2 border-b-0 pb-2">
            <td>
              <div className="flex justify-center w-36 xl:w-44 h-20">
                <img
                  className="w-fit h-fit print:h-20"
                  src="/assets/images/logo.png"
                  alt="Logo"
                />
              </div>
            </td>
            <td className="font-bold place-self-center">
              Original Tax Invoice
            </td>
            <td className="text-sm print:text-xs">
              <ul className="flex flex-col mx-2">
                <li className="self-end print:hidden">
                  <span className="text-end w-fit">
                    <FaPrint
                      size={25}
                      className="active:text-gray-500 transition-colors hover:cursor-pointer my-2"
                    />
                  </span>
                </li>
                <li>
                  <span className="font-bold">Invoice Number :</span>
                  00044181652780675
                </li>
                <li>
                  <span className="font-bold">Invoice Date :</span>2022-05-17
                </li>
              </ul>
            </td>
          </tr>
          {/* Order Header Part */}
          <tr className="grid grid-cols-3 gap-4 text-xs px-4 py-5 border-2 border-black border-b-0">
            <td>
              <ul>
                <li>
                  <span>
                    <strong>Sold by:</strong> Sri Banasankari Agro Centre
                  </span>
                </li>
                <li>
                  <span>Main Road,Rattihalli,Karnataka</span>
                </li>
                <li>
                  <span>
                    <strong>GST Rgirstration No:</strong> 29ABRPH660
                  </span>
                </li>
                <li>
                  <span>
                    <strong>Pan Number:</strong> ABRPH6608K
                  </span>
                </li>
              </ul>
            </td>
            <td>
              <ul>
                <li>
                  <span>
                    <strong>Billing Address:</strong>{" "}
                  </span>
                </li>
                <li>
                  <span>ramesh</span>
                </li>
                <li>
                  <span>
                    ghandi nagar,surajpur,ghaziabad,suraj,Andhra Pradesh, India
                    (987654)
                  </span>
                </li>
                <li>
                  <span>
                    <strong>Phone:</strong> 8765432109
                  </span>
                </li>
              </ul>
            </td>
            <td>
              <ul>
                <li>
                  <span>
                    <strong>Shipping Address:</strong>
                  </span>
                </li>
                <li>ram lal</li>
                <li>
                  <span>
                    rahul bihar,paratap nagar,gzb,rahul bihar,Maharashtra, India
                    (76890)
                  </span>
                </li>
                <li>
                  <span>
                    <strong>Phone:</strong> 7654321098
                  </span>
                </li>
              </ul>
            </td>
          </tr>
          {/* Order Third Part */}
          <tr className="grid grid-cols-3 gap-4 border-2 border-b-0 border-black px-4 py-5 text-xs">
            <td>
              <ul>
                <li>
                  <span>
                    <strong>Order Number:</strong> 3
                  </span>
                </li>
                <li>
                  <span>
                    <strong>Order Date:</strong> 2022-07-13 11:56:42
                  </span>
                </li>
                <li>
                  <span>
                    <strong>Pan No :</strong>
                  </span>
                </li>
              </ul>
            </td>
          </tr>
          {/* Order Forth */}
          <tr className="w-full border-2 border-black grid text-xs">
            <td>
              <table className="w-full">
                <thead>
                  <tr>
                    <th>
                      <b> Sr. No</b>
                    </th>
                    <th>
                      <b> Description</b>
                    </th>
                    <th>
                      <b> Price</b>
                    </th>
                    <th>
                      <b> Qty</b>
                    </th>
                    <th>
                      <b> Net Amount</b>
                    </th>
                    <th>
                      <b> Tax Type</b>
                    </th>
                    <th>
                      <b> Tax Amount</b>
                    </th>
                    <th>
                      <b> Total Amount</b>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>
                      ASC BRG-5 TUR
                      <br />
                      ಎಎಸ್ಸಿ ಬಿಆರ್ ಜಿ-5 ತೂರ್
                      <br />
                      (SFG5)
                    </td>
                    <td>580.00</td>
                    <td>2</td>
                    <td>1160.00</td>

                    <td>IGST (%)</td>
                    <td>0</td>
                    <td>1160</td>
                  </tr>
                </tbody>
                <tbody>
                  <tr>
                    <td>2</td>
                    <td>
                      Hilclaim
                      <br />
                      ಹಿಲ್ಕ್ಲೇಮ್
                      <br />
                      (CI5)
                    </td>
                    <td>500.00</td>
                    <td>1</td>
                    <td>500.00</td>

                    <td>IGST (%)</td>
                    <td>0</td>
                    <td>500</td>
                  </tr>
                  <tr>
                    <td></td>
                    <td>
                      <b>Total</b>
                    </td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>1,660.00</td>
                  </tr>
                  <tr>
                    <td></td>
                    <td>
                      <b>Delivery charges</b>
                    </td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>50</td>
                  </tr>
                  <tr>
                    <td></td>
                    <td>
                      <b>Delivery Discount</b>
                    </td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>50</td>
                  </tr>
                  <tr>
                    <td></td>
                    <td>
                      <b>Amount Payable</b>
                    </td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>1,660.00</td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          {/* Order Fifth */}
          <tr className="grid grid-cols-1 py-2 border-2 text-xs">
            <td>
              <span className="font-bold">
                Amount in Words- one thousand six hundred and sixty Rupees{" "}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
