import React, { useState } from 'react';
import { Label, Header } from 'semantic-ui-react';

const ExampleOperator = () => {
    const [operator, setOperator] = useState('and');
    const cycle = () => {
        if (operator === 'and') setOperator('or');
        else if (operator === 'or') setOperator('not');
        else if (operator === 'not') setOperator('and'); 
    };
    return (
    <Label 
    color='orange'
    onContextMenu={(e: MouseEvent) => {
        e.preventDefault();
        cycle();
    }}>
    <Header as='h1'>{operator}</Header></Label>
    )}
    
export default ExampleOperator;