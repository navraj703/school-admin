import React, { useState } from 'react'
import { Typography, Paper, Avatar, Button, FormControl, Input, InputLabel } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { makeStyles } from '@material-ui/core/styles';
import {  withRouter } from 'react-router-dom'

import { auth } from '../../Firebase'
import Alert from '@material-ui/lab/Alert';
import LinearProgress from '@material-ui/core/LinearProgress';
const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
          marginTop: theme.spacing(2),
        },
      },
  
    main: {
		width: 'auto',
        display: 'block', // Fix IE 11 issue.
        // style={{ backgroundImage : 'url("https://wallpapershome.com/images/pages/ico_h/21456.jpg")' ,backgroundSize:"cover"}}
      
        marginLeft: theme.spacing.unit * 3,
		marginRight: theme.spacing.unit * 3,
		[theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
			width: 400,
			marginLeft: 'auto',
			marginRight: 'auto',
		},
	},
	paper: {
		marginTop: theme.spacing.unit * 8,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
	},
	avatar: {
		margin: theme.spacing.unit,
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing.unit,
	},
	submit: {
		marginTop: theme.spacing.unit * 3,
    },
    forgotLink : {
        color:theme.palette.secondary.main ,
    textAlign:"right" ,
    cursor:"pointer",
    marginTop:"5px",

    }
  }));


const Login = (props) => {
   
        const classes = useStyles();

        const [email, setEmail] = useState('')
        const [password, setPassword] = useState('')
        const [error,setError] =useState('')
        const [loader,setLoader] = useState(false)
        async function fireLogin() {
          
            try {
                setLoader(true)
                await auth.signInWithEmailAndPassword(email, password)
                props.history.replace('/') 

            } catch(error) {
              setLoader(false);
              setError(error.message)
            }
        }
        function redirect() {
            props.history.replace("/reset")
        }
   
        return (
         
            <main className={classes.main}>
              
                
                <Paper className={classes.paper} evaluation={3}>
                {
                    loader ?  <div className={classes.root}>
                    <LinearProgress variant="query" color="primary"  />
           
                     </div> : null
                }
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                      Admin Login 
                       </Typography>
                    <form className={classes.form} onSubmit={e => e.preventDefault() && false}>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="email">Email Address</InputLabel>
                            <Input id="email" name="email" autoComplete="off" autoFocus value={email} onChange={e => setEmail(e.target.value)} />
                        </FormControl>
                        <FormControl margin="normal" required  fullWidth>
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <Input name="password" type="password" id="password" autoComplete="off" value={password} onChange={e => setPassword(e.target.value)} />
                        </FormControl>
                        {
                            error ? <div className={classes.root}>
                            <Alert variant="outlined" severity="error">{error}!</Alert>
                            </div>  : null  
                        }
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={fireLogin}
                            className={classes.submit}>
                            Login
                          </Button>
                        <h6 onClick={redirect} className={classes.forgotLink}>Forgot Password?</h6>
                    </form>
                </Paper>
            </main>
       
        )

      
}

//.auth.signInWithEmailAndPassword(email, password)
export default withRouter(Login);