// module
import { gql } from '@apollo/client';

const Episodes = gql`
  query Episodes($page: Int! , $name: String! , $episode: String! ) {
    episodes (page: $page , filter: {name: $name , episode: $episode }) {
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
            air_date
            episode
            characters {
                id
                name
                image
                status
            }       
        }
    }
}`;

export default Episodes 