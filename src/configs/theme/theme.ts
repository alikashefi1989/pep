// module
import { Theme, PaletteMode } from "@mui/material";
import { makeStyles } from '@mui/styles';

const appTheme = (darkMode: boolean) => ({
    palette: {
        mode: darkMode ? 'dark' as PaletteMode : 'light' as PaletteMode,
        ...(darkMode
            ? {
                primary: {
                    main: '#000000',
                    dark: '#404040',
                    light: '#808080',
                    contrastText: '#ffffff',
                }
            }
            : {
                primary: {
                    main: '#ffffff',
                    dark: '#b0b0b0',
                    light: '#e3e3e3',
                    contrastText: '#000000',
                }
            }
        ),
    },
});;

export default appTheme

export const useStyles = makeStyles<Theme, { darkMode: boolean }>((theme: Theme) => ({
    main: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
    },
    dark: {
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.primary.contrastText,
    },
    light: {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.primary.contrastText,
    },
    headerDark: {
        backgroundColor: '#ffffff',
        color: '#000000',
    },
    headerLight: {
        backgroundColor: '#000000',
        color: '#ffffff',
    }
}))