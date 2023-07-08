// module
import { FC, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client';
import styled from '@emotion/styled';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
// custom
import Character from '../../queries/character/by-id'
import Loading from '../../components/loading';
import Error from '../../components/error';
import BackToList from '../../components/back-to-list';
import CHARACTER_STATUS from '../../enum/character-status';
import EpisodeEntity from '../../models/entities/episode';
import PATH from '../../enum/path';

const CharacterById: FC<{}> = () => {
    const { id } = useParams<string>()
    const [show, setShow] = useState<boolean>(false)
    const { loading, error, data, refetch } = useQuery(Character, { variables: { id } });
    const navigate = useNavigate()

    if (error) return <Error onRetry={() => refetch({ id })} />

    return (
        <CharacterByIdWrapper>
            {loading && <Loading />}
            <BackToList entityName='Character' />
            {!loading && !error && <DetailWrapper>
                <Avatar
                    alt={data.character.name}
                    title={data.character.name}
                    src={data.character.image}
                    style={{
                        width: '100px',
                        height: '100px',
                        border: `3px 
                                    ${data.character.status === CHARACTER_STATUS.unknown
                                ? 'dashed'
                                : 'solid'} 
                                    ${data.character.status === CHARACTER_STATUS.unknown
                                ? 'yellow'
                                : data.character.status === CHARACTER_STATUS.Alive
                                    ? 'green'
                                    : 'red'
                            }`
                    }}
                />
                <InfoWrapper>
                    <h6>Name: {data.character.name}</h6>
                    <h6>Gender: {data.character.gender}</h6>
                    <h6>Status: {data.character.status}</h6>
                    <h6>Type: {data.character.type}</h6>
                    <h6>Species: {data.character.species}</h6>
                    <h6>Origin: {data.character.origin.name}</h6>
                    <h6>The character's last known location: {data.character.location.name}</h6>
                </InfoWrapper>
                {
                    <Chip
                        label={`${show ? 'Hide' : 'Show'} Episodes`}
                        onClick={() => setShow(!show)}
                        icon={show
                            ? <KeyboardDoubleArrowUpIcon />
                            : <KeyboardDoubleArrowDownIcon />
                        } />
                }
                {
                    show && <EpisodesWrapper>
                        {data.character.episode.map((episode: EpisodeEntity) => (
                            <Chip
                                style={{ cursor: 'pointer' }}
                                key={episode.id}
                                label={episode.episode}
                                onClick={(e: any) => {
                                    e.stopPropagation()
                                    navigate(`${PATH.EPISODES}/${episode.id}`)
                                }}
                            />
                        ))}
                        {!data.character.episode.length && <span style={{ margin: 'auto' }}>Not Found</span>}
                    </EpisodesWrapper>
                }
            </DetailWrapper>}
        </CharacterByIdWrapper>
    )
}

export default CharacterById

const CharacterByIdWrapper = styled.div(() => ({
    boxSizing: 'border-box',
    width: '100%',
    height: 'max-content',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
}))

const DetailWrapper = styled.div(() => ({
    boxSizing: 'border-box',
    width: '100%',
    height: 'max-content',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: '15px',
    marginTop: '10px',
}))

const InfoWrapper = styled.div(() => ({
    boxSizing: 'border-box',
    width: 'max-content',
    height: 'max-content',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginTop: '10px',
    marginBottom: '10px',
    h6: {
        margin: 0,
        marginBottom: '5px',
        fontSize: '12px',
    },
    h5: {
        margin: 0,
        marginBottom: '3px',
    },
}))

const EpisodesWrapper = styled.div(() => ({
    boxSizing: 'border-box',
    width: '100%',
    height: 'max-content',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '5px',
    padding: '10px',
    marginTop: '5px',
}))