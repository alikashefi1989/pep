// module
import { gql } from '@apollo/client';

const Locations = gql`
  query Locations($page: Int! , $name: String! , $type: String! , $dimension: String! ) {
    locations (page: $page , filter: {name: $name , type: $type , dimension: $dimension }) {
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
    }
}`;

export default Locations 