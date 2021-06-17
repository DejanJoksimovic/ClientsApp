import React, { Component } from 'react';
import './App.css';
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import SearchBox from './ui-elements/SearchBox';
import data from './json/clients.json';

// import axios from 'axios';

class App extends Component {
  state = {
    clients: data.clients, // changed
    searchInput: '',
  }

  onInputChange = event => {
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  render() {    
    const {clients, searchInput} = this.state; // changed
    let clientsListItems = ''; 
    if (clients) {
      clientsListItems = clients.filter((client) => client.firstName.includes(searchInput) || searchInput.trim() === '').map(client => {
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
          <h1>Clients App</h1>
          <div style={{width: '300px', margin: '0 auto'}}>
          <SearchBox placeholder={'search'} value={searchInput} onChange={this.onInputChange}></SearchBox>
          </div>
          <List component="nav">
            {clientsListItems}
          </List>
        </Container>
      </div>
    );
  }  
}

export default App;
