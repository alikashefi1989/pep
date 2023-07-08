// module
import { FC, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client';
import styled from '@emotion/styled';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Tooltip from '@mui/material/Tooltip';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
// custom
import Location from '../../queries/location/by-id'
import Loading from '../../components/loading';
import Error from '../../components/error';
import BackToList from '../../components/back-to-list';
import CharacterEntity from '../../models/entities/character';

const LocationById: FC<{}> = () => {
    const { id } = useParams<string>()
    const [show, setShow] = useState<boolean>(false)
    const { loading, error, data, refetch } = useQuery(Location, { variables: { id } });
    const navigate = useNavigate()

    if (error) return <Error onRetry={() => refetch({ id })} />
    if (loading) return <Loading />

    return (
        <LocationByIdWrapper>
            {loading && <Loading />}
            <BackToList entityName='Location' />
            {!loading && !error && <DetailWrapper>
                <InfoWrapper>
                    <h4>Name: {data.location.name}</h4>
                    <h5>Type: {data.location.type}</h5>
                    <h5>Dimension: {data.location.dimension}</h5>
                </InfoWrapper>
                {
                    <Chip
                        label={`${show ? 'Hide' : 'Show'} Residents`}
                        onClick={() => setShow(!show)}
                        icon={show
                            ? <KeyboardDoubleArrowUpIcon />
                            : <KeyboardDoubleArrowDownIcon />
                        } />
                }
                {
                    show &&
                    <CharactersWrapper>
                        {data.location.residents.map((character: CharacterEntity) => (
                            <Tooltip
                                key={character.id}
                                title={`${character.name} ${data.location.id === character.origin.id ? 'is from here' : 'is not from here'}`}
                            >
                                <Avatar
                                    style={{
                                        border: `2px 
                                        ${data.location.id === character.origin.id ? 'solid' : 'dashed'} 
                                        ${data.location.id === character.origin.id ? 'blue' : 'yellow'}`,
                                        width: '60px',
                                        height: '60px',
                                        cursor: 'pointer',
                                    }}
                                    key={character.id}
                                    alt={character.id}
                                    src={character.image}
                                    onClick={(e: any) => {
                                        e.stopPropagation()
                                        navigate(`/characters/${character.id}`)
                                    }}
                                />
                            </Tooltip>
                        ))}
                        {!data.location.residents.length && <span>Not Found</span>}
                    </CharactersWrapper>
                }
            </DetailWrapper>}
        </LocationByIdWrapper>
    )
}

export default LocationById

const LocationByIdWrapper = styled.div(() => ({
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
