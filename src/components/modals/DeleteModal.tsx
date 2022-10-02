import DeleteDialogBox from "../dialog-box/delete-dialog-box";

export default function DeleteModal(props: {
  show: boolean;
  onClose?: () => void;
  onClickNo?: () => void;
  onClickYes?: () => void;
}) {
  const { show, onClickNo, onClickYes } = props;
  return (
    <DeleteDialogBox
      open={show}
      onClickOk={onClickYes}
      onClickClose={onClickNo}
    />
  );
}
