// module
import { gql } from '@apollo/client';

const Location = gql`
  query Location($id: ID!) {
    location (id: $id) {
        id
        name
        created
        type
        dimension
        residents {
            id
            name
            status
            image
            origin {
                id
            }
        }  
    }
}`;

export default Location 