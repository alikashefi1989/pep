// module
import { FC } from 'react'
import styled from '@emotion/styled'

interface Content {
    children: React.ReactNode
    headerHeight: string
}

const Content: FC<Content> = ({ children, headerHeight }) => {
    return (
        <ContentWrapper headerHeight={headerHeight}>
            {children}
        </ContentWrapper>
    )
}

export default Content

const ContentWrapper = styled.div<{ headerHeight: string }>(({ headerHeight }) => ({
    boxSizing: 'border-box',
    margin: 0,
    padding: 0,
    width: '100%',
    height: 'max-content',
    minHeight: `calc(100vh - ${headerHeight})`,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    overflowY: 'auto',
    zIndex: 2,
}))