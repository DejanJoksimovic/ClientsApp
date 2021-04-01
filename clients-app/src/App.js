import React, { Component } from 'react';
import './App.css';
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import data from './json/clients.json';

// import axios from 'axios';

class App extends Component {
  state = {
    clients: data
  }

  render() {    
    const clients = [...this.state.clients.clients];
    let clientsListItems = '';
    if (clients) {
      clientsListItems = clients.map(client => {
        return(
          <ListItem button key={client.id}>
            <ListItemText primary={`${client.firstName} ${client.lastName}`} />
          </ListItem>
        );
      })
    }
  
    return (
      <div className="App">
        <Container fixed>
          <h1>Clients App UI</h1>
          <List component="nav">
            {clientsListItems}
          </List>
        </Container>
      </div>
    );
  }  
}

export default App;
