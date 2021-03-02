
// pages/index.js
import Link from 'next/link'
import Head from "next/head";
import Layout from '../components/Layout'

export default function Home() {

  return(
    <>
    <Head>
      <script dangerouslySetInnerHTML={{ __html: `
        if (document.cookie && document.cookie.includes('authed')) 
        {
          window.location.href = "/dashboard"
        }else {
          window.location.href = "/login"
        }
      ` }} />
    </Head>
    <Link href="/login"><a>Login</a></Link>
  </>


  )
}