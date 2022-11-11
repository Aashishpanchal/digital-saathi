import { ListItem, ListItemText } from "@mui/material";
import { Draggable } from "react-beautiful-dnd";

export default function DraggableListItem(props: {
  item: Record<string, any>;
  extractObj: {
    title: string;
    id: string;
  };
  index: number;
}) {
  const { extractObj, index, item } = props;
  return (
    <Draggable draggableId={`${item[extractObj.id]}`} index={index}>
      {(provided, snapshot) => (
        <ListItem
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          sx={{
            backgroundColor: snapshot.isDragging ? "rgb(235,235,235)" : "",
          }}
        >
          <ListItemText primary={item[extractObj.title]} />
        </ListItem>
      )}
    </Draggable>
  );
}
