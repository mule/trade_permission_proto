// pages/login.js

import { useRouter } from 'next/router'
import { Magic } from 'magic-sdk'
import Layout from '../components/Layout'

export default function Login() {
  const router = useRouter()
  const handleSubmit = async (event) => {
    event.preventDefault()

    const { elements } = event.target

    // Add the Magic code here
    const did = await new Magic(process.env.NEXT_PUBLIC_MAGIC_PUB_KEY)
    .auth
    .loginWithMagicLink({ email: elements.email.value })

    // Once we have the token from magic,
    // update our own database
    
    const authRequest = await fetch('/api/login', {
      method: 'POST',
      headers: { Authorization: `Bearer ${did}` }
    })

    if (authRequest.ok) {
      // We successfully logged in, our API
      // set authorization cookies and now we
      // can redirect to the dashboard!
      router.push('/dashboard')
    } else { /* handle errors */ }
  }

  return (

    <Layout title="Login | Login to trade permission proto">

      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input name="email" type="email" />
        <button>Log in</button>
      </form>
    </Layout>
  )
}