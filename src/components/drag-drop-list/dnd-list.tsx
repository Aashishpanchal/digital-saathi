import React from "react";
import {
  DragDropContext,
  Droppable,
  OnDragEndResponder,
} from "react-beautiful-dnd";
import DraggableListItem from "./draggable-list-item";

function DnDList(props: {
  options: Array<Record<string, any>>;
  extractObj: {
    title: string;
    id: string;
  };
  onDragEnd: OnDragEndResponder;
}) {
  const { options, extractObj, onDragEnd } = props;
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable-list">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {options.map((item, index) => (
              <DraggableListItem
                item={item}
                extractObj={extractObj}
                index={index}
                key={index}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default React.memo(DnDList);
