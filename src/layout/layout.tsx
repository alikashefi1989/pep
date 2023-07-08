// module
import { FC } from 'react'
import styled from '@emotion/styled'
// custom
import Header from './header'
import Content from './content'

const headerHeight: string = '60px'

interface LayoutProps {
    children: React.ReactNode
}

const Layout: FC<LayoutProps> = ({ children }) => {
    return (
        <LayoutWrapper paddingTop={headerHeight}>
            <Header height={headerHeight} />
            <Content headerHeight={headerHeight}>{children}</Content>
        </LayoutWrapper>
    )
}

export default Layout

interface LayoutWrapperProps {
    paddingTop: string
}

const LayoutWrapper = styled.div<LayoutWrapperProps>(({ paddingTop }) => ({
    boxSizing: 'border-box',
    padding: 0,
    paddingTop,
    margin: 0,
    width: '100%',
    height: 'max-content',
    position: 'relative',
    backgroundColor: 'transparent',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
}))
