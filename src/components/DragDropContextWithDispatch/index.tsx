import React, { useContext } from 'react';
import { ExpressionContext } from '../../services/ExpressionContext';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

const DragDropContextWithDispatch = (props: any) => {
    const { dispatch } = useContext(ExpressionContext);

    return (
      <DragDropContext
      onDragEnd={(result: DropResult) => {
        const { destination, source, draggableId } = result;
        if (source.droppableId === 'expression') dispatch({type: 'highlightCancel'})
        const { droppableId: startDroppable, index: startIndex } = source;
        const { droppableId: endDroppable = null, index: endIndex = null, } = destination || {};
        const item = JSON.parse(JSON.parse(draggableId).item);


        dispatch({
          type: 'drag',
          payload: {
            item,
            startDroppable,
            startIndex,
            endDroppable,
            endIndex
          }
        })
      }}
      dispatch={dispatch}
      {...props}
      />
    )
  }

export default DragDropContextWithDispatch;
