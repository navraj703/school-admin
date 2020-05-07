//React 
import React , { useEffect } from 'react';
//Material-Ui
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import { Hidden } from '@material-ui/core';
//Table Component
import Data from './data'

//Material Styles
const useStyles = makeStyles((theme) => ({
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(2),
    
    },
}));

//Student Component
const Students = ({width}) => {
    
    const classes = useStyles();
    return (
        <>
            <main className={classes.content} style = {{width : `calc(100% - ${width}px)` ,marginLeft :`${width}px`}}>
                <div className={classes.toolbar} />
                <Data />
            </main>
        </>
    )

}
export default Students;