import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { Icon, Segment } from 'semantic-ui-react';
import WithInstructions from '../WithInstructions';

const _Trash = () => 
  <div>
<Droppable
  droppableId={'trash'}
>
  {(provided, snapshot) => (
    <Segment
      style={{
        overflow: 'auto',
            }}
      color={snapshot.isDraggingOver
      ? 'blue'
      : undefined}
      inverted={snapshot.isDraggingOver}
      tertiary={snapshot.isDraggingOver}
      >
    <div
      ref={provided.innerRef}
    > 
    <Icon name='trash' size='massive'/>
      {provided.placeholder}
    </div>
    </Segment>
    )}
</Droppable>
</div>


const Trash = () => <WithInstructions child={_Trash()} type={'trash'}/>

export default Trash;
