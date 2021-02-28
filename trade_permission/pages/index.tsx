import Link from 'next/link'
import Layout from '../components/Layout'
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch('http://localhost:3000/companies.json')
  const data = await  res.json()

  if (!data) {
    return {
      notFound: true,
    }
  }

  return {
    props: {companies: data}, // will be passed to the page component as props
  }

}

const IndexPage = (props) => (
  <Layout title="Home | Next.js + TypeScript Example">
    <h1>Hello Next.js 👋</h1>
    <p>
      <Link href="/about">
        <a>About</a>
      </Link>
    </p>

  <ul>
   { props.companies.map( (company) => <li>{company.name} {company.ticker}</li>)}
  </ul>
  </Layout>
)

export default IndexPage