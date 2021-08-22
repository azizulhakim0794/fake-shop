import React, { useContext, useEffect, useState } from 'react';
import './Login.css'
import "firebase/auth";
import firebase from 'firebase/app';
import firebaseConfig from './FirebaseConfig/FirebaseConfig'
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles, } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Copyright } from '@material-ui/icons';
const useLoginStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  socialBtn: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#f13605",
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  googleBtn: {
    backgroundColor: '#f63b0c',
    '&:hover': {
      backgroundColor: '#dc340a'
    },
    color: "white"
  },
  facebookBtn: {
    backgroundColor: '#087be6',
    '&:hover': {
      backgroundColor: '#1560a7'
    },
    color: "white",
    margin: theme.spacing(3, 0, 2),
  }
}));
const Login = () => {
  const [loadReq] = useState(false)
  const [userDataInfo, setUserDataInfo] = useContext(UserContext)
  const history = useHistory()
  const location = useLocation()
  const classes = useLoginStyles();
  const { from } = location.state || { from: { pathname: "/" } };
  console.log(location)
  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig)
  }
  // console.log(location.state)
  // console.log(userDataInfo)
  const singInWithGoogle = (e) => {

    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth()
      .signInWithPopup(provider)
      .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        const user = result.user;
        console.log(user)
        const { displayName, email, uid, photoURL } = user
        const newUserData = { ...userDataInfo }
        newUserData.isSignedIn = true
        newUserData.name = displayName
        newUserData.email = email
        newUserData.uid = uid
        newUserData.photoURL = photoURL
        setUserDataInfo(newUserData)
        history.push(from);
        // ...
      }).catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
        if (errorCode || errorMessage || email || credential) {
          console.log(errorMessage, errorCode, email, credential);
        }
      });




    e.preventDefault()

  }
  const handleSing = () => {
    alert('This Method is not Work. For Sing in and login try Google with Sing in')
  }

  console.log()
  return (
    <div className="">
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              fullWidth variant="contained" color="primary" className={classes.submit} disabled>Sign In
            </Button>
            <Button
              fullWidth
              variant="contained"
              className={classes.facebookBtn}
            >
              <span>Facebook</span>
            </Button><Button
              fullWidth
              variant="contained"
              className={classes.googleBtn}
              onClick={singInWithGoogle}
            >
              Google
            </Button>

            <Box mt={3}>
              <Grid container >
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </form>
        </div>
        <Box className="text-center" mt={5} mb={3}>
          <Copyright style={{ fontSize: 15 }} color="action" /> This page is Copyright by Tamzid.
        </Box>
      </Container>
    </div>

  );
};

export default Login;