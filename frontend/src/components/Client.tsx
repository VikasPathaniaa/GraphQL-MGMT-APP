import React, { useState } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import Spinner from './spinner/Spinner';
import { MdDelete } from "react-icons/md";
import { DELETE_CLIENT, Get_Clients } from '../mutations/client';




const Client = () => {
  const { loading, error, data } = useQuery(Get_Clients)
  const [id , setId] = useState()

  const [removeClient] = useMutation(DELETE_CLIENT, {
    variables:{id:id},
    // refetchQueries:[{query:Get_Clients}]
    update(cache , {data:{removeClient}}){
      const {clients} = cache.readQuery({query:Get_Clients}) as any

      cache.writeQuery({
        query:Get_Clients,
        data:{clients: clients.filter((item:any)=>{
          return item.id != removeClient.id

        })}
      })
    }
  })


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
                    <td onClick={()=>{
                     removeClient({ variables: { id: item.id } })
                    
                    }}><MdDelete/></td>
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
