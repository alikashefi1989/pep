// module
import { PaletteMode } from "@mui/material";

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