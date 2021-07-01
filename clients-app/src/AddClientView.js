
import React, {useState} from 'react';
import './AddClientView.css';

// company, first name, last name, phone
const AddClientView = ({setIsOpen}) => {

    const [client, setClient] = useState({name: '', lastName:'', company: '', phone: ''});

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setClient( (prevClient) => {
            return {
                ...prevClient,
                [name]: value,
            }
        })
    }

    const fetchRequest = (client) => {
        //send request to backend api
        console.log(client)
        setIsOpen(false);
    }



    return (
        <div className="add-client-view">
            <div className="add-client-view__content">
                <div class="input-group">
                <label>Name: </label>
                <input type="text" onChange={handleInputChange} value={client.name} name='name'></input>
                </div>
                <div class="input-group">
                <label>Last name: </label>
                <input type="text" onChange={handleInputChange} value={client.lastName} name='lastName'></input>
                </div>
                <div class="input-group">
                <label>Company: </label>
                <input type="text" onChange={handleInputChange} value={client.company} name='company'></input>
                </div>
                <div class="input-group">
                <label>Phone: </label>
                <input type='tel' onChange={handleInputChange} value={client.phone} name='phone'></input>
                </div>
                <button onClick={() => fetchRequest(client)}>Create client</button>
            <button onClick={() => setIsOpen(false)}>Cancel</button>
            </div>
        </div>
    )

}


export default AddClientView;