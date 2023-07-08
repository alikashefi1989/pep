// module
import { FC, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { useQuery } from '@apollo/client';
import styled from '@emotion/styled';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
// custom
import Characters from '../../queries/character/list'
import Loading from '../../components/loading';
import Error from '../../components/error';
import Filter from '../../components/filter';
import CharacterEntity from '../../models/entities/character';
import Pagination from '../../components/pagination';
import CHARACTER_STATUS from '../../enum/character-status';

const initialFilterValue: Record<string, string> = { name: "", status: "", species: "", type: "", gender: "" }

const CharactersList: FC<{}> = () => {
    const wrapperRef = useRef<HTMLDivElement>(null)
    const [show, setShow] = useState<boolean>(false)
    const [filter, setFilter] = useState<Record<string, string>>({ ...initialFilterValue })
    const [variables, setVariables] = useState<Record<string, string | number> & { page: number }>({ ...initialFilterValue, page: 1 })
    const { loading, error, data, refetch } = useQuery(Characters, { variables: variables });
    const navigate = useNavigate()

    if (error) return <Error onRetry={() => refetch(variables)} />

    return (
        <CharactersListWrapper ref={wrapperRef}>
            <h1>Characters List</h1>
            {loading && <Loading />}
            {
                !loading && !error &&
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
                            data && data.characters && data.characters.results &&
                            data.characters.results.map((character: CharacterEntity) => (
                                <CharacterItem key={character.id} onClick={() => navigate(`/characters/${character.id}`)}>
                                    <Avatar
                                        key={character.id}
                                        alt={character.id}
                                        title={character.name}
                                        src={character.image}
                                        style={{
                                            width: '65px',
                                            height: '65px',
                                            position: 'absolute',
                                            top: '25px',
                                            right: '10px',
                                            border: `3px 
                                                ${character.status === CHARACTER_STATUS.unknown
                                                    ? 'dashed'
                                                    : 'solid'} 
                                                ${character.status === CHARACTER_STATUS.unknown
                                                    ? 'yellow'
                                                    : character.status === CHARACTER_STATUS.Alive
                                                        ? 'green'
                                                        : 'red'
                                                }`
                                        }}
                                    />
                                    <h5>Name: {character.name}</h5>
                                    <h5>Gender: {character.gender}</h5>
                                    <h5>Status: {character.status}</h5>
                                    <h5>Type: {character.type}</h5>
                                    <h5>Origin: {character.origin.name}</h5>
                                </CharacterItem>
                            ))
                        }
                    </Stack>
                    <Pagination
                        current={variables.page}
                        next={data?.characters?.info?.next || null}
                        prev={data?.characters?.info?.prev || null}
                        changePage={(pageNumber: number) => {
                            if (wrapperRef.current) {
                                wrapperRef.current.scrollIntoView()
                            }
                            setVariables({ ...variables, page: pageNumber })
                        }}
                    />
                </>
            }
        </CharactersListWrapper >
    )
}

export default CharactersList

const CharactersListWrapper = styled.div(() => ({
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

const CharacterItem = styled.div(() => {
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
        position: 'relative',
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