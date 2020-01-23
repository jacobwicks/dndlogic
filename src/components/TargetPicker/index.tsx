import React, { 
    useContext 
} from 'react';
import { InputContext, } from '../../services/InputContext';
import { ExpressionContext } from '../../services/ExpressionContext';
import Picker from '../Picker';
import { 
    ICondition, 
    IInput,
    IOperator,
    IParenthesis
 } from '../../types';

const TargetPicker = ({
    conditionId,
    exampleValues
}: {
    conditionId ?: string
    exampleValues ?: {
        targetId ?: string,
        setTargetId : (targetId: string | undefined) => void,
    }
}) => {
    const { dispatch, state } = useContext(ExpressionContext);
    const { expression } = state;
    const { inputs } = useContext(InputContext).state;
    const targetId = !exampleValues
    ? expression.find((item: ICondition | IParenthesis |IOperator) => {
        if (item.itemType === 'condition') {
            if (item.content.conditionId === conditionId) {
                return true
            } else return false;
        } else return false;             
}).content.target.id
    : exampleValues && exampleValues.targetId;

    const text = targetId 
    ? inputs.find((input: IInput) => input.id === targetId).name 
    : `no target`

    const options = inputs.map((input: IInput) => {
        const { name, id } = input;
        return {
            key: name,
            text: name,
            value: id
        }
    })
    
    const handleChange = (targetId: string) => 
    conditionId 
    ? dispatch({
        type: 'targetSelect',
        conditionId,
        targetId
    })
    : exampleValues && exampleValues.setTargetId(targetId)

    const handleClear = () =>
    conditionId 
    ? dispatch({
        type: 'targetSelect', 
        conditionId,
        targetId: undefined
        })
    : exampleValues && exampleValues.setTargetId(targetId)

    return   (
    <Picker
        handleChange={handleChange}
        handleClear={handleClear}
        options={options}
        text={text}
      />
)}

export default TargetPicker;
