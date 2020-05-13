import React ,{useEffect} from 'react' ;
import { makeStyles } from '@material-ui/core/styles';
import Data from './data';
import { printComponent } from '../Students'
import { withRouter } from 'react-router-dom' ;
import { auth } from '../../Firebase'
//Table Component
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

const Message = ({width , ...props}) => {
    
        const classes = useStyles();
        useEffect(() => {
            auth.onAuthStateChanged((user) => {
              if (!user) {
                props.history.replace('/login')
              } 
            });
        }, []);
        return(
            <>
              <main className={classes.content} style = {{width : `calc(100% - ${width}px)` , marginLeft: `calc( 15px + ${width}px)` ,}}>
                <div className={classes.toolbar} />
                 <Data />
             
            </main>
            </>

        )
    
    
}

export default withRouter(Message) ;