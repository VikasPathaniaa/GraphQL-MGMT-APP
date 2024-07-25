import {gql} from '@apollo/client'



const ADD_CLIENT = gql`
  mutation addClient($name: String!, $email: String!, $phoneNumber: String!) {
    addClient(name: $name, email: $email, phoneNumber: $phoneNumber) {
      id
      name
      email
      phoneNumber
    }
  }
`;
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



const DELETE_CLIENT = gql`
mutation removeClient($id:String!){
removeClient(id:$id){
id
name
email
phoneNumber

}
}

`

export {DELETE_CLIENT , ADD_CLIENT , Get_Clients}