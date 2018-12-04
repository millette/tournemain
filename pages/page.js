import Link from 'next/link'
import { withRouter } from 'next/router'

const Index = ({ router: { query }}) => <div>
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
  {Object.keys(query).length > 0 && <>
    <h2>Query</h2>
    <pre>{JSON.stringify(query, null, '  ')}</pre>
  </>}
</div>

Index.getInitialProps = async (o) => {
  const keys = Object.keys(o)
  console.log('OOO:', o)
  console.log('OOO:', keys)
  return { keys }
  /*
  const res = await fetch('https://api.github.com/repos/zeit/next.js')
  const json = await res.json()
  return { stars: json.stargazers_count }
  */
}

export default withRouter(Index)
