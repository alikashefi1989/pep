// module
import { gql } from '@apollo/client';

const Episode = gql`
  query Episode($id: ID!) {
    episode (id: $id) {
        id
        name
        created
        air_date
        episode
        characters {
            id
            name
            image
            status
        }    
    }
}`;

export default Episode 