import React from 'react';
import { gql, useQuery } from '@apollo/client';
import Spinner from './spinner/Spinner';
import { BsThreeDots } from "react-icons/bs";


const Get_Clients = gql`
query getClients {
clients{
  id
  name
  email
  phoneNumber
}
}
`


const Client = () => {
  const { loading, error, data } = useQuery(Get_Clients)


  console.log(loading, error, data);

  if (loading) return <h1>Loading............</h1>


  return (
    <div className='main_table_data'>
    <div className='table_data'>
      <table style={{width:"100%"}}>
        <thead  >
          <tr style={{textAlign:"justify"}}>
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {
            data?.clients?.map((item:any) => {
              return (
                  <tr style={{border:"1px solid gray"}} key={item.id}>
                    <td>{item?.name}</td>
                    <td>{item?.email}</td>
                    <td>{item?.phoneNumber}</td>
                    <td><BsThreeDots/></td>
                  </tr>
              )
            })
          }

        </tbody>

      </table>


    </div>
    </div>
  );
}

export default Client;
