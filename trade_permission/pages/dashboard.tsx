import Link from 'next/link'
import Layout from '../components/Layout'
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
          <Downshift
            onChange={selection => alert(selection
            ? `You selected ${selection.name}`
            : 'Selection Cleared')}
            itemToString={item => (item
            ? item.name
            : '')}>
            {({
              getInputProps,
              getItemProps,
              getLabelProps,
              getMenuProps,
              isOpen,
              inputValue,
              highlightedIndex,
              selectedItem,
              getRootProps
            }) => (
              <div>
                <label className="label" {...getLabelProps()}>Yritys</label>
                <div
                  style={{
                  display: 'inline-block'
                }}
                  {...getRootProps({}, {suppressRefError: true})}>
                  <input className="input" placeholder="Yrityksen nimi" {...getInputProps()}/>
                </div>
                <ul {...getMenuProps()}>
                  {isOpen
                    ? props
                      .companies
                      .filter(item => !inputValue || item.name.includes(inputValue))
                      .map((item, index) => (
                        <li
                          {...getItemProps({ key: item.name, index, item, style: { backgroundColor: highlightedIndex === index ? 'lightgray' : 'white', fontWeight: selectedItem === item ? 'bold' : 'normal', }, })}>
                          {item.name}
                        </li>
                      ))
                    : null}
                </ul>
              </div>
            )}
          </Downshift>
        </div>
      </div>
      {/*
  <ul>
   { props.companies.map( (company) => <li>{company.name} {company.ticker}</li>)}
  </ul> */}
    </Layout>
  )

}
