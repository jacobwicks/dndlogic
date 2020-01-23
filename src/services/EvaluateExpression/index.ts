import { 
    ICondition,
    IInput, 
    IExpression,
    IParenthesis, 
    IOperator 
} from '../../types';

import { conditionValue } from '../ConditionValue';

const isCondition = ({itemType} : ICondition | IOperator | IParenthesis) => itemType === 'condition';

const isOperator = ({itemType}: ICondition | IOperator | IParenthesis) => itemType === 'operator';

const operatorIsNot = (item: ICondition | IOperator | IParenthesis) => {
 if (item.itemType === 'operator') {
     if (item.content.operatorType === 'not') {
         return true;
     } else return false;
 } else return false;
};

const isOpenParenthesis = (item : ICondition | IOperator | IParenthesis) => {
    if (item.itemType === 'parenthesis') {
        if (item.content.parenType === 'open') {
            return true;
        } else return false;
    } else return false;
}

const isCloseParenthesis = (item : ICondition | IOperator | IParenthesis) => {
    if (item.itemType === 'parenthesis') {
        if (item.content.parenType === 'close') {
            return true;
        } else return false;
    } else {
        return false;
    } 
}


const precedence = ({content} : IOperator) => {
    const operator = content.operatorType;
    if (operator === 'not') return 2;
    if (operator === 'and') return 1;
    //if (operator === 'or') 
    return 0;
}

const twoParameter = (op: IOperator, value?: boolean) => {
    const operator = op.content.operatorType;
    if (operator === 'not') {
      return !value;
    }
  }

const threeParameter = ( op: IOperator, value1?: boolean, value2?: boolean) => {
    const operator = op.content.operatorType;
    if (operator === 'and') {
    return !!value1 && !!value2;
    } else if (operator === 'or') {
    return !!value1 || !!value2;
    }
}


export const evaluateExpression = ({
    expression, 
    inputs
} : {
    expression: IExpression,
    inputs: IInput[]
}) => {
    // 1. While there are still tokens to be read in,
    const { values, operators} = expression
    //    1.1 Get the next token.
    .reduce((acc: {
        values: (boolean | undefined)[],
        operators: IExpression
    }, item) => {
        const operators = acc.operators;
        const values = acc.values;
    //    1.2 If the token is:
    //        1.2.1 A number: push it onto the value stack.
    //        1.2.2 A variable: get its value, and push onto the value stack.
    if (isCondition(item)) {
        //@ts-ignore
        const { conditionId }  = item.content;  
        const value = conditionValue ({
            conditionId,
            expression,
            inputs
        })
        values.push(value);
        return acc;
    }
    //        1.2.3 A left parenthesis: push it onto the operator stack.
    if (isOpenParenthesis(item)) {
        operators.push(item);
        return acc;
    }
    //        1.2.4 A right parenthesis:
    if (isCloseParenthesis(item)) {
        //          1 While the thing on top of the operator stack is not a 
        //            left parenthesis,
        while (!!operators.length && !isOpenParenthesis(operators[operators.length -1])) {
            //              1 Pop the operator from the operator stack.
            const operator = operators.pop();
            //              2 Pop the value stack twice, getting two operands.
            //NOTE: values may be reversed
            const value1 = values.pop();
            
            //              3 Apply the operator to the operands, in the correct order.
            //              4 Push the result onto the value stack.
            if (!!operator && operatorIsNot(operator)) {
                const value = twoParameter(operator as IOperator, value1)
                //if it's undefined, we should return unparseable expression message
                values.push(value);;
                
            } else {
                const value2 = values.pop();
                const value = threeParameter(operator as IOperator, value1, value2);
                //if it's undefined, we should return unparseable expression message
                values.push(value);
            }
        }
        //          2 Pop the left parenthesis from the operator stack, and discard it.
        operators.pop()
        return acc;
    }
    //        1.2.5 An operator (call it thisOp):
    if (isOperator(item)) {
        //          1 While the operator stack is not empty, and the top thing on the
        //            operator stack has the same or greater precedence as thisOp,
        while (!!values.length && 
            !!operators.length && 
            precedence(operators[operators.length -1] as IOperator) 
            >= precedence(item as IOperator)) {
        //            1 Pop the operator from the operator stack.
        //            2 Pop the value stack twice, getting two operands.
        
        const operator = operators.pop();
        //              2 Pop the value stack twice, getting two operands.
        const value1 = values.pop();
        
        if (operatorIsNot(operator as IOperator)) {
            //              3 Apply the operator to the operands, in the correct order.
            const value = twoParameter(operator as IOperator, value1)
            //              4 Push the result onto the value stack.
            values.push(value);
            
        } else {
            const value2 = values.pop();
            const value = threeParameter(operator as IOperator, value1, value2);
            values.push(value)
        }}

        //          2 Push thisOp onto the operator stack.
        operators.push(item);
        return acc;
    }
    return acc;
    }, {
        values: [],
        operators: []
    })

    // 2. While the operator stack is not empty,
    while (!!operators.length) {
        //     1 Pop the operator from the operator stack.
        const operator = operators.pop();
        //     2 Pop the value stack twice, getting two operands.
        const value1 = values.pop();
        if (operatorIsNot(operator as IOperator)) {
            //              3 Apply the operator to the operands, in the correct order.
            const value = twoParameter(operator as IOperator, value1)
            //              4 Push the result onto the value stack.
            values.push(value);
            
        } else {
            const value2 = values.pop();
            const value = threeParameter(operator as IOperator, value1, value2);
            values.push(value)
        } 
    }

    while (values.length > 1) {
        const value1 = values.pop();
        const value2 = values.pop();
        const value = value1 && value2;
        values.push(value);
    }

    return values[0];
}