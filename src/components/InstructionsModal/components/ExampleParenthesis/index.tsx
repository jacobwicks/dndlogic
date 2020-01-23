import React, { useState } from 'react';
import { Label, Header } from 'semantic-ui-react';

const ExampleParenthesis = () => {
    const [open, setOpen] = useState(true) 
    return (
    <Label 
        color='yellow' 
        onContextMenu={(e: MouseEvent) => {
            e.preventDefault();
            setOpen(!open)}}
            >
    <Header as='h1'>{open ? '(' : ')'}</Header>
    </Label> 
    )}

export default ExampleParenthesis;