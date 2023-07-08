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
import Episode from '../../queries/episode/by-id'
import Loading from '../../components/loading';
import Error from '../../components/error';
import BackToList from '../../components/back-to-list';
import CharacterEntity from '../../models/entities/character';
import PATH from '../../enum/path';

const EpisodeById: FC<{}> = () => {
    const { id } = useParams<string>()
    const [show, setShow] = useState<boolean>(false)
    const { loading, error, data, refetch } = useQuery(Episode, { variables: { id } });
    const navigate = useNavigate()

    if (error) return <Error onRetry={() => refetch({ id })} />

    return (
        <EpisodeByIdWrapper>
            {loading && <Loading />}
            <BackToList entityName='Episode' />
            {!loading && !error && <DetailWrapper>
                <InfoWrapper>
                    <h4>Name: {data.episode.name}</h4>
                    <h5>Episode: {data.episode.episode}</h5>
                    <h5>Air Date: {data.episode.air_date}</h5>
                </InfoWrapper>
                {
                    <Chip
                        label={`${show ? 'Hide' : 'Show'} Characters`}
                        onClick={() => setShow(!show)}
                        icon={show
                            ? <KeyboardDoubleArrowUpIcon />
                            : <KeyboardDoubleArrowDownIcon />
                        } />
                }
                {
                    show &&
                    <CharactersWrapper>
                        {data.episode.characters.map((character: CharacterEntity) => (
                            <Avatar
                                style={{ width: '60px', height: '60px', cursor: 'pointer' }}
                                key={character.id}
                                alt={character.id}
                                src={character.image}
                                title={character.name}
                                onClick={(e: any) => {
                                    e.stopPropagation()
                                    navigate(`${PATH.CHARACTERS}/${character.id}`)
                                }}
                            />
                        ))}
                        {!data.episode.characters.length && <span>Not Found</span>}
                    </CharactersWrapper>
                }
            </DetailWrapper>}
        </EpisodeByIdWrapper>
    )
}

export default EpisodeById

const EpisodeByIdWrapper = styled.div(() => ({
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

const CharactersWrapper = styled.div(() => ({
    boxSizing: 'border-box',
    width: '100%',
    height: 'max-content',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '8px',
    padding: '10px',
    marginTop: '5px',
}))