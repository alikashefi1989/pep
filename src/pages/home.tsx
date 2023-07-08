// module
import { FC, useEffect, useState } from 'react'
import styled from '@emotion/styled';
import Avatar from '@mui/material/Avatar';

const Home: FC<{}> = () => {
    const [gapTime, setGapTime] = useState<boolean>(false)

    useEffect(() => {
        setGapTime(!gapTime)
        return () => setGapTime(!gapTime)
    }, [])

    return (
        <HomeWrapper>
            <h2>Welcome to</h2>
            <h1>Rick & Morty App</h1>
            <AvatarsWrapper gapTime={gapTime}>
                <Avatar
                    title='Rick Sanchez'
                    alt='Rick Sanchez'
                    src='https://rickandmortyapi.com/api/character/avatar/1.jpeg'
                    style={{
                        width: '100px',
                        height: '100px',
                    }}
                />
                <Avatar
                    title='Morty Smith'
                    alt='Morty Smith'
                    src='https://rickandmortyapi.com/api/character/avatar/2.jpeg'
                    style={{
                        width: '100px',
                        height: '100px',
                    }}
                />
            </AvatarsWrapper>
        </HomeWrapper>
    )
}

export default Home

const HomeWrapper = styled.div(() => ({
    boxSizing: 'border-box',
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBlock: '50px',
}))

const AvatarsWrapper = styled.div<{ gapTime: boolean }>(({ gapTime }) => ({
    boxSizing: 'border-box',
    width: 'max-content',
    height: 'max-content',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBlock: '50px',
    paddingInline: '10px',
    border: '5px solid',
    borderColor: gapTime ? 'transparent' : 'red',
    borderRadius: '25px',
    gap: gapTime ? '25px' : '100px',
    transition: 'gap 3s, border-color 3s',
    '> div': {
        border: '5px solid',
        borderColor: gapTime ? 'blue' : 'transparent',
        transition: 'border-color 2.5s',
    }
}))