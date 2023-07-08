// module
import { FC } from 'react'
import styled from '@emotion/styled';

const NotFound: FC<{}> = () => {
    return (
        <NotFoundWrapper>
            <h2>Not Match Found</h2>
        </NotFoundWrapper>
    )
}

export default NotFound

const NotFoundWrapper = styled.div(() => ({
    boxSizing: 'border-box',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBlock: '50px',
}))
