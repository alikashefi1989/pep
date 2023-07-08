// module
import { FC } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled'
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import IconButton from '@mui/material/IconButton';
import Brightness3Icon from '@mui/icons-material/Brightness3';
import LightModeIcon from '@mui/icons-material/LightMode';
// custom
import useStore from '../state-management/store'
import { Store } from '../models/store'
import routes from '../configs/routes';
import RouteModel from '../models/route';

interface HeaderProps {
    height: string
}

const Header: FC<HeaderProps> = ({ height }) => {
    const darkMode = useStore<boolean>((store: Store) => store.darkMode)
    const { pathname } = useLocation()
    const setDarkMode = useStore<(darkMode: boolean) => void>((store: Store) => store.setDarkMode)
    const navigate = useNavigate()

    return (
        <HeaderWrapper height={height}>
            <Box sx={{ width: 300 }}>
                <BottomNavigation showLabels={true} style={{ backgroundColor: 'transparent' }}>
                    {routes.filter((route: RouteModel) => route.isMenuItem).map(({ title, path, Icon }: RouteModel) => (
                        <BottomNavigationAction
                            key={path}
                            style={{ color: returnItemColor(darkMode, isRouteActive(path, pathname)) }}
                            label={title}
                            icon={Icon && <Icon style={{ color: returnItemColor(darkMode, isRouteActive(path, pathname)) }} />}
                            onClick={() => navigate(path)}
                        />
                    ))}
                </BottomNavigation>
            </Box>
            <IconButton onClick={() => setDarkMode(!darkMode)}>
                {darkMode ? <LightModeIcon color='warning' /> : <Brightness3Icon color='info' />}
            </IconButton>
        </HeaderWrapper>
    )
}

export default Header

const isRouteActive = (currentPath: string, pathOfRoute: string): boolean => {
    const currentPathCore: string = currentPath.split('/')[1]
    const routePathCore: string = pathOfRoute.split('/')[1]
    return currentPathCore === routePathCore
}

const returnItemColor = (darkMode: boolean, isActive: boolean): string => {
    if (isActive) {
        if (darkMode) return '#ffa726'
        return '#0288d1'
    }
    if (darkMode) return '#000000'
    return '#ffffff'
}

const HeaderWrapper = styled.div<HeaderProps>(({ height }) => {
    const theme = useTheme()
    return {
        boxSizing: 'border-box',
        padding: '10px',
        margin: 0,
        width: '100%',
        height,
        position: 'fixed',
        left: 0,
        right: 0,
        top: 0,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 3,
        backgroundColor: theme.palette.primary.contrastText,
        color: theme.palette.primary.main,
    }
})
