'use client'
import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Image from 'next/image'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import toast, { Toaster } from 'react-hot-toast'
import {
  GoogleLogin,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from 'react-google-login'

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="primary.main" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme({
  palette: {
    primary: {
      main: '#1a5319',
    },
    secondary: {
      main: '#19857b',
    },
  },
})

export default function SignIn() {
  const router = useRouter()
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const email = data.get('email')
    const password = data.get('password')

    try {
      const response = await axios.post('http://localhost:8042/users/login', {
        email,
        password,
      })
      console.log(response.data)
      router.push('/Home')
      toast.success('Successfully toasted!')
    } catch (error) {
      console.error('Error signing in', error)
      // Handle sign-in error (e.g., show error message)
    }
  }

  const handleGoogleSuccess = async (
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    if ('tokenId' in response) {
      const token = response.tokenId
      try {
        const res = await axios.post(
          'http://localhost:8042/users/google-login',
          {
            token,
          }
        )
        console.log(res.data)
        // Handle successful login
      } catch (error) {
        console.log('Error logging in with Google', error)
      }
    }
  }

  const handleGoogleFailure = (error: any) => {
    console.log('Google Sign-In failed', error)
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <Box>
          <Image
            src={require('./../../../public/WithoutTopWithoutBack.png')}
            alt="logo"
          />
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              variant="outlined"
              autoComplete="email"
              autoFocus
              sx={{
                backgroundColor: 'white', // Example: Set background color
                borderRadius: 1, // Example: Set border radius
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'primary.main', // Example: Set border color
                  },
                  '&:hover fieldset': {
                    borderColor: 'primary.dark', // Example: Set border color on hover
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'primary.light', // Example: Set border color when focused
                  },
                },
              }}
            />
            <TextField
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
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/sign-up" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
          <GoogleLogin
            clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={handleGoogleSuccess}
            onFailure={handleGoogleFailure}
            cookiePolicy={'single_host_origin'}
          />
        </Box>
        <Toaster />
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  )
}
