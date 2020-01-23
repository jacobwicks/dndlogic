import React, { useContext } from 'react';
import { 
    Button, 
    Grid, 
    Icon, 
    Header, 
    Input, 
    Segment 
} from 'semantic-ui-react';
import { InputContext } from '../../services/InputContext';
import { ExpressionContext } from '../../services/ExpressionContext';
import { IInput } from '../../types';
import InputName from './components/InputName';
import WithInstructions from '../WithInstructions';

const AddInputButton = ({
    dispatch
}:{
    dispatch: ({type}: {type: string}) => void,
}) => <WithInstructions child={<Button icon onClick={() => dispatch({type: 'new'})}><Icon name='plus'/></Button>} type={'addInput'} />

const DeleteInputButton = ({
    dispatch,
    id,
    index
}:{
    dispatch: ({
        type, 
        index
    }: {
        type: string,
        index: number
    }) => void,
    id: string,
    index: number,
}) => {
    const expressionDispatch = useContext(ExpressionContext).dispatch;

    const child = 
    <Button icon 
    onClick={() => {
        expressionDispatch({
            type: 'deleteTarget',
            id
        })    
        dispatch({
            type:'delete', 
            index
            })}
    }>
    <Icon name='minus'/>
    </Button>

return <WithInstructions child={child} type={'deleteInput'} />
}
 
const _Inputs = () => {
    const { dispatch } = useContext(InputContext);
    const { inputs } = useContext(InputContext).state;
    
return <Segment>
    <Header as='h2'>Inputs</Header>
    <AddInputButton dispatch={dispatch} />
     <br/><br/>
    <Grid celled columns={2}>
    {inputs
.map((
    input: IInput, 
    index: number
    ) =>
    <Grid.Row key={`inputRow${index}`}>
    <Grid.Column style={{'textAlign':'right'}}>
    <InputName input={input} index={index}/>
    </Grid.Column>
    <Grid.Column style={{'textAlign':'left'}}> 
        <Input 
        value={input.value}
        key={`inputFor${input.id}`}
        onChange={(e:any, {value}: {value: string}) => dispatch({
            type: 'save',
            index,
            value
        })}
        placeholder={`Type value here...`}
        />
       <DeleteInputButton dispatch={dispatch} id={input.id} index={index}/>
    </Grid.Column>
    </Grid.Row>
    )}
 </Grid>
</Segment>
}

const Inputs = () => <WithInstructions child={_Inputs()} type={'inputs'}/>

export default Inputs;

