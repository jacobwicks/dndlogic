import React from 'react';
import { ExpressionProvider } from '../../services/ExpressionContext';
import { InputProvider } from '../../services/InputContext';
import { InstructionsProvider } from '../../services/InstructionsContext';

const Providers = (props: any) => 
<ExpressionProvider>
<InputProvider>
<InstructionsProvider
{...props}
/>
</InputProvider>
</ExpressionProvider>

export default Providers;