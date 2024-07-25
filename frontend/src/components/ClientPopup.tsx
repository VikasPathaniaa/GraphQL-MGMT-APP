import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { ADD_CLIENT, Get_Clients } from '../mutations/client';

const ClientPopup = ({ onClose }:any) => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const [addClient] = useMutation(ADD_CLIENT , {
    variables:{name , email , phoneNumber},
    update(cache , {data:{addClient}}){
        const {clients} = cache.readQuery({query:Get_Clients})  as any
        cache.writeQuery({
            query:Get_Clients,
            data:{clients : [...clients , addClient]}
        })

    },
    onError(error) {
        alert(`Error adding client: ${error.message}`);
      },
      onCompleted() {
        onClose();
      }
  })

 
  const handleSubmit = (e:any) => {
    e.preventDefault();
    addClient({ variables:{name , email , phoneNumber}})
    
  };


  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <button className="close-btn" onClick={onClose}>X</button>
        <form onSubmit={handleSubmit}>
          <h2>Client Form</h2>
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          <label>
            Phone Number:
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default ClientPopup;
