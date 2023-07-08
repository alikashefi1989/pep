// custom
import BaseEntity from "./base"
import LocationEntity from "./location"
import EpisodeEntity from "./episode"
import GENDER from "../../enum/gender"
import CHARACTER_STATUS from "../../enum/character-status"

interface CharacterEntity extends BaseEntity {
    status: CHARACTER_STATUS
    species: string
    type: string
    gender: GENDER
    origin: LocationEntity
    location: LocationEntity
    image: string
    episode: Array<EpisodeEntity>
}

export default CharacterEntity