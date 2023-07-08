// module
import { FC } from 'react'
import styled from '@emotion/styled';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import BlockIcon from '@mui/icons-material/Block';

interface PaginationProps {
    current: number
    next: number | null
    prev: number | null
    changePage: (pageNumber: number) => void
}

const Pagination: FC<PaginationProps> = ({ current, next, prev, changePage }) => {
    return (
        <PaginationWrapper>
            <IconButton onClick={() => typeof prev === 'number' && changePage(prev)}>
                {
                    typeof prev === 'number'
                        ? <ArrowBackIosIcon />
                        : <BlockIcon color='error' style={{ cursor: 'not-allowed' }} />
                }
            </IconButton>
            <span style={{ fontSize: '20px', fontWeight: 700 }}>{current}</span>
            <IconButton onClick={() => typeof next === 'number' && changePage(next)}>
                {
                    typeof next === 'number'
                        ? <ArrowForwardIosIcon />
                        : <BlockIcon color='error' style={{ cursor: 'not-allowed' }} />
                }
            </IconButton>
        </PaginationWrapper>
    )
}

export default Pagination

const PaginationWrapper = styled.div(() => {
    const theme = useTheme()

    return {
        boxSizing: 'border-box',
        width: '100',
        height: '50px',
        position: 'fixed',
        right: 0,
        left: 0,
        bottom: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '50px',
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.primary.contrastText,
    }
})