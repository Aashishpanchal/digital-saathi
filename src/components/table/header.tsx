import { Checkbox, Table } from "flowbite-react";

export default function header(headCell: Array<string>) {
  return (props: {
    checkbox?: boolean;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    children?: React.ReactNode;
  }) => {
    return (
      <Table.Head>
        {props.checkbox && (
          <Table.HeadCell>
            <Checkbox
              className="hover:cursor-pointer"
              onChange={props.onChange}
            />
          </Table.HeadCell>
        )}
        {headCell.map((cell, index) => {
          return (
            <Table.HeadCell key={index} className="dark:text-gray-300">
              {cell}
            </Table.HeadCell>
          );
        })}
        {props.children}
      </Table.Head>
    );
  };
}
