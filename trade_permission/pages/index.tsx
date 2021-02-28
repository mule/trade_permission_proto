import Link from 'next/link'
import Layout from '../components/Layout'
import Downshift from 'downshift'
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
    <Downshift
    onChange={selection =>
      alert(selection ? `You selected ${selection.name}` : 'Selection Cleared')
    }
    itemToString={item => (item ? item.name : '')}
  >
    {({
      getInputProps,
      getItemProps,
      getLabelProps,
      getMenuProps,
      isOpen,
      inputValue,
      highlightedIndex,
      selectedItem,
      getRootProps,
    }) => (
      <div>
        <label {...getLabelProps()}>Enter a company</label>
        <div
          style={{display: 'inline-block'}}
          {...getRootProps({}, {suppressRefError: true})}
        >
          <input {...getInputProps()} />
        </div>
        <ul {...getMenuProps()}>
          {isOpen
            ? 
                props.companies.filter(item => !inputValue || item.name.includes(inputValue))
                .map((item, index) => (
                  <li
                    {...getItemProps({
                      key: item.name,
                      index,
                      item,
                      style: {
                        backgroundColor:
                          highlightedIndex === index ? 'lightgray' : 'white',
                        fontWeight: selectedItem === item ? 'bold' : 'normal',
                      },
                    })}
                  >
                    {item.name}
                  </li>
                ))
            : null}
        </ul>
      </div>
    )}
  </Downshift>
{/* 
  <ul>
   { props.companies.map( (company) => <li>{company.name} {company.ticker}</li>)}
  </ul> */}
  </Layout>
)

export default IndexPage