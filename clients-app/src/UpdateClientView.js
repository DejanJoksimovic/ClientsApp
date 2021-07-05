
import React, {useState} from 'react';
import './UpdateClientView.css';

// company, first name, last name, phone
const UpdateClientView = ({setIsOpen, editClient, setShouldRefresh}) => {

    const [client, setClient] = useState({...editClient});

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setClient( (prevClient) => {
            return {
                ...prevClient,
                [name]: value,
            }
        })
    }

    const fetchRequest = async (client) => {
        await fetch('http://localhost:3000/client', {
            method: 'PUT',
            body: JSON.stringify(client),
            headers: {'Content-Type': 'application/json'},

        })
        setIsOpen(false);
        setShouldRefresh(true);
    }

    return (
        <div className="update-client-view">
            <div className="update-client-view__content">
                <div className="input-group">
                <label>Name: </label>
                <input type="text" onChange={handleInputChange} value={client.firstName} name='firstName'></input>
                </div>
                <div className="input-group">
                <label>Last name: </label>
                <input type="text" onChange={handleInputChange} value={client.lastName} name='lastName'></input>
                </div>
                <div className="input-group">
                <label>Company: </label>
                <input type="text" onChange={handleInputChange} value={client.company} name='company'></input>
                </div>
                <div className="input-group">
                <label>Phone: </label>
                <input type='tel' onChange={handleInputChange} value={client.phone} name='phone'></input>
                </div>
                <button onClick={() => fetchRequest(client)}>Update client</button>
            <button onClick={() => setIsOpen(false)}>Cancel</button>
            </div>
        </div>
    )

}


export default UpdateClientView;