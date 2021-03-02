import Link from 'next/link'
import Layout from '../components/Layout'
import DropdownMultipleCombobox from '../components/DropDownMultipleCombobox'
import Downshift from 'downshift'
import {GetStaticProps, GetStaticPaths, GetServerSideProps} from 'next'
import useAuth from "../hooks/useAuth";

export const getServerSideProps : GetServerSideProps = async(context) => {
  const res = await fetch('http://localhost:3000/companies.json')
  const data = await res.json()

  if (!data) {
    return {notFound: true}
  }

  return {
    props: {
      companies: data
    }, // will be passed to the page component as props
  }

}

export default function DashboardPage(props) {

  const {user, loading} = useAuth();

  return (

    <Layout title="Home | Next.js + TypeScript Example">
      
      <div className="columns mx-1">
        <div className="column">
        <h1 className="title">Lupa</h1>
        <DropdownMultipleCombobox companies={props.companies} />
        </div>
        <div className="column"></div>


      </div>

    </Layout>
  )

}
