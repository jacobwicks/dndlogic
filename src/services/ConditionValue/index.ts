import { match } from '../Match';
import { ICondition, IInput, IExpression, IOperator, IParenthesis } from '../../types';

export const conditionValue = ({
    conditionId,
    expression,
    inputs
}: {
    conditionId: string
    expression: IExpression,
    inputs: any[]
}) => {
    const condition = expression.find((item: ICondition | IParenthesis |IOperator) => {
      if (item.itemType === 'condition') {
          if (item.content.conditionId === conditionId) {
              return true
          } else return false;
      } else return false;             
});
    
    //@ts-ignore
    const { id } = condition.content.target;
    if (!id) return undefined;
    if (!inputs || inputs.length === 0) return undefined;

    const inputValue = inputs.find((input: IInput) => input.id === id).value;
    //@ts-ignore
    const matchType = condition.content.match.type;
    //@ts-ignore
    let { values } = condition.content.match;
    
    if (matchType === 'exact') {
        if (!(!!values.length) || !inputValue) return false;
        if (!!inputValue) {
          const result = match({
            searchString: inputValue,
            items: values,
            exact: true,
            includePartial: false,
            searchBy: undefined,
            simpleReturn: undefined
          })
          return Array.isArray(result) ? !!result.length : false;  
      }
    } else if (matchType === 'none') {
        return !(!!inputValue)
      } else if (matchType === 'any') {
        return !!inputValue
      } else if (matchType === 'partialInclusive') {
        if (!!inputValue) {
            const result = match({
              searchString: inputValue,
              items: values,
              exact: false,
              includePartial: true,
              searchBy: undefined,
              simpleReturn: undefined
            })
            return Array.isArray(result) ? !!result.length : false;    
      }
    }
      //multiSearch will return partial match or exact
      //depending on what is specified
      if (!!inputValue) {
          const result = match({
            searchString: inputValue,
            exact: false,
            includePartial: false,
            items: values,
            searchBy: undefined,
            simpleReturn: undefined
          })
          return Array.isArray(result) ? !!result.length : false; 
      } else return false;    
}
