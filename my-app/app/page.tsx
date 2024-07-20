import { Typography } from '@mui/material'
import Button from '@mui/material/Button'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Button href='/sign-in' variant="contained" className=" bg-green-500 font-roboto">
        Hello world
      </Button>
      <Typography variant='h4' >Welcome to GreenHub!</Typography>
    </main>
  )
}

