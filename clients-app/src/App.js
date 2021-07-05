import React, { Component } from 'react';
import './App.css';
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import SearchBox from './ui-elements/SearchBox';
import LoadingScreen from './LoadingScreen';
import AddClientView from './AddClientView';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import UpdateClientView from './UpdateClientView';
import {fetchRequest} from './utils';

// import axios from 'axios';

class App extends Component {
  state = {
    clients: null, // changed
    searchInput: '',
    isOpen: '',
    isEditPageOpen: false,
    editClient: null,
    shouldRefresh: false, 
  }

componentDidMount() {
  fetchRequest('http://localhost:3000/', (data) => this.setState({clients: data.clients}), (error) => console.log(error));
}

componentDidUpdate(prevProps, prevState) {
  if(prevState.shouldRefresh !== this.state.shouldRefresh && this.state.shouldRefresh) {
    fetchRequest('http://localhost:3000/', (data) => this.setState({clients: data.clients}), (error) => console.log(error));
    this.setState({shouldRefresh: false});
  } 
}

  setClients = clients => {
    this.setState({clients});
  }

  onInputChange = event => {
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  setIsOpenEditPage = value => {
    this.setState({isEditPageOpen: value});
  }

  setIsOpen = (isOpen) => {
    this.setState({isOpen})
  }

  setEditClient = (client) => {
    this.setState({editClient: client}, () => {
      this.setIsOpenEditPage(true);
    });
    
  }



  deleteRequest = async (client) => {
    await fetch('http://localhost:3000/client', {
            method: 'DELETE',
            body: JSON.stringify(client),
            headers: {'Content-Type': 'application/json'},
        })
    this.setShouldRefres(true);
  }

  setShouldRefres = (value) => {
    this.setState({shouldRefresh: value});
  }

  render() {    
    const {clients, searchInput} = this.state; // changed
    let clientsListItems = ''; 
    if (clients) {
      clientsListItems = clients.filter((client) => client.firstName.includes(searchInput) || searchInput.trim() === '').map(client => {
        return(
          <ListItem button key={client.id}>
            <ListItemText primary={`${client.firstName} ${client.lastName}`} />
            <ListItemSecondaryAction className="edit-client-link"><div onClick={() => this.setEditClient(client)}>EDIT</div><div onClick={() => this.deleteRequest(client)}>DELETE</div></ListItemSecondaryAction>
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
          <div className="add-client-link"  onClick={() => this.setIsOpen(true)}>ADD CLIENT</div>
          <List component="nav">
            {clientsListItems}
          </List>
        
        </Container>
        {this.state.isOpen && <AddClientView setShouldRefresh={this.setShouldRefres} setClients={this.setClients} setIsOpen={this.setIsOpen}/> }
        {this.state.isEditPageOpen && <UpdateClientView setShouldRefresh={this.setShouldRefres} setIsOpen={this.setIsOpenEditPage} editClient={this.state.editClient}/>}
      </div>
    )
    :
    <LoadingScreen />
  }  
}

export default App;
