// module
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MovieIcon from '@mui/icons-material/Movie';
// custom
import PATH from "../enum/path";
import RouteModel from "../models/route";
import Home from "../pages/home"
import CharacterById from "../pages/characters/by-id";
import CharactersList from "../pages/characters/list";
import EpisodeById from "../pages/episodes/by-id";
import EpisodesList from "../pages/episodes/list";
import LocationById from "../pages/locations/by-id";
import LocationsList from "../pages/locations/list";
import NotFound from "../pages/not-found";

const routes: Array<RouteModel> = [
    {
        title: 'Home',
        path: PATH.HOME,
        isMenuItem: true,
        Cmp: Home,
        Icon: HomeIcon,
    },
    {
        title: 'Episodes',
        path: PATH.EPISODES,
        isMenuItem: true,
        Cmp: EpisodesList,
        Icon: MovieIcon,
    },
    {
        title: 'Episode Detail',
        path: PATH.EPISODE_BY_ID,
        isMenuItem: false,
        Cmp: EpisodeById
    },
    {
        title: 'Characters',
        path: PATH.CHARACTERS,
        isMenuItem: true,
        Cmp: CharactersList,
        Icon: PersonIcon,
    },
    {
        title: 'Character Detail',
        path: PATH.CHARACTERS_BY_ID,
        isMenuItem: false,
        Cmp: CharacterById
    },
    {
        title: 'Locations',
        path: PATH.LOCATIONS,
        isMenuItem: true,
        Cmp: LocationsList,
        Icon: LocationOnIcon,
    },
    {
        title: 'Location Detail',
        path: PATH.LOCATIONS_BY_ID,
        isMenuItem: false,
        Cmp: LocationById
    },
    {
        title: 'No Match Found',
        path: PATH.NOT_FOUND,
        isMenuItem: false,
        Cmp: NotFound
    },
]

export default routes