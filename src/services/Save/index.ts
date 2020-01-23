import { IExpression, IInput } from '../../types';

export const saveState = ({
  expression,
  inputs
  } :{
  expression: IExpression,
  inputs: IInput[]
  }) => {
  try {
    localStorage.setItem('state', JSON.stringify({expression, inputs}));
    return true;
  } catch (error) {
    return {
      error
    }
  }
}

export const loadState = () => {
  try {
    const state = localStorage.getItem('state')
    if (state === null) {
      return {
        error: `No state saved`
      };
    }
    return JSON.parse(state);
  } catch (error) {
      return {
        error
      };
  }
};

export const saveInstructionState = (instructions: boolean) => {
  try {
    localStorage.setItem('instructions', JSON.stringify(instructions));
    return true;
  } catch (error) {
    return {
      error
    }
  }
}

export const loadInstructionState = () =>{
try {
  const instructions = localStorage.getItem('instructions')
  if (instructions === null) {
    return {
      error: `No instructions state saved`
    };
  }
  return JSON.parse(instructions);
} catch (error) {
    return {
      error
    };
}
};
