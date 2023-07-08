// custom
import BaseEntity from "./base"
import CharacterEntity from "./character"

interface EpisodeEntity extends BaseEntity {
    air_date: string
    episode : string
    characters : Array<CharacterEntity>
}

export default EpisodeEntity