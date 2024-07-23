import {gql} from '@apollo/client'


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

export {DELETE_CLIENT}