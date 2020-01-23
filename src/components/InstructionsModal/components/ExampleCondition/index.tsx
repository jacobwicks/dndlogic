import React, { useState } from 'react';
import { 
    Button,
    Grid,
    Header,
    Icon,
    Input,
    Label, 
    Segment 
} from 'semantic-ui-react';
import MatchTypePicker from '../../../MatchTypePicker';
import TargetPicker from '../../../TargetPicker';
import { IInput } from '../../../../types';
import { match } from '../../../../services/Match';

const conditionValue = ({
    matchType,
    values,
    inputValue
}:{
    matchType: string,
    values: string[],
    inputValue?: string,
}) => {
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

const ExampleCondition = ({
    handleOpen,
    inputs
}: {
    handleOpen: (open: boolean) => void,
    inputs: IInput[]
}) => {
const [open, setOpen] = useState(false)
const [matchType, setMatchType] = useState<string | undefined>(undefined);
const [targetId, setTargetId] = useState<string | undefined>(inputs[0] && inputs[0].id)
const selectMatchType =  (matchType: string | undefined) => setMatchType(matchType);
const [values, setValues] = useState<string[]>([])

const inputValue = inputs.find((input: IInput) => input.id === targetId) 
//@ts-ignore
? inputs.find((input: IInput) => input.id === targetId).value
: undefined; 

console.log(`matchType is ${matchType}, inputValue is ${inputValue}`)
const color = 
matchType 
 ? conditionValue({
        matchType,
        values,
        inputValue
        })
    ? 'green'
    : 'red'
: 'blue'

const addValue = () => {
    const newValues = [...values];
    newValues.push('');
    setValues(newValues);
}


const deleteValue = (index: number) => {
    const newValues = [...values];
    newValues.splice(index, 1);
    setValues(newValues);
}
return (
<Label color={color}
    onContextMenu={(e: any) => {e.preventDefault(); handleOpen(!open); setOpen(!open)}}
    >
    {open
        ? <Segment style={{
            color: 'black',
            maxWidth: 500
            }}>
        <Grid celled columns={2}>
            <Grid.Row>
                <Grid.Column width={3}>
                Target
                </Grid.Column>
                <Grid.Column>
                <TargetPicker 
                 exampleValues={{targetId, setTargetId}}
                /> 
                </Grid.Column>
        </Grid.Row>
        <Grid.Row>
            <Grid.Column width={3}>Match Type</Grid.Column>
            <Grid.Column>
            <MatchTypePicker exampleValues={{matchType, selectMatchType}}/>
            </Grid.Column>
        </Grid.Row>
        <Grid.Row>
        <Grid.Column width={3}>
        Values
        <Button icon onClick={() => addValue()}><Icon name='add'/></Button>
        </Grid.Column>
        <Grid.Column>
            {values 
            ? values.map((value: string, index: number) => 
                <div key={`exampleValue` + index.toString()}>{index + 1}. 
                <Input label={<Button icon onClick={() => deleteValue(index)}><Icon name='delete'/></Button>} labelPosition='right'/> 
                </div>)
            : `No values`}
        </Grid.Column>
        </Grid.Row>
        </Grid>
        </Segment>
        :<Header as='h1'>Condition</Header>
        } 
</Label>
)} 

export default ExampleCondition;