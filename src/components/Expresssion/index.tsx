import React, { useContext } from 'react';
import MyDroppable from '../MyDroppable';
import { ExpressionContext } from '../../services/ExpressionContext';
import { evaluateExpression } from '../../services/EvaluateExpression';
import { InputContext } from '../../services/InputContext';
import { parenthesisMatch } from '../../services/ParenthesisMatch';
import { IExpression } from '../../types';

const hasCondition = (expression : IExpression) => expression.some(item => item.itemType === 'condition')
const hasTarget = (expression: IExpression) => expression.some(item => item.itemType === 'condition' && !!item.content.target.id)

const Expression = () => {
const { dispatch } = useContext(ExpressionContext);
const { expression } = useContext(ExpressionContext).state;
const { inputs } = useContext(InputContext).state;

const matched = parenthesisMatch(expression);  
const noConditions = !hasCondition(expression);
const noTargets = !hasTarget(expression);

const value = evaluateExpression({
  expression,
  inputs
})
const doubleClickFn = (droppableId: string, index: number) => {
  if (expression[index].itemType !== 'condition') {
    dispatch({
      type: 'delete',
      payload: {index}
    })
  }}

return (
<MyDroppable
changeOnRightClick={true}
doubleClickFn={doubleClickFn}
direction={'horizontal'}
droppableId={'expression'}
header={`Your Expression ${noConditions 
  ? `has no conditions` 
  : noTargets ? `has no valid targets`
    : `is ${!matched 
      ? `unparseable due to mismatched parenthesis` 
      : value}`}`}
height={400}
items={expression}
/>
)}

export default Expression;
