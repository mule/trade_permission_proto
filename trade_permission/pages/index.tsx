
// pages/index.js
import Link from 'next/link'
import Layout from '../components/Layout'

export default function Home() {

  return(
  <Layout>
     <Link href="/login"><a>Login</a></Link>
  </Layout>
  )
}