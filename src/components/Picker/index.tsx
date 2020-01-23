import React, { Fragment } from 'react';
import { 
    Button,
    Dropdown,
    Icon
 } from 'semantic-ui-react';

interface IOption {
    key: string,
    text: string,
    value: string
}

const Picker = ({
    handleClear,
    handleChange,
    options,
    text
}: {
    handleClear : () => void,
    handleChange : (argt: string) => void,
    options: IOption[],
    text?: string
}) => 
<Fragment>
    <Dropdown
    onChange={(e, {value}) => typeof(value) === 'string' && handleChange(value)}
    button
    floating
    labeled
    options={options}
    search
    text={text}
  />
  <Button 
    onClick={() => handleClear()}
    icon>
    <Icon name='delete'/>
    </Button>
</Fragment>

export default Picker;