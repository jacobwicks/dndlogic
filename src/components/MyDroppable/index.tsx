import React, { ReactElement } from 'react';
import {
  Header,
  Segment
} from 'semantic-ui-react';
import { Droppable } from 'react-beautiful-dnd';
import MyDraggable from '../MyDraggable';
import { generateId } from './services/';
import { directions } from '../../types';

const MyDroppable = ({
  droppableId,
  direction,
  doubleClickFn,
  changeOnRightClick,
  header,
  height,
  items,
} : {
  changeOnRightClick?: boolean,
  direction?: keyof typeof directions,
  doubleClickFn?: (droppableId: string, index: number) => void,
  droppableId: string,
  header?: string | ReactElement,
  height?: number,
  items: any[],
}) =>
<Droppable
  droppableId={droppableId}
  direction={direction ? direction : 'vertical'}>
      {(provided, snapshot) => (
        <Segment
          style={{
            overflow: 'auto',
            height: height && height,
            //maxHeight: 300
                }}
          color={snapshot.isDraggingOver
          ? 'blue'
          : undefined}
          inverted={snapshot.isDraggingOver}
          tertiary={snapshot.isDraggingOver}
          >
          <Header
         as='h3'
        >
          {header}
          </Header>
        <div
          style={direction === 'horizontal'
          ? {display:'flex'}
          : undefined}
          ref={provided.innerRef}
        >
          {items && items
          .map((item : any, index: number) =>
            <MyDraggable
            droppableId={droppableId}
            doubleClickFn={doubleClickFn}
            changeOnRightClick={changeOnRightClick}
                item={item}
                draggableId={generateId({
                  item,
                  index,
                  toStringify: {
                    droppableId
                  }
                })}
                index={index}
                key={generateId({
                  item,
                  index,
                  toStringify: {
                    droppableId
                  }
                })}
            />
          )}
          {provided.placeholder}
        </div>
        </Segment>
        )}
    </Droppable>

export default MyDroppable;
