import React, { useState } from 'react'
import { Typography, Paper, Avatar, Button, FormControl, Input, InputLabel } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { makeStyles } from '@material-ui/core/styles';
import {  withRouter } from 'react-router-dom'
import { auth } from '../../Firebase'
import Alert from '@material-ui/lab/Alert';
const useStyles = makeStyles((theme) => ({
    main: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
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
}));

const Forgot = (props) => {

    const classes = useStyles();

    const [email, setEmail] = useState('')
    const [alert, setAlert] = useState(false);
    const [err,setErr] = useState(false);
    const [error,setError] = useState('');
    
    function resetPassword() {
        auth.sendPasswordResetEmail(email).then(function () {
             return(
                setAlert(true) ,
                setErr(false)
             )
                
           
        }).catch(function (error) {
            setAlert(false) ;
            setErr(true);
            setError(error.message);
        });

    }
    function redirect() {
        props.history.push("/")
    }

    return (
        <main className={classes.main}>
            <Paper className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Reset Password
                       </Typography>
                <form className={classes.form} onSubmit={e => e.preventDefault() && false}>
                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="email">Email Address</InputLabel>
                        <Input id="email" name="email" autoComplete="off" autoFocus value={email} onChange={e => setEmail(e.target.value)} />
                    </FormControl>
                    {alert ? <div className={classes.root}>
                        <Alert variant="outlined" severity="success">An email have sent to you for reset password — check it out!</Alert>
                    </div> : null}
                    {
                        err ? <div className={classes.root}>
                        <Alert variant="outlined" severity="error">{error}!</Alert>
                        </div>  : null  
                    }
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={resetPassword}
                        className={classes.submit}>
                        Reset
                          </Button>
                          <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="secondary"
                        onClick={redirect}
                        className={classes.submit}>
                        Back to Home Page
                          </Button>
                  
                </form>
            </Paper>
        </main>
    )

}

//.auth.signInWithEmailAndPassword(email, password)
export default withRouter(Forgot);