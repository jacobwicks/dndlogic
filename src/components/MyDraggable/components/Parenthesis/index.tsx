import React, { useContext } from 'react';
import { Header, Label } from 'semantic-ui-react';
import { ExpressionContext } from '../../../../services/ExpressionContext'
import { getMatch } from '../../../../services/ParenthesisMatch';
import { InputContext } from '../../../../services/InputContext';
import { evaluateExpression } from '../../../../services/EvaluateExpression';

const Parenthesis = ({
  parenthesis,
  index,
  changeOnRightClick,
  doubleClickFn,
  droppableId,
  isDragging,
  ...rest
} : {
  changeOnRightClick ?: boolean,
  doubleClickFn ?: (droppableId: string, index: number) => void,
  droppableId: string,
  isDragging : boolean,
  index: number,
  parenthesis : {
    highlight ?: boolean,
    parenType: 'open' | 'close' | 'pair',
  }
}) => {
  const { state, dispatch } = useContext(ExpressionContext);
  const { expression } = state;
  const { inputs } = useContext(InputContext).state;

  const { parenType, highlight } = parenthesis;

  const getContainedExpressionValue = (index: number, matchIndex: number) => {
    const lower = Math.min(index, matchIndex) + 1;
    const higher = Math.max(index, matchIndex);
    const containedExpression = expression.slice(lower, higher);

    const value = evaluateExpression({
      expression: containedExpression,
      inputs
    })

    return value;
}
  const getContent = () => {
    if (parenType === 'close') return ')'
    if (parenType === 'open') return '('
    if (parenType === 'pair') return '()'
  }

const getColor = () => {
  if (droppableId !== 'expression') return 'yellow'

  const matchIndex = getMatch(index, expression);
  if (matchIndex === undefined) return 'grey'
  if (highlight) return 'purple';

  const containedExpressionValue = getContainedExpressionValue(index, matchIndex)  
  if (containedExpressionValue === true) return 'green'
  if (containedExpressionValue === false) return 'red'
  return 'yellow'
}

const handleMouseOver = () => {
if (droppableId !== 'expression') return;
if (highlight) return;

const match = getMatch(index, expression);
match !== undefined &&
dispatch({
  type: 'highlight',
  indexes: [index, match]
})
}

//must spread {...rest} in order for instruction popup to function 
 return (
 <Label size='large'
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
              : getColor()
            }
            content={<Header as='h1' >{getContent()}</Header>}
            onMouseOver={handleMouseOver}
            onMouseLeave={() => !isDragging && dispatch({type: 'highlightCancel'})}
          {...rest}
          />
)}

export default Parenthesis;
