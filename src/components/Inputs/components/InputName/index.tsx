import React, { 
    Fragment, 
    useContext, 
    useState 
} from 'react';
import { InputContext } from '../../../../services/InputContext';
import { 
    Button,
    Icon,
    Input
} from 'semantic-ui-react';
import { IInput } from '../../../../types';
import WithInstructions from '../../../WithInstructions';

const _InputName = ({
    input, 
    index
}:{
    input:IInput, 
    index:number
}) => {
const { dispatch } = useContext(InputContext);
const [open, setOpen] = useState(false);
const [temp, setTemp] = useState(input.name);

const handleBlur = (value:string) => {
    setOpen(false);
    dispatch({type: 'rename', name: value, index})
}

return open
?   <Fragment>
    <Button icon onClick={() => setOpen(!open)}><Icon name='edit'/></Button>
        <Input 
        onKeyPress={({key}:{key: string}) => {
            if (key === 'Enter') {
                    
                !!temp && handleBlur(temp)
            }
        }}
            value={temp}
            onChange={(e) => setTemp(e.target.value)}
            onBlur={(e: any) => handleBlur(e.target.value)}

        />
    </Fragment>
: <div>
    <Button icon onClick={() => setOpen(!open)}><Icon name='edit'/></Button>
    {input.name}:
    </div>
}

const InputName = (props: {
    input: IInput, 
    index: number}) => 
<WithInstructions child={_InputName({...props})} type={'editInputName'}/>

export default InputName