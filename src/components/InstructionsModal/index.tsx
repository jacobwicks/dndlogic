import React, { 
  useContext,
  useState
 } from 'react';
import { 
    Button,
    Divider,
    Grid,
    Header,
    Icon,
    Label,
    List,
    Modal,
    Popup
} from 'semantic-ui-react';
import ExampleCondition from './components/ExampleCondition';
import ExampleParenthesis from './components/ExampleParenthesis';
import ExampleOperator from './components/ExampleOperator';
import ExampleInputs from './components/ExampleInputs';
import { IInput } from '../../types';
import uuidv4 from 'uuid/v4';
import { InstructionsContext } from '../../services/InstructionsContext';

const InstructionsModal = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [inputs, setInputs] = useState<IInput[]>([{
      id: `1`,
      name: `1`,
      value: ``
  }]);

  const { instructions } = useContext(InstructionsContext).state; 

const addInput = () => {
  const input = {
    id: uuidv4(),
    name: getName((inputs.length + 1).toString()),
    value: ``
  }
  const newInputs = [...inputs, input];
  setInputs(newInputs);
};

const deleteInput = (index: number) => {
    const newInputs = [...inputs];
    newInputs.splice(index, 1);
    setInputs(newInputs);
}

const getName = (name: string) => {    
  if (inputs.some((input: IInput) => input.name === name)) {
      name = getName((parseInt(name) + 1).toString())
  } 
  return name;       
}

const setName = ({index, name}: {index: number, name: string}) => {
    const newInputs = [...inputs];
    const target = inputs[index];
    target.name = name;
    setInputs(newInputs);
}

const setValue = ({index, value} : {index: number, value: string}) => {
  const newInputs = [...inputs];
  const target = inputs[index];
  target.value = value;
  setInputs(newInputs);
}

const triggerButton = <Button onClick={() => setModalOpen(!modalOpen)} circular icon='question'/>

return(
<Modal 
open={modalOpen} 
trigger={
  instructions 
  ? <Popup trigger={triggerButton} content={`Opens the Instructions menu`}/> 
  : triggerButton} 
  onClose={() => setModalOpen(false)}
  >
<Modal.Header>Logical Expression Creator</Modal.Header>
<Modal.Content scrolling>
  <Modal.Description>
      <Divider horizontal>
    <Header>Drag and Drop components to create the desired logical expression</Header>
    </Divider>
    <Header as='h3'>Components</Header>
    <Grid>
    <Grid.Row>
    <Grid.Column width={2} textAlign={'center'}>
    <ExampleParenthesis/>
    </Grid.Column>
    <Grid.Column width={14} stretched>
     Parenthesis allow you to specify the order of operations.<br/> 
     You must match pairs.<br/>
     Unmatched parenthesis will turn grey.<br/>
     Right click a parenthesis to toggle between open and close.<br/> 
     Hover over a parenthesis in your expression to highlight its match.<br/>
     To remove parenthesis from the expression, double click it or drag it into the trash.
    </Grid.Column>
    </Grid.Row>
    <Grid.Column width={2} textAlign={'center'}>
    <ExampleOperator/> 
    </Grid.Column>
    <Grid.Column width={14}>
    The logical operators:
    <List bulleted>
    <List.Item>not</List.Item>
    <List.Item>and</List.Item>
    <List.Item>or</List.Item>
    </List>
    Right click an operator to cycle through the types. <br/>
    To remove an operator from the expression, double click it or drag it into the trash.
    </Grid.Column>
    <Grid.Column width={open ? 12 : 4}>
    <ExampleCondition inputs={inputs} handleOpen={(open: boolean) => setOpen(open)}/>
    </Grid.Column>
    <Grid.Column width={open ? 4 : 12}>
    Conditions are true or false depending on whether their target input matches the values in the condition.<br/>
    A condition will turn <Label color='green'>green</Label> if it is currently true, and will turn <Label color='red'>red</Label> if it is false.<br/> 
    Try changing the match type of the example condition to 'No value'. <br/>
    Right click a condition to open the condition editor.<br/>
    Inside the condition editor you can <br/>
    <List bulleted>
    <List.Item>Select the target input</List.Item>
    <List.Item>The type of search that will determine if the target input matches the values</List.Item>
    <List.Item>List the values that the target input will be matched to.</List.Item>
    </List>
    Double clicking an input will <b>not</b> remove it from the expression.<br/>
    To remove a condition from the expression, drag it into the trash.
    </Grid.Column>
    </Grid>
    <Divider horizontal>
    <Header as='h3'>The Trash</Header>
    </Divider>
    <Grid>
    <Grid.Column width={4}>
    <Icon name='trash' size='massive' color='black'/>
    </Grid.Column>
    <Grid.Column width={12}>
    Drag and drop components into the trash to remove them from the expression. <br/>
    You can also double click on components to remove them from the expression, but this will not work on conditions.
    </Grid.Column>        
    </Grid>
    <Divider horizontal>
    <Header as='h3'>Inputs</Header>
    </Divider>

    Inputs are the targets of your conditions.<br/>
    Inputs have a name and a value.<br/>
    A condition that targets an input compares the value of the targeted input with the match type and values of the condition.<br/>
    To change the value of an input, type the desired value in the box.<br/>
    To change the name of an input, click the edit icon <Icon name='edit'/> to the left of the name, then type the desired name in the box.<br/>
    To add a new input, click the <Icon name='plus'/> icon.<br/>
    To delete an input, click the <Icon name='minus'/> icon next to the input.<br/>

      <ExampleInputs 
    inputs={inputs}
    addInput={addInput}
    deleteInput={deleteInput}
    setName={setName} 
    setValue={setValue}
    />
  </Modal.Description>
</Modal.Content>
</Modal>
)}


export default InstructionsModal;




