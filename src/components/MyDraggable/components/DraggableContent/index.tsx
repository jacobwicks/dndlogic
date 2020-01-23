import React, { useContext } from 'react';
import { ExpressionContext } from '../../../../services/ExpressionContext';
import { Header, Label } from 'semantic-ui-react';
import { colors } from '../../../../types';
import Condition from '../Condition';
import Parenthesis from '../Parenthesis';
import { conditionValue } from '../../../../services/ConditionValue'
import { InputContext, } from '../../../../services/InputContext';
import WithInstructions from '../../../WithInstructions';

const capitalize = (string : string) => string.charAt(0).toUpperCase() + string.slice(1)

const DraggableContent = ({
  droppableId,
  item,
  index,
  isDragging,
  changeOnRightClick,
  doubleClickFn,
}: {
  doubleClickFn?: (droppableId: string, index: number) => void,
  droppableId: string,
  index: number,
  item : any,
  isDragging: boolean,
  changeOnRightClick?: boolean,
}) => {
  const { expression } = useContext(ExpressionContext).state;
  const { inputs } = useContext(InputContext).state;
  const { dispatch } = useContext(ExpressionContext)

  let color: keyof typeof colors | undefined = undefined;
  let content: string | undefined | any = undefined;
  let instructionType = '';

  if (item.itemType === 'parenthesis') {
    const child = 
    <Parenthesis
    droppableId={droppableId}
    parenthesis={item.content}
    index={index}
    changeOnRightClick={changeOnRightClick}
    doubleClickFn={doubleClickFn}
    isDragging={isDragging}
    />

    if (droppableId === 'expression' ) return child
    else return <WithInstructions child={child} type={`newParenthesis${capitalize(item.content.parenType)}`}/>
  } else {
      if (item.itemType === 'condition') {
        
        const getColor = (conditionId: string) => {
          const result = conditionValue({conditionId, expression, inputs})
          if (result === undefined) return 'blue'
          else return result ? 'green' : 'red'
        }

        color = getColor(item.content.conditionId)
        content = <Condition condition={item.content}/>
        instructionType = item.itemType;

      } else if (item.itemType === 'conditionPlaceholder') {
      
        color = 'blue'
        content = <Header as='h1'>Condition</Header>
        instructionType = 'newCondition';
     
      } else if (item.itemType === 'operator') {
     
        color = 'orange'
        content = <Header as='h1'>{item.content.operatorType}</Header>
        instructionType = 
          droppableId === 'expression' 
            ? item.itemType 
            : `new${capitalize(item.content.operatorType)}`
    }

  const child = <Label size='large'
    onContextMenu={(e: MouseEvent) => {
        e.preventDefault();
        if (!changeOnRightClick) return;
      dispatch({
        type: 'toggle',
        payload: {
          droppableId,
          index
        }
      })
    }}
    onDoubleClick={() => !!doubleClickFn && doubleClickFn(droppableId, index)}
    color={isDragging
      ? 'green'
      : color
    }
    content={content}
  />

  return <WithInstructions type={instructionType} child={child}/>
}}

export default DraggableContent;