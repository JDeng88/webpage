import React, {useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import Switch from '@mui/material/Switch';
import { useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';

import ky from 'ky';
import { Navigate } from 'react-router-dom';

const theme = createTheme();

const API_URL = process.env.REACT_APP_API_URL

export default function SignIn() {

  const [login, setLogin] = useState(true); //false if first time signup
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    
    if (login){
      ky.post('login', {
        prefixUrl: API_URL,
        json: {
            "phone_number": data.get('phone_number'),
            "password": data.get('password'),
      }}).json()
      .then((res) => {
        localStorage.setItem("JWT", res.token)
        navigate('/')
      }) 
    } else if (data.get('password') == data.get('password_confirm')){
      ky.post('signup', {
        prefixUrl: API_URL,
        json: {
          "phone_number": data.get('phone_number'),
          "password": data.get('password'),
          "code": data.get('code'),
          "address": data.get('address')
        }
      }).json()
      .then((res) => {
        if (res.message == null){
          localStorage.setItem("JWT", res.token)
          navigate('/')
        } else {
          console.log(res.message)
          setErrorMessage(res.message)
        }     
      })
    } 
  };

  const loginToggle = (event) => {
    setLogin(event.target.checked)
  }

  const additional_inputs = (
    <>
      <TextField
      margin="normal"
      required
      fullWidth
      name="password_confirm"
      label="Confirm Password"
      type="password"
      id="password_confirm"

      />

      <TextField
      margin="normal"
      required
      fullWidth
      name="code"
      label="Activation Code"
      id="code"
      />

      <TextField
      margin="normal"
      required
      fullWidth
      name="address"
      label="Address"
      id="address"
      />

    </>
    
  )

  const alert = (
    <Snackbar
      autoHideDuration={6000}
      message={errorMessage}
      onClose={() => {setErrorMessage('')}}
    />
  )

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {login ? "Sign In" : "Sign Up"}
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="phone_number"
              label="Phone Number"
              name="phone_number"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
            />

            {login ? <> </> : additional_inputs}

            <FormGroup>
              <FormControlLabel 
              control={<Switch defaultChecked />} 
              label={login 
                ? "New user? Click to sign up" 
                : "Existing user? Click to sign in"}
              onChange={loginToggle}/>
            </FormGroup>

            
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {login ? "Sign In" : "Sign Up"}
            </Button>
          </Box>
        </Box>
        {errorMessage == '' ? alert : <></>}
      </Container>
    </ThemeProvider>
  );
}