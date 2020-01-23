import React, { Fragment, useState } from 'react';
import {
    Button,
    Grid,
    Icon,
    Input
} from 'semantic-ui-react';
import { IInput } from '../../../../types';

const ExampleInputs = ({
    inputs,
    addInput,
    deleteInput,
    setName,
    setValue
}: {
    inputs: IInput[],
    addInput: () => void,
    deleteInput: (index: number) => void,
    setName: ({index, name}:{index: number, name: string}) => void,
    setValue: ({index, value}:{index: number, value: string}) => void
}) => 
<Fragment>
    <Button icon onClick={() => addInput()}><Icon name='plus'/></Button>
    <br/><br/>
    <Grid celled columns={2}>
    {inputs
.map((
    input: IInput, 
    index: number
    ) =>
    <Grid.Row key={`inputRow${index}`}>
    <Grid.Column style={{'textAlign':'right'}}>
    <InputName input={input} index={index} setName={setName}/>
    </Grid.Column>
    <Grid.Column style={{'textAlign':'left'}}> 
        <Input 
        value={input.value}
        key={`inputFor${input.id}`}
        onChange={(e:any, {value}: {value: string}) => setValue({index, value})}
        label={<Button icon onClick={() => deleteInput(index)}><Icon name='minus'/></Button>} 
        labelPosition='right'
        /> 
    </Grid.Column>
    </Grid.Row>
    )}
 </Grid>
 </Fragment>

export default ExampleInputs;

const InputName = ({
    input, 
    index,
    setName
}:{
    input:IInput, 
    index:number,
    setName: ({index, name}: {index: number, name: string}) => void
}) => {
    const [open, setOpen] = useState(false);
    const [temp, setTemp] = useState(input.name);
    const handleBlur = (name:string) => {
        setOpen(false);
        setName({
            index,
            name
        })
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
    : <Fragment>
        <Button icon onClick={() => setOpen(!open)}><Icon name='edit'/></Button>
        {input.name}:
        </Fragment>
}
