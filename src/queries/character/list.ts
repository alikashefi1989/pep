// module
import { gql } from '@apollo/client';

const Characters = gql`
  query Characters($page: Int! , $name: String! , $status: String! , $species: String! , $type: String! , $gender: String! ) {
    characters (page: $page , filter: {name: $name , status: $status , species: $species , type: $type , gender: $gender}) {
        info {
            count
            pages
            next
            prev
        }
        results {
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
    }
}`;

export default Characters 