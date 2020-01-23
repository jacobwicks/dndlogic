import React, { useContext } from 'react';
import { 
    Button, 
    Checkbox, 
    Popup,
    Segment 
} from 'semantic-ui-react';
import InstructionsModal from '../InstructionsModal';
import { InstructionsContext } from '../../services/InstructionsContext';
import { ExpressionContext } from '../../services/ExpressionContext';
import { InputContext } from '../../services/InputContext';
import { saveState, loadState, saveInstructionState } from '../../services/Save'
import WithInstructions from '../WithInstructions';
import { examples } from '../../services/Examples';

const SaveLoad = () => {
    const {state, dispatch} = useContext(InstructionsContext);
    const { instructions } = state;
    const { expression } = useContext(ExpressionContext).state;
    const expressionDispatch = useContext(ExpressionContext).dispatch; 
    const { inputs } = useContext(InputContext).state;
    const inputDispatch = useContext(InputContext).dispatch;

    const handleClear = () => {
        expressionDispatch({type: 'load', expression: []});
        inputDispatch({type: 'load', inputs: []});
    }

    const handleLoad = () => {
        const loadResult = loadState();
        if (!!loadResult.error) {
            console.error(loadResult.error)
        } else {
            console.log(JSON.stringify(loadResult))
            expressionDispatch({type: 'load', expression: loadResult.expression});
            inputDispatch({type: 'load', inputs: loadResult.inputs});
        }        
    }
    
    const handleSave = () => {
        const saveResult = saveState({expression, inputs});
        saveResult === true 
        ? console.log(`Saved!`)
        : console.error(saveResult.error)
    }

    const loadExample = (exampleNumber: number) => {
        const { expression, inputs } = examples[exampleNumber];
        expressionDispatch({type: 'load', expression});
        inputDispatch({type: 'load', inputs});
    }
    return (
    <Segment>
    <Popup 
    content={`Turns instruction popups ${instructions ? 'off' : 'on'}.`}
    trigger ={
        <Button onClick={() => {
            saveInstructionState(!instructions);
            dispatch({type: 'toggle'});
        }}>
            Helpful Popups: <Checkbox checked={instructions}/>
        </Button>} 
    />
        <InstructionsModal />
        <WithInstructions child={<Button onClick={() => handleSave()}>Save</Button>} type='save'/>
        <WithInstructions child={<Button onClick={() => handleLoad()}>Load</Button>} type='load'/>
        <WithInstructions child={<Button onClick={() => loadExample(0)}>Example 1</Button>} type='example'/>
        <WithInstructions child={<Button onClick={() => loadExample(1)}>Example 2</Button>} type='example'/>
        <WithInstructions child={<Button onClick={() => loadExample(2)}>Example 3</Button>} type='example'/>
        <WithInstructions child={<Button onClick={() => handleClear()}>Clear</Button>} type='clear'/>
    </Segment>
    )
}

export default SaveLoad;