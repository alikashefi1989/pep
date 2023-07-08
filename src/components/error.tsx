// module
import styled from '@emotion/styled'
import { FC } from 'react'
import Button from '@mui/material/Button';
// custom
import useStore from '../state-management/store'
import { Store } from '../models/store'

interface ErrorProps {
    onRetry: () => void
}

const Error: FC<ErrorProps> = ({ onRetry }) => {
    const darkMode = useStore<boolean>((store: Store) => store.darkMode)

    return (
        <ErrorWrapper darkMode={darkMode}>
            <Button
                size='large'
                type='button'
                variant='contained'
                color='error'
                style={{ textTransform: 'capitalize' }}
                onClick={onRetry}
            >
                Retry
            </Button>
            <Hint darkMode={darkMode}>An error occurred, please try again.</Hint >
        </ErrorWrapper>
    )
}

export default Error

const ErrorWrapper = styled.div<{ darkMode: boolean }>(({ darkMode }) => ({
    boxSizing: 'border-box',
    margin: 'auto',
    padding: 0,
    width: '300px',
    height: '300px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '25px',
    backgroundColor: darkMode ? '#ffffff' : '#000000',
    borderRadius: '15px',
    position: 'absolute',
    left: 0,
    right: 0,
    top: '30%'
}))

const Hint = styled.h4<{ darkMode: boolean }>(({ darkMode }) => ({
    boxSizing: 'border-box',
    margin: 0,
    padding: 0,
    color: darkMode ? '#000000' : '#ffffff',
}))