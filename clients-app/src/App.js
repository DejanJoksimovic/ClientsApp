import React, { Component } from 'react';
import './App.css';
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import SearchBox from './ui-elements/SearchBox';
import data from './json/clients.json';
import LoadingScreen from './LoadingScreen';
import AddClientView from './AddClientView';

// import axios from 'axios';

class App extends Component {
  state = {
    clients: null, // changed
    searchInput: '',
    isOpen: '',
  }

componentDidMount() {
  fetch('http://localhost:3000/')
  .then(res => res.json())
  .then(data => this.setState({clients: data.clients}))
  .catch(e => console.log(e));

}

  onInputChange = event => {
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  setIsOpen = (isOpen) => {
    this.setState({isOpen})
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
  
    return clients ? (
      <div className="App">
        <Container fixed>
          <h1>Clients App</h1>
          <div style={{width: '300px', margin: '0 auto'}}>
          <SearchBox placeholder={'search'} value={searchInput} onChange={this.onInputChange}></SearchBox>
          </div>
          <div onClick={() => this.setIsOpen(true)}>ADD CLIENT</div>
          <List component="nav">
            {clientsListItems}
          </List>
        
        </Container>
        {this.state.isOpen && <AddClientView setIsOpen={this.setIsOpen}/> }
      </div>
    )
    :
    <LoadingScreen />
  }  
}

export default App;
