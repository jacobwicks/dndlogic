import { IExpression, IParenthesis, IOperator, ICondition } from '../../types';

interface IParenthesisWithIndex extends IParenthesis {
  index: number,
}

const isParenthesis = (item: IParenthesis | IOperator | ICondition) =>
item.itemType === 'parenthesis'

const isOpenParenthesis = (item: IParenthesis) =>
item.content.parenType === 'open'

const matches = (topOfStack: IParenthesisWithIndex, closedParenthesis: IParenthesis) =>
topOfStack.content.parenType === 'open' &&
closedParenthesis.content.parenType === 'close'

export const parenthesisMatch = (expression: IExpression) =>
!expression
? true
: !(!!expression
  .reduce((stack: IParenthesisWithIndex[], cur, index) => {
  if (isParenthesis(cur)) {
    if (isOpenParenthesis(cur as IParenthesis)) {
      stack.push({...cur, index} as IParenthesisWithIndex)
      return stack;
    } else {
      //handling close parenthesis
      if (stack.length === 0) {
        stack.push({...cur, index} as IParenthesisWithIndex)
        return stack;
      }
      const top = stack.pop();
      //if they do match, top is out of the stack & cur does not get added
      if (!matches(top as IParenthesisWithIndex, cur as IParenthesis)) {
        //if not match, push top back in
        stack.push(top as IParenthesisWithIndex);
        stack.push({...cur, index} as IParenthesisWithIndex)
      }
    }
  }
  return stack;
}, []).length)

export const getMatch = (myIndex: number, expression: IExpression) => {
  if (myIndex > expression.length -1) {
    //console.log(`myIndex ${myIndex} greater than expression length ${expression.length}`, expression)
    return undefined;
  }
  if (!isParenthesis(expression[myIndex])) {
    //console.log(`expression[${myIndex}] is not a parenthesis `, expression[myIndex])
    return undefined;
  }

 return expression.slice(0).reduce((acc: {
    stack: IParenthesisWithIndex[]
    matchIndex?: number
  }, cur, index, arr) => {
    if (isParenthesis(cur)) {
      if (isOpenParenthesis(cur as IParenthesis)) {
        acc.stack.push({...cur, index} as IParenthesisWithIndex)
        return acc;
      } else {
        //handling close parenthesis
        if (acc.stack.length === 0) {
          acc.stack.push({...cur, index} as IParenthesisWithIndex)
          return acc;
        }
        const top = acc.stack.pop();

        //if they do match, top is out of the stack & cur does not get added
        if (!matches(top as IParenthesisWithIndex, cur as IParenthesis)) {
          //if not match, push top back in
          acc.stack.push(top as IParenthesisWithIndex);
          acc.stack.push({...cur, index} as IParenthesisWithIndex)
        } else {
          if (myIndex === index) {
            !!top && (acc.matchIndex = top.index);
            //break out of reduce by mutating 4th argument
            arr.splice(1)
          }
          if (!!top && myIndex === top.index) {
            acc.matchIndex = index;
            //break out of reduce by mutating 4th argument
            arr.splice(1)
          }
        }
      }
    }
    return acc;
  }, {
    stack: [],
    matchIndex: undefined
  }).matchIndex
}
