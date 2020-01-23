import React, { useState} from 'react';
import { Icon, Input, Button } from 'semantic-ui-react';

const ValueInput = ({
    conditionId,
    dispatch,
    value,
    index
}: {
    dispatch: ({type, conditionId, index, value}:{type:string, conditionId: string, index: number, value?: string}) => void,
    conditionId: string,
    value: string,
    index: number
}) => {
    const [temp, setTemp] = useState(value);
    const handleBlur = (value:string) => dispatch({type: 'setValue', conditionId, index, value})
    return (
        <Input
        onKeyPress={({key}:{key: string}) => {
            if (key === 'Enter') {
                temp !== value && handleBlur(temp)
            }
        }}
        onBlur={(e: any) => handleBlur(e.target.value)}
        onChange={(e) => setTemp(e.target.value)}        
        label={<Button icon onClick={() => dispatch({type:'deleteValue', conditionId, index})}><Icon name='delete'/></Button>}
        labelPosition='right'
        value={temp}
        />
)}

export default ValueInput;
