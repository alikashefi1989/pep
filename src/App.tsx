// module
import { Fragment, useMemo } from "react";
import { Route, Routes } from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { GlobalStyles } from '@mui/material'
// custom
import routes from "./configs/routes";
import RouteModel from "./models/route";
import appTheme from "./configs/theme/theme";
import getGlobalStyle from "./configs/theme/global-style";
import useStore from "./state-management/store";
import { Store } from "./models/store";
import Layout from "./layout/layout";

const App = () => {
    const darkMode = useStore<boolean>((store: Store) => store.darkMode)
    const theme = useMemo(() => createTheme(appTheme(darkMode)), [darkMode])

    return (
        <Fragment>
            <GlobalStyles styles={getGlobalStyle(darkMode)} />
            <ThemeProvider theme={theme}>
                <Layout>
                    <Routes>
                        {routes.map(({ path, Cmp }: RouteModel) => (
                            <Route key={path} path={path} element={<Cmp />} />
                        ))}
                    </Routes>
                </Layout>
            </ThemeProvider>
        </Fragment>
    );
};

export default App;