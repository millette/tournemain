// npm
import Link from 'next/link'
import Error from 'next/error'

import 'medium-draft/dist/basic.css'
import 'medium-draft/dist/medium-draft.css'

// self
import MyEditor from '../components/editor'

const Index = ({ json, path }) => {
  // FIXME: should offer to create page
  if (json.statusCode) return <Error statusCode={json.statusCode} />

  return (
    <section className='section'>
      <div className='container'>
        <h1 className='title' >{json.title}</h1>
        <nav className='columns'>
          <div className='column'><Link href="/page" as="/"><a>Home page</a></Link></div>
          <div className='column'><Link href="/page?page=page-2" as="/page-2"><a>Second page</a></Link></div>
          <div className='column'><Link href="/page?page=page-3" as="/page-3"><a>Third page</a></Link></div>
          <div className='column'><Link href="/page?page=page-5" as="/page-5"><a>404...</a></Link></div>
          <div className='column'><Link href="/other"><a>Other page</a></Link></div>
          <div className='column'><Link href="/about"><a>About page</a></Link></div>
          <div className='column'><Link href="/contact"><a>Contact page</a></Link></div>
        </nav>
        <MyEditor initialContent={json.content} key={path} editorKey={path} />
      </div>
    </section>
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
