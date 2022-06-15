import React from "react";
import { Spinner, Table } from "flowbite-react";
import { RiDeleteBinFill, RiFileEditLine } from "react-icons/ri";
import { BsShopWindow } from "react-icons/bs";
import AdminContainer from "../../../../components/AdminContainer";
import * as Filter from "../../../../components/filter";
import Pagination from "../../../../components/table/Pagination";
import MainContainer from "../../../../components/common/MainContainer";
import header from "../../../../components/table/header";
import { retailer } from "../../../../http";
import TextInput from "../../../../components/form/inputs/TextInput";
import Button from "../../../../components/button/Button";
import { useNavigate } from "react-router-dom";
import ActivateDeactivateBar from "../../../../components/common/ActiveDeactiveBar";

function TableContent(props: {
  data?: any;
  onDelete?: (id: string, setLoading: (l: boolean) => void) => void;
  onEdit?: (id: string) => void;
  onActivate?: (
    id: string,
    active: 1 | 0,
    setLoading: (l: boolean) => void
  ) => void;
}) {
  const [deleteLoading, setDeleteLoading] = React.useState(false);
  const [activateLoading, setActivateLoading] = React.useState(false);
  const { data } = props;

  return (
    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
        {data.retailer_id}
      </Table.Cell>
      <Table.Cell>
        <ActivateDeactivateBar
          loading={activateLoading}
          active={data.active === 1}
          onClick={() => {
            if (props.onActivate) {
              props.onActivate(
                `${data.retailer_id}`,
                data.active === 1 ? 0 : 1,
                setActivateLoading
              );
            }
          }}
        />
      </Table.Cell>
      <Table.Cell>{data.auth_code}</Table.Cell>
      <Table.Cell>{data.retailer_name}</Table.Cell>
      <Table.Cell className="flex space-x-4">
        <RiFileEditLine
          onClick={() => {
            if (props.onEdit) {
              props.onEdit(`${data.retailer_id}`);
            }
          }}
          size={20}
          className="hover:text-gray-700 hover:cursor-pointer"
        />
        {deleteLoading ? (
          <Spinner size="md" />
        ) : (
          <RiDeleteBinFill
            onClick={() =>
              props.onDelete &&
              props.onDelete(`${data.retailer_id}`, setDeleteLoading)
            }
            size={20}
            className="hover:text-gray-700 hover:cursor-pointer"
          />
        )}
      </Table.Cell>
    </Table.Row>
  );
}

export default function Retailers() {
  const [data, setData] = React.useState([]);
  const [slice, setSlice] = React.useState([]);
  const [copyData, setCopyData] = React.useState([]);
  const [entries, setEntries] = React.useState(10);
  const [loading, setLoading] = React.useState(true);
  const [retailerName, setRetailerName] = React.useState("");
  const [dataSize, setDataSize] = React.useState(0);
  const [resetActive, setResetActive] = React.useState(false);

  const navigate = useNavigate();

  const [page, setPage] = React.useState(1);
  const Head = header(["S No.", "Disable", "Auth Code", "Retailer Name"]);

  const onRetailerGet = async () => {
    try {
      const res: any = await retailer("get");
      if (res.status === 200) {
        setData(res.data);
        setSlice(res.data.slice(0, 10));
        setDataSize(res.data.length);
      }
    } catch (err: any) {
      console.log(err);
    }
    setLoading(false);
  };

  const onSearch = (search: string) => {
    setLoading(true);
    const filtered = data.filter((item: any) => {
      return item.retailer_name.toLowerCase().includes(search.toLowerCase());
    });
    setDataSize(filtered.length);
    setSlice(filtered.slice(0, entries));
    setData(filtered);
    setCopyData(data);
    setLoading(false);
    setResetActive(true);
  };

  const onReset = () => {
    if (retailerName.length !== 0 && resetActive) {
      setSlice(data.slice(0, entries));
      setDataSize(data.length);
      setRetailerName("");
      setData(copyData);
      setSlice(copyData.slice(0, entries));
      setDataSize(copyData.length);
      setPage(1);
    }
  };

  const onNew = () => navigate("/management/retailers/new");
  const onEdit = (id: string) => navigate(`/management/retailers/${id}`);

  const onDelete = async (id: string, setLoading: (l: boolean) => void) => {
    try {
      setLoading(true);
      const res: any = await retailer("delete", {
        params: id,
      });
      if (res.status === 200) {
        const filtered = slice.filter((item: any) => {
          return `${item.retailer_id}` !== id;
        });
        setSlice(filtered);
      }
    } catch (err: any) {
      console.log(err);
    }
    setLoading(false);
  };

  const onActivate = async (
    id: string,
    active: 1 | 0,
    setLoading: (l: boolean) => void
  ) => {
    try {
      setLoading(true);
      await retailer("put", {
        params: id,
        data: JSON.stringify({
          active: active,
        }),
      });
      // set active current slice
      const filtered = slice.map((item: any) => {
        if (`${item.retailer_id}` === id) {
          return { ...item, active: active };
        }
        return item;
      });
      setSlice(filtered as any);
    } catch (err: any) {
      console.log(err);
    }
    setLoading(false);
  };

  React.useEffect(() => {
    onRetailerGet();
  }, []);
  return (
    <AdminContainer>
      <MainContainer heading="Retailers">
        <div className="mb-4">
          <Button
            onClick={onNew}
            icon={<BsShopWindow size={18} />}
            color="dark"
          >
            New
          </Button>
        </div>
        <Filter.FilterContainer>
          <Filter.FilterForm>
            <TextInput
              label="Retailer Name"
              type={"text"}
              placeholder="example@gmail.com"
              value={retailerName}
              onChange={(e: any) => setRetailerName(e.target.value)}
            />
          </Filter.FilterForm>
          <Filter.FilterAction
            onSearch={() => onSearch(retailerName)}
            onReset={onReset}
          />
        </Filter.FilterContainer>
        {loading ? (
          <div className="flex flex-col justify-center items-center space-y-3 mt-4">
            <Spinner color="blue" size="xl" />
            <h2 className="dark:text-gray-100">Loading.....</h2>
          </div>
        ) : (
          <Table>
            <Head>
              <Table.HeadCell>
                <span className="sr-only">Edit</span>
              </Table.HeadCell>
            </Head>
            <Table.Body>
              {slice.map((item: any, index: number) => (
                <TableContent
                  data={item}
                  key={index}
                  onDelete={onDelete}
                  onEdit={onEdit}
                  onActivate={onActivate}
                />
              ))}
            </Table.Body>
          </Table>
        )}
        {slice.length === 0 && (
          <div className="flex flex-col justify-center items-center space-y-3 mt-4">
            <h1 className="dark:text-gray-100">No Data Found....</h1>
          </div>
        )}
        <Pagination
          currentPage={page}
          onPageChange={(page) => {
            setPage(page);
            if (entries > data.length) {
              setSlice(data.slice(0, entries));
            } else {
              setSlice(data.slice((page - 1) * entries, page * entries));
            }
          }}
          size={dataSize}
          showPageSet
          onChangePageSet={(e) => {
            setSlice(data.slice(0, e));
            setEntries(e);
          }}
        />
      </MainContainer>
    </AdminContainer>
  );
}
