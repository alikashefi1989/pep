// custom
import BaseEntity from "./base"
import CharacterEntity from "./character"

interface LocationEntity extends BaseEntity {
    type: string
    dimension: string
    residents: Array<CharacterEntity>
}

export default LocationEntity