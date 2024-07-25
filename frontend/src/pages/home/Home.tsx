import React, { useState } from 'react'
import Client from '../../components/Client'
import Header from '../../components/Header'
import ClientPopup from '../../components/ClientPopup'


const Home = () => {
  const [isClientPopup , setIsClientPopup] = useState(false)

  const onClose = ()=>{
    setIsClientPopup(false)
  }
  return (
    <div>
        <Header/>
        <div>
          <button onClick={()=>setIsClientPopup(true)}>Add Client</button>
          {isClientPopup && <ClientPopup onClose={onClose}/>}
        </div>
        <Client/>
      
      
    </div>
  )
}

export default Home
