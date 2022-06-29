import React from "react";
import Form from "./Form";
import { Alert, Spinner } from "flowbite-react";
import LabelTextInput from "./LabelTextInput";
import Button from "../button/Button";
import { IoMdClose } from "react-icons/io";
import { MdSaveAlt } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { BiReset } from "react-icons/bi";
import { AiOutlineRollback } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { HiInformationCircle } from "react-icons/hi";
import { setFormAlert } from "../../redux/slices/alertSlice";

interface FieldsType {
  label?: string;
  type?: string;
  placeholder?: string;
  name: string;
  Field?: (props: any) => JSX.Element;
  value?: string;
  validate?: boolean;
  hintText?: string;
}

export type onClickType = () => Promise<boolean>;

export default function FormRender(props: {
  fields: Array<FieldsType>;
  children?: React.ReactNode;
  data: any;
  errors: any;
  setData: any;
  onSave?: onClickType;
  onUpdate?: onClickType;
  onSaveStay?: () => Promise<void>;
  onReset?: () => void;
}) {
  const [updateLoading, setUpdateLoading] = React.useState(false);
  const [saveLoading, setSaveLoading] = React.useState(false);
  const [saveStayLoading, setSaveStayLoading] = React.useState(false);

  const navigate = useNavigate();
  const { formAlert } = useSelector((state: RootState) => state.alertSlice);
  const dispatch = useDispatch();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.setData({ ...props.data, [e.target.name]: e.target.value });
  };

  const onDismiss = () => {
    dispatch(setFormAlert({ ...formAlert, show: false }));
  };

  return (
    <Form>
      {formAlert.show && (
        <Alert
          color={formAlert.type as any}
          icon={HiInformationCircle}
          onDismiss={onDismiss}
        >
          <span>
            <span className="font-medium">{formAlert.highLight}</span>
            {formAlert.text}
          </span>
        </Alert>
      )}
      {props.fields.map((item, index) => {
        if (item.Field) {
          const { Field } = item;
          return (
            <>
              <Field
                data={props.data}
                setData={props.setData}
                label={item.label}
                hint={props.errors[item.name]?.hintText}
                hintColor={
                  item.validate
                    ? props.errors[item.name]?.error
                      ? "red"
                      : "green"
                    : "base"
                }
              />
            </>
          );
        } else {
          return (
            <LabelTextInput
              key={index}
              type={item.type}
              label={item.label}
              placeholder={item.placeholder}
              name={item.name}
              onChange={onChange}
              value={props.data[item.name]}
              hint={props.errors[item.name]?.hintText}
              hintColor={
                item.validate
                  ? props.errors[item.name]?.error
                    ? "red"
                    : "green"
                  : "base"
              }
            />
          );
        }
      })}
      {props.children}
      <div className="mt-5 flex flex-row space-x-3">
        {props.onSave && (
          <Button
            onClick={async () => {
              if (props.onSave) {
                setSaveLoading(true);
                const res = await props.onSave();
                if (res) {
                  navigate(-1);
                }
                setSaveLoading(false);
              }
            }}
            type="submit"
            icon={
              saveLoading ? (
                <Spinner size="md" />
              ) : (
                <AiOutlineRollback size={20} />
              )
            }
            color="dark"
          >
            Save
          </Button>
        )}
        {props.onSave && (
          <Button
            onClick={async () => {
              if (props.onSaveStay) {
                setSaveStayLoading(true);
                await props.onSaveStay();
                setSaveStayLoading(false);
              }
            }}
            type="submit"
            icon={
              saveStayLoading ? <Spinner size="md" /> : <MdSaveAlt size={20} />
            }
            color="dark"
          >
            Save Stay
          </Button>
        )}
        {props.onUpdate && (
          <Button
            onClick={async () => {
              if (props.onUpdate) {
                setUpdateLoading(true);
                const res = await props.onUpdate();
                if (res) {
                  navigate(-1);
                }
                setUpdateLoading(false);
              }
            }}
            type="submit"
            icon={
              updateLoading ? <Spinner size="md" /> : <MdSaveAlt size={20} />
            }
            color="dark"
          >
            Update
          </Button>
        )}
        {props.onReset && (
          <Button
            onClick={() => {
              props.onReset && props.onReset();
              onDismiss();
            }}
            type="reset"
            color="white"
            icon={<BiReset size={20} />}
          >
            Reset
          </Button>
        )}
        <Button
          onClick={() => {
            navigate(-1);
          }}
          type="button"
          color="white"
          icon={<IoMdClose size={22} />}
        >
          Cancel
        </Button>
      </div>
    </Form>
  );
}
