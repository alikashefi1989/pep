// module
import { FC } from 'react'
import styled from '@emotion/styled';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

interface BackToListProps {
    entityName: 'Character' | 'Episode' | 'Location'
}

const BackToList: FC<BackToListProps> = ({ entityName }) => {
    const navigate = useNavigate()

    return (
        <BackToListWrapper>
            <IconButton title='back to list' onClick={() => navigate(`${returnEntityBasePath(entityName)}`)}>
                <ArrowBackIcon />
            </IconButton>
            <h1>{`${entityName} Detail`}</h1>
            <span></span>
        </BackToListWrapper>
    )
}

export default BackToList

const returnEntityBasePath = (entityName: BackToListProps['entityName']): string => {
    if (entityName === 'Character') return '/characters'
    if (entityName === 'Episode') return '/episodes'
    if (entityName === 'Location') return '/locations'
    return '/'
}
const BackToListWrapper = styled.div(() => ({
    boxSizing: 'border-box',
    width: '100%',
    height: 'max-content',
    padding: '10px',
    margin: 0,
    display: 'flex',
    justifyContent: 'space-between',
    alignContent: 'center',
    '> h1': {
        margin: 0,
    }
}))
