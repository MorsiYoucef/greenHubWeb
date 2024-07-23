"use client";
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { NextApiRequest } from 'next';

  export function getServerSideProps({ req }:{req: NextApiRequest}) {
    
  }


const Home = () => {
  const router = useRouter()

  useEffect(() => {
    const user = localStorage.getItem('user')
    if (!user) {
      router.push('/sign-in')
    }
  }, [router])

  return <div>Home Page</div>
}
export default Home
