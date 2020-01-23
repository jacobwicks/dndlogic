import React, { useContext} from 'react';
import { ExpressionContext } from '../../../../services/ExpressionContext';
import { Grid, Button, Icon} from 'semantic-ui-react';
import ValueInput from './components/ValueInput';
import { 
    ICondition, 
    IOperator, 
    IParenthesis
} from '../../../../types';

const ValueEditor = ({conditionId}:{conditionId: string}) => {
    const { dispatch } = useContext(ExpressionContext); 
    const { expression } = useContext(ExpressionContext).state;
    const { values } = expression.find((item: ICondition | IParenthesis |IOperator) => {
        if (item.itemType === 'condition') {
            if (item.content.conditionId === conditionId) {
                return true
            } else return false;
        } else return false;             
}).content.match;

return (
<Grid.Row>
<Grid.Column width={3}>
Values
<Button icon onClick={() => dispatch({type: 'addValue', conditionId})}><Icon name='add'/></Button>
</Grid.Column>
<Grid.Column>
    {values 
    ? values.map((value: string, index: number) => 
        <div key={`valueEditorValue` + index.toString()}>{index + 1}. 
        <ValueInput 
        dispatch={dispatch}
        conditionId={conditionId}
        value={value}
        index={index}
        />
        </div>)
    : `No values`}
</Grid.Column>
</Grid.Row>
    )
} 

export default ValueEditor;

