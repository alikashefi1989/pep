// module
import { FC } from 'react'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
// custom
import useStore from '../state-management/store';
import { Store } from '../models/store';

const Loading: FC<{}> = () => {
    const darkMode = useStore<boolean>((store: Store) => store.darkMode)

    return <Backdrop
        sx={{ color: darkMode ? '#ffffff' : '#000000', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
    >
        <CircularProgress color={darkMode ? 'warning' : 'info'} />
    </Backdrop>
}

export default Loading