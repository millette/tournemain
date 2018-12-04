// npm
import Link from "next/link"

export default () => (
  <section className="section">
    <div className="container">
      <nav className="columns">
        <div className="column">
          <Link href="/page" as="/">
            <a>Home page</a>
          </Link>
        </div>
        <div className="column">
          <Link href="/page?page=page-2" as="/page-2">
            <a>Second page</a>
          </Link>
        </div>
        <div className="column">
          <Link href="/page?page=page-3" as="/page-3">
            <a>Third page</a>
          </Link>
        </div>
        <div className="column">
          <Link href="/page?page=page-5" as="/page-5">
            <a>404...</a>
          </Link>
        </div>
        <div className="column">
          <Link href="/other">
            <a>Other page</a>
          </Link>
        </div>
        <div className="column">
          <Link href="/about">
            <a>About page</a>
          </Link>
        </div>
        <div className="column">
          <Link href="/contact">
            <a>Contact page</a>
          </Link>
        </div>
      </nav>
    </div>
  </section>
)
