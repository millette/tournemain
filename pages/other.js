// npm
import Link from "next/link"

export default () => (
  <section className="section">
    <div className="container">
      <h1 className="title">Other page</h1>
      <Link href="/page" as="/">
        <a>Home</a>
      </Link>
    </div>
  </section>
)
