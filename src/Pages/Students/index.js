//React 
import React, { useEffect } from 'react';
//Material-Ui
import { makeStyles } from '@material-ui/core/styles';

import { auth } from '../../Firebase'
import { withRouter } from 'react-router-dom'

//Table Component
import Data from './data'
//Material Styles
const useStyles = makeStyles((theme) => ({
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingTop: "10px",
        paddingLeft : "16px",
        paddingRight : "16px",
        // necessary for content to be below app bar
        ...theme.mixins.toolbar
    },
    content: {
        flexGrow: 1,


    },

}));

//Student Component
const Students = ({ width, ...props }) => {
    const classes = useStyles();


    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (!user) {
                props.history.replace('/login')
            }
        });
    }, []);

    return (
        <>
            <main className={classes.content} style={{ width: `calc(100% - ${width}px)`, marginLeft: `calc( 15px + ${width}px)`}}>

                <div className={classes.toolbar} />
        
                <Data  />

            </main> 
        </>
    )


}
export default withRouter(Students);