// npm
import Link from 'next/link'
import Error from 'next/error'

import 'draft-js/dist/Draft.css'

// self
import MyEditor from '../components/editor'

const Index = ({ json, path }) => {
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
    <MyEditor initialContent={json.content} key={path} editorKey={path} />
    <p>The end.</p>
  </div>
  )
}

Index.getInitialProps = async (o) => {
  const path = o.asPath.slice(1)
  if (o.req) {
    const data = require('../pages.json')
    const json = data[path]
    return { json, path }
  }

  return fetch(`/api/page/${path}`)
    .then((res) => res.json())
    .then((json) => ({ json, path }))
}

export default Index
