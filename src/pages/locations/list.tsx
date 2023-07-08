// module
import { FC, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { useQuery } from '@apollo/client';
import styled from '@emotion/styled';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
// custom
import Locations from '../../queries/location/list'
import Loading from '../../components/loading';
import Error from '../../components/error';
import Filter from '../../components/filter';
import LocationEntity from '../../models/entities/location';
import CharacterEntity from '../../models/entities/character';
import Pagination from '../../components/pagination';

const initialFilterValue: Record<string, string> = { name: "", type: "", dimension: "" }

const LocationsList: FC<{}> = () => {
    const wrapperRef = useRef<HTMLDivElement>(null)
    const [show, setShow] = useState<boolean>(false)
    const [filter, setFilter] = useState<Record<string, string>>({ ...initialFilterValue })
    const [variables, setVariables] = useState<Record<string, string | number> & { page: number }>({ ...initialFilterValue, page: 1 })
    const { loading, error, data, refetch } = useQuery(Locations, { variables: variables });
    const navigate = useNavigate()

    if (error) return <Error onRetry={() => refetch(variables)} />

    return (
        <LocationsListWrapper ref={wrapperRef}>
            <h1>Locations List</h1>
            {loading && <Loading />}
            {!loading && !error &&
                <>
                    <Filter
                        show={show}
                        state={filter}
                        variables={variables}
                        setShow={setShow}
                        setState={setFilter}
                        applyFilter={() => {
                            if (wrapperRef.current) {
                                wrapperRef.current.scrollIntoView()
                            }
                            setVariables({ ...filter, page: 1 })
                            setShow(false)
                        }}
                        onResetFilter={(variables: Record<string, string | number> & { page: number; }) => {
                            if (wrapperRef.current) {
                                wrapperRef.current.scrollIntoView()
                            }
                            setVariables(variables)
                            setShow(false)
                        }}
                    />
                    <Stack width='80%' spacing={1}>
                        {
                            data && data.locations && data.locations.results &&
                            data.locations.results.map((location: LocationEntity) => (
                                <LocationItem key={location.id} onClick={() => navigate(`/locations/${location.id}`)}>
                                    <h4>Name: {location.name}</h4>
                                    <h5>Type: {location.type}</h5>
                                    <h5>Dimension: {location.dimension}</h5>
                                    <h5>The residents of this location: </h5>
                                    <ResidentsWrapper>
                                        {location.residents.map((character: CharacterEntity) => (
                                            <Avatar
                                                style={{
                                                    border: `2px 
                                                    ${location.id === character.origin.id ? 'solid' : 'dashed'} 
                                                    ${location.id === character.origin.id ? 'blue' : 'yellow'}`,
                                                    cursor: 'pointer'
                                                }}
                                                key={character.id}
                                                alt={character.id}
                                                src={character.image}
                                                title={character.name}
                                                onClick={(e: any) => {
                                                    e.stopPropagation()
                                                    navigate(`/characters/${character.id}`)
                                                }}
                                            />
                                        ))}
                                        {!location.residents.length && <span>Not Found</span>}
                                    </ResidentsWrapper>
                                </LocationItem>
                            ))
                        }
                    </Stack>
                    <Pagination
                        current={variables.page}
                        next={data?.locations?.info?.next || null}
                        prev={data?.locations?.info?.prev || null}
                        changePage={(pageNumber: number) => {
                            if (wrapperRef.current) {
                                wrapperRef.current.scrollIntoView()
                            }
                            setVariables({ ...variables, page: pageNumber })
                        }}
                    />
                </>
            }
        </LocationsListWrapper>
    )
}

export default LocationsList

const LocationsListWrapper = styled.div(() => ({
    boxSizing: 'border-box',
    width: '100%',
    height: '100%',
    overflowY: 'auto',
    margin: 0,
    padding: 0,
    paddingBottom: '70px',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
}))

const LocationItem = styled.div(() => {
    const theme = useTheme()
    return {
        boxSizing: 'border-box',
        width: '100%',
        height: 'max-content',
        margin: 0,
        padding: '10px',
        borderRadius: '5px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        cursor: 'pointer',
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.primary.contrastText,
        h4: {
            margin: 0,
            marginBottom: '3px',
        },
        h5: {
            margin: 0,
            marginBottom: '3px',
        }
    }
})

const ResidentsWrapper = styled.div(() => ({
    boxSizing: 'border-box',
    width: '100%',
    maxWidth: '100%',
    height: 'max-content',
    margin: 0,
    marginTop: '5px',
    display: 'flex',
    justifyContent: 'flex-start',
    gap: '5px',
    alignItems: 'center',
    overflowX: 'auto',
}))