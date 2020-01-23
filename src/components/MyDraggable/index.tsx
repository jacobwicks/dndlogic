import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import DraggableContent from './components/DraggableContent';
import { 
  ICondition, 
  IOperator, 
  IParenthesis, 
  INewConditionPlaceholder, 
  INewParenthesis 
} from '../../types'

const MyDraggable = ({
  item,
  changeOnRightClick,
  doubleClickFn,
  droppableId,
  draggableId,
  index
} :{
  doubleClickFn?: (droppableId: string, index: number) => void,
  droppableId: string,
  changeOnRightClick?: boolean,
  item: ICondition | IOperator | IParenthesis | INewConditionPlaceholder | INewParenthesis,
  draggableId: string,
  index: number,
}) =>
<Draggable
  draggableId={draggableId}
  index={index}
  >
  {(provided, snapshot) => (
      <div
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
      >
        <DraggableContent
          doubleClickFn={doubleClickFn}
          droppableId={droppableId}
          item={item}
          index={index}
          isDragging={snapshot.isDragging}
          changeOnRightClick={changeOnRightClick}
          />
      </div>
  )}
</Draggable>

export default MyDraggable;
