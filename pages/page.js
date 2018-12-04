// npm
import Link from 'next/link'
import Error from 'next/error'

const Index = ({ json }) => {
  // FIXME: should offer to create page
  if (json.statusCode) return <Error statusCode={json.statusCode} />

  return (
    <div>
    <p>Hello Sam Man!</p>
    <ul>
      <li><Link href="/page" as="/"><a>Home page</a></Link></li>
      <li><Link href="/page?page=page-2" as="/page-2"><a>Second page</a></Link></li>
      <li><Link href="/page?page=page-3" as="/page-3"><a>Third page</a></Link></li>
      <li><Link href="/page?page=page-5" as="/page-5"><a>404...</a></Link></li>
      <li><Link href="/other"><a>Other page</a></Link></li>
      <li><Link href="/about"><a>About page</a></Link></li>
      <li><Link href="/contact"><a>Contact page</a></Link></li>
    </ul>

    <h1>{json.title}</h1>
    <p>{json.content}</p>
  </div>
  )
}

Index.getInitialProps = async (o) => {
  if (o.req) {
    const data = require('../pages.json')
    const json = data[o.asPath.slice(1)]
    return { json }
  }

  return fetch(`/api/page${o.asPath}`)
    .then((res) => res.json())
    .then((json) => ({ json }))
}

export default Index
