import React from 'react';
import { SideBar } from "./client/Components/Sidebar";
import './client/Form.css';
import { Grid } from 'semantic-ui-react';

function App() {
  return (
    <Grid columns="equal">
      <SideBar />
      <Grid.Column className="messagepanel">
        
      </Grid.Column>

      <Grid.Column width={3}>
        <span>

        </span>
      </Grid.Column>
    </Grid>

  );
}

export default App;