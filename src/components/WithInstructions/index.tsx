import React, { 
  Fragment, 
  ReactElement,
  useContext 
} from 'react';
import {
  Icon,
  Label,
  Popup 
} from 'semantic-ui-react';
import { InstructionsContext } from '../../services/InstructionsContext';

const WithInstructions = ({
  child,
  type
}: {
  child: ReactElement,
  type: string
}) => {
  const { instructions } = useContext(InstructionsContext).state; 

    const content: {[key:string]:ReactElement | string} = {
      addInput: `Add a new input`,
      clear: `Clears the current expression and inputs.`,
      condition: <Fragment>
      <p>A condition.</p>
      <span>Will turn <Label color='green'>green</Label> if it is currently true, and will turn <Label color='red'>red</Label> if it is false</span><br/>
      <p>Right click to open and close the condition editor.</p>
      <p>Drag to trash to delete.</p>
      </Fragment>,
      deleteInput: `Delete this input`,
      editInputName: <Fragment>
        <p>Change the name of this input.</p>
        <p>Conditions that target this input will update automatically.</p>
      </Fragment>,
      editInputValue: `Type the desired value of the input here`,
      example: `Loads an example expression and set of inputs.`,
      inputs: <Fragment>
        <p>Inputs have a name and value.</p>
        <p>Inputs may be targeted by the conditions in your expression.</p>
        <p>Conditions return true or false based on the value of the target input.</p>
        <p>To change the value of an input, type in the box to the right of the name.</p>
        <p>To change the name of an input, click the <Icon name='edit'/> icon to the left of the name.</p>
      </Fragment>,
      load: `Loads the saved expression and saved inputs.`,
      newAnd: <Fragment>
        <p>The logical and operator</p>
        <p>Returns true if the expressions on both sides are true.</p>
      </Fragment>,
      newOr: <Fragment>
        <p>The logical or operator</p>
        <p>Returns true if at least one of the expressions on either side is true.</p>
      </Fragment>,
      newNot: <Fragment>
        <p>The not operator.</p>
        <p>Returns true if the expression to the right is false.</p>
      </Fragment>,
      newCondition: <Fragment>
      A new condition. <br/>
      Conditions are true or false depending on whether their target input matches the values in the condition.<br/>
      A condition will turn <Label color='green'>green</Label> if it is currently true, and will turn <Label color='red'>red</Label> if it is false.<br/> 
      Right click on a condition in the expression to open the condition editor.<br/>
      </Fragment>,
      newParenthesisPair: `Inserts a pair of parentheses into the expresion.`,
      newParenthesisOpen: `Inserts an open parenthesis into the expression.`,
      newParenthesisClose: `Inserts a close parenthesis into the expression.`,
      operator: <Fragment><p>Right click to cycle through operators</p><p>Double click to delete</p></Fragment>,
      parenthesis: <Fragment><p>Right click to toggle.</p><p>Double click to delete.</p></Fragment>,
      save: `Saves the current expression and the current inputs.`,
      trash: `The trash. Drag components here to remove them from your expression.`
    }
  
    return instructions
    ? <Popup content={content[type]} 
      trigger={child}
      />
    : child
  }


export default WithInstructions;