import React from 'react';
import './App.css';
import { Grid } from 'semantic-ui-react';
import DragDropContext from './components/DragDropContextWithDispatch'
import Expression from './components/Expresssion';
import Insertables from './components/Insertables';
import Inputs from './components/Inputs';
import Providers from './components/Providers';
import SaveLoad from './components/SaveLoad';
import Trash from './components/Trash';

const App = () =>
  <div className="App">
  <Providers>    
    <DragDropContext>
    <SaveLoad/>
      <Expression />
      <Grid columns='equal'>
      <Grid.Row>
      <Grid.Column>
      <Inputs/>
      </Grid.Column>
      <Grid.Column>
        <Insertables/>
        <Trash/>
      </Grid.Column>
      </Grid.Row>    
      </Grid>
      </DragDropContext>
      </Providers>
  </div>

export default App;


// const App = () =>
//   <div className="App">
//     <ItemProvider>
//       <InputProvider>
//     <DragDropContext>
//     <SaveLoad/>
//       <Grid columns='equal'>
//       <Grid.Column>
//         <Grid.Row>
//         <Expression />
//         </Grid.Row>
//         <Grid.Row>
//           <Inputs/>
//         </Grid.Row>
//           </Grid.Column>
//           <Grid.Column>
//             <Grid.Row>
//               <Insertables/>
//             </Grid.Row>
//             <Grid.Row>
//               <Trash/>
//             </Grid.Row>
//           </Grid.Column>
//       </Grid>
//       </DragDropContext>
//       </InputProvider>
//     </ItemProvider>
//   </div>

