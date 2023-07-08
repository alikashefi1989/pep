// module
import { FC } from 'react'
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';

interface FilterProps {
    show: boolean
    state: Record<string, string>
    variables: Record<string, string | number> & { page: number }
    setShow: (value: React.SetStateAction<boolean>) => void
    setState: (value: React.SetStateAction<Record<string, string>>) => void
    applyFilter: () => void
    onResetFilter: (variables: Record<string, string | number> & { page: number }) => void
}

const Filter: FC<FilterProps> = ({ show, state, variables, setShow, setState, applyFilter, onResetFilter }) => {
    return (
        <>
            <Fab
                sx={{
                    position: 'fixed',
                    bottom: 16,
                    right: 16,
                }}
                title='Filter'
                color='info'
                aria-label="filter"
                onClick={() => setShow(true)}
            >
                <FilterAltIcon />
            </Fab>
            {
                isFilterActive(variables) &&
                < Fab
                    sx={{
                        position: 'fixed',
                        bottom: 86,
                        right: 16,
                    }}
                    title='Reset Filter'
                    color='error'
                    aria-label="filter"
                    onClick={() => onResetFilter(filterResetValueReturner(variables))}
                >
                    <FilterAltOffIcon />
                </Fab >
            }
            <Drawer
                anchor='left'
                open={show}
                onClose={() => setShow(false)}
            >
                <Box
                    sx={{ width: 250 }}
                    role="presentation"
                    display='flex'
                    flexDirection='column'
                    justifyContent='flex-start'
                    alignItems='center'
                    gap={3}
                    paddingY={5}
                >
                    <h2>Filters</h2>
                    {
                        Object.entries(state).map((item: [string, string]) => (
                            <TextField
                                variant="filled"
                                size='medium'
                                type='text'
                                key={item[0]}
                                id={item[0]}
                                name={item[0]}
                                label={item[0]}
                                value={item[1]}
                                onChange={(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                                    setState({ ...state, [item[0]]: event.target.value })
                                }}
                            />
                        ))
                    }
                    <Button
                        size='large'
                        type='button'
                        variant='contained'
                        color='info'
                        style={{ textTransform: 'capitalize' }}
                        onClick={applyFilter}
                    >
                        Apply Filters
                    </Button>
                </Box>
            </Drawer>
        </>
    )
}

export default Filter

const isFilterActive = (variables: FilterProps['variables']): boolean => {
    let pairKeyValue: Array<[string, string | number]> = Object.entries(variables)
    let pairKeyValueWithOutPage = pairKeyValue.filter((item: [string, string | number]) => item[0] !== 'page')
    for (let i = 0; i < pairKeyValueWithOutPage.length; i++) {
        if (pairKeyValueWithOutPage[i][1] !== '') {
            return true
        }
    }
    return false
}

const filterResetValueReturner = (variables: FilterProps['variables']): FilterProps['variables'] => {
    let keys: Array<string> = Object.keys(variables)
    let resetValue: FilterProps['variables'] = { ...variables }
    for (let i = 0; i < keys.length; i++) {
        if (keys[i] !== 'page') {
            resetValue[keys[i]] = ''
        } else {
            resetValue[keys[i]] = 1
        }
    }
    return resetValue
}