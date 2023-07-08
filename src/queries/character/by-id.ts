// module
import { gql } from '@apollo/client';

const Character = gql`
  query Character($id: ID!) {
    character (id: $id) {
        id
        name
        created
        status
        species
        type
        gender
        image
        origin {
            id
            name
            created
            type
            dimension
        }
        location {
            id
            name
            created
            type
            dimension
        }
        episode {
            id
            name
            air_date
            episode
        }
    }
}`;

export default Character 